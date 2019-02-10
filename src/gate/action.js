"use strict";

const Route = require("./route");
const request = require("./request");

const urlParamsGenerator = function() {
    let param = null;
    for (let i = 0; i < this.url.length; i++) {
        if (
            param &&
            (this.url[i] === "/" || this.url[i] === "\\" || this.url[i] === ":")
        ) {
            this.params.push(param);
            param = null;
            continue;
        }
        if (param) {
            param += this.url[i];
            continue;
        }
        if (this.url[i] === ":") param = ":";
    }
    if (param) this.params.push(param);
};

class Action extends Route {
    constructor(action, baseRoute) {
        if (!action) throw new Error("Action config is not valid");
        if (!baseRoute)
            throw new Error("Base route config is not valid in action");
        super(`${baseRoute}/${action.name}`);
        this.params = action.params || [];
        this.method = (action.type || "get").toLowerCase();
        this.name = action.name;
        this.urlParams = [];
        this.extra = action;
        this.loadDefaultConfig = action.loadDefaultConfig || true;
        if (this.method === "get" || this.method === "delete")
            urlParamsGenerator.bind(this)();
    }
}

Action.prototype.parseUrl = (url, ...args) => {
    for (let i = 0; i < this.urlParams.length; i++)
        url = url.replace(this.urlParams[i], args[i]);
    return url;
};

Action.prototype.mergeConfig = (config, overrideWithThis = false) => {
    if (config.__proto__ != Object.prototype)
        throw new Error("config must be an object");
    Object.keys(config).forEach(key => {
        if (overrideWithThis) this[key] = config[key];
        else if (!this[key]) this[key] == config[key];
    });
};

Action.prototype.validateParams = (...args) => {
    if (
        args.length > 1 &&
        (this.method === "post" ||
            this.method === "put" ||
            this.method === "patch")
    )
        throw new Error("action params are not valid");
    if (this.params.length + this.urlParams.length !== args.length)
        throw new Error(
            "action params are not valid. make sure you entered all of the params"
        );
};

Action.prototype.getAxiosConfig = (...args) => {
    const config = {};
    config.url = this.url;
    config.method = this.method;
    if (this.method === "get" || this.method === "delete") {
        config.url = this.parseUrl(this.url, ...args);
        config.params = {};
        for (let i = this.urlParams.length; i < args.length; i++)
            config.params[this.params[i - this.urlParams.length]] = args[i];
    }
    if (
        this.method === "post" ||
        this.method === "put" ||
        this.method === "patch"
    )
        config.data = args[0] || {};
    if (this.extra.auth) config.auth = this.extra.auth;
    if (this.extra.responseType) config.responseType = this.extra.responseType;
    if (this.extra.responseEncoding)
        config.responseEncoding = this.extra.responseEncoding;
    if (this.extra.xsrfHeaderName)
        config.xsrfHeaderName = this.extra.xsrfHeaderName;
    if (this.extra.maxContentLength)
        config.maxContentLength = this.extra.maxContentLength;
    if (this.extra.maxRedirects) config.maxRedirects = this.extra.maxRedirects;
    if (this.extra.xsrfCookieName)
        config.xsrfCookieName = this.extra.xsrfCookieName;
    if (this.extra.headers) config.headers = this.extra.headers;
    if (this.extra.timeout) config.timeout = this.extra.timeout;
    return config;
};

Action.prototype.run = async (...args) => {
    //url params + params in get or delete action
    if (!args) args = [];
    this.validateParams(...args);
    return await request(this.getAxiosConfig(...args));
};

module.exports = Action;
