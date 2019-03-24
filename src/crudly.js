'use strict';
//the gate class
const gate = require('./gate/gate');
const defaultActions = require('./utils/defaultActions');
const actionConfig = require('./utils/actionConfigCreator');
/**
 * @description crudly lib function that will create your api gate
 * @param config main config object
 */
//copy functions to the crudly object
let crudly = function(config) {
    return new gate(config);
};
/**
 * @description gate class object that can be used for creatin multiple gates
 * @param config main config object
 */
crudly.gate = gate; //gate class that can be use to create new instance for new gate
crudly.standardCrudActions = defaultActions; //list of default standard actions you can make with REST
crudly.actionConfig = actionConfig; //function to make creating action config easier
module.exports = crudly;
