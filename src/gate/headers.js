const { each, trim, toLower } = require('../utils/utils');

const Headers = function(headers) {
    this.map = {};
    each(headers, (value, name) => this.append(name, value));
};

Headers.prototype.has = function(name) {
    return getName(this.map, name) !== null;
};

Headers.prototype.get = function(name) {
    var list = this.map[getName(this.map, name)];

    return list ? list.join() : null;
};

Headers.prototype.getAll = function(name) {
    return this.map[getName(this.map, name)] || [];
};

Headers.prototype.set = function(name, value) {
    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
};

Headers.prototype.append = function(name, value) {
    var list = this.map[getName(this.map, name)];

    if (list) {
        list.push(trim(value));
    } else {
        this.set(name, value);
    }
};

Headers.prototype.delete = function(name) {
    delete this.map[getName(this.map, name)];
};

Headers.prototype.deleteAll = function() {
    this.map = {};
};

Headers.prototype.forEach = function(callback, thisArg) {
    each(this.map, (list, name) => {
        each(list, value => callback.call(thisArg, value, name, this));
    });
};

const getName = function(map, name) {
    return Object.keys(map).reduce((prev, curr) => {
        return toLower(name) === toLower(curr) ? curr : prev;
    }, null);
};

const normalizeName = function(name) {
    if (/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }

    return trim(name);
};

module.exports = Headers;
