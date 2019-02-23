"use strict";

const utils = require("../utils");
const Controller = require("./controller");
const validator = require("./dataValidator");
const Route = require("./route");
const actionCreator = require("./actionCreator");
/**
 * @description add controllers listed in the config object to the gate object
 */
const createControllers = function() {
    for (const ctrl of this.config.controllers) {
        this.addController(ctrl);
    }
};
//TODO: document needed
class Gate extends Route {
    constructor(config) {
        if (!config) {
            throw new Error(
                "config file for controllers does not exist. please pass a valid config file to the Gate controller"
            );
        }
        if (config.root && !config.root.endsWith("/")) config.root += "/";
        super(config.root); //set this object route default "/"
        config.controllers = validator(config, "controllers") || [];
        this.controllers = []; //list of controllers object
        this.actions = []; //list of actions object
        //FIXME: fill the requests in the actions call
        this.pendingRequests = []; //request that will be send to the server and they are pending
        this.config = config;
        Object.freeze(this.config);

        //create actions from config file
        if (Array.isArray(config)) actionCreator.generateActions(config);
        else createControllers.bind(this)(); //create controllers from config file
    }
}

//set default prototypes from utils object
Object.keys(utils).forEach(key => (Gate.prototype[key] = utils[key]));
/**
 * @description you can add new controller to the gate object
 * @param ctrl controller you want to add
 */
Gate.prototype.addController = function(ctrl) {
    validator(ctrl, "name", "please fill the controller name"); //check if ctrl name is valid
    this[ctrl.name] = new Controller(ctrl, this.route, this.config);
    this[ctrl.name].gate = this;
    this.controllers.push(this[ctrl.name]); //save in controller list
    if (this.config.defaultActions && this.config.defaultActions.length != 0)
        this.addDefaultsAction(this[ctrl.name], this.config.defaultActions);
};
/**
 * @description you can add actions to the gate object
 * @param action action you want to add
 */
Gate.prototype.addAction = actionCreator.addAction;
/**
 * @description check if is there any request pending now
 * @returns boolean indicate that any request is pending or not
 */
Gate.prototype.isRequestPending = function() {
    return this.pendingRequests.length != 0;
};
//FIXME: call this function if exist
/**
 * @description runs after all pending requests are done and you have data and params
 * @param fn function you want to execute
 */
Gate.prototype.afterAll = function(fn) {
    this.afterAllRequests = fn;
};
//FIXME: call this function if exist
/**
 * @description runs before any request send and you have data and params
 * @param fn function you want to execute
 */
Gate.prototype.beforeAny = function(fn) {
    this.beforeAnyRequest = fn;
};
/**
 * @description add default actions to the controllers
 * @param actions list of default actions
 */
Gate.prototype.addDefaultsActions = function(actions) {
    this.controllers.forEach(ctrl => {
        this.addDefaultsAction(ctrl, actions);
    });
};
/**
 * @description add default actions to the just one controller
 * @param actions list of default actions
 */
Gate.prototype.addDefaultsAction = function(ctrl, actions) {
    if (ctrl.loadDefaults) ctrl.addActions(actions);
};

module.exports = Gate;
