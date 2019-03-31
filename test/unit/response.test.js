const Response = require('../../src/gate/response');
const Headers = require('../../src/gate/headers');
const { check, checkForException } = require('../checkFunctions');

describe('response object test', () => {
    res = null;
    beforeAll(() => {
        res = new Response('body', { url: 'url', status: 200, statusText: 'ok', config: {} });
    });

    test(
        'check response functions',
        check(() => {
            expect(typeof res.blob).toBe('function');
            expect(typeof res.text).toBe('function');
            expect(typeof res.json).toBe('function');
        })
    );

    test(
        'check response props',
        check(() => {
            expect(res.url).toBe('url');
            expect(res.ok).toBe(true);
            expect(res.status).toBe(200);
            expect(res.statusText).toBe('ok');
            expect(res.headers).toBeDefined();
            expect(res.headers instanceof Headers).toBe(true);
            expect(res.body).toBe('body');
            expect(res.id).toBeDefined();
            expect(res.config).toEqual({});
            expect(res.data).toBe('body');
        })
    );

    test('check response text function', async done => {
        let text = await res.text();
        expect(text).toBe('body');
        done();
    });
});

test('check response blob function', async done => {
    let res = new Response(new Blob(['blob text object'], { type: 'text/plain' }), {});
    expect(await res.text()).toBe('blob text object');
    expect(await res.blob()).toEqual(new Blob(['blob text object'], { type: 'text/plain' }));
    done();
});

test('check response json function', async done => {
    let res = new Response('{"url":"url","status":200,"statusText":"ok","config":{}}', {});
    expect(await res.json()).toEqual({ url: 'url', status: 200, statusText: 'ok', config: {} });
    done();
});
