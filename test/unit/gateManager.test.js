const GateMnager = require('../../src/gate/gateManager');
const { check, checkForException } = require('../checkFunctions');

describe('gate manager object test', () => {
    let manager = null;
    beforeAll(() => {
        manager = new GateMnager(1); //prune objects that they were in the list more that 60 seconds
    });

    test(
        'check manager functions',
        check(() => {
            expect(typeof manager.isRequestPending).toBe('boolean');
            expect(typeof manager.pop).toBe('function');
            expect(typeof manager.push).toBe('function');
        })
    );

    test('check isRequestPending function', done => {
        expect(manager.isRequestPending).toBe(false);
        manager.push({ name: 'test', id: 1, startedOn: new Date() });
        expect(manager.isRequestPending).toBe(true);
        setTimeout(() => {
            expect(manager.isRequestPending).toBe(false);
            done();
        }, 2000);
    });

    test('check push functions', done => {
        manager.push({ name: 'test', id: 1, startedOn: new Date() }, () => {
            done();
        });
        expect(manager.isRequestPending).toBe(true);
        manager.pop({ id: 1 });
        expect(manager.isRequestPending).toBe(false);
    });

    test('check pop functions', done => {
        manager.push({ name: 'test', id: 1, startedOn: new Date() });
        expect(manager.isRequestPending).toBe(true);
        manager.pop({ id: 1 }, () => {
            done();
        });
        expect(manager.isRequestPending).toBe(false);
    });
});
