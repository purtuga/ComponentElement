import dataStore from "common-micro-libs/src/jsutils/dataStore"

//============================================================================
export const PRIVATE = dataStore.create();

export function getInstanceState(instance) {
    if (!PRIVATE.has(instance)) {
        PRIVATE.set(instance, {
            ready: false,
            props: {},
            content: null,
            destroyCallbacks: [],
            destroyQueued: null
        });
    }
    return PRIVATE.get(instance);
}