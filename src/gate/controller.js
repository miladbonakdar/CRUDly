"use strict";
const validator = require("./dataValidator");
const Route = require("./route");
const actionCreator = require("./actionCreator");

class controller extends Route {
    constructor(ctrl, baseRoute, defaults) {
        super(`${baseRoute}/${ctrl.name}`);
        this.actions = [];
        validator(ctrl, "actions") || [];
        ctrl.actions = [...ctrl.actions, ...defaults];
        Action.prototype.gate = this.gate;
        this.createActions(ctrl);
    }
}

module.export = controller;
