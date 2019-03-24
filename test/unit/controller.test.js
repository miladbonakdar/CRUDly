const checkFunctions = require('../checkFunctions');
const Controller = require('../../src/gate/controller/controller');
const testData = require('../data/gateTest.data');

describe('controller object check', () => {
    const controller = new Controller(testData.testController, '/api/v1', testData.testConfig);

    test('check some fileds to be created', () => {
        expect(controller.url).toBe('/api/v1/todos');
        expect(controller.actions).toBeDefined();
        expect(controller.loadDefaults).toBe(true);
        expect(controller.config).toEqual(testData.testConfig);
    });

    test(
        'check controller functions',
        checkFunctions.check(() => {
            expect(controller.addActions.__proto__ === Function.prototype).toBe(true);
            expect(controller.addAction.__proto__ === Function.prototype).toBe(true);
        })
    );

    test(
        'check controller addactions \'not defined\' exception',
        checkFunctions.checkForException(() => {
            controller.addActions();
        }, 'actions is not defained')
    );

    test(
        'check controller addactions \'most be an array\' exception',
        checkFunctions.checkForException(() => {
            controller.addActions({});
        }, 'actions most be an array')
    );

    test(
        'check controller addactions function',
        checkFunctions.check(() => {
            controller.addActions(testData.testActions);
            expect(controller.testAction).toBeDefined();
            expect(controller.testAction.call).toBeDefined();
            expect(controller.testAction.bind).toBeDefined();
        })
    );
});
test('loadDefaults should work well', () => {
    const controller = new Controller(testData.testController2, '/api/v1', testData.testConfig);
    controller.addActions(testData.testActions);
    expect(controller.loadDefaults).toBe(false);
});
