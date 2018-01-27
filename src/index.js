import dataStore from "common-micro-libs/src/jsutils/dataStore"

//============================================================================
const PRIVATE = dataStore.create();

/**
 * A generic class for building widgets based on HTML Custom Elements.
 *
 */
export class ComponentElement extends HTMLElement {
    constructor(...args) {
        super(...args);
        const state = getInstanceState(this);
        state.content = this.constructor.useShadow ? this.attachShadow({ mode: "open" }) : this;
        state.content.innerHTML = this.constructor.template;
        this.init();
        return this;
    }

    //==============================================================
    //  Static Members
    //==============================================================

    /**
     * Return default registration tag name
     *
     * @return {String}
     */
    static get tagName() { throw new Error("tagName not defined") }

    /**
     * Registers the web component. Uses tagName as default input param
     */
    static define(name) {
        customElements.define(name || this.tagName, this);
    }

    /**
     * The number of milliseconds to wait after an element has been detached from DOM before
     * the `.destroy()` method is auto executed.
     *
     * @return {Number}
     */
    static get delayDestroy() { return 30000; }

    /**
     * If Shadow DOM should be used. Default `true`
     *
     * @return {Boolean}
     */
    static get useShadow() { return true; }

    /**
     * Returns the HTML template for the component
     *
     * @return {String}
     */
    static get template() { return "<div></div>"; }

    //==============================================================
    //  Instance Members
    //==============================================================

    /**
     * Destroy the instance of the widget
     */
    destroy() {
        if (PRIVATE.has(this)) {
            const state = getInstanceState(this);
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
        getInstanceState(this).destroyCallbacks.push(callback);
    }

    //~~~~~~~~~~~~~~~~~~~~~~ LIFE CYCLE HOOKS ~~~~~~~~~~~~~~~~~~~~~~

    /**
     * Called only once, at the time the comonent is instantiated (called by the constructor).
     * The `template` will already have been inserted into the element and its DOM representation will
     * be included inside of `getState().content`.
     */
    init() {}

    /**
     * Component is ready to be started. This means that all required props/param have been provided.
     */
    ready() {}

    /**
     * Called only after the component is part of DOM and only if all props that were marked
     * required have been provided.
     * This method could be called multiple times depending on whether the element is
     * added/removed from DOM.
     * This is a good place to setup global events and/or initiate retrieval of data.
     */
    mounted() {}


    /**
     * Called soon after (nextTick) the Element is removed from DOM, but probably before the `destroy`
     * method has run.
     */
    unmounted() {}


    //~~~~~~~~~~~~~~~~~~~~~~ EVENTEMITTER INTERFACE ~~~~~~~~~~~~~~~~~~~~~~

    /**
     * Dispatches a native `CustomEvent`
     *
     * @param {String} eventName
     * @param {*} data
     */
    emit(eventName, data) {
        this.dispatchEvent(new CustomEvent(eventName, { detail: data }));
    }

    //~~~~~~~~~~~~~~~~~~~~~~ BUITINS ~~~~~~~~~~~~~~~~~~~~~~

    connectedCallback() {
        // Cancel destroy if it is queued
        if (PRIVATE.has(this)) {
            const state = getInstanceState(this);
            if (state.destroyQueued) {
                clearTimeout(state.destroyQueued);
                state.destroyQueued = null;
            }
        }
    }

    disconnectedCallback() {
        // Delay calling .destroy() by 60s, just in case user re-attaches component back to dom.
        // This seems to be currently the only way to ensure attached `onDestroy` logic run when
        // the element is no longer needed.
        if (PRIVATE.has(this)) {
            const state = getInstanceState(this);
            if (!state.destroyQueued) {
                state.destroyQueued = setTimeout(this.destroy.bind(this), this.constructor.delayDestroy);
            }
        }
    }
}
export default ComponentElement;


function getInstanceState(instance) {
    if (!PRIVATE.has(instance)) {
        PRIVATE.set(instance, {
            ready: false,
            props: {},
            content: null,
            destroyCallbacks: [],
            destroyQueued: null
        });
    }
    return PRIVATE.get(instance);
}
