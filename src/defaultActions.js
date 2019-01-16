"use strict";

const actionConfigCreator = require("./gate/actionCreator").createActionConfig;

const get = actionConfigCreator("get", "get", ["id"], false, null);
const post = actionConfigCreator("post", "create", null, true, null);
const put = actionConfigCreator("put", "update", null, true, null);
const patch = actionConfigCreator("patch", "patch", null, true, null);
const remove = actionConfigCreator("delete", "delete", ["id"], false, null);
const head = actionConfigCreator("head", "head", null, false, null);
const getAll = actionConfigCreator("get", null, null, false, null);

module.exports = {
    all: [get, post, put, patch, remove, head, getAll],
    get,
    post,
    put,
    patch,
    remove,
    head,
    getAll
};
