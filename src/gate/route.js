"use strict";
/**
 * @description route base class 
 * @param routeUrl route url  
 */
class Route {
    constructor(routeUrl) {
        if (routeUrl && !routeUrl.startsWith("/")) {
            routeUrl = "/" + routeUrl;
        }
        if (routeUrl) routeUrl = routeUrl.replace(/\/\//g, "/");

        this.url = this.route = routeUrl || "/";
    }
}
/**
 * @description get route of the object (controller or action)
 */
Route.prototype.getRoute = Route.prototype.getUrl = function() {
    return this.url;
};

module.exports = Route;
