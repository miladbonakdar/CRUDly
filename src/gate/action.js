"use strict";

const Route = require("./route");
const request = require("./request");

const urlParser = url => {
    //FIXME: set url and url params
    this.url = action.url;
    this.urlParams = action.name;
};

class Action extends Route {
    constructor(action, baseRoute) {
        super(`${baseRoute}/${action.name}`);
        if (action.params) this.params = action.params;
        this.type = action.type;
        this.name = action.name;
        urlParser(action.url);
    }
}

Action.prototype.run = async () => {
    let config = {};
    //TODO: create axios config here
    return await request(config);
};

module.export = Action;
