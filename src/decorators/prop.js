import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import { objectDefineProperty } from "common-micro-libs/src/jsutils/runtime-aliases"
import { getKebabCase, getPropsDefinition, elementHasAttributeForProp } from "../utils"

//===============================================================================
const RE_UPPER_CASE_LETTERS = /[A-Z]/;
const NOOP = val => val;

/**
 * Create a ComponentElement property.
 *
 * @param {Object} [options]
 * @param {Object} [Proto]
 * @param {String} [prop]
 * @param {Object} [descriptor]
 *
 * @returns {Function}
 */
export function prop(...args) {
    // Called with options? Return Design function
    if (args.length < 2) {
        return setupProp.bind(null, args[0]);
    }
    return setupProp(null, ...args);
}


function setupProp(options, Proto, prop, descriptor) {
    let getter = descriptor.get;
    let setter = descriptor.set;
    let propDef;

    // If prop is defined as `boolean` then ensure that the value stored is
    // always a boolean based upon whether the prop is on the element or not
    // In this case, defined getter/setter is ignored/discarded
    // TODO: is there a use case where calling the real getter/setter is valid?
    if (options && options.boolean) {
        options.attr = true;

        getter = descriptor.get = function () {
            return elementHasAttributeForProp(this, propDef);
        };

        setter = descriptor.set = function (value) {
            // When setting the value of this attribute directly on the instance (or instance.props),
            // ensure that element attribute is also adjusted to reflect value.
            // Do this only if the `value` is boolean - because when an attribute is added to the
            // element, its value should be empty string.
            if ("boolean" === typeof value) {
                if (value && !elementHasAttributeForProp(this, propDef)) {
                    this.setAttribute(prop, "");
                }
                else if (!value && elementHasAttributeForProp(this, propDef)) {
                    this.removeAttribute(prop);
                }
            }
            return elementHasAttributeForProp(this, propDef);
        };
    }

    propDef = objectExtend(getPropDef(Proto, prop, getter, setter), options);
    descriptor.get = descriptor.set = lazyProp(prop, getter, setter);

    // Create a instance property for each alias as well
    if (propDef.aliases.length) {
        propDef.aliases.forEach(propAliasName => {
            if (!(propAliasName in Proto)) {
                const aliasPropGetterSetterSetup = lazyProp(propAliasName, getter, setter);
                objectDefineProperty(Proto, propAliasName, {
                    configurable: true,
                    get: aliasPropGetterSetterSetup,
                    set: aliasPropGetterSetterSetup
                });
            }
        })
    }
    return descriptor;
}


function getClassProps(Proto) {
    if (!Proto.constructor.propsDef) {
        objectDefineProperty(Proto.constructor, "propsDef", { configurable: true, writable: true, value: {} })
    }
    return Proto.constructor.propsDef;
}

/**
 * Returns the PropDefinition
 *
 * @private
 *
 * @param Proto
 * @param name
 * @param getter
 * @param setter
 * @returns ComponentElement~PropDefinition
 */
function getPropDef(Proto, name, getter, setter) {
    const classProps = getClassProps(Proto);

    if (!classProps[name]) {
        /**
         * A Class prop definition
         *
         * @typedef {Object} ComponentElement~PropDefinition
         * @property {String} name              Then name of the prop
         * @property {Boolean} attr             Can the prop be set via an HTML attribute
         * @property {Boolean} required         Is the prop required
         * @property {Boolean} boolean          Is the prop value mean to be a boolean (note: also forces `attr` to true)
         * @property {Function} default         Function that returns default value (the `getter` when decorator is used)
         * @property {Function} filter          Function that filters the value being set (the `setter` when decorator is used)
         * @property {Array<String>} aliases    An array of aliases for the prop
         */
        classProps[name] = {
            name,
            attr: false,
            required: false,
            boolean: false,
            default: getter || NOOP,
            filter: setter || NOOP,
            aliases: [
                name.toLowerCase()
            ]
            // _isAlias: --- used in getPropsDefinition()
        };

        // If the prop name has upper case letters, then its possible that it is
        // defined as camelCase - create ka-bab alias.
        if (RE_UPPER_CASE_LETTERS.test(name)) {
            classProps[name].aliases.push(getKebabCase(name));
        }
    }

    return classProps[name];
}

/**
 * Return a getter/setter function to be used in a Property descriptor. When invoked first time as
 * part of an instance, it will setup the actually get/set function that will persist Props to the
 * instance `instance.props`
 *
 * @private
 *
 * @param propName
 * @param getter
 * @param setter
 *
 * @returns {Function}
 */
function lazyProp(propName/*, getter, setter*/) { // FIXME: getter/setter not being used?
    const $propName = `_$${ propName }`;

    return function lazyGetterSetter() {
        const isUpdateMode = arguments.length === 1;

        if (Object.getOwnPropertyNames(this).indexOf($propName) !== -1) {
            return isUpdateMode ? (this[$propName] = arguments[0]) : this[$propName];
        }

        // Ensure we write back to
        const writeToPropName = getPropsDefinition(this.constructor)[propName].name;

        objectDefineProperty(this, $propName, {
            configurable: true,
            get() {
                return this.props[writeToPropName];
            },
            set(newValue) {
                return this.props[writeToPropName] = newValue;
            }
        });

        // update mode
        if (isUpdateMode) {
            return this[$propName] = arguments[0];
        }

        return this[$propName];
    };
}
