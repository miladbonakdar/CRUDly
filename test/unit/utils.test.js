const check = require("../checkFunctions").check;
const utils = require("../../src/utils");

test(
    "check for utils keys",
    check(() => {
        expect(utils.put).toBeDefined();
        expect(utils.post).toBeDefined();
        expect(utils.get).toBeDefined();
        expect(utils.delete).toBeDefined();
        expect(utils.head).toBeDefined();
        expect(utils.patch).toBeDefined();
        expect(utils.all).toBeDefined();
        expect(Object.keys(utils).length).toBe(7);
    })
);

test("check for nothing", () => {
    expect(1).toBeTruthy();
});
