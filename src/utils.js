import objectExtend from "@purtuga/common/src/jsutils/objectExtend"
import dataStore from "@purtuga/common/src/jsutils/dataStore"
import {Ev} from "@purtuga/common/src/jsutils/Ev"
import { isArray, objectKeys } from "@purtuga/common/src/jsutils/runtime-aliases"
import {Symbol} from "@purtuga/common/src/jsutils/Symbol"

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

/**
 * Get the prop value from the possible HTML attributes (propName + aliases)
 *
 * @param ele
 * @param propDef
 * @returns {string}
 */
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
            isCssScopingDone: false,
            templateEle: null,
            ev: new Ev(),
            destroyCallbacks: [],
            destroyQueued: null,
            isMounted: false
        };

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
        const statePropsDef = state.propsDef = {};
        const componentPropsDef = ComponentClass.propsDef;

        // The props are stored internally (weakmap) once for the Component Class.
        // The internal definition has the "aliases" expanded as well.
        if (componentPropsDef) {
            objectKeys(componentPropsDef).forEach(propName => {
                statePropsDef[propName] = componentPropsDef[propName];
                // expand aliases as well
                if (isArray(statePropsDef[propName].aliases)) {
                    const propAliasDef = objectExtend({}, componentPropsDef[propName], { _isAlias: true });
                    statePropsDef[propName].aliases.forEach(
                        propNameAlias => !statePropsDef[propNameAlias] &&
                                        (statePropsDef[propNameAlias] = propAliasDef));
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
            templateEle: null,
            observedAttrs: null
        });
    }
    return PRIVATE.get(ComponentClass);
}


