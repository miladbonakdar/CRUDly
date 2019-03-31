'use strict';

/**
 * @description validate object and fill the given key property
 * @param data data to check
 * @param dataPropertyKey the key of the object to check
 * @param exception throw exception if key is not defaind in the object
 */
const validator = (data, dataPropertyKey, exception = null) => {
    if (exception) {
        if (!data) throw new Error(exception);
        if (!data[dataPropertyKey] || data[dataPropertyKey].length == 0)
            throw new Error(`${exception} -- ${dataPropertyKey} is required.`);
    } else {
        if (!data) return null;
        if ((data[dataPropertyKey] === undefined, data[dataPropertyKey] === null)) return null;
    }
    return data[dataPropertyKey];
};

module.exports = validator;
