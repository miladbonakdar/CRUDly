const checkFunctions = require("../checkFunctions");
const generator = require("../../src/gate/urlParamsGenerator");

describe("urlParamsGenerator function test", () => {
    test(
        "check for valid parsing senario",
        checkFunctions.check(() => {
            const fakeThis = {
                url: "remove/:userId/:postId",
                params: []
            };
            generator.bind(fakeThis)();
            expect(fakeThis.params[0]).toBe("userId");
            expect(fakeThis.params[1]).toBe("postId");
            expect(fakeThis.params.length).toBe(2);
        })
    );

    test(
        "check for empty param parsing senario 1",
        checkFunctions.check(() => {
            const fakeThis = {
                url: "remove/",
                params: []
            };
            generator.bind(fakeThis)();
            expect(fakeThis.params.length).toBe(0);
        })
    );

    test(
        "check for empty param parsing senario 2",
        checkFunctions.check(() => {
            const fakeThis = {
                url: "remove",
                params: []
            };
            generator.bind(fakeThis)();
            expect(fakeThis.params.length).toBe(0);
        })
    );

    test(
        "check for valid parsing senario 3",
        checkFunctions.check(() => {
            const fakeThis = {
                url: "a/:test:dastan",
                params: []
            };
            generator.bind(fakeThis)();
            expect(fakeThis.params[0]).toBe("test");
            expect(fakeThis.params[1]).toBe("dastan");
            expect(fakeThis.params.length).toBe(2);
        })
    );

    test(
        "check for valid parsing senario 2",
        checkFunctions.check(() => {
            const fakeThis = {
                url: "dastan/:ajjab?:mohandes",
                params: []
            };
            generator.bind(fakeThis)();
            expect(fakeThis.params[0]).toBe("ajjab");
            expect(fakeThis.params[1]).toBe("mohandes");
            expect(fakeThis.params.length).toBe(2);
        })
    );
});
