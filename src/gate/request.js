const Route = require('./route');
const validator = require('../utils/dataValidator');
const Response = require('./response');
const cuid = require('cuid');

/**
 *FIXME: description and test
 */
class Request extends Route {
    constructor(options) {
        this.body = validator(options, 'body') || null;
        this.params = validator(options, 'params') || {};
        this.urlParams = validator(options, 'params') || {};
        this.method = validator(options, 'method') || 'get';
        this.config = validator(options, 'config') || {};
        this.id = cuid();
        this.url = validator(options, 'url', 'the url should be specified');
        this.craetedOn = new Date();
        this.startedOn = null;
        this.responsedOn = null;
        this._isPending = false;
        this.response = null;
        this.axiosConfig = null;
    }

    get isPending() {
        return this._isPending;
    }

    getUrl() {
        return this.url;
    }

    getBody() {
        return this.body;
    }

    getResponse() {
        return this.response;
    }

    respondWith(response) {
        this._isPending = false;
        this.responsedOn = new Date();
        this.response = new Response(response.data, {
            url: this.getUrl(),
            headers: response.headers,
            status: response.status,
            statusText: response.statusText,
            config: response.config
        });
        return this.response;
    }

    makeConfig() {
        //FIXME: here is missing
        this.axiosConfig = {};
        return this.axiosConfig;
    }

    /***
     * @description this function will call when the request is going to send
     * @return request config
     */
    trigger() {
        this._isPending = true;
        this.startedOn = this.startedOn || new Date();
        return this.axiosConfig || this.makeConfig();
    }
}

module.exports = Request;
