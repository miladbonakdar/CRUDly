"use strict";
//the gate class
const gate = require("./gate/gate");
const defaultActions = require("./defaultActions");
//copy functions to the crudly object
const crudly = function(config) {
    return new gate(config);
};

crudly.gate = gate; //gate class that can be use to create new instance for new gate
crudly.standardCrudActions = defaultActions; //list of default standard actions you can make with REST

module.exports = crudly;
