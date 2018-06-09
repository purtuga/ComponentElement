import {objectDefineProperty} from "common-micro-libs/src/jsutils/runtime-aliases";

/**
 * Binds the given attributes to the Class instance on first `get`.
 *
 * @return {Function|Object}
 */
export function bind(Proto, prop, descriptor) {
    if (Proto && prop && descriptor && "function" === typeof descriptor.value) {
        const propFn = descriptor.value;
        const writable = descriptor.writable;
        delete descriptor.value;
        delete descriptor.writable;

        descriptor.get = function () {
            // FIXME: this normally fails in IE... need to fix (similar to fix done in lazyProp below)
            const fn = propFn.bind(this);
            objectDefineProperty(this, prop, {
                configurable: descriptor.configurable,
                enumerable: descriptor.enumerable,
                writable: writable,
                value: fn
            });
            return fn;
        };
        return descriptor;
    }
    return bind; // for when its used with no params: `bind()`
}
