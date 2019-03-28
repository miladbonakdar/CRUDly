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

test(
    'test constractor',
    check(() => {
        const request = new Request(requestOptions);
        expect(request.url).toBe('url');
        expect(request.method).toBe('get');
        expect(request.body).toBe('body');
        expect(request._isPending).toBe(false);
        expect(request.axiosConfig).toEqual(null);
        expect(request.extra).toEqual({});
        expect(request.config).toEqual({});
        expect(request.urlParams).toEqual([':id']);
        expect(request.params).toEqual(['name']);
    })
);
