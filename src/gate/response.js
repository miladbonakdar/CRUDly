'use strict';

const Headers = require('./headers');
const cuid = require('cuid');
const { isString, isBlob, when } = require('../utils/utils');

const Response = function(body, { url, headers, status, statusText, config }, request) {
    this.url = url;
    this.ok = status >= 200 && status < 300;
    this.status = status || 0;
    this.statusText = statusText || '';
    this.headers = new Headers(headers);
    this.body = body;
    this.id = cuid();
    this.request = request;
    this.config = config;

    if (isString(body)) {
        this.bodyText = body;
    } else if (isBlob(body)) {
        this.bodyBlob = body;
        if (isBlobText(body)) {
            this.bodyText = blobText(body);
        }
    }
};

Response.prototype.blob = function() {
    return when(this.bodyBlob);
};

Response.prototype.text = function() {
    return when(this.bodyText);
};

Response.prototype.json = function() {
    return when(this.text(), text => JSON.parse(text));
};

Object.defineProperty(Response.prototype, 'data', {
    get() {
        return this.body;
    },

    set(body) {
        this.body = body;
    }
});

const blobText = function(body) {
    return new Promise(resolve => {
        var reader = new FileReader();

        reader.readAsText(body);
        reader.onload = () => {
            resolve(reader.result);
        };
    });
};

const isBlobText = function(body) {
    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
};

module.exports = Response;
