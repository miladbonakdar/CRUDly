"use strict";
//the gate class
const gate = require("./gate/gate");
const defaultActions = require("./defaultActions");
const actionConfig = require("./gate/actionCreator").createActionConfig;
//TODO: document needed
//copy functions to the crudly object
let crudly = function(config) {
    return new gate(config);
};
//TODO: document needed
crudly.gate = gate; //gate class that can be use to create new instance for new gate
//TODO: document needed
crudly.standardCrudActions = defaultActions; //list of default standard actions you can make with REST
//TODO: document needed
crudly.actionConfig = actionConfig; //function to make creating action config easier
module.exports = crudly;
