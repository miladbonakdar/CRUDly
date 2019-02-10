const checkFunctions = require("../checkFunctions");
const Gate = require("../../src/gate/gate");
const gateTestData = require("../data/gateTest.data");

test(
    "check for invalid creation of the gate",
    checkFunctions.checkForException(() => {
        new Gate();
    }, "config file for controllers does not exist. please pass a valid config file to the Gate controller")
);

test(
    "check for creation of the gate",
    checkFunctions.check(() => {
        let gate = new Gate({});
        expect(gate.url).toBe("/");
        expect(gate.controllers).toEqual([]);
        expect(gate.actions).toEqual([]);
        expect(gate.pendingRequests).toEqual([]);
        expect(gate.config).toBeDefined();
        expect(Object.isFrozen(gate.config)).toBe(true);
    })
);

describe("gate object check", () => {
    const gate = new Gate(gateTestData.testConfig);
    test("check some fileds to be created", () => {
        expect(gate.url).toBe("/api/v1/");
        expect(gate.controllers.length).toBe(2);
        expect(gate.actions).toEqual([]);
        expect(gate.pendingRequests).toEqual([]);
        expect(gate.config).toBeDefined();
        expect(Object.isFrozen(gate.config)).toBe(true);
    });

    test("check for utils to be added", () => {
        expect(gate.put).toBeDefined();
        expect(gate.post).toBeDefined();
        expect(gate.get).toBeDefined();
        expect(gate.delete).toBeDefined();
        expect(gate.head).toBeDefined();
        expect(gate.patch).toBeDefined();
        expect(gate.all).toBeDefined();
    });

    test("check gate controller", () => {
        expect(gate.users).toBeDefined();
        expect(gate.posts).toBeDefined();
    });
});
