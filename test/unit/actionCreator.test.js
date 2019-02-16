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
