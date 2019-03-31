const { hasOwnProperty } = {},
    { slice } = [];

const dateDifference = function(dateFrom, dateTo, type = 's') {
    dateTo = dateTo ? dateTo : new Date();
    type = type.toLowerCase();
    switch (type) {
    case 'ms':
        return dateTo.getTime() - dateFrom.getTime();
    case 's':
        return (dateTo.getTime() - dateFrom.getTime()) / 1000;
    case 'm':
        return (dateTo.getTime() - dateFrom.getTime()) / 60000;
    case 'h':
        return (dateTo.getTime() - dateFrom.getTime()) / 3600000;
    }
};
const error = function(msg) {
    if (typeof console !== 'undefined') {
        console.error(msg);
    }
};
const trim = function(str) {
    return str ? str.replace(/^\s*|\s*$/g, '') : '';
};
const trimEnd = function(str, chars) {
    if (str && chars === undefined) {
        return str.replace(/\s+$/, '');
    }

    if (!str || !chars) {
        return str;
    }

    return str.replace(new RegExp(`[${chars}]+$`), '');
};
const toLower = function(str) {
    return str ? str.toLowerCase() : '';
};
const toUpper = function(str) {
    return str ? str.toUpperCase() : '';
};
const isString = function(val) {
    return typeof val === 'string';
};
const isBoolean = function(val) {
    return val === true || val === false;
};
const isFunction = function(val) {
    return typeof val === 'function';
};
const isObject = function(obj) {
    return obj !== null && typeof obj === 'object';
};
const isPlainObject = function(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
};
const isBlob = function(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
};
const isFormData = function(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
};
const when = function(value, fulfilled, rejected) {
    var promise = Promise.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
};
const each = function(obj, iterator) {
    var i, key;

    if (Array.isArray(obj)) {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (Object(obj)) {
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
};

const utils = {
    dateDifference,
    inBrowser: typeof window !== 'undefined',
    error,
    trim,
    trimEnd,
    toLower,
    toUpper,
    isString,
    hasOwnProperty,
    slice,
    isBoolean,
    isFunction,
    isObject,
    isPlainObject,
    isBlob,
    isFormData,
    when,
    each
};

module.exports = utils;
