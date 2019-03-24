'use strict';
const axios = require('axios');
//axios default functions to export
module.exports = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
    head: axios.head,
    patch: axios.patch,
    all: axios.all
};
