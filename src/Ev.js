const STATE = Symbol("state");

/**
 * Supper tiny Eventemmiter
 */
export class Ev {
    on(evName, callback) {
        getStoreFor(this, evName).add(callback);
        return () => getStoreFor(this, evName).delete(callback);
    }
    emit(evName, data) {
        getStoreFor(this, evName).forEach(callback => callback(data));
    }
    clear() {
        getStoreFor(this).clear();
    }
}

/**
 * @return {Set}
 */
function getStoreFor(inst, evName) {
    if (!inst[STATE]) {
        inst[STATE] = new Map();
    }
    if (!evName) {
        return inst[STATE];
    }
    if (!inst[STATE].has(evName)) {
        inst[STATE].set(evName, new Set());
    }
    return inst[STATE].get(evName);
}