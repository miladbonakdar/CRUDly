"use strict";

class Route {
    constructor(routeUrl) {
        if (routeUrl && !routeUrl.startsWith("/")) {
            routeUrl = "/" + routeUrl;
        }
        if (routeUrl) routeUrl = routeUrl.replace(/\/\//g, "/");

        this.url = this.route = routeUrl || "/";
    }
};

Route.prototype.getRoute = function() {
    return this.url;
};
Route.prototype.getUrl = function() {
    return this.url;
};

module.exports = Route;