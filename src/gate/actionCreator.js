"use strict";
const Action = require("./action");
const validator = require("./dataValidator");

module.exports = {
    generateActions: actions => {
        for (const action of actions) {
            this[action.name] = new Action(action, this.route);
        }
    },
    addAction: action => {
        validator(
            action,
            "name",
            "action name is invalid. please fill the action name"
        );
        this[action.name] = new Action(action, this.route);
        this.actions.push(this[action.name]);
    },
    //FIXME:
    createActionConfig: (
        actionType = "get",
        actionName = null,
        params = null,
        hasData = false,
        actionUrl = null
    ) => {}
};
