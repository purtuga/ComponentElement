import objectExtend from "@purtuga/common/src/jsutils/objectExtend.js"
import {nextTick} from "@purtuga/common/src/jsutils/nextTick.js"
import {throwIfThisIsPrototype} from "@purtuga/common/src/jsutils/throwIfThisIsPrototype.js"
import {
    objectKeys,
    defineProperty,
    consoleWarn,
    head
} from "@purtuga/common/src/jsutils/runtime-aliases.js"
import domAddEventListener from "@purtuga/common/src/domutils/domAddEventListener.js"
import domFind from "@purtuga/common/src/domutils/domFind.js"
import {
    getState,
    PRIVATE,
    getPropsDefinition,
    getComponentClassState,
    elementHasAttributeForProp,
    geAttributeValueForProp
} from "./utils.js"
import {
    styleComponentInstanceElement,
    prepareRenderedContent,
    supportsNativeShadowDom
} from "./polyfill-support.js"

//============================================================================
const SHADOW_DOM_SUPPORTED = head.createShadowRoot || head.attachShadow;
const EV_DEFAULT_INIT = { bubbles: true, cancelable: true, composed: true };
const CE_REGISTRY = window.customElements;
const PROPS_NOOP = Object.freeze(Object.create(null));
const EVENT_ANY = Symbol("ev.props.any");
let lazySetupUnderway = false;

/**
 * A generic class for building widgets based on HTML Custom Elements.
 *
 * @extends HTMLElement
 *
 */
class ComponentElement extends HTMLElement {
    constructor(...args) {
        const self = super(...args) || this;
        setupComponent(self);
        return self;
    }

    //==============================================================
    //  Static Members
    //==============================================================

    /**
     * The Component's props definition
     * @name propsDef
     * @type {Object<String,ComponentElement~PropDefinition>}
     */
    static propsDef = PROPS_NOOP;

    /**
     * Return default registration tag name
     *
     * @type {String}
     */
    static get tagName() { throw new Error("tagName not defined") }

    /**
     * Registers the web component. Uses tagName as default input param
     */
    static define(name) {
        name = name || this.tagName;

        if (CE_REGISTRY.get(name)) {
            if (CE_REGISTRY.get(name) !== this) {
                consoleWarn(`${name} is already a defined in customElementsRegistry as a different Class`);
            }
            return;
        }

        CE_REGISTRY.define(name, this);
    }

    /**
     * The number of milliseconds to wait after an element has been detached from DOM before
     * the `.destroy()` method is auto executed.
     *
     * @type {Number}
     */
    static get delayDestroy() { return 0; }

    /**
     * If Shadow DOM should be used. Default `true`
     *
     * @type {Boolean}
     */
    static get useShadow() { return true; }

    /**
     * The value for the `mode` option that will be used on the `attachShadow` method.
     *
     * @type {string}
     */
    static get shadowMode() { return "open"; }

    /**
     * Returns the HTML template for the component. Could also be a Template html element
     *
     * @type {String|HTMLTemplateElement}
     */
    static get template() {
        // fixme: remove post v2.
        if (process.env.NODE_ENV !== "production") {
            consoleWarn(`${this.name}.template is Deprecated! Use .render() method`);
        }
        return "<div></div>";
    }

    /**
     * Renderer for the template and return what should be inserted into shadowDom.
     * By default, this base class will simply clone the `template` defined in the
     * static property above. This method will called prior to doing that, and if
     * it returns a `truthy` value, then its assume to be either an HTMLElement or
     * DocumentFragment with the element's instance UI (which will be inserted into
     * shadowDom).
     *
     * **NOTE**: Should always use `getComponentInstanceTemplate` or `getComponentTemplate`
     * to retrieve the template or its content, since it is manipulated in browsers that
     * use the polyfills to make the template compatible in those platforms.
     *
     * @param {ComponentElement} eleInstance
     *  The `ComponentElement` instance being initialized
     *
     * @return {HTMLElement|DocumentFragment}
     */
    static renderTemplate(/*eleInstance*/) {
        // FIXME: remove post v2.
        if (process.env.NODE_ENV !== "production") {
            consoleWarn(`${this.name}.renderTemplate is NO LONGER SUPPORTED! Use .render() method`);
        }
        return;
    }

    /**
     * The default initialization options for the `emit()` method.
     * See [Event.contructor]{@link http://devdocs.io/dom/event/event} for more.
     *
     * @type EventInit
     */
    static get eventInitOptions() { return EV_DEFAULT_INIT; }

    // Returns the list (Array) of props that were marked as `@attr`
    static get observedAttributes() {
        let state = getComponentClassState(this);

        if (!state.observedAttrs) {
            const propList = getPropsDefinition(this);
            state.observedAttrs = objectKeys(propList).filter(p => propList[p].attr);
        }

        return state.observedAttrs;
    }

    //==============================================================
    //  Instance Members
    //==============================================================

    /**
     * The Component's props.
     * @type {Object}
     */
    get props() {
        throwIfThisIsPrototype(this);

        if (lazySetupUnderway) {
            return undefined;
        }

        lazySetupUnderway = true;

        const propDefinitions = getPropsDefinition(this.constructor);
        let props = {};
        const ev = getState(this).ev;
        const notifyAnyListeners = () => ev.emit(EVENT_ANY);
        notifyAnyListeners._for = this;
        notifyAnyListeners._ev = EVENT_ANY;


        objectKeys(propDefinitions).forEach(propName => {
            if (!propDefinitions[propName] || !propDefinitions[propName]._isAlias) {
                let propValue = propDefinitions[propName].default.call(this);
                const notifyPropListeners = () => ev.emit(propName);

                notifyPropListeners._for = this;
                notifyPropListeners._ev = propName;

                // FIXME: Can this be more efficient? create just one prop notifier funciton and store list of props in an outer-scoped array?

                if (
                    propDefinitions[propName].attr &&
                    !propDefinitions[propName].boolean &&
                    elementHasAttributeForProp(this, propDefinitions[propName])
                ) {
                    propValue = geAttributeValueForProp(this, propDefinitions[propName]);
                } else if (this.hasOwnProperty(propName)) {
                    // if the current element has a prop by this same name set directly on the instance,
                    // then this implies that it was set prior to the Element being upgraded.
                    propValue = this[propName];
                    delete this[propName]; // this sets functionality back to the getter/setter.
                }

                defineProperty(
                    props,
                    propName,
                    undefined,
                    function getProp () {
                        return propValue;
                    },
                    newValue => {
                        newValue = propDefinitions[propName].filter.call(this, newValue);

                        // Only schedule event notification is the component is mounted
                        if (this.isMounted) {
                            nextTick.queue(notifyPropListeners);
                            nextTick.queue(notifyAnyListeners);
                        }

                        return propValue = newValue;
                    },
                    true,
                    true
                );
            }
        });

        defineProperty(this, "props", props, undefined, undefined, true, true, false);
        lazySetupUnderway = false;

        return props;
    }

    /**
     * Returns a boolean indicating if Component has all required props fulfilled
     */
    get hasRequiredProps() {
        throwIfThisIsPrototype(this);
        return objectKeys(this.constructor.propsDef)
            .filter(propName => this.constructor.propsDef[propName].required)
            .every(propName => !!this.props[propName]);
    }

    /**
     * returns a boolean indicating if component is connected to DOM
     * @return {Boolean}
     */
    get isMounted() {
        throwIfThisIsPrototype(this);
        return getState(this).isMounted
    }

    /**
     * Pointer to the UI of the Component. Value is will either be the `showdowRoot` or the element
     * itself.
     *
     * @returns {HTMLElement}
     */
    get $ui() {
        return this._$ui;
    }

    /**
     * Destroy the instance of the widget
     */
    destroy() {
        if (PRIVATE.has(this)) {
            const state = getState(this);
            PRIVATE.delete(this);
            if (state.destroyQueued) {
                clearTimeout(state.destroyQueued);
                state.destroyQueued = null;
            }
            state.destroyCallbacks.splice(0).forEach(cb => cb());
        }
        if (this.parentNode) {
            this.parentNode.removeChild(this);
        }
        this.didDestroy();
    }

    /**
     * Adds a callback to be executed when Component is destroyed.
     * @param {Function} callback
     */
    onDestroy(callback) {
        getState(this).destroyCallbacks.push(callback);
    }


    /**
     * Find an element in the `$ui` (alias for `querySelector()`)
     *
     * @param {String} selector
     *
     * @return {HTMLElement}
     */
    $(selector) {
        return this.$ui.querySelector(selector);
    }

    /**
     * Returns an array with matched set of DOM elements based on the given selector.
     * (alias for `querySelectorAll()`)
     *
     * @param {String} selector
     *
     * @returns {Array<HTMLElement>}
     */
    $$(selector) {
        return domFind(this.$ui, selector);
    }

    /**
     * Updates the component's DOM by running through the render lifecycle of:
     *
     *  `willRender()`
     *  `render()`
     *  `didRender()`
     *
     * This method probably should not be called directly. It is automatically
     * called when props change
     */
    get update() {
        throwIfThisIsPrototype(this);

        if (lazySetupUnderway) {
            return undefined;
        }

        const _update = () => {
            if (!this.isMounted) {
                return;
            }

            const shouldRender = this.willRender();

            if ("boolean" !== typeof shouldRender || shouldRender) {
                this._setView(this.render());
                this.didRender();
            }
        };

        _update._for = this;
        lazySetupUnderway = true;
        defineProperty(this, "update", _update);
        lazySetupUnderway = false;

        return _update;
    }

    /**
     * An instance bound method used to queue the render update cycle which is async (nextTick)
     * @type Function
     * @private
     */
    get queueUpdate() {
        return this._queueUpdate;
    }
    get _queueUpdate() { // FIXME: remove this in favor of `queueUpdate()`
        throwIfThisIsPrototype(this);

        if (lazySetupUnderway) {
            return undefined;
        }

        const __queueUpdate = () => {
            nextTick.queue(this.update);
        };

        __queueUpdate._for = this;
        lazySetupUnderway = true;
        defineProperty(this, "_queueUpdate", __queueUpdate);
        lazySetupUnderway = false;

        return __queueUpdate;
    }

    /**
     * Handles the render output - which normally means flush it ot DOM.
     * Override for different render libraries
     *
     * @protected
     * @param renderOutput
     */
    _setView(renderOutput) {
        let view = renderOutput;

        if (!supportsNativeShadowDom()) {
            view = prepareRenderedContent(renderOutput, this) || renderOutput;
        }

        // If it looks like html, then use innerHTML
        if ("string" === typeof view) {
            this.$ui.innerHTML = view;
        } else {
            this.$ui.textContent = "";
            this.$ui.appendChild(view);
        }
    }

    //--------------------------------------------------------------
    //~~~~~~~~~~~~~~~~~~~~~~ LIFE CYCLE HOOKS ~~~~~~~~~~~~~~~~~~~~~~
    //--------------------------------------------------------------

    /**
     * Called to initialize the component. At this point `this.$ui` has been set
     * (to either `shadowRoot` or `this`), but nothing has ben rendered.
     */
    didInit() {
        // FIXME: delete after v2
        if ("init" in this) {
            if (process.env.NODE_ENV !== "production") {
                consoleWarn(`${this.constructor.name}.init() is Deprecated! Use .didInit()`);
            }
            this.init();
        }
    }

    /**
     * Component was mounted (attached to DOM)
     */
    didMount() {
        // FIXME: delete after v2
        if ("ready" in this) {
            if (process.env.NODE_ENV !== "production") {
                consoleWarn(`${this.constructor.name}.ready() is Deprecated! Use .didMount()`);
            }
            this.ready();
        }
        // FIXME: delete after v2
        if ("mounted" in this) {
            if (process.env.NODE_ENV !== "production") {
                consoleWarn(`${this.constructor.name}.mounted() is Deprecated! Use .didMount()`);
            }

            // mounted() {}
            this.mounted(); // FIXME: remove post v2
        }
    }

    /**
     * Component's render function is about to be called. if a `Boolean` `false` is
     * returned, `render()` will be canceled.
     * @return {Boolean}
     */
    willRender() {}

    /**
     * Render the Component's content.
     *
     * __IMPORTANT__: Note that by default, this view handler (`_setView`) does not support
     * dynamic styles in polyfilled environments. Styles will be scooped only on first render.
     *
     * @return {String|HTMLElement|DocumentFragment}
     */
    render(){ return `<span></span>`; }

    /**
     * Component has been rendered and dates flushed to DOM
     */
    didRender() {}

    /**
     * Called if component has been initialized (`init()` has run).
     */
    didUnmount() {
        // FIXME: delete after v2
        if ("unmounted" in this) {
            if (process.env.NODE_ENV !== "production") {
                consoleWarn(`${this.constructor.name}.unmounted() is Deprecated! Use .didUnmount()`);
            }
            this.unmounted();
        }
    }

    /**
     * Component was destroyed (destroy callback were already called)
     */
    didDestroy() {}


    //~~~~~~~~~~~~~~~~~~~~~~ EVENTEMITTER INTERFACE ~~~~~~~~~~~~~~~~~~~~~~

    /**
     * Dispatches a native `CustomEvent`. The `data` provided will be available
     * in the customEvent.detail property
     *
     * @param {String} eventName
     * @param {*} [data]
     * @param {EventInit} [eventInit=ComponentElement.eventInitOptions]
     *  Any other options for the CustomEvent initialization.
     *  See [Event.constructor]{@link http://devdocs.io/dom/event/event} for more.
     *
     * @example
     *
     * document.body.addEventListener("my-event", function (ev) { console.log(ev.detail); });
     *
     * // My component
     * myComponent.emit("my-event", { msg: "hello" });
     *
     */
    emit(eventName, data, eventInit) {
        const eventNameLowercase = eventName.toLowerCase();
        const event = new CustomEvent(
            eventName,
            objectExtend({}, this.constructor.eventInitOptions, eventInit, { detail: data })
        );

        if ("function" === typeof this[eventNameLowercase]) {
            this[eventNameLowercase](event);
        }

        this.dispatchEvent(event);
    }

    /**
     * Set an event listener on the current component
     *
     * @param {String} eventNames
     *  One or more event names to listen for (space delimiter)
     *
     * @param {Function} callback
     *
     * @param {Boolean} [capture=false]
     *
     * @returns {DOMEventListener}
     */
    on(eventNames, callback, capture) {
        return domAddEventListener(this, eventNames, callback, capture);
    }

    /**
     * Add callback to be called when props change
     *
     * @param {Function} callback
     * @param {String} [propName]
     *  Optional. The specific prop to watch.
     *
     * @return {Function}
     */
    onPropsChange(callback, propName) {
        return getState(this).ev.on(propName || EVENT_ANY, callback);
    }

    //~~~~~~~~~~~~~~~~~~~~~~ NATIVE METHODS ~~~~~~~~~~~~~~~~~~~~~~

    // Reflects changed html attributes to state.props
    attributeChangedCallback(name, oldValue, newValue) {
        const propsDef =  getPropsDefinition(this.constructor);
        if (propsDef[name]) {
            name = propsDef[name].name;
        }
        this.props[name] = newValue;
    }

    connectedCallback() {
        const state = getState(this);

        if (state.destroyQueued) {
            clearTimeout(state.destroyQueued);
            state.destroyQueued = null;
        }

        if (!supportsNativeShadowDom()) {
            styleComponentInstanceElement(this);
        }

        state.isMounted = true;
        this.didMount();
        this.update();
    }

    disconnectedCallback() {
        // Delay calling .destroy() by 60s, just in case user re-attaches component back to dom.
        // This seems to be currently the only way to ensure attached `onDestroy` logic run when
        // the element is no longer needed.
        if (PRIVATE.has(this)) {
            const state = getState(this);
            if (!state.destroyQueued) {
                state.destroyQueued = setTimeout(this.destroy.bind(this), this.constructor.delayDestroy);
            }
            state.isMounted = false;
        }

        this.didUnmount();
    }
}


function setupComponent (component) {
    const { useShadow, shadowMode } = component.constructor;
    if (useShadow && SHADOW_DOM_SUPPORTED) {
        if (component.shadowRoot) {
            component._$ui = component.shadowRoot;
        }
        else {
            component._$ui = component.attachShadow({ mode: shadowMode });
        }
    }
    else {
        component._$ui = component;
    }

    component.onPropsChange(component.update);
    component.didInit();
}

//=======================================================================================
//                                                               MODULE EXPORTS
//=======================================================================================
export default ComponentElement;
export { ComponentElement }
