import dataStore        from "common-micro-libs/src/jsutils/dataStore"
import ObservableObject from "observable-data/src/ObservableObject"

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
        const propDefintions    = instance.constructor.__props || {};
        const required          = Object.keys(propDefintions).filter(propName => propDefintions[propName].required);

        ObservableObject.createComputed(state, "ready", function () {
            // the `instance[propName]` forces the property to be created on the HTML element's instance
            return !required.length || required.every(propName => !!instance[propName] && !!state.props[propName]);
        });

        PRIVATE.set(instance, state);
    }
    return PRIVATE.get(instance);
}