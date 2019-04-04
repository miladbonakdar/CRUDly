'use strict';

const Action = require('./action');
const statics = require('../../utils/statics');
/**
 * @description add action objec to the given this object
 * @param actionConfig action config object
 */
const addAction = function(actionConfig) {
    if (!actionConfig) throw new Error('action config is not valid');
    actionConfig.type = (actionConfig.type || 'get').toLowerCase();

    if (!statics.actionTypes.filter(type => type === actionConfig.type)[0])
        throw new Error(`Action type '${actionConfig.type}' is not valid`);

    if (!actionConfig.name) actionConfig.name = statics.actionTypeMaps[actionConfig.type];
    if (this[actionConfig.name]) throw new Error('this action was created before');

    let newAction = new Action(actionConfig, this.url);
    this.actions.push(newAction);
    newAction.gate = this.gate;
    newAction.config = this.config;
    if (this.config.defaultActionsConfig) newAction.mergeConfig(this.config.defaultActionsConfig);
    this[actionConfig.name] = newAction.run.bind(newAction);
};

module.exports = addAction;
