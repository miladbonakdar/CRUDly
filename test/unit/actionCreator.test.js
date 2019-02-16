const checkFunctions = require("../checkFunctions");
const actionCreator = require("../../src/gate/actionCreator");
const testData = require("../data/gateTest.data");
const statics = require("../../src/gate/statics");

test("actionCreator functions to be defined", () => {
    expect(actionCreator.addAction).toBeDefined();
    expect(actionCreator.createActionConfig).toBeDefined();
    expect(
        actionCreator.createActionConfig.__proto__ === Function.prototype
    ).toBe(true);
    expect(actionCreator.addAction.__proto__ === Function.prototype).toBe(true);
});

describe("addAction function tests", () => {
    test(
        "check for 'action config is not valid' exception",
        checkFunctions.checkForException(() => {
            actionCreator.addAction();
        }, "action config is not valid")
    );

    test(
        "check for invalid action type exception",
        checkFunctions.checkForException(() => {
            actionCreator.addAction({ type: "invalid type" });
        }, "Action type 'invalid type' is not valid")
    );

    test(
        "check for 'duplicate action' exception",
        checkFunctions.checkForException(() => {
            const fakeThis = {
                testAction: {}
            };
            actionCreator.addAction.bind(fakeThis)({
                type: "get",
                name: "testAction"
            });
        }, "this action was created before")
    );

    test(
        "check for action creation",
        checkFunctions.check(() => {
            testData.actionList.forEach(item => {
                const fakeThis = {
                    route: "/",
                    actions: [],
                    config: { testData: 1 },
                    gate: { testData: 2 }
                };
                actionCreator.addAction.bind(fakeThis)(item);
                expect(item.name).toBeTruthy();
                expect(item.name).toBe(statics.actionTypeMaps[item.type]);
                expect(item.type).toBe(item.type.toLowerCase());
                expect(fakeThis[item.name].bind).toBeDefined();
                expect(fakeThis.actions.length).toBe(1);
                expect(fakeThis.actions[0].gate).toEqual(fakeThis.gate);
                expect(fakeThis.actions[0].config).toEqual(fakeThis.config);
            });
        })
    );
});

describe("createActionConfig function check", () => {
    test(
        "check for invalid action type exception",
        checkFunctions.checkForException(() => {
            actionCreator.createActionConfig("invalid type");
        }, "Action type 'invalid type' is not valid")
    );

    test(
        "check for invalid params exception",
        checkFunctions.checkForException(() => {
            actionCreator.createActionConfig("get", null, {});
        }, "the params should be an array")
    );

    test(
        "check for 'Action type ${actionType} should not have params' exception",
        checkFunctions.checkForException(() => {
            actionCreator.createActionConfig("post", null, {});
        }, "Action type post should not have params")
    );

    test(
        "valid parameterless call",
        checkFunctions.check(() => {
            const config = actionCreator.createActionConfig();
            expect(config.name).toBe("get");
            expect(config.type).toBe("get");
        })
    );

    test(
        "check for valid createActionConfig call",
        checkFunctions.check(() => {
            testData.actionList
                .map(item => item.type)
                .forEach(item => {
                    const config = actionCreator.createActionConfig(item);
                    expect(config.name).toBeTruthy();
                    expect(config.name).toBe(
                        statics.actionTypeMaps[item.toLowerCase()]
                    );
                    expect(config.type).toBeTruthy();
                    expect(config.type).toBe(item.toLowerCase());
                });
        })
    );
});
