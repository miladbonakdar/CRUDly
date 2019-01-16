"use strict";
const validator = require("./dataValidator");
const Route = require("./route");
const actionCreator = require("./actionCreator");

class Controller extends Route {
    constructor(ctrl, baseRoute) {
        super(`${baseRoute}/${ctrl.name}`);
        this.actions = [];
        validator(ctrl, "actions") || [];
        // this.createActions(ctrl);
    }
}

module.export = Controller;
