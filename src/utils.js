import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import dataStore from "common-micro-libs/src/jsutils/dataStore"
import ObservableObject from "observable-data/src/ObservableObject"
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
        const required          = Object.keys(propDefintions).filter(propName => !propDefintions[propName]._isAlias && propDefintions[propName].required);

        ObservableObject.createComputed(state, "ready", function () {
            // the `instance[propName]` forces the property to be created on the HTML element's instance
            return !required.length || required.every(propName => !!instance[propName] && !!state.props[propName]);
        });

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


export function getPropsDefinition(Component) {
    let state = PRIVATE.get(Component);

    if (!state || !state.propsDef) {
        if (!state) {
            state = {
                propsDef: {}
            };
            PRIVATE.set(Component, state);
        }

        if (!state.propsDef) {
            state.propsDef = {};
        }

        // The props are stored internally (weakmap) once for the Component Class.
        // The internal definition has the prop "aliases" expanded as well.
        if (Component.propsDef) {
            objectKeys(Component.propsDef).forEach(propName => {
                state.propsDef[propName] = Component.propsDef[propName];
                // expand aliases as well
                if (isArray(state.propsDef[propName] .aliases)) {
                    const propAliasDef = objectExtend({}, Component.propsDef[propName], { _isAlias: true });
                    state.propsDef[propName] .aliases.forEach(propNameAlias => state.propsDef[propNameAlias] = propAliasDef);
                }
            });
        }
    }
    return state.propsDef;
}


