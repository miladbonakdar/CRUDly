var { hasOwnProperty } = {},
    { slice } = [];
module.exports = {
    dateDifference(dateFrom, dateTo = Date(), type = 's') {
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
    },
    inBrowser: typeof window !== 'undefined',
    error(msg) {
        if (typeof console !== 'undefined') {
            console.error(msg);
        }
    },
    trim(str) {
        return str ? str.replace(/^\s*|\s*$/g, '') : '';
    },
    trimEnd(str, chars) {
        if (str && chars === undefined) {
            return str.replace(/\s+$/, '');
        }

        if (!str || !chars) {
            return str;
        }

        return str.replace(new RegExp(`[${chars}]+$`), '');
    },
    toLower(str) {
        return str ? str.toLowerCase() : '';
    },
    toUpper(str) {
        return str ? str.toUpperCase() : '';
    },
    isString(val) {
        return typeof val === 'string';
    },
    hasOwnProperty,
    slice,
    isBoolean(val) {
        return val === true || val === false;
    },
    isFunction(val) {
        return typeof val === 'function';
    },
    isObject(obj) {
        return obj !== null && typeof obj === 'object';
    },
    isPlainObject(obj) {
        return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
    },
    isBlob(obj) {
        return typeof Blob !== 'undefined' && obj instanceof Blob;
    },
    isFormData(obj) {
        return typeof FormData !== 'undefined' && obj instanceof FormData;
    },
    when(value, fulfilled, rejected) {
        var promise = Promise.resolve(value);

        if (arguments.length < 2) {
            return promise;
        }

        return promise.then(fulfilled, rejected);
    },
    each(obj, iterator) {
        var i, key;

        if (isArray(obj)) {
            for (i = 0; i < obj.length; i++) {
                iterator.call(obj[i], obj[i], i);
            }
        } else if (isObject(obj)) {
            for (key in obj) {
                if (hasOwnProperty.call(obj, key)) {
                    iterator.call(obj[key], obj[key], key);
                }
            }
        }

        return obj;
    }
};
