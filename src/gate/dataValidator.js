"use strict";
//TODO: document needed
module.exports = (data, datapropertyKey, exception = null) => {
    if (exception) {
        if (!data) throw new Error(exception);
        if (!data[datapropertyKey] || data[datapropertyKey].length == 0)
            throw new Error(`${exception} -- ${datapropertyKey} is required.`);
    } else {
        if (!data) return null;
        if (
            (data[datapropertyKey] === undefined,
            data[datapropertyKey] === null)
        )
            return null;
    }
    return data[datapropertyKey];
};
