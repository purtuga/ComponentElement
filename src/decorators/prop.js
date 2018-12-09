import objectExtend from "@purtuga/common/src/jsutils/objectExtend"
import {defineProperty, removeAttribute, setAttribute } from "@purtuga/common/src/jsutils/runtime-aliases"
import {throwIfThisIsPrototype} from "@purtuga/common/src/jsutils/throwIfThisIsPrototype"
import {getKebabCase, elementHasAttributeForProp} from "../utils"

//===============================================================================
const RE_UPPER_CASE_LETTERS = /[A-Z]/;
const NOOP = val => val;

/**
 * Create a ComponentElement property.
 *
 * @param {Object|ComponentElement~PropDefinition} [options|Descriptor]
 *
 * @returns {Function|Descriptor}
 */
export function prop(options = {}) {
    if (options.key && options.kind) {
        return _propDecorator({}, options);
    }
    return _propDecorator.bind(null, options);
}

function _propDecorator(options, {key, initializer, descriptor}) {
    const propDefinition = getPropSetup(
        key,
        initializer || descriptor.get,
        descriptor.set,
        options
    );
    const newDescriptor = getDecoratorDescriptor(key, key, propDefinition);

    // Setup the aliases to proxy the values to the same `key`
    if (propDefinition.aliases) {
        newDescriptor.extras = propDefinition
            .aliases
            .filter(aliasName => aliasName !== key) // Skip the Key name, which is also in the list of aliases
            .map(aliasName => getDecoratorDescriptor(aliasName, key));
    }

    return newDescriptor;

    //--------------------------------------------------------------------
    // typical Descriptor, for something done like:
    //          @prop myTest = "value here"
    //  {
    //     "kind": "field",
    //     "key": "myTest",
    //     "placement": "field",
    //     "initializer": function(){ return "value here"; },
    //     "descriptor": {
    //         "configurable": true,
    //         "writable": true,
    //         "enumerable": true
    //     }
    // }
    //--------------------------------------------------------------------
}

function getDecoratorDescriptor(key, proxyToPropName, componentPropDefinition) {
    const DecoratorDescriptor = {
        key,
        kind: "method",
        placement: "prototype",
        descriptor: {
            configurable: true,
            get() {
                throwIfThisIsPrototype(this);
                return this.props[proxyToPropName];
            },
            set(newValue) {
                throwIfThisIsPrototype(this);
                return this.props[proxyToPropName] = newValue;
            }
        }
    };

    if (componentPropDefinition) {
        DecoratorDescriptor.finisher = function (Klass) {
            // Create Class "propsDef" that inherits from super class
            if (!Klass.hasOwnProperty("propsDef")) {
                defineProperty(
                    Klass,
                    "propsDef",
                    objectExtend(Object.create(null), Klass.propsDef)
                );
            }
            Klass.propsDef[key] = componentPropDefinition;
        };
    }

    return DecoratorDescriptor;
}


/**
 * A property definition
 *
 * @private
 *
 * @param name
 * @param {Function} initializer
 * @param {Function} validator
 * @param {Object} propDef
 *
 * @returns {ComponentElement~PropDefinition}
 */
function getPropSetup(name, initializer, validator, propDef) {
    /**
     * A Class prop definition
     *
     * @typedef {Object} ComponentElement~PropDefinition
     * @property {String} name              Then name of the prop
     * @property {Boolean} attr             Can the prop be set via an HTML attribute
     * @property {Boolean} required         Is the prop required
     * @property {Boolean} boolean          Is the prop value meant to be a boolean (note: also forces `attr` to true)
     * @property {Function} default         Function that returns default value (the `getter` when decorator is used)
     * @property {Function} filter          Function that filters the value being set (the `setter` when decorator is used)
     * @property {Array<String>} aliases    An array of aliases for the prop, including the prop name itself
     */
    const propertyDefinition = objectExtend(
        {
            name,
            attr: false,
            required: false,
            boolean: false,
            default: initializer || NOOP,
            filter: validator || NOOP,
            aliases: [ name ]
            // _isAlias: --- used in getPropsDefinition()
        },
        propDef
    );

    // If this is a boolean, then force `attr` to `true`, and
    // redefine default adn filter values
    if (propertyDefinition.boolean) {
        propertyDefinition.attr = true;
        propertyDefinition.default = propertyDefinition.filter = function (newValue) {
            const realHtmlPropValue = elementHasAttributeForProp(this, propertyDefinition);

            // If called with a Boolean, then it must have been set via a instance prop,
            // and thus its value takes precedence over HTML property. In this case, we
            // reflect the value to the HTML prop - because in most cases, styles are
            // driven boolean attributes
            if ("boolean" === typeof newValue) {
                if (realHtmlPropValue !== newValue) {
                    if (newValue) {
                        setAttribute(this, name, newValue);
                    } else {
                        removeAttribute(this, name);
                    }
                }
                return newValue;
            }

            return realHtmlPropValue;
        }
    }

    // Add name lowercase alias - if applicable
    if (name.toLowerCase() !== name) {
        propertyDefinition.aliases.push(name.toLowerCase());
    }

    // If the prop name has upper case letters, then its possible that it is
    // defined as camelCase - create ka-bab alias.
    if (RE_UPPER_CASE_LETTERS.test(name)) {
        propertyDefinition.aliases.push(getKebabCase(name));
    }

    return propertyDefinition;
}
