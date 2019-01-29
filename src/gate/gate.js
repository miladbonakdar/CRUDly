"use strict";

const utils = require("../utils");
const Controller = require("./controller");
const validator = require("./dataValidator");
const Route = require("./route");
const actionCreator = require("./actionCreator");
/**
 * @description add controllers listed in the config object to the gate object
 * @param config crudly config object for craeting controllers
 */
const createControllersAndActions = config => {
    for (const ctrl of config.controllers) {
        validator(ctrl, "name", "please fill the controller name"); //check if ctrl name is valid
        this[ctrl.name] = new Controller(ctrl, this.route);
        this.controllers.push(this[ctrl.name]); //save in controller list
    }
};

class Gate extends Route {
    constructor(config) {
        if (config.root && !config.root.endsWith("/")) config.root += "/";
        super(config.root); //set this object route default "/"
        if (!config) {
            throw new Error(
                "config file for controllers does not exist. please pass a valid config file to the Gate controller"
            );
        }
        config.controllers = validator(config, "controllers") || [];

        this.controllers = []; //list of controllers object
        this.actions = []; //list of actions object
        //FIXME: fill the requests in the actions call
        this.pendingRequests = []; //request that will be send to the server and they are pending

        //create actions from config file
        if (Array.isArray(config)) actionCreator.generateActions(config);
        else createControllersAndActions(config); //create controllers from config file
    }
}

//set default prototypes from utils object
Object.keys(utils).forEach(key => (Gate.prototype[key] = utils[key]));
/**
 * @description you can add new controller to the gate object
 * @param ctrl controller you want to add
 */
Gate.prototype.addController = ctrl => {
    validator(ctrl, "name", "please fill the controller name"); //check if ctrl name is valid
    this[ctrl.name] = new Controller(ctrl, this.route);
    this.controllers.push(this[ctrl.name]); //save in controller list
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
Gate.prototype.isRequestPending = () => {
    return this.pendingRequests.length != 0;
};
//FIXME: call this function if exist
/**
 * @description runs after all pending requests are done and you have data and params
 * @param fn function you want to execute
 */
Gate.prototype.afterAll = fn => {
    this.afterAllRequests = fn;
};
//FIXME: call this function if exist
/**
 * @description runs before any request send and you have data and params
 * @param fn function you want to execute
 */
Gate.prototype.beforeAny = fn => {
    this.beforeAnyRequest = fn;
};
/**
 * @description add default actions to the controllers
 * @param actions list of default actions
 */
Gate.prototype.addDefaultsActions = actions => {
    this.controllers.forEach(ctrl => {
        if (ctrl.loadDefaults) ctrl.addActions(actions);
    });
};

module.export = Gate;
