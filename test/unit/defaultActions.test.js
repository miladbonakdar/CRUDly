const checkFunctions = require("../checkFunctions");
const defaultActions = require("../../src/defaultActions");

test(
    "check for valid default actions object",
    checkFunctions.check(() => {
        expect(defaultActions.__proto__ === Object.prototype).toBe(true);
        expect(defaultActions.all).toBeDefined();
        expect(defaultActions.get).toBeDefined();
        expect(defaultActions.post).toBeDefined();
        expect(defaultActions.put).toBeDefined();
        expect(defaultActions.patch).toBeDefined();
        expect(defaultActions.delete).toBeDefined();
        expect(defaultActions.head).toBeDefined();
        expect(defaultActions.getAll).toBeDefined();
        Object.keys(defaultActions).forEach(key => {
            if (key !== "all")
                expect(defaultActions[key].__proto__ === Object.prototype).toBe(
                    true
                );
            else expect(Array.isArray(defaultActions[key])).toBe(true);
        });
        expect(Object.keys(defaultActions).length).toBe(8);
    })
);
