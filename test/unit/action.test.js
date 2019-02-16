const checkFunctions = require("../checkFunctions");
const Action = require("../../src/gate/action");
const testData = require("../data/gateTest.data");

describe("action class test", () => {
    // test(
    //     "check for action creation",
    //     checkFunctions.check(() => {
    //         testData.actionList.forEach(item => {
    //             const fakeThis = {
    //                 route: "/",
    //                 actions: [],
    //                 config: { testData: 1 },
    //                 gate: { testData: 2 }
    //             };
    //             actionCreator.addAction.bind(fakeThis)(item);
    //             expect(item.name).toBeTruthy();
    //             expect(item.name).toBe(statics.actionTypeMaps[item.type]);
    //             expect(item.type).toBe(item.type.toLowerCase());
    //             expect(fakeThis[item.name].bind).toBeDefined();
    //             expect(fakeThis.actions.length).toBe(1);
    //             expect(fakeThis.actions[0].gate).toEqual(fakeThis.gate);
    //             expect(fakeThis.actions[0].config).toEqual(fakeThis.config);
    //         });
    //     })
    // );
});
