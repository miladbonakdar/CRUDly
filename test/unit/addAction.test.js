const checkFunctions = require('../checkFunctions');
const addAction = require('../../src/gate/action/addAction');
const testData = require('../data/gateTest.data');
const statics = require('../../src/utils/statics');

test('actionCreator functions to be defined', () => {
    expect(addAction).toBeDefined();
    expect(addAction.__proto__ === Function.prototype).toBe(true);
});

describe('addAction function tests', () => {
    test(
        'check for \'action config is not valid\' exception',
        checkFunctions.checkForException(() => {
            addAction();
        }, 'action config is not valid')
    );

    test(
        'check for invalid action type exception',
        checkFunctions.checkForException(() => {
            addAction({ type: 'invalid type' });
        }, 'Action type \'invalid type\' is not valid')
    );

    test(
        'check for \'duplicate action\' exception',
        checkFunctions.checkForException(() => {
            const fakeThis = {
                testAction: {}
            };
            addAction.bind(fakeThis)({
                type: 'get',
                name: 'testAction'
            });
        }, 'this action was created before')
    );

    test(
        'check for action creation',
        checkFunctions.check(() => {
            testData.actionList.forEach(item => {
                const fakeThis = {
                    route: '/',
                    actions: [],
                    config: { testData: 1 },
                    gate: { testData: 2 }
                };
                addAction.bind(fakeThis)(item);
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
