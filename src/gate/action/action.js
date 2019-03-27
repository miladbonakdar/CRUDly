'use strict';

const Route = require('../route');
const Request = require('../request');
const urlParser = require('../../utils/urlParser');
/**
 * @description Action class
 * @param action valid action config
 * @param baseRoute base action route
 */
class Action extends Route {
    constructor(action, baseRoute) {
        if (!action) throw new Error('Action config is not valid');
        if (baseRoute === undefined || baseRoute === null)
            throw new Error('Base route is not valid');
        if (action.url && !action.url.startsWith('/')) action.url = `/${action.url}`;
        super(`${baseRoute}${action.url ? action.url : ''}`);
        this.params = action.params || [];
        this.method = (action.type || 'get').toLowerCase();
        this.name = action.name;
        this.urlParams = [];
        this.extra = action;
        if (action.loadDefaultConfig != undefined && action.loadDefaultConfig != null) {
            this.loadDefaultConfig = action.loadDefaultConfig;
        } else this.loadDefaultConfig = true;

        if (this.method === 'get' || this.method === 'delete') urlParser.bind(this)();
    }
}
/**
 * @description merge the given config to the local config object
 * @param config action config for merge
 * @param overrideWithThis override the given config to the local config if there is a conflict
 */
Action.prototype.mergeConfig = function(config, overrideWithThis = false) {
    if (!config) throw new Error('the config object is invalid');
    if (!config instanceof Object) throw new Error('config must be an object');
    Object.keys(config).forEach(key => {
        if (overrideWithThis) this.extra[key] = config[key];
        else if (!this.extra[key]) this.extra[key] = config[key];
    });
};

/**
 * @description validate the given params to be fit in the action
 * @param params run function params
 */
Action.prototype.validateParams = function(...params) {
    if (this.method === 'post' || this.method === 'put' || this.method === 'patch') {
        if (params.length > 1) throw new Error('action params are not valid');
    } else if (this.params.length + this.urlParams.length !== params.length)
        throw new Error('action params are not valid. make sure you entered all of the params');
};

/**
 * @description validate the given params to be fit in the action
 * @param params run function params
 */
Action.prototype.createRequest = function() {
    return new Request(this);
};

/**
 * @description run action and call api
 * @param params api params
 */
Action.prototype.run = async function(...params) {
    //url params + params in get or delete action
    if (!params) params = [];
    this.validateParams(...params);
    const request = this.createRequest(...params);
    const res = await this.gate.requestGate(request, ...params);
    return res;
};

module.exports = Action;
