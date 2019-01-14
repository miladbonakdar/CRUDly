const validator = require("./dataValidator");
const Route = require("./route");
const Action = require("./Action");

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

controller.prototype.createActions = ctrl => {
    for (const action of ctrl.actions) {
        this[ctrl.name] = new Action(action, this.route);
    }
};

module.export = controller;
