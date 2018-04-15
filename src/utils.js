import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import dataStore from "common-micro-libs/src/jsutils/dataStore"
import objectWatchProp from "common-micro-libs/src/jsutils/objectWatchProp"
import { isArray, objectKeys } from "common-micro-libs/src/jsutils/runtime-aliases"

//============================================================================
export const PRIVATE = dataStore.create();

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
 * @return {HTMLTemplateElement}
 */
export function getComponentTemplate(componentInstance) {
    const classState = getComponentClassState(componentInstance.constructor);

    if (!classState.template) {
        classState.template = componentInstance.ownerDocument.createElement("template");
        classState.template.innerHTML = componentInstance.constructor.template;
    }

    return componentInstance.ownerDocument.importNode(classState.template.content, true);
}

