'use strict';

const dateDifference = require('../utils/utils').dateDifference;
const Request = require('./request');

/**
 * @description gate manager constructor
 * @param maxObjectLifeTime objects life time in seconds
 */
const GateManager = function(maxObjectLifeTime = 0 /* in seconds. 0 means for ever */) {
    this.collection = [];
    this.maxObjectLifeTime = maxObjectLifeTime;
};

Object.defineProperty(GateManager.prototype, 'isRequestPending', {
    get() {
        this.pruneObjects();
        return this.collection.length != 0;
    }
});

/**
 * @description prune old objects.
 */
GateManager.prototype.pruneObjects = function() {
    if (this.maxObjectLifeTime <= 0) return;
    const toBeDeletedObjectIds = [];
    for (const obj of this.collection) {
        if (!obj.startedOn || !obj.id || dateDifference(obj.startedOn) >= this.maxObjectLifeTime)
            toBeDeletedObjectIds.push(obj.id);
    }
    this.collection = this.collection.filter(
        item => !toBeDeletedObjectIds.some(d => d == item.id)
    );
};

/**
 * @description add new object to the array
 * @param obj object to add
 * @param objectPushed object pushed callback function
 */
GateManager.prototype.push = function(obj, objectPushed) {
    if (!obj instanceof Request) return null;
    this.collection.push(obj);
    if (typeof objectPushed == 'function') objectPushed(obj, this.collection.length);
    return obj;
};

/**
 * @description remove object from the array
 * @param obj object to remove
 * @param objectPopped object poped callback function
 */
GateManager.prototype.pop = function(obj, objectPopped) {
    const index = this.collection.findIndex(item => item.id == obj.id);
    if (index < 0) return;
    this.collection.splice(index, 1);
    if (typeof objectPopped == 'function') objectPopped(obj, this.collection.length);
    return obj.response || obj;
};

module.exports = GateManager;
