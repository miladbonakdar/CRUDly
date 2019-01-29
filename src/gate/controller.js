"use strict";

const validator = require("./dataValidator");
const Route = require("./route");
const actionCreator = require("./actionCreator");

class Controller extends Route {
    constructor(ctrl, baseRoute) {
        super(`${baseRoute}/${ctrl.name}`);
        this.actions = [];
        validator(ctrl, "actions") || [];
        this.loadDefaults = validator(ctrl, "loadDefaults") || true;
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
Controller.prototype.addActions = actions => {
    if(!actions) throw new Error("actions is not defained");
    if(actions.__proto != Array.prototype) throw new Error("actions most be array");
    actions.forEach(action => {
        this.addAction(action);
    });
};

module.export = Controller;
