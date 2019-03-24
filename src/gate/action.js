'use strict';

const Route = require('./route');
const request = require('./request');
const urlParamsGenerator = require('./urlParamsGenerator');
/**
 * @description Action class
 * @param action valid action config
 * @param baseRoute base action route
 */
class Action extends Route {
    constructor(action, baseRoute) {
        if (!action) throw new Error('Action config is not valid');
        if (baseRoute === undefined || baseRoute === null) throw new Error('Base route is not valid');
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

        if (this.method === 'get' || this.method === 'delete') urlParamsGenerator.bind(this)();
    }
}
/**
 * @description generate valid url from url template and fill the params
 * @param urlTemplate url template
 * @param params params to fill in the url
 */
Action.prototype.parseUrl = function(urlTemplate, ...params) {
    for (let i = 0; i < this.urlParams.length; i++) urlTemplate = urlTemplate.replace(this.urlParams[i], params[i]);
    return urlTemplate;
};
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
 * @description generate valid axios config for calling api
 * @param params run function params
 */
Action.prototype.getAxiosConfig = function(...params) {
    const config = {};
    config.url = this.url;
    config.method = this.method;
    if (this.method === 'get' || this.method === 'delete') {
        config.url = this.parseUrl(this.url, ...params);
        config.params = {};
        for (let i = this.urlParams.length; i < params.length; i++) {
            if (this.params[i - this.urlParams.length])
                config.params[this.params[i - this.urlParams.length]] = params[i];
            else {
                throw new Error('there is no params for this argument');
            }
        }
    }
    if (this.method === 'post' || this.method === 'put' || this.method === 'patch') config.data = params[0] || {};
    if (this.extra.auth) config.auth = this.extra.auth;
    if (this.extra.responseType) config.responseType = this.extra.responseType;
    if (this.extra.responseEncoding) config.responseEncoding = this.extra.responseEncoding;
    if (this.extra.xsrfHeaderName) config.xsrfHeaderName = this.extra.xsrfHeaderName;
    if (this.extra.maxContentLength) config.maxContentLength = this.extra.maxContentLength;
    if (this.extra.maxRedirects) config.maxRedirects = this.extra.maxRedirects;
    if (this.extra.xsrfCookieName) config.xsrfCookieName = this.extra.xsrfCookieName;
    if (this.extra.headers) config.headers = this.extra.headers;
    if (this.extra.timeout) config.timeout = this.extra.timeout;
    return config;
};
/**
 * @description run action and call api
 * @param params api params
 */
Action.prototype.run = async function(...params) {
    //url params + params in get or delete action
    if (!params) params = [];
    this.validateParams(...params);
    const config = this.getAxiosConfig(...params);
    const res = await request(config);
    return res;
};

module.exports = Action;
