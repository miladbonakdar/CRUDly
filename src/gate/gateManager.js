const dateDifference = require('../utils/utils').dateDifference;
const Request = require('./request');

/**
 *FIXME: description and test
 */

class GateManager {
    constructor(maxObjectLifeTime = 0 /* in seconds. 0 means for ever */) {
        this.collection = [];
        this.maxObjectLifeTime = maxObjectLifeTime;
    }

    get isRequestPending() {
        this.pruneObjects();
        return this.collection.length != 0;
    }

    pruneObjects() {
        if (this.maxObjectLifeTime <= 0) return;
        const toBeDeletedObjectIds = [];
        for (const obj of this.collection) {
            if (
                !obj.startedOn ||
                !obj.id ||
                dateDifference(obj.startedOn) >= this.maxObjectLifeTime
            )
                toBeDeletedObjectIds.push(obj.id);
        }
        this.collection = this.collection.filter(item => !toBeDeletedObjectIds.some(item.id));
    }

    push(obj, objectPushed) {
        if (!obj instanceof Request) return null;
        this.collection.push(obj);
        objectPushed(obj, this.collection.length);
        return obj;
    }

    pop(obj, objectPoped) {
        const index = this.collection.findIndex(item => item.id == obj.id);
        if (index < 0) return;
        this.collection.splice(index, 1);
        objectPoped(obj, this.collection.length);
        return obj;
    }
}

module.exports = GateManager;
