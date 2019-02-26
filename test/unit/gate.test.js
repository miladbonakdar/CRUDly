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
        expect(gate.url).toBe("");
        expect(gate.controllers).toEqual([]);
        expect(gate.actions).toEqual([]);
        expect(gate.pendingRequests).toEqual([]);
        expect(gate.config).toBeDefined();
        expect(Object.isFrozen(gate.config)).toBe(true);
    })
);

describe("gate object check", () => {
    const gate = new Gate(gateTestData.testConfig);
    test(
        "check some fileds to be created",
        checkFunctions.check(() => {
            expect(gate.url).toBe("/api/v1");
            expect(gate.controllers.length).toBe(2);
            expect(gate.actions).toEqual([]);
            expect(gate.pendingRequests).toEqual([]);
            expect(gate.config).toBeDefined();
            expect(Object.isFrozen(gate.config)).toBe(true);
        })
    );

    test(
        "check for utils to be added",
        checkFunctions.check(() => {
            expect(gate.put).toBeDefined();
            expect(gate.post).toBeDefined();
            expect(gate.get).toBeDefined();
            expect(gate.delete).toBeDefined();
            expect(gate.head).toBeDefined();
            expect(gate.patch).toBeDefined();
            expect(gate.all).toBeDefined();
        })
    );

    test(
        "check gate controller",
        checkFunctions.check(() => {
            expect(gate.users).toBeDefined();
            expect(gate.posts).toBeDefined();
        })
    );

    test(
        "check gate functions",
        checkFunctions.check(() => {
            expect(gate.addController.__proto__ === Function.prototype).toBe(
                true
            );
            expect(gate.addAction.__proto__ === Function.prototype).toBe(true);
            expect(gate.isRequestPending.__proto__ === Function.prototype).toBe(
                true
            );
            expect(gate.afterAll.__proto__ === Function.prototype).toBe(true);
            expect(gate.beforeAny.__proto__ === Function.prototype).toBe(true);
            expect(
                gate.addDefaultsActions.__proto__ === Function.prototype
            ).toBe(true);
            expect(
                gate.addDefaultsAction.__proto__ === Function.prototype
            ).toBe(true);
        })
    );

    test(
        "check gate addController function",
        checkFunctions.check(() => {
            gate.addController(gateTestData.testController);
            expect(gate.todos).toBeDefined();
        })
    );

    test(
        "check for invalid addController param",
        checkFunctions.checkForException(() => {
            gate.addController({});
        }, "please fill the controller name -- name is required.")

    );
    test(
        "check gate isRequestPending function",
        checkFunctions.check(() => {
            expect(gate.isRequestPending()).toBe(false);
            gate.pendingRequests.push({});
            expect(gate.isRequestPending()).toBe(true);
            gate.pendingRequests.pop();
        })
    );

    test(
        "check gate afterAll function",
        checkFunctions.check(() => {
            gate.afterAll(() => {
                console.log("after all function");
            });
            expect(gate.afterAllRequests).toBeDefined();
            expect(gate.afterAllRequests.__proto__ === Function.prototype).toBe(
                true
            );
        })
    );

    test(
        "check gate beforeAny function",
        checkFunctions.check(() => {
            gate.beforeAny(() => {
                console.log("before any function");
            });
            expect(gate.beforeAnyRequest).toBeDefined();
            expect(gate.beforeAnyRequest.__proto__ === Function.prototype).toBe(
                true
            );
        })
    );
});
