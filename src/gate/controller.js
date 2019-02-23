"use strict";

const validator = require("./dataValidator");
const Route = require("./route");
const actionCreator = require("./actionCreator");
//TODO: document needed
class Controller extends Route {
    constructor(ctrl, baseRoute, config) {
        super(`${baseRoute}/${ctrl.name}`);
        this.actions = validator(ctrl, "actions") || [];
        this.loadDefaults = validator(ctrl, "loadDefaults") || true;
        this.config = config;
        this.addActions(ctrl.actions);
    }
}

/**
 * @description you can add actions to the gate object
 * @param action action you want to add
 */
Controller.prototype.addAction = actionCreator.addAction;

/**
 * @description add list of actions to the controller
 * @param actions list of actions config
 */
Controller.prototype.addActions = function(actions) {
    if (!actions) throw new Error("actions is not defained");
    if (!Array.isArray(actions)) throw new Error("actions most be an array");
    actions.forEach(action => {
        this.addAction(action);
    });
};

module.exports = Controller;
