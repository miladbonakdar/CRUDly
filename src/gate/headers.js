/**
 * HTTP Headers.
 */

const { each, trim, toLower } = require('../utils/utils');
class Headers {
    constructor(headers) {
        this.map = {};

        each(headers, (value, name) => this.append(name, value));
    }

    has(name) {
        return getName(this.map, name) !== null;
    }

    get(name) {
        var list = this.map[getName(this.map, name)];

        return list ? list.join() : null;
    }

    getAll(name) {
        return this.map[getName(this.map, name)] || [];
    }

    set(name, value) {
        this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
    }

    append(name, value) {
        var list = this.map[getName(this.map, name)];

        if (list) {
            list.push(trim(value));
        } else {
            this.set(name, value);
        }
    }

    delete(name) {
        delete this.map[getName(this.map, name)];
    }

    deleteAll() {
        this.map = {};
    }

    forEach(callback, thisArg) {
        each(this.map, (list, name) => {
            each(list, value => callback.call(thisArg, value, name, this));
        });
    }
}

function getName(map, name) {
    return Object.keys(map).reduce((prev, curr) => {
        return toLower(name) === toLower(curr) ? curr : prev;
    }, null);
}

function normalizeName(name) {
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }

    return trim(name);
}

module.exports = Headers;
