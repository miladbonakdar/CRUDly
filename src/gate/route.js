"use strict";
//TODO: document needed
class Route {
    constructor(routeUrl) {
        if (routeUrl && !routeUrl.startsWith("/")) {
            routeUrl = "/" + routeUrl;
        }
        if (routeUrl) routeUrl = routeUrl.replace(/\/\//g, "/");

        this.url = this.route = routeUrl || "/";
    }
}
//TODO: document needed
Route.prototype.getRoute = function() {
    return this.url;
};
//TODO: document needed
Route.prototype.getUrl = function() {
    return this.url;
};

module.exports = Route;
