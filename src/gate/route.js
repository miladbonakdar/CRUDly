'use strict';
/**
 * @description route base class
 * @param routeUrl route url
 */
const Route = function(routeUrl) {
    if (!routeUrl) routeUrl = '';
    if (routeUrl.endsWith('/')) routeUrl = routeUrl.substr(0, routeUrl.length - 1);
    this.url = routeUrl;
};
/**
 * @description get route of the object (controller or action)
 */
Route.prototype.getRoute = Route.prototype.getUrl = function() {
    return this.url;
};

Object.defineProperty(Route.prototype, 'route', {
    get() {
        return this.url;
    },
    set(url) {
        this.url = url;
    }
});

module.exports = Route;
