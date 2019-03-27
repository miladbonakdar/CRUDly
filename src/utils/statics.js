'use strict';

const statics = {
    actionTypes: ['get', 'put', 'post', 'delete', 'patch', 'head'],
    actionTypeMaps: {
        get: 'get',
        put: 'update',
        post: 'create',
        delete: 'delete',
        patch: 'patch',
        head: 'head'
    }
};

module.exports = statics;
