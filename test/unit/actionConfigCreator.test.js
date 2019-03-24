const createActionConfig = require('../../src/utils/actionConfigCreator');
const checkFunctions = require('../checkFunctions');
const testData = require('../data/gateTest.data');
const statics = require('../../src/utils/statics');

test('createActionConfig function to be valid', () => {
    expect(createActionConfig).toBeDefined();
    expect(createActionConfig.__proto__ === Function.prototype).toBe(true);
});

describe('createActionConfig function check', () => {
    test(
        'check for invalid action type exception',
        checkFunctions.checkForException(() => {
            createActionConfig('invalid type');
        }, 'Action type \'invalid type\' is not valid')
    );

    test(
        'check for invalid params exception',
        checkFunctions.checkForException(() => {
            createActionConfig('get', null, {});
        }, 'the params should be an array')
    );

    test(
        'check for \'Action type ${actionType} should not have params\' exception',
        checkFunctions.checkForException(() => {
            createActionConfig('post', null, {});
        }, 'Action type post should not have params')
    );

    test(
        'valid parameterless call',
        checkFunctions.check(() => {
            const config = createActionConfig();
            expect(config.name).toBe('get');
            expect(config.type).toBe('get');
        })
    );

    test(
        'check for valid createActionConfig call',
        checkFunctions.check(() => {
            testData.actionList
                .map(item => item.type)
                .forEach(item => {
                    const config = createActionConfig(item);
                    expect(config.name).toBeTruthy();
                    expect(config.name).toBe(statics.actionTypeMaps[item.toLowerCase()]);
                    expect(config.type).toBeTruthy();
                    expect(config.type).toBe(item.toLowerCase());
                });
        })
    );
});
