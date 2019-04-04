const utils = require('../../src/utils/utils');
const { check, checkForException } = require('../checkFunctions');

test(
    'dateDifference test',
    check(() => {
        expect(utils.dateDifference).toBeDefined();
        expect(typeof utils.dateDifference).toBe('function');
        expect(utils.dateDifference(new Date('2018 3 3'), new Date('2018 3 4'))).toBe(1440 * 60);
    })
);

test(
    'inBrowser test',
    check(() => {
        expect(utils.inBrowser).toBeDefined();
        expect(typeof utils.inBrowser).toBe('boolean');
    })
);

test(
    'error test',
    check(() => {
        expect(utils.error).toBeDefined();
        expect(typeof utils.error).toBe('function');
    })
);

test(
    'trim test',
    check(() => {
        expect(utils.trim).toBeDefined();
        expect(typeof utils.trim).toBe('function');
        expect(utils.trim('  milad')).toBe('milad');
    })
);

test(
    'trimEnd test',
    check(() => {
        expect(utils.trimEnd).toBeDefined();
        expect(typeof utils.trimEnd).toBe('function');
        expect(utils.trimEnd('dastan ')).toBe('dastan');
    })
);

test(
    'toLower test',
    check(() => {
        expect(utils.toLower).toBeDefined();
        expect(typeof utils.toLower).toBe('function');
        expect(utils.toLower('LOW')).toBe('low');
    })
);

test(///////
    'toUpper test',
    check(() => {
        expect(utils.toUpper).toBeDefined();
        expect(typeof utils.toUpper).toBe('function');
        expect(utils.toUpper('upper')).toBe('UPPER');
    })
);

test(
    'isString test',
    check(() => {
        expect(utils.isString).toBeDefined();
        expect(typeof utils.isString).toBe('function');
        expect(utils.isString('dfgh')).toBe(true);
        expect(utils.isString({})).toBe(false);
    })
);

test(
    'hasOwnProperty test',
    check(() => {
        expect(utils.hasOwnProperty).toBeDefined();
        expect(typeof utils.hasOwnProperty).toBe('function');
    })
);

test(
    'slice test',
    check(() => {
        expect(utils.slice).toBeDefined();
        expect(typeof utils.slice).toBe('function');
    })
);

test(
    'isBoolean test',
    check(() => {
        expect(utils.isBoolean).toBeDefined();
        expect(typeof utils.isBoolean).toBe('function');
        expect(utils.isBoolean(true)).toBe(true);
        expect(utils.isBoolean('true')).toBe(false);
    })
);

test(
    'isFunction test',
    check(() => {
        expect(utils.isFunction).toBeDefined();
        expect(typeof utils.isFunction).toBe('function');
        expect(utils.isFunction(()=>{})).toBe(true);
        expect(utils.isFunction({})).toBe(false);
    })
);

test(
    'isObject test',
    check(() => {
        expect(utils.isObject).toBeDefined();
        expect(typeof utils.isObject).toBe('function');
        expect(utils.isObject({})).toBe(true);
        expect(utils.isObject('')).toBe(false);
    })
);

test(
    'isPlainObject test',
    check(() => {
        expect(utils.isPlainObject).toBeDefined();
        expect(typeof utils.isPlainObject).toBe('function');
        expect(utils.isPlainObject({})).toBe(true);
        expect(utils.isPlainObject(new Date())).toBe(false);
    })
);

test(
    'isBlob test',
    check(() => {
        expect(utils.isBlob).toBeDefined();
        expect(typeof utils.isBlob).toBe('function');
    })
);

test(
    'isFormData test',
    check(() => {
        expect(utils.isFormData).toBeDefined();
        expect(typeof utils.isFormData).toBe('function');
    })
);

test(
    'when test',
    check(() => {
        expect(utils.when).toBeDefined();
        expect(typeof utils.when).toBe('function');
    })
);

test(
    'each test',
    check(() => {
        expect(utils.each).toBeDefined();
        expect(typeof utils.each).toBe('function');
    })
);

test(
    'urlValidator test',
    check(() => {
        expect(utils.urlValidator).toBeDefined();
        expect(typeof utils.urlValidator).toBe('function');
        expect(utils.urlValidator('users')).toBe('/users');
    })
);
