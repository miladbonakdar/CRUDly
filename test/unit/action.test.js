const checkFunctions = require("../checkFunctions");
const Action = require("../../src/gate/action");
const testData = require("../data/gateTest.data");

test(
    "check for invalid Action config exception",
    checkFunctions.checkForException(() => {
        new Action();
    }, "Action config is not valid")
);

test(
    "check for Base route exception",
    checkFunctions.checkForException(() => {
        new Action({});
    }, "Base route is not valid")
);

describe("check merge config function", () => {
    test(
        "check merge config function 'the config object is invalid' exception",
        checkFunctions.checkForException(() => {
            Action.prototype.mergeConfig();
        }, "the config object is invalid")
    );

    test(
        "check merge config function 'the config object is invalid' exception",
        checkFunctions.checkForException(() => {
            Action.prototype.mergeConfig(3456);
        }, "config must be an object")
    );

    test(
        "check merge config function valid behavior",
        checkFunctions.check(() => {
            let fakeThis = {
                extra: {
                    name: "dastan"
                }
            };
            Action.prototype.mergeConfig.bind(fakeThis)({ ajjab: true });
            expect(fakeThis).toEqual({
                extra: {
                    name: "dastan",
                    ajjab: true
                }
            });
        })
    );
});

describe("check validateParams function", () => {
    test(
        "check validateParams function 'action params are not valid' exception",
        checkFunctions.checkForException(() => {
            let fakeThis = {
                method: "post",
                params: [],
                urlParams: []
            };
            Action.prototype.validateParams.bind(fakeThis)(
                { ajjab: true },
                "dastan"
            );
        }, "action params are not valid")
    );

    test(
        "check validateParams function 'action params are not valid. make sure you entered all of the params' exception",
        checkFunctions.checkForException(() => {
            let fakeThis = {
                method: "get",
                params: [0, 1],
                urlParams: [2, 3]
            };
            Action.prototype.validateParams.bind(fakeThis)({ ajjab: true });
        }, "action params are not valid. make sure you entered all of the params")
    );

    test(
        "check valid validateParams function behavior for get method",
        checkFunctions.check(() => {
            let fakeThis = {
                method: "get",
                params: [0, 1],
                urlParams: [2, 3]
            };
            Action.prototype.validateParams.bind(fakeThis)("1", "2", "3", "4");
        })
    );

    test(
        "check valid validateParams function behavior for post method",
        checkFunctions.check(() => {
            let fakeThis = {
                method: "post"
            };
            Action.prototype.validateParams.bind(fakeThis)("dastan");
        })
    );
});

const defaultActionTests = (action, config) => {
    expect(action.method.toLowerCase()).toBe(config.type);
    expect(action.name).toBe(config.name);
    expect(action.extra).toEqual(config);
    expect(action.parseUrl.__proto__ === Function.prototype).toBe(true);
    expect(action.mergeConfig.__proto__ === Function.prototype).toBe(true);
    expect(action.validateParams.__proto__ === Function.prototype).toBe(true);
    expect(action.getAxiosConfig.__proto__ === Function.prototype).toBe(true);
    expect(action.run).toBeDefined();
};

describe("action class test", () => {
    describe("test action 0", () => {
        const action = new Action(testData.testActions[0], "/");
        test(
            "checkc action 0 valid creation",
            checkFunctions.check(() => {
                defaultActionTests(action, testData.testActions[0]);
                expect(action.url).toBe("");
                expect(action.route).toBe("");
                expect(action.params).toEqual([]);
                expect(action.urlParams).toEqual([]);
                expect(action.loadDefaultConfig).toBe(true);
            })
        );

        test(
            "test action 0 getAxiosConfig function",
            checkFunctions.check(() => {
                const config = action.getAxiosConfig({ id: 123 });
                expect(config instanceof Object).toBe(true);
                expect(config.url).toBe("");
                expect(config.method).toBe(action.method);
                expect(config.params).toBeUndefined();
                expect(config.data).toEqual({ id: 123 });
            })
        );
    });

    describe("test action 1", () => {
        const action = new Action(testData.testActions[1], "/");
        test(
            "checkc action 1 valid creation",
            checkFunctions.check(() => {
                expect(action.url).toBe("");
                expect(action.route).toBe("");
                expect(action.params).toEqual([]);
                defaultActionTests(action, testData.testActions[1]);
                expect(action.urlParams).toEqual([]);
                expect(action.loadDefaultConfig).toBe(true);
            })
        );

        test(
            "test action 1 getAxiosConfig function",
            checkFunctions.check(() => {
                const config = action.getAxiosConfig({ id: 123 });
                expect(config instanceof Object).toBe(true);
                expect(config.url).toBe("");
                expect(config.method).toBe(action.method);
                expect(config.params).toBeUndefined();
                expect(config.data).toEqual({ id: 123 });
            })
        );
    });

    describe("test action 2", () => {
        const action = new Action(testData.testActions[2], "/");
        test(
            "checkc action 2 valid creation",
            checkFunctions.check(() => {
                expect(action.url).toBe("");
                expect(action.route).toBe("");
                expect(action.params).toEqual(["id", "type"]);
                defaultActionTests(action, testData.testActions[2]);
                expect(action.urlParams).toEqual([]);
                expect(action.loadDefaultConfig).toBe(true);
            })
        );

        test(
            "test action 2 getAxiosConfig function",
            checkFunctions.check(() => {
                const config = action.getAxiosConfig(123, 345);
                expect(config instanceof Object).toBe(true);
                expect(config.url).toBe("");
                expect(config.method).toBe(action.method);
                expect(config.params).toEqual({ id: 123, type: 345 });
                expect(config.data).toBeUndefined();
            })
        );

        test("test action 2 getAxiosConfig function 'there is no params for this argument' exception", () => {
            expect(() => {
                action.getAxiosConfig(123, 456, "invalid");
            }).toThrow("there is no params for this argument");
        });
    });

    describe("test action 3", () => {
        const action = new Action(testData.testActions[3], "/");
        test(
            "checkc action 3 valid creation",
            checkFunctions.check(() => {
                expect(action.url).toBe("");
                expect(action.route).toBe("");
                expect(action.params).toEqual([]);
                defaultActionTests(action, testData.testActions[3]);
                expect(action.urlParams).toEqual([]);
                expect(action.loadDefaultConfig).toBe(true);
            })
        );

        test(
            "test action 3 getAxiosConfig function",
            checkFunctions.check(() => {
                const config = action.getAxiosConfig({ id: 123 });
                expect(config instanceof Object).toBe(true);
                expect(config.url).toBe("");
                expect(config.method).toBe(action.method);
                expect(config.params).toBeUndefined();
                expect(config.data).toBeUndefined();
            })
        );
    });

    describe("test action 4", () => {
        const action = new Action(testData.testActions[4], "/");
        test(
            "checkc action 4 valid creation",
            checkFunctions.check(() => {
                expect(action.url).toBe("");
                expect(action.route).toBe("");
                expect(action.params).toEqual([]);
                defaultActionTests(action, testData.testActions[4]);
                expect(action.urlParams).toEqual([]);
                expect(action.loadDefaultConfig).toBe(true);
            })
        );

        test(
            "test action 4 getAxiosConfig function",
            checkFunctions.check(() => {
                const config = action.getAxiosConfig({ data: 1 });
                expect(config instanceof Object).toBe(true);
                expect(config.url).toBe("");
                expect(config.method).toBe(action.method);
                expect(config.params).toBeUndefined();
                expect(config.data).toEqual({ data: 1 });
            })
        );
    });

    describe("test action 6", () => {
        const action = new Action(testData.testActions[6], "");
        test(
            "checkc action 6 valid creation",
            checkFunctions.check(() => {
                expect(action.url).toBe("/testkon");
                expect(action.route).toBe("/testkon");
                expect(action.params).toEqual(["id"]);
                defaultActionTests(action, testData.testActions[6]);
                expect(action.urlParams).toEqual([]);
                expect(action.loadDefaultConfig).toBe(true);
            })
        );

        test(
            "test action 6 getAxiosConfig function",
            checkFunctions.check(() => {
                const config = action.getAxiosConfig(123);
                expect(config instanceof Object).toBe(true);
                expect(config.url).toBe("/testkon");
                expect(config.method).toBe(action.method);
                expect(config.params).toEqual({ id: 123 });
                expect(config.data).toBeUndefined();
            })
        );

        test("test action 6 getAxiosConfig function 'there is no params for this argument' exception", () => {
            expect(() => {
                action.getAxiosConfig(123, 456);
            }).toThrow("there is no params for this argument");
        });
    });

    describe("test action 5", () => {
        const action = new Action(testData.testActions[5], "");
        test(
            "checkc action 5 valid creation",
            checkFunctions.check(() => {
                expect(action.url).toBe("/customAction/:id/:age/:name");
                expect(action.route).toBe("/customAction/:id/:age/:name");
                expect(action.params).toEqual([]);
                defaultActionTests(action, testData.testActions[5]);
                expect(action.urlParams).toEqual([":id", ":age", ":name"]);
                expect(action.loadDefaultConfig).toBe(false);
            })
        );

        test(
            "test action 5 parse url function",
            checkFunctions.check(() => {
                expect(action.parseUrl(action.url, 123, 321, "ajjab")).toBe(
                    "/customAction/123/321/ajjab"
                );
                expect(action.parseUrl(action.url, 10, 20, "milawd")).toBe(
                    "/customAction/10/20/milawd"
                );
            })
        );

        test(
            "test action 5 getAxiosConfig function",
            checkFunctions.check(() => {
                const config = action.getAxiosConfig(123, 456, "ajjab");
                expect(config instanceof Object).toBe(true);
                expect(config.url).toBe("/customAction/123/456/ajjab");
                expect(config.method).toBe(action.method);
                expect(config.params).toEqual({});
                expect(config.data).toBeUndefined();
            })
        );

        test("test action 5 getAxiosConfig function 'there is no params for this argument' exception", () => {
            expect(() => {
                action.getAxiosConfig(123, 456, "invalid", "param");
            }).toThrow("there is no params for this argument");
        });
    });

    describe("test action 7", () => {
        const action = new Action(testData.testActions[7], "");
        test(
            "checkc action 7 valid creation",
            checkFunctions.check(() => {
                expect(action.url).toBe("/remove/:userId/:postId");
                expect(action.route).toBe("/remove/:userId/:postId");
                expect(action.params).toEqual([]);
                defaultActionTests(action, testData.testActions[7]);
                expect(action.urlParams).toEqual([":userId", ":postId"]);
                expect(action.loadDefaultConfig).toBe(false);
            })
        );

        test(
            "test action 7 parse url function",
            checkFunctions.check(() => {
                expect(action.parseUrl(action.url, 123, 321)).toBe(
                    "/remove/123/321"
                );
                expect(action.parseUrl(action.url, "milad", "bonakdar")).toBe(
                    "/remove/milad/bonakdar"
                );
                expect(
                    action.parseUrl(action.url, "milad", 123123, 123123)
                ).toBe("/remove/milad/123123");
            })
        );

        test(
            "test action 7 getAxiosConfig function",
            checkFunctions.check(() => {
                const config = action.getAxiosConfig(123, 456);
                expect(config instanceof Object).toBe(true);
                expect(config.url).toBe("/remove/123/456");
                expect(config.method).toBe(action.method);
                expect(config.params).toEqual({});
                expect(config.data).toBeUndefined();
            })
        );

        test("test action 7 getAxiosConfig function 'there is no params for this argument' exception", () => {
            expect(() => {
                action.getAxiosConfig(123, 456, "invalid param");
            }).toThrow("there is no params for this argument");
        });
    });
});
