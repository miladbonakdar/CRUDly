/**
 *FIXME: description and test
 */
const Headers = require('./headers');
const cuid = require('cuid');
const { isString, isBlob } = require('../utils/utils');

class Response {
    constructor(body, { url, headers, status, statusText, config }) {
        this.url = url;
        this.ok = status >= 200 && status < 300;
        this.status = status || 0;
        this.statusText = statusText || '';
        this.headers = new Headers(headers);
        this.body = body;
        this.id = cuid();
        this.config = config;

        if (isString(body)) {
            this.bodyText = body;
        } else if (isBlob(body)) {
            this.bodyBlob = body;
            if (isBlobText(body)) {
                this.bodyText = blobText(body);
            }
        }
    }

    blob() {
        return when(this.bodyBlob);
    }

    text() {
        return when(this.bodyText);
    }

    json() {
        return when(this.text(), text => JSON.parse(text));
    }
}

Object.defineProperty(Response.prototype, 'data', {
    get() {
        return this.body;
    },

    set(body) {
        this.body = body;
    }
});

function blobText(body) {
    return new Promise(resolve => {
        var reader = new FileReader();

        reader.readAsText(body);
        reader.onload = () => {
            resolve(reader.result);
        };
    });
}

function isBlobText(body) {
    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
}

module.exports = Response;
