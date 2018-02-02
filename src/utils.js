import dataStore from "common-micro-libs/src/jsutils/dataStore"
import { ObservableObject } from "observable-data"

//============================================================================
export const PRIVATE = dataStore.create();

export function getState(instance) {
    if (!PRIVATE.has(instance)) {
        let state = {
            ready: false,           // We have all required params
            props: instance.props,
            content: null,
            destroyCallbacks: [],
            destroyQueued: null,
            binder: null,
            isMounted: false
        };

        // Create all props
        const propDefintions    = instance.constructor.__props;
        const required          = Object.keys(propDefintions).filter(propName => propDefintions[propName].required);

        state = new ObservableObject(state);
        ObservableObject.createComputed(state, "ready", function () {
            return !required.length || required.every(propName => !!instance[propName] && !!state.props[propName]);
        });

        PRIVATE.set(instance, state);
    }
    return PRIVATE.get(instance);
}