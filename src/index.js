"use strict";
//the gate class
const gate = require("./gate/gate");
//copy functions to the crudly object
const crudly = function(config) {
    return new gate(config);
};

crudly.gate = gate;

module.exports = crudly;
