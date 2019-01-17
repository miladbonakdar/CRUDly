"use strict";
//function to create action config
const actionConfigCreator = require("./gate/actionCreator").createActionConfig;

const get = actionConfigCreator("get", "get", ["id"], null);
const post = actionConfigCreator("post", "create", null, null);
const put = actionConfigCreator("put", "update", null, null);
const patch = actionConfigCreator("patch", "patch", null, null);
const remove = actionConfigCreator("delete", "delete", ["id"], null);
const head = actionConfigCreator("head", "head", null, null);
const getAll = actionConfigCreator("get", null, null, null);

module.exports = {
    all: [get, post, put, patch, remove, head, getAll],
    get,
    post,
    put,
    patch,
    delete: remove,
    head,
    getAll
};
