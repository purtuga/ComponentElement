import { getInstanceState } from "./utils"
import objectExtend from "common-micro-libs/src/jsutils/objectExtend"


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
    objectExtend(getPropDef(Proto, prop), options);
    descriptor.get = descriptor.set = lazyProp(prop, descriptor.get, descriptor.set);
    return descriptor;
}


function getClassProps(Proto) {
    if (!Proto.constructor.__props) {
        Object.defineProperty(Proto.constructor, "__props", { configurable: true, value: {} })
    }
    return Proto.constructor.__props;
}

function getPropDef(Proto, name) {
    const classProps = getClassProps(Proto);

    if (!classProps[name]) {
        classProps[name] = {
            name,
            attr: false
        };
    }

    return classProps[name];
}

/**
 * Return a getter/setter function to be used in a Property descriptor. When invoked first time as
 * part of an instance, it will setup the actually get/set function that will persist Props to the
 * instance `state.props`
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
    return function lazyGetterSetter() {
        Object.defineProperty(this, propName, {
            configurable: true,
            get() {
                return getInstanceState(this).props[propName];
            },
            set(newValue) {
                if (setter) {
                    newValue = setter.call(this, newValue);
                }
                return getInstanceState(this).props[propName] = newValue;
            }
        });

        getInstanceState(this).props[propName] = getter();

        // update mode
        if (arguments.length === 1) {
            return this[propName];
        }

        return this[propName];
    };
}
