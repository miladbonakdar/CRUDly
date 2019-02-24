"use strict";

const validator = require ("./dataValidator");
const Route = require ("./route");
const actionCreator = require ("./actionCreator");

/**
 * @description controller class
 * @param ctrlConfig controller config object
 * @param baseRoute base api route
 * @param baseConfig main config object
 */
class Controller extends Route {
    constructor (ctrlConfig, baseRoute, baseConfig) {
        super (`${baseRoute}/${ctrlConfig.name}`);
        this.actions = validator (ctrlConfig, "actions") || [];
        this.loadDefaults = validator (ctrlConfig, "loadDefaults") || true;
        this.config = baseConfig;
        this.addActions (ctrlConfig.actions);
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
Controller.prototype.addActions = function (actions) {
    if (!actions) throw new Error ("actions is not defained");
    if (!Array.isArray (actions)) throw new Error ("actions most be an array");
    actions.forEach (action => {
        this.addAction (action);
    });
};

module.exports = Controller;
