"use strict";
const axios = require("axios");
//TODO: document needed
//axios default functions to export
module.exports = {
    get: axios.default.get,
    post: axios.default.post,
    put: axios.default.put,
    delete: axios.default.delete,
    head: axios.default.head,
    patch: axios.default.patch,
    all: axios.default.all
};
