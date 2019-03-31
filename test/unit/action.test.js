const checkFunctions = require('../checkFunctions');
const Action = require('../../src/gate/action/action');
const testData = require('../data/gateTest.data');

test(
    'check for invalid Action config exception',
    checkFunctions.checkForException(() => {
        new Action();
    }, 'Action config is not valid')
);

test(
    'check for Base route exception',
    checkFunctions.checkForException(() => {
        new Action({});
    }, 'Base route is not valid')
);

describe('check merge config function', () => {
    test(
        'check merge config function \'the config object is invalid\' exception',
        checkFunctions.checkForException(() => {
            Action.prototype.mergeConfig();
        }, 'the config object is invalid')
    );

    test(
        'check merge config function \'the config object is invalid\' exception',
        checkFunctions.checkForException(() => {
            Action.prototype.mergeConfig(3456);
        }, 'config must be an object')
    );

    test(
        'check merge config function valid behavior',
        checkFunctions.check(() => {
            let fakeThis = {
                extra: {
                    name: 'dastan'
                }
            };
            Action.prototype.mergeConfig.bind(fakeThis)({ ajjab: true });
            expect(fakeThis).toEqual({
                extra: {
                    name: 'dastan',
                    ajjab: true
                }
            });
        })
    );
});

describe('check validateParams function', () => {
    test(
        'check validateParams function \'action params are not valid\' exception',
        checkFunctions.checkForException(() => {
            let fakeThis = {
                method: 'post',
                params: [],
                urlParams: []
            };
            Action.prototype.validateParams.bind(fakeThis)({ ajjab: true }, 'dastan');
        }, 'action params are not valid')
    );

    test(
        'check validateParams function \'action params are not valid. make sure you entered all of the params\' exception',
        checkFunctions.checkForException(() => {
            let fakeThis = {
                method: 'get',
                params: [0, 1],
                urlParams: [2, 3]
            };
            Action.prototype.validateParams.bind(fakeThis)({ ajjab: true });
        }, 'action params are not valid. make sure you entered all of the params')
    );

    test(
        'check valid validateParams function behavior for get method',
        checkFunctions.check(() => {
            let fakeThis = {
                method: 'get',
                params: [0, 1],
                urlParams: [2, 3]
            };
            Action.prototype.validateParams.bind(fakeThis)('1', '2', '3', '4');
        })
    );

    test(
        'check valid validateParams function behavior for post method',
        checkFunctions.check(() => {
            let fakeThis = {
                method: 'post'
            };
            Action.prototype.validateParams.bind(fakeThis)('dastan');
        })
    );
});

const defaultActionTests = (action, config) => {
    expect(action.method.toLowerCase()).toBe(config.type);
    expect(action.name).toBe(config.name);
    expect(action.extra).toEqual(config);
    expect(action.mergeConfig.__proto__ === Function.prototype).toBe(true);
    expect(action.validateParams.__proto__ === Function.prototype).toBe(true);
    expect(action.run).toBeDefined();
};

describe('action class test', () => {
    describe('test action 0', () => {
        const action = new Action(testData.testActions[0], '/');
        test(
            'checkc action 0 valid creation',
            checkFunctions.check(() => {
                defaultActionTests(action, testData.testActions[0]);
                expect(action.url).toBe('');
                expect(action.route).toBe('');
                expect(action.params).toEqual([]);
                expect(action.urlParams).toEqual([]);
                expect(action.loadDefaultConfig).toBe(true);
            })
        );
    });

    describe('test action 1', () => {
        const action = new Action(testData.testActions[1], '/');
        test(
            'checkc action 1 valid creation',
            checkFunctions.check(() => {
                expect(action.url).toBe('');
                expect(action.route).toBe('');
                expect(action.params).toEqual([]);
                defaultActionTests(action, testData.testActions[1]);
                expect(action.urlParams).toEqual([]);
                expect(action.loadDefaultConfig).toBe(true);
            })
        );
    });

    describe('test action 2', () => {
        const action = new Action(testData.testActions[2], '/');
        test(
            'checkc action 2 valid creation',
            checkFunctions.check(() => {
                expect(action.url).toBe('');
                expect(action.route).toBe('');
                expect(action.params).toEqual(['id', 'type']);
                defaultActionTests(action, testData.testActions[2]);
                expect(action.urlParams).toEqual([]);
                expect(action.loadDefaultConfig).toBe(true);
            })
        );
    });

    describe('test action 3', () => {
        const action = new Action(testData.testActions[3], '/');
        test(
            'checkc action 3 valid creation',
            checkFunctions.check(() => {
                expect(action.url).toBe('');
                expect(action.route).toBe('');
                expect(action.params).toEqual([]);
                defaultActionTests(action, testData.testActions[3]);
                expect(action.urlParams).toEqual([]);
                expect(action.loadDefaultConfig).toBe(true);
            })
        );
    });

    describe('test action 4', () => {
        const action = new Action(testData.testActions[4], '/');
        test(
            'checkc action 4 valid creation',
            checkFunctions.check(() => {
                expect(action.url).toBe('');
                expect(action.route).toBe('');
                expect(action.params).toEqual([]);
                defaultActionTests(action, testData.testActions[4]);
                expect(action.urlParams).toEqual([]);
                expect(action.loadDefaultConfig).toBe(true);
            })
        );
    });

    describe('test action 6', () => {
        const action = new Action(testData.testActions[6], '');
        test(
            'checkc action 6 valid creation',
            checkFunctions.check(() => {
                expect(action.url).toBe('/testkon');
                expect(action.route).toBe('/testkon');
                expect(action.params).toEqual(['id']);
                defaultActionTests(action, testData.testActions[6]);
                expect(action.urlParams).toEqual([]);
                expect(action.loadDefaultConfig).toBe(true);
            })
        );
    });

    describe('test action 5', () => {
        const action = new Action(testData.testActions[5], '');
        test(
            'checkc action 5 valid creation',
            checkFunctions.check(() => {
                expect(action.url).toBe('/customAction/:id/:age/:name');
                expect(action.route).toBe('/customAction/:id/:age/:name');
                expect(action.params).toEqual([]);
                defaultActionTests(action, testData.testActions[5]);
                expect(action.urlParams).toEqual([':id', ':age', ':name']);
                expect(action.loadDefaultConfig).toBe(false);
            })
        );
    });

    describe('test action 7', () => {
        const action = new Action(testData.testActions[7], '');
        test(
            'checkc action 7 valid creation',
            checkFunctions.check(() => {
                expect(action.url).toBe('/remove/:userId/:postId');
                expect(action.route).toBe('/remove/:userId/:postId');
                expect(action.params).toEqual([]);
                defaultActionTests(action, testData.testActions[7]);
                expect(action.urlParams).toEqual([':userId', ':postId']);
                expect(action.loadDefaultConfig).toBe(false);
            })
        );
    });
});
