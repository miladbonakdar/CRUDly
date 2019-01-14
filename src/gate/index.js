const utils = require("../utils");
const Controller = require("./controller");
const validator = require("./dataValidator");
const Route = require("./route");

class gate extends Route {
    constructor(config) {
        super(config.root); //set this object route default "/"
        if (!config) {
            throw new Error(
                "config file for controllers does not exist. please pass a valid config file to the gate controller"
            );
        }
        validator(
            config,
            "controllers",
            "there is no controller to add. make sure you have valid config file"
        ); //at least we should have one controller
        this.controllers = []; //list of controllers object
        this.pendingRequests = []; //request that will be send to the server and they are pending
        Controller.prototype.gate = this; //set Controllers gate object
        this.createControllers(config); //create controllers from config file
    }
}
//set default prototypes from utils object
Object.keys(utils).forEach(key => (gate.prototype[key] = utils[key]));

gate.prototype.createControllers = config => {
    for (const ctrl of config.controllers) {
        validator(ctrl, "name", "please fill the controller name"); //check if ctrl name is valid
        this[ctrl.name] = new Controller(ctrl, this.route, config.defaults);
        this.controllers.push(this[ctrl.name]); //save in controller list
    }
};

gate.prototype.addController = ctrl => {
    validator(ctrl, "name", "please fill the controller name"); //check if ctrl name is valid
    this[ctrl.name] = new Controller(ctrl, this.route);
    this.controllers.push(this[ctrl.name]); //save in controller list
};

gate.prototype.isRequestPending = () => {
    return this.pendingRequests.length != 0;
};

module.export = gate;
