"use strict";
const Action = require("./action");
const validator = require("./dataValidator");
const statics = require("./statics");

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
    createActionConfig: (
        actionType = "get",
        actionName = null,
        params = null,
        actionUrl = null
    ) => {
        if (
            !statics.actionTypes.filter(
                type => actionType.toLowerCase() === actionType
            )[0]
        )
            throw new Error(`Action type '${actionType}' is not valid`);
        let actionConfig = {};
        actionConfig.type = actionType;
        if (actionType !== "get" && !params)
            actionName = statics.actionTypeMaps["actionType"];
        if (actionName) actionConfig.name = actionName;
        if (actionUrl) actionConfig.url = actionUrl;
        if (
            (actionType === "post" ||
                actionType === "put" ||
                actionType === "head" ||
                actionType === "patch") &&
            params
        )
            throw new Error(`Action type ${actionType} should not have params`);
        if (params) actionConfig.params = params;
        return actionConfig;
    }
};
