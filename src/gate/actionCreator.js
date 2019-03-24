'use strict';

const Action = require('./action');
const statics = require('./statics');

module.exports = {
    /**
     * @description add action objec to the given this object
     * @param actionConfig action config object
     */
    addAction: function(actionConfig) {
        if (!actionConfig) throw new Error('action config is not valid');
        actionConfig.type = (actionConfig.type || 'get').toLowerCase();

        if (!statics.actionTypes.filter(type => type === actionConfig.type)[0])
            throw new Error(`Action type '${actionConfig.type}' is not valid`);

        if (!actionConfig.name) actionConfig.name = statics.actionTypeMaps[actionConfig.type];
        if (this[actionConfig.name]) throw new Error('this action was created before');

        let newAction = new Action(actionConfig, this.route);
        this.actions.push(newAction);
        newAction.gate = this.gate;
        newAction.config = this.config;
        if (this.config.defaultActionsConfig) newAction.mergeConfig(this.config.defaultActionsConfig);
        this[actionConfig.name] = newAction.run.bind(newAction);
    },
    /**
     * @description helper function to create action config
     * @param actionType action type eg 'get' and default is get
     * @param actionName name of the action
     * @param params url query params
     * @param actionUrl action url
     */
    createActionConfig: (actionType = 'get', actionName = null, params = null, actionUrl = null) => {
        actionType = actionType.toLowerCase();
        if (!statics.actionTypes.filter(type => type === actionType)[0])
            throw new Error(`Action type '${actionType}' is not valid`);
        let actionConfig = {};
        actionConfig.type = actionType;
        if (!actionName) actionName = statics.actionTypeMaps[actionType];
        if (actionName) actionConfig.name = actionName;
        if (actionUrl) actionConfig.url = actionUrl;
        if (
            (actionType === 'post' || actionType === 'put' || actionType === 'head' || actionType === 'patch') &&
            params
        )
            throw new Error(`Action type ${actionType} should not have params`);
        if (params) {
            if (!Array.isArray(params)) throw new Error('the params should be an array');
            actionConfig.params = params;
        }
        return actionConfig;
    }
};
