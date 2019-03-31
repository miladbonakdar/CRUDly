const Request = require('../../src/gate/request');
const { check, checkForException } = require('../checkFunctions');
const requestOptions = require('../data/request.data');

test(
    'check for exception : options to create ...',
    checkForException(() => {
        const request = new Request();
    }, 'options to create request is not valid')
);

test(
    'test for exception : the url should be ...',
    checkForException(() => {
        const request = new Request({});
    }, 'the url should be specified -- url is required.')
);
describe('create object test', () => {
    let request = null;
    beforeAll(() => {
        request = new Request(requestOptions);
    });
    
    test(
        'test constractor',
        check(() => {
            expect(request.url).toBe('/url/:first/:last');
            expect(request.method).toBe('get');
            expect(request.body).toBe('body');
            expect(request._isPending).toBe(false);
            expect(request.axiosConfig).toEqual(null);
            expect(request.extra).toEqual({});
            expect(request.config).toEqual({});
            expect(request.urlParams).toEqual([':first', ':last']);
            expect(request.params).toEqual([]);
        })
    );

    test(
        'test request parse url function',
        check(() => {
            expect(request.parseUrl(request.url, 123, 321)).toBe('/url/123/321');
            expect(request.parseUrl(request.url, 'milad', 'bonakdar')).toBe('/url/milad/bonakdar');
            expect(request.parseUrl(request.url, 'milad', 123123, 123123)).toBe(
                '/url/milad/123123'
            );
        })
    );

    test(
        'test getAxiosConfig function',
        check(() => {
            const config = request.makeConfig(123, 456);
            expect(config instanceof Object).toBe(true);
            expect(config.url).toBe('/url/123/456');
            expect(config.method).toBe(request.method);
            expect(config.params).toEqual({});
            expect(config.data).toBeUndefined();
        })
    );

    test('test action 7 getAxiosConfig function \'there is no params for this argument\' exception', () => {
        expect(() => {
            request.makeConfig(123, 456, 'invalid param');
        }).toThrow('there is no params for this argument');
    });
});
