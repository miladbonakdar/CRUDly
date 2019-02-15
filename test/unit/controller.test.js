const checkFunctions = require("../checkFunctions");
const Controller = require("../../src/gate/controller");
const testData = require("../data/gateTest.data");

describe("controller object check", () => {
    const controller = new Controller(
        testData.testController,
        "/api/v1",
        testData.testConfig
    );
    test("check some fileds to be created", () => {
        expect(controller.url).toBe("/api/v1/todos");
        expect(controller.actions).toBeDefined();
        expect(controller.loadDefaults).toBe(true);
        expect(controller.config).toEqual(testData.testConfig);
    });

    test(
        "check controller functions",
        checkFunctions.check(() => {
            expect(controller.addActions.__proto__ === Function.prototype).toBe(
                true
            );
            expect(controller.addAction.__proto__ === Function.prototype).toBe(
                true
            );
        })
    );
});
