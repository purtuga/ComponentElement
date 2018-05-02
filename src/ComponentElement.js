import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import { objectKeys, objectDefineProperty } from "common-micro-libs/src/jsutils/runtime-aliases"
import {objectWatchProp} from "observables/src/objectWatchProp"
import domAddEventListener from "common-micro-libs/src/domutils/domAddEventListener"
import {
    getState,
    PRIVATE,
    getPropsDefinition,
    getComponentTemplate,
    getComponentClassState
} from "./utils"

//============================================================================
const SHADOW_DOM_SUPPORTED = document.head.createShadowRoot || document.head.attachShadow;
const EV_DEFAULT_INIT = { bubbles: false, cancelable: false, composed: false };


/**
 * A generic class for building widgets based on HTML Custom Elements.
 *
 * @extends HTMLElement
 */
export class ComponentElement extends HTMLElement {
    constructor(...args) {
        super(...args);
        setupComponent(this);
        return this;
    }

    //==============================================================
    //  Static Members
    //==============================================================

    /**
     * The Component's props definition
     * @name propsDef
     * @type {Object<String,Object>}
     */

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
        window.customElements.define(name || this.tagName, this);
    }

    /**
     * The number of milliseconds to wait after an element has been detached from DOM before
     * the `.destroy()` method is auto executed.
     *
     * @type {Number}
     */
    static get delayDestroy() { return 5000; }

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
    static get template() { return "<div></div>"; }

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

    // Reflects changed html attributes to state.props
    attributeChangedCallback(name, oldValue, newValue) {
        const propsDef =  getPropsDefinition(this.constructor);
        if (propsDef[name]) {
            name = propsDef[name].name;
        }
        this.props[name] = newValue;
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
    }

    /**
     * Adds a callback to be executed when Component is destroyed.
     * @param {Function} callback
     */
    onDestroy(callback) {
        getState(this).destroyCallbacks.push(callback);
    }

    /**
     * The Component's props.
     * @type {Object}
     */
    get props() {
        if (this.constructor.prototype === this) {
            throw new Error("can't be used on own prototype");
        }

        if (this._$props) {
            return this._$props;
        }

        // On first call - setup the property on the instance
        const propDefinitions = getPropsDefinition(this.constructor);
        let props = {};

        objectKeys(propDefinitions).forEach(propName => {
            if (!propDefinitions[propName] || !propDefinitions[propName]._isAlias) {
                let propValue = propDefinitions[propName].default();

                objectDefineProperty(props, propName, {
                    configurable: true,
                    enumerable: true,
                    get() {
                        return propValue;
                    },
                    set: newValue => {
                        newValue = propDefinitions[propName].filter.call(this, newValue);
                        return propValue = newValue;
                    }
                });

                // props[propName] = propDefinitions[propName].default();
            }
        });

        objectDefineProperty(this, "_$props", { value: props });
        return props;
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
        const result = this.$ui.querySelectorAll(selector);
        if (Array.isArray(result)) {
            return;
        }
        return Array.prototype.slice.call(result, 0);
    }

    //~~~~~~~~~~~~~~~~~~~~~~ LIFE CYCLE HOOKS ~~~~~~~~~~~~~~~~~~~~~~

    /**
     * Called to initialize the component, but only after only after all required
     * props have been provided.  This method could be called multiple times, if component
     * has been destroyed, but then re-attached to the DOM Tree.
     *
     */
    init() {}

    /**
     * Component is ready to be started. This means that all required props/param have been provided.
     */
    ready() {}

    /**
     * Component is not ready, and if already stated, it might need adjusted. This means that not all
     * required props are currently defined.
     */
    unready() {}

    /**
     * Called only after the component has been initialized (`init()` has been called).
     * This method could be called multiple times depending on whether the element is
     * added/removed from DOM.
     * This is a good place to setup global events and/or initiate retrieval of data.
     */
    mounted() {}


    /**
     * Called if component has been initialized (`init()` has run).
     */
    unmounted() {}


    //~~~~~~~~~~~~~~~~~~~~~~ EVENTEMITTER INTERFACE ~~~~~~~~~~~~~~~~~~~~~~

    /**
     * Dispatches a native `CustomEvent`. The `data` provided will be available
     * in the customEvent.detail property
     *
     * @param {String} eventName
     * @param {*} data
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
        this.dispatchEvent(new CustomEvent(
            eventName,
            objectExtend({}, this.constructor.eventInitOptions, eventInit, { detail: data })
        ));
    }

    /**
     * Set an event listener on the current component
     *
     * @param {String} eventNames
     *  One or more event names to listen for (space delimetered)
     *
     * @param {Function} callback
     *
     * @param {Boolean} [capture=false]
     *
     * @returns {DOMEventListener}
     */
    on(eventNames, callback, capture) {
        return domAddEventListener(this.$ui, eventNames, callback, capture);
    }

    /**
     * Add callback to be called when props change
     *
     * @param {Function} callback
     * @param {String} [propName]
     *  Optional. The specific prop to watch.
     *
     * @return {ObjectUnwatchProp}
     */
    onPropsChange(callback, propName) {
        return objectWatchProp(this.props, propName, callback);
    }

    //~~~~~~~~~~~~~~~~~~~~~~ BUITINS ~~~~~~~~~~~~~~~~~~~~~~

    connectedCallback() {
        // Cancel destroy if it is queued
        if (PRIVATE.has(this)) {
            const state = getState(this);
            if (state.destroyQueued) {
                clearTimeout(state.destroyQueued);
                state.destroyQueued = null;
            }
            state.isMounted = true;
            if (state.ready) {
                this.mounted();
            }
        }
        else {
            getState(this).isMounted = true;
            setupComponent(this);
        }
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
            if (state.ready) {
                this.unmounted();
            }
        }
    }
}
export default ComponentElement;

function setupComponent(component) {
    const state = getState(component);
    let lastReadyState = null;
    const handleReadyChanges = () => {
        if (lastReadyState === state.ready) {
            return;
        }

        lastReadyState = state.ready;

        if (state.ready) {
            if (!state.hasTemplate) {
                // component._$ui.innerHTML = component.constructor.template;
                component._$ui.appendChild(getComponentTemplate(component));
                state.hasTemplate = true;
            }

            component.ready();

            if (state.isMounted) {
                component.mounted();
            }
        }
        else if (state.hasTemplate) {
            component.unready();
        }

    };

    if (component.constructor.useShadow && SHADOW_DOM_SUPPORTED) {
        if (component.shadowRoot) {
            component._$ui = component.shadowRoot;
        }
        else {
            component._$ui = component.attachShadow({ mode: component.constructor.shadowMode });
        }
    }
    else {
        component._$ui = component;
    }

    component.init();

    state.readyWatcher = objectWatchProp(state, "ready", handleReadyChanges);
    component.onDestroy(state.readyWatcher);
    handleReadyChanges();
}
