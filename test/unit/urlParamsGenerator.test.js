const checkFunctions = require('../checkFunctions');
const generator = require('../../src/utils/urlParamsGenerator');

describe('urlParamsGenerator function test', () => {
    test(
        'check for valid parsing senario',
        checkFunctions.check(() => {
            const fakeThis = {
                urlParams: [],
                extra: {
                    url: 'remove/:userId/:postId'
                }
            };
            generator.bind(fakeThis)();
            expect(fakeThis.urlParams[0]).toBe(':userId');
            expect(fakeThis.urlParams[1]).toBe(':postId');
            expect(fakeThis.urlParams.length).toBe(2);
        })
    );

    test(
        'check for empty param parsing senario 1',
        checkFunctions.check(() => {
            const fakeThis = {
                extra: {
                    url: 'remove/'
                },
                urlParams: []
            };
            generator.bind(fakeThis)();
            expect(fakeThis.urlParams.length).toBe(0);
        })
    );

    test(
        'check for empty param parsing senario 2',
        checkFunctions.check(() => {
            const fakeThis = {
                extra: {
                    url: 'remove'
                },
                urlParams: []
            };
            generator.bind(fakeThis)();
            expect(fakeThis.urlParams.length).toBe(0);
        })
    );

    test(
        'check for valid parsing senario 3',
        checkFunctions.check(() => {
            const fakeThis = {
                extra: {
                    url: 'a/:test:dastan'
                },
                urlParams: []
            };
            generator.bind(fakeThis)();
            expect(fakeThis.urlParams[0]).toBe(':test');
            expect(fakeThis.urlParams[1]).toBe(':dastan');
            expect(fakeThis.urlParams.length).toBe(2);
        })
    );

    test(
        'check for valid parsing senario 2',
        checkFunctions.check(() => {
            const fakeThis = {
                extra: {
                    url: 'dastan/:ajjab?:mohandes'
                },
                urlParams: []
            };
            generator.bind(fakeThis)();
            expect(fakeThis.urlParams[0]).toBe(':ajjab');
            expect(fakeThis.urlParams[1]).toBe(':mohandes');
            expect(fakeThis.urlParams.length).toBe(2);
        })
    );
});
