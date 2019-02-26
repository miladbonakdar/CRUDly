"use strict";
/**
 * @description route base class
 * @param routeUrl route url
 */
class Route {
    constructor(routeUrl) {
        if (!routeUrl) routeUrl = "";
        if (routeUrl.endsWith("/"))
            routeUrl = routeUrl.substr(0, routeUrl.length - 1);
        this.url = this.route = routeUrl;
    }
}
/**
 * @description get route of the object (controller or action)
 */
Route.prototype.getRoute = Route.prototype.getUrl = function() {
    return this.url;
};

module.exports = Route;
