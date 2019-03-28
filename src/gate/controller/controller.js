'use strict';

const validator = require('../../utils/dataValidator');
const Route = require('../route');
const addAction = require('../action/addAction');

/**
 * @description controller class
 * @param ctrlConfig controller config object
 * @param baseRoute base api route
 * @param baseConfig main config object
 */
const Controller = function(ctrl, baseRoute, config, gate) {
    Route.call(this, `${baseRoute}/${ctrl.name}`);
    this.gate = gate;
    this.actions = validator(ctrl, 'actions') || [];
    this.loadDefaults = validator(ctrl, 'loadDefaults');
    if (this.loadDefaults === undefined || this.loadDefaults === null) this.loadDefaults = true;
    this.config = config;
    this.addActions(this.actions);
};
Controller.prototype = Object.create(Route.prototype);
Controller.prototype.constructor = Controller;

/**
 * @description you can add actions to the gate object
 * @param action action you want to add
 */
Controller.prototype.addAction = addAction;

/**
 * @description add list of actions to the controller
 * @param actions list of actions config
 */
Controller.prototype.addActions = function(actions) {
    if (!actions) throw new Error('actions is not defained');
    if (!Array.isArray(actions)) throw new Error('actions most be an array');
    actions.forEach(action => {
        this.addAction(action);
    });
};

module.exports = Controller;
