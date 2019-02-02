const checkFunctions = require("../checkFunctions");
const Route = require("../../src/gate/route");

test(
    "constructor should works fine",
    checkFunctions.check(() => {
        let testRoute = new Route();
        expect(testRoute.route).toBe("/");
        expect(testRoute.url).toBe("/");
        expect(testRoute.url === testRoute.route).toBe(true);
        testRoute = new Route("api/v1");
        expect(testRoute.route).toBe("/api/v1");
        expect(testRoute.url).toBe("/api/v1");
        expect(testRoute.url === testRoute.route).toBe(true);
    })
);
