"use strict";
const utils = require("../utils");
const Controller = require("./controller");
const Action = require("./Action");
const validator = require("./dataValidator");
const Route = require("./route");
const actionCreator = require("./actionCreator");

createControllers = config => {
    for (const ctrl of config.controllers) {
        validator(ctrl, "name", "please fill the controller name"); //check if ctrl name is valid
        actionCreator.generateActions(
            ctrl.actions
                .filter(action => !action.name)
                .forEach(action => (action.name = ctrl.name))
        );
        this[ctrl.name] = new Controller(ctrl, this.route, config.defaults);
        this.controllers.push(this[ctrl.name]); //save in controller list
    }
};
class gate extends Route {
    constructor(config) {
        super(config.root); //set this object route default "/"

        if (!config) {
            throw new Error(
                "config file for controllers does not exist. please pass a valid config file to the gate controller"
            );
        }
        config.controllers = validator(config, "controllers") || [];

        this.controllers = []; //list of controllers object
        this.actions = []; //list of actions object
        //FIXME: fill the requests in the actions call
        this.pendingRequests = []; //request that will be send to the server and they are pending

        Controller.prototype.gate = this; //set Controllers gate object
        Action.prototype.gate = this; //set Actions gate object
        //create actions from config file
        if (Array.isArray(config)) actionCreator.generateActions(config);
        else {
            createControllers(config); //create controllers from config file
        }
    }
}
//set default prototypes from utils object
Object.keys(utils).forEach(key => (gate.prototype[key] = utils[key]));

gate.prototype.addController = ctrl => {
    validator(ctrl, "name", "please fill the controller name"); //check if ctrl name is valid
    this[ctrl.name] = new Controller(ctrl, this.route);
    this.controllers.push(this[ctrl.name]); //save in controller list
};

gate.prototype.addAction = actionCreator.addAction;

gate.prototype.isRequestPending = () => {
    return this.pendingRequests.length != 0;
};
//TODO: they are empty
gate.prototype.afterAll = () => {};

//TODO: they are empty
gate.prototype.beforeAny = () => {};

module.export = gate;
