'use strict';

const Route = require('./route');
const validator = require('../utils/dataValidator');
const Response = require('./response');
const cuid = require('cuid');

const Request = function(options) {
    if (!options) throw new Error('options to create request is not valid');
    Route.call(this, options.url);
    this.url = validator(options, 'url', 'the url should be specified');
    this.body = validator(options, 'body') || null;
    this.params = validator(options, 'params') || {};
    this.urlParams = validator(options, 'urlParams') || {};
    this.method = validator(options, 'method') || 'get';
    this.config = validator(options, 'config') || {};
    this.extra = validator(options, 'extra') || {};
    this.id = cuid();
    this.craetedOn = new Date();
    this.startedOn = null;
    this.responsedOn = null;
    this._isPending = false;
    this.response = null;
    this.axiosConfig = null;
};
Request.prototype = Object.create(Route.prototype);
Request.prototype.constructor = Request;

Object.defineProperty(Request.prototype, 'isPending', {
    get() {
        return this._isPending;
    }
});

Request.prototype.getUrl = function() {
    return this.url;
};

Request.prototype.getBody = function() {
    return this.body;
};

Request.prototype.getResponse = function() {
    return this.response;
};

Request.prototype.respondWith = function(response) {
    this._isPending = false;
    this.responsedOn = new Date();
    this.response = new Response(
        response.data,
        {
            url: this.getUrl(),
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
            config: response.config
        },
        this
    );
    return this.response;
};

Request.prototype.makeConfig = function(...params) {
    this.axiosConfig = {};
    this.axiosConfig.url = this.url;
    this.axiosConfig.method = this.method;
    if (this.method === 'get' || this.method === 'delete') {
        this.axiosConfig.url = this.parseUrl(this.url, ...params);
        this.axiosConfig.params = {};
        for (let i = this.urlParams.length; i < params.length; i++) {
            if (this.params[i - this.urlParams.length])
                this.axiosConfig.params[this.params[i - this.urlParams.length]] = params[i];
            else {
                throw new Error('there is no params for this argument');
            }
        }
    }
    if (this.method === 'post' || this.method === 'put' || this.method === 'patch')
        this.axiosConfig.data = params[0] || {};
    if (this.extra.auth) this.axiosConfig.auth = this.extra.auth;
    if (this.extra.responseType) this.axiosConfig.responseType = this.extra.responseType;
    if (this.extra.responseEncoding)
        this.axiosConfig.responseEncoding = this.extra.responseEncoding;
    if (this.extra.xsrfHeaderName) this.axiosConfig.xsrfHeaderName = this.extra.xsrfHeaderName;
    if (this.extra.maxContentLength)
        this.axiosConfig.maxContentLength = this.extra.maxContentLength;
    if (this.extra.maxRedirects) this.axiosConfig.maxRedirects = this.extra.maxRedirects;
    if (this.extra.xsrfCookieName) this.axiosConfig.xsrfCookieName = this.extra.xsrfCookieName;
    if (this.extra.headers) this.axiosConfig.headers = this.extra.headers;
    if (this.extra.timeout) this.axiosConfig.timeout = this.extra.timeout;
    if (this.extra.proxy) this.axiosConfig.proxy = this.extra.proxy;
    return this.axiosConfig;
};

/**
 * @description generate valid url from url template and fill the params
 * @param urlTemplate url template
 * @param params params to fill in the url
 */
Request.prototype.parseUrl = function(urlTemplate, ...params) {
    for (let i = 0; i < this.urlParams.length; i++)
        urlTemplate = urlTemplate.replace(this.urlParams[i], params[i]);
    return urlTemplate;
};

/***
 * @description this function will call when the request is going to send
 * @return request config
 */
Request.prototype.trigger = function(...params) {
    this._isPending = true;
    this.startedOn = this.startedOn || new Date();
    return this.axiosConfig || this.makeConfig(...params);
};

/***
 * @description change propery of the request object
 * @param propertyName property name
 * @param value propery value
 */
Request.prototype.setProperty = function(propertyName, value) {
    if(this.hasOwnProperty(propertyName)){
        this[propertyName] = value;
        return;
    }
    this.extra[propertyName] = value;
};

module.exports = Request;
