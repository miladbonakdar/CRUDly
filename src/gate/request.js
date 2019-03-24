const Route = require('./route');
const validator = require('../utils/dataValidator');

class Request extends Route {
    constructor(options) {
        this.body = validator(options, 'body') || null;
        this.params = validator(options, 'params') || {};
        this.method = validator(options, 'method') || 'get';
        this.config = validator(options, 'config') || {};
    }

    getUrl() {
        return this.url;
    }

    getBody() {
        return this.body;
    }

    respondWith(body, options) {
        //FIXME: here is missing
        return new Response(body);
    }
}

module.exports = Request;
