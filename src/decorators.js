import objectExtend from "common-micro-libs/src/jsutils/objectExtend"
import { objectDefineProperty } from "common-micro-libs/src/jsutils/runtime-aliases"
import { getKebabCase, getPropsDefinition } from "./utils"

//===============================================================================
const RE_UPPER_CASE_LETTERS = /[A-Z]/;
const NOOP = val => val;

/**
 * Create a ComponentElement property.
 * The property has the following characteristics:
 *
 *  -   Values, when set, are automatically copied to the Instance state.props
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
    const getter = descriptor.get;
    const setter = descriptor.set;
    const propDef = objectExtend(getPropDef(Proto, prop, getter, setter), options);

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

function getPropDef(Proto, name, getter, setter) {
    const classProps = getClassProps(Proto);

    if (!classProps[name]) {
        classProps[name] = {
            name,
            attr: false,
            required: false,
            default: getter || NOOP,
            filter: setter || NOOP,
            aliases: [
                name.toLowerCase()
            ]
            // _isAlias: --- used in getPropsDefinition()
        };
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
function lazyProp(propName, getter, setter) {
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
