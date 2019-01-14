"use strict";
//the gate class
const gate = require("./gate/gate");
//default axios functions
const utils = require("./utils");
//copy functions to the juggernut object
const juggernut = { ...utils };

juggernut.gate = gate;

module.exports = juggernut;
