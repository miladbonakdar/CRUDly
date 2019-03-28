const utils = require('../utils/axiosStatics');
const Controller = require('./controller/controller');
const validator = require('../utils/dataValidator');
const Route = require('./route');
const addAction = require('./action/addAction');
const GateManager = require('./gateManager');
const Request = require('./request');
const requestFunc = require('../utils/requestFunc');

/**
 * @description gate class
 * @param config main config file
 */
const Gate = function(config, generalEventsBindableObject) {
    if (!config) {
        throw new Error(
            'config file for controllers does not exist. please pass a valid config file to the Gate controller'
        );
    }
    Route.call(this, config.root); //set this object route default "/"
    config.controllers = validator(config, 'controllers') || [];
    this.controllers = []; //list of controllers object
    config.actions = validator(config, 'actions') || [];
    this.actions = []; //list of actions object
    this.config = config;
    Object.freeze(this.config);
    this.gate = this;
    this.gateManager = new GateManager(300);
    this._generalEventsBindableObject = generalEventsBindableObject;
    //create actions from config file
    if (Array.isArray(config)) this.addActions(this.config);
    else createControllers.bind(this)(); //create controllers from config file
};
Gate.prototype = Object.create(Route.prototype);
Gate.prototype.constructor = Gate;

Gate.prototype.statics = {};

//set default prototypes from utils object
Object.keys(utils).forEach(key => (Gate.prototype.statics[key] = utils[key]));
Gate.prototype.all = utils['all'];
/**
 * @description you can add new controller to the gate object
 * @param ctrl controller you want to add
 */
Gate.prototype.addController = function(ctrl) {
    validator(ctrl, 'name', 'please fill the controller name'); //check if ctrl name is valid
    this[ctrl.name] = new Controller(ctrl, this.route, this.config, this);
    this.controllers.push(this[ctrl.name]); //save in controller list
    if (this.config.defaultActions && this.config.defaultActions.length != 0)
        this.addDefaultsAction(this[ctrl.name], this.config.defaultActions);
};
/**
 * @description you can add actions to the gate object
 * @param action action you want to add
 */
Gate.prototype.addAction = addAction;
/**
 * @description check if is there any request pending now
 * @returns boolean indicate that any request is pending or not
 */
Gate.prototype.isRequestPending = function() {
    return this.gateManager.isRequestPending();
};
/**
 * @description runs after all pending requests are done and you have data and params
 * @param fn function you want to execute
 */
Gate.prototype.afterAll = function(fn) {
    this.afterAllRequests = fn;
};

/**
 * @description runs before any request send and you have data and params
 * @param fn function you want to execute
 */
Gate.prototype.beforeAny = function(fn) {
    this.beforeAnyRequest = fn;
};

/**
 * @description it will call befor each request
 * @param fn function you want to execute
 */
Gate.prototype.beforeEach = function(fn) {
    this.beforeEachRequest = fn;
};

/**
 * @description runs after each request and user can change the response data
 * @param fn function you want to execute
 */
Gate.prototype.afterEach = function(fn) {
    this.afterEachRequest = fn;
};

/**
 * @description add default actions to the controllers
 * @param actions list of default actions
 */
Gate.prototype.addDefaultsActions = function(actions) {
    this.controllers.forEach(ctrl => {
        this.addDefaultsAction(ctrl, actions);
    });
};
/**
 * @description add default actions to the just one controller
 * @param actions list of default actions
 */
Gate.prototype.addDefaultsAction = function(ctrl, actions) {
    if (ctrl.loadDefaults) ctrl.addActions(actions);
};

/**
 * @description add list of actions to the controller
 * @param actions list of actions config
 */
Gate.prototype.addActions = function(actions) {
    if (!actions) throw new Error('actions is not defained');
    if (!Array.isArray(actions)) throw new Error('actions most be an array');
    actions.forEach(action => {
        this.addAction(action);
    });
};

/**
 *FIXME: description and test
 */
Gate.prototype.requestGate = async function(request, ...params) {
    if (!request instanceof Request)
        throw new Error('the request param must be instance of Request type');
    //befor any and befor each
    this.gateManager.push(request, this.requestPushed);
    const res = await requestFunc(request.trigger(...params));
    request.respondWith(res);

    //after all and after each
    return this.gateManager.pop(request, this.requestPoped);
};

/**
 *FIXME: description and test
 */
Gate.prototype.requestPushed = function(request, collectionLeght) {
    if (collectionLeght === 1 && typeof this.beforeAnyRequest === 'function')
        this._generalEventsBindableObject
            ? this.beforeAnyRequest.bind(this._generalEventsBindableObject)()
            : this.beforeAnyRequest();
    if (typeof this.beforeEachRequest === 'function') this.beforeEachRequest(request);
};
/**
 *FIXME: description and test
 */
Gate.prototype.requestPoped = function(request, collectionLeght) {
    let afterEachRes = null;
    if (collectionLeght === 0 && typeof this.afterAllRequests === 'function')
        this._generalEventsBindableObject
            ? this.afterAllRequests.bind(this._generalEventsBindableObject)()
            : this.afterAllRequests();
    if (typeof this.afterEachRequest === 'function')
        afterEachRes = this.afterEachRequest(request.response);

    request.response = afterEachRes ? afterEachRes : request.response;
};

/**
 * @description add controllers listed in the config object to the gate object
 */
const createControllers = function() {
    this.addActions(this.config.actions);
    for (const ctrl of this.config.controllers) {
        this.addController(ctrl);
    }
};

module.exports = Gate;
