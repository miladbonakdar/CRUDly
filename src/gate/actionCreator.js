"use strict";

const Action = require("./action");
const statics = require("./statics");

module.exports = {
    generateActions: actions => {
        for (const action of actions) {
            addAction(action);
        }
    },
    addAction: action => {
        if (!action) throw new Error("action config is not valid");
        actionConfig.type = (actionConfig.type || "get").toLowerCase();

        if (!statics.actionTypes.filter(type => type === actionConfig.type)[0])
            throw new Error(`Action type '${actionConfig.type}' is not valid`);

        if (!action.name) action.name = statics.actionTypeMaps[actionConfig.type];
        if (this[action.name])
            throw new Error("this action was created before");

        let newAction = new Action(action, this.route);
        this.actions.push(newAction);
        this[action.name] = action.run;
    },
    createActionConfig: (
        actionType = "get",
        actionName = null,
        params = null,
        actionUrl = null
    ) => {
        actionType = actionType.toLowerCase();
        if (!statics.actionTypes.filter(type => type === actionType)[0])
            throw new Error(`Action type '${actionType}' is not valid`);
        let actionConfig = {};
        actionConfig.type = actionType;
        if (!actionName) actionName = statics.actionTypeMaps[actionType];
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
