"use strict";

module.exports = class Route {
    constructor(routeUrl) {
        if (routeUrl && !routeUrl.startsWith("/")) {
            routeUrl = "/" + routeUrl;
        }
        if (routeUrl) routeUrl = routeUrl.replace(/\/\//g, "/");

        this.url = this.route = routeUrl || "/";
    }
};
