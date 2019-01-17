"use strict";

const utils = require("../utils");
const Controller = require("./controller");
const Action = require("./actionFunctionCreator");
const validator = require("./dataValidator");
const Route = require("./route");
const actionCreator = require("./actionCreator");

createControllersAndActions = config => {
    for (const ctrl of config.controllers) {
        validator(ctrl, "name", "please fill the controller name"); //check if ctrl name is valid
        let getAction = ctrl.actions.filter(
            //find get action that it is nameless => gate.users()
            action =>
                !action.name &&
                (!action.type || action.type.toLowerCase() == "get")
        )[0];

        if (getAction)
            actionCreator.addAction({ ...getAction, name: ctrl.name }); //replace action name with controller name
        this[ctrl.name] = new Controller(ctrl, this.route);
        this.controllers.push(this[ctrl.name]); //save in controller list
    }
};
class Gate extends Route {
    constructor(config) {
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

        Controller.prototype.gate = this; //set Controllers Gate object
        Action.prototype.gate = this; //set Actions Gate object
        //create actions from config file
        if (Array.isArray(config)) actionCreator.generateActions(config);
        else {
            createControllersAndActions(config); //create controllers from config file
        }
    }
}

//set default prototypes from utils object
Object.keys(utils).forEach(key => (Gate.prototype[key] = utils[key]));

Gate.prototype.addController = ctrl => {
    validator(ctrl, "name", "please fill the controller name"); //check if ctrl name is valid
    this[ctrl.name] = new Controller(ctrl, this.route);
    this.controllers.push(this[ctrl.name]); //save in controller list
};

Gate.prototype.addAction = actionCreator.addAction;

Gate.prototype.isRequestPending = () => {
    return this.pendingRequests.length != 0;
};

//FIXME: call this function if exist
Gate.prototype.afterAll = fn => {
    this.afterAllRequests = fn;
};

//FIXME: call this function if exist
Gate.prototype.beforeAny = fn => {
    this.beforeAnyRequest = fn;
};
//FIXME:
Gate.prototype.addDefaultsActions = actions => {
    this.controllers.forEach(ctrl => {
        ctrl.addActions(actions);
    });
};

module.export = Gate;
