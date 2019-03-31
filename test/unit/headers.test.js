const Headers = require('../../src/gate/headers');
const { check, checkForException } = require('../checkFunctions');

const headerData = {
    'content-type': 'image/png',
    'accept-ranges': 'bytes',
    age: 901710,
    'cache-control': 'public, max-age=31536000',
    'content-length': 24211,
    date: 'Tue, 12 Mar 2019 06:55:01 GMT',
    expires: 'Wed, 11 Mar 2020 06:55:01 GMT',
    'last-modified': 'Mon, 12 Dec 2016 14:45:00 GMT',
    server: 'sffe',
    status: 200,
    vary: 'Origin'
};

describe('create headers object', () => {
    let headers = null;
    beforeAll(() => {
        headers = new Headers(headerData);
    });

    test(
        'check for functions',
        check(() => {
            expect(typeof headers.has).toBe('function');
            expect(typeof headers.get).toBe('function');
            expect(typeof headers.getAll).toBe('function');
            expect(typeof headers.set).toBe('function');
            expect(typeof headers.append).toBe('function');
            expect(typeof headers.delete).toBe('function');
            expect(typeof headers.deleteAll).toBe('function');
        })
    );
    test(
        'check has function',
        check(() => {
            expect(headers.has('content-type')).toBe(true);
            expect(headers.has('content-invalid-type')).toBe(false);
        })
    );

    test(
        'check get function',
        check(() => {
            expect(headers.get('content-type')).toEqual('image/png');
        })
    );

    test(
        'check getAll function',
        check(() => {
            expect(headers.getAll('content-type')).toEqual(['image/png']);
        })
    );

    test(
        'check set function',
        check(() => {
            headers.set('content-type','application/json');
            expect(headers.has('content-type')).toBe(true);
            expect(headers.get('content-type')).toEqual('application/json');
        })
    );

    test(
        'check append function',
        check(() => {
            headers.append('content-type','text');
            expect(headers.has('content-type')).toBe(true);
            expect(headers.get('content-type')).toEqual('application/json,text');
        })
    );

    test(
        'check delete function',
        check(() => {
            headers.delete('content-type');
            expect(headers.has('content-type')).toBe(false);
        })
    );

    test(
        'check delete all function',
        check(() => {
            headers.deleteAll();
            expect(headers.map).toEqual({});
        })
    );
});
