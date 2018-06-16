import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import dataStore from "common-micro-libs/src/jsutils/dataStore"
import objectWatchProp from "observables/src/objectWatchProp"
import { isArray, objectKeys } from "common-micro-libs/src/jsutils/runtime-aliases"
import {Symbol} from "common-micro-libs/src/jsutils/Symbol"

//============================================================================
export const PRIVATE = dataStore.create();

export const STATE_SYMBOL = Symbol("state");

/**
 * Checks if the element has an attribute set that matches any of the aliases for a prop
 *
 * @param {ComponentElement} ele
 * @param {ComponentElement~PropDefinition} propDef
 *
 * @return {Boolean}
 */
export function elementHasAttributeForProp(ele, propDef) {
    return propDef.aliases.some(propAlias => ele.hasAttribute(propAlias));
}

export function geAttributeValueForProp(ele, propDef) {
    let attrVal = "";
    propDef.aliases.some(propAlias => {
        if (ele.hasAttribute(propAlias)) {
            attrVal = ele.getAttribute(propAlias);
            return true;
        }
    });
    return attrVal;
}

export function getState(instance) {
    if (!PRIVATE.has(instance)) {
        let state = {
            ready: false,           // We have all required params
            readyWatcher: null,
            props: instance.props,
            destroyCallbacks: [],
            destroyQueued: null,
            isMounted: false,
            hasTemplate: false // template has been inserted into component.$ui
        };

        // Create all props
        const propDefintions    = getPropsDefinition(instance.constructor);
        const required          = objectKeys(propDefintions).filter(propName => !propDefintions[propName]._isAlias && propDefintions[propName].required);
        const setReadyState     = () => {
            if (!required.length || required.every(propName => !!state.props[propName])) {
                state.ready = true;
            }
            else {
                state.ready = false;
            }
        };

        required.forEach(propName => objectWatchProp(state.props, propName, setReadyState));
        setReadyState();
        PRIVATE.set(instance, state);
    }
    return PRIVATE.get(instance);
}


/**
 * Returns a kebab-case representation of the given string on input. Essentially, replaces
 * each Capital letter with a `-` followed by that letter in lower case.
 *
 * @param {String} str
 *
 * @return {String}
 *
 * @example
 *
 * getKebabCase("Paul"); // => -paul
 * getKebabCase("paulTavares"); // => paul-tavares
 */
export function getKebabCase(str) {
    return str.replace(/([A-Z])/g, (match, p1) => "-" + p1.toLowerCase())
}


/**
 * Given a string in kebab case (ex. paul-tavares), this will return a CamelCase
 * representation of that string.
 *
 * @param {String} str
 *
 * @return {String}
 */
export function getCamelCase(str) {
    return str.replace(/(-[a-z])/g, (match, p1) => p1.toUpperCase().substr(1))
}

/**
 *
 * @param ComponentClass
 * @returns {Object<String,ComponentElement~PropDefinition>}
 */
export function getPropsDefinition(ComponentClass) {
    let state = getComponentClassState(ComponentClass);

    if (!state.propsDef) {
        state.propsDef = {};

        // The props are stored internally (weakmap) once for the Component Class.
        // The internal definition has the "aliases" expanded as well.
        if (ComponentClass.propsDef) {
            objectKeys(ComponentClass.propsDef).forEach(propName => {
                state.propsDef[propName] = ComponentClass.propsDef[propName];
                // expand aliases as well
                if (isArray(state.propsDef[propName].aliases)) {
                    const propAliasDef = objectExtend({}, ComponentClass.propsDef[propName], { _isAlias: true });
                    state.propsDef[propName].aliases.forEach(
                        propNameAlias => !state.propsDef[propNameAlias] &&
                                        (state.propsDef[propNameAlias] = propAliasDef));
                }
            });
        }
    }

    return state.propsDef;
}

/**
 * Returns the internal state for the Component Class
 *
 * @param {ComponentElement} ComponentClass
 *
 * @return {Object}
 */
export function getComponentClassState(ComponentClass) {
    if (!PRIVATE.has(ComponentClass)) {
        PRIVATE.set(ComponentClass, {
            propsDef: null,
            template: null,
            observedAttrs: null
        });
    }
    return PRIVATE.get(ComponentClass);
}

/**
 * Returns a clone of the Class's template - ready to be used/inserted
 * into a instance of the class
 *
 * @param {ComponentElement} componentInstance
 *
 * @return {HTMLElement}
 */
export function getComponentInstanceTemplate(componentInstance) {
    return componentInstance.ownerDocument.importNode(
        getComponentTemplate(componentInstance.constructor).content,
        true
    );
}

/**
 * Returns a `HTMLTemplateElement` that holds the ComponentElement's template
 *
 * @param {ComponentElement} Component
 *  The ComponentElement class
 *
 * @return {HTMLTemplateElement}
 */
export function getComponentTemplate(Component) {
    if ("string" === typeof Component.template) {
        const classState = getComponentClassState(Component);

        if (!classState.template) {
            classState.template = document.createElement("template");
            classState.template.innerHTML = Component.template;
        }

        return classState.template;
    }

    return Component.template;
}

