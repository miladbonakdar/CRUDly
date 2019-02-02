"use strict";

module.exports = class Route {
    constructor(routeUrl) {
        if (routeUrl && !routeUrl.startsWith("/")) routeUrl = "/" + routeUrl;
        this.url = this.route = routeUrl || "/";
    }
};
