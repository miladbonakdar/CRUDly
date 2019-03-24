const serverBuilder = require('./serverBuilder');
const testData = require('../data/gateTest.data');
const Crudly = require('../../src/crudly');

describe('check crudly real integration with api', () => {
    let myGate = null;
    let server = null;
    beforeAll(done => {
        server = serverBuilder('/api/v1/', 80, () => {
            console.log('test server is up and runnig');
            done();
        });
    });

    afterAll(() => {
        if (server) {
            server.close();
        }
        server = null;
    });
    describe('check functionality in standard config file', () => {
        beforeAll(() => {
            myGate = Crudly(testData.testConfig);
        });

        describe('check crudly statis functions', () => {
            test('check biult in crudly simple get request', async done => {
                const res = await myGate.statics.get('http://localhost/api/v1/posts?id=123');
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'post get successfuly',
                    query: { id: '123' }
                });
                done();
            });

            test('check biult in crudly simple post request', async done => {
                const res = await myGate.statics.post('http://localhost/api/v1/users', {
                    testData: 1
                });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users created successfuly',
                    body: { testData: 1 }
                });
                done();
            });

            test('check biult in crudly simple put request', async done => {
                const res = await myGate.statics.put('http://localhost/api/v1/users', {
                    testData: 1
                });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users updated successfuly',
                    body: { testData: 1 }
                });
                done();
            });

            test('check biult in crudly simple delete request', async done => {
                const res = await myGate.statics.delete('http://localhost/api/v1/users/123123');
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users removed successfuly',
                    params: { id: '123123' }
                });
                done();
            });

            test('check biult in crudly simple head request', async done => {
                const res = await myGate.statics.head('http://localhost/api/v1/users');
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toBe('');
                done();
            });

            test('check biult in crudly simple patch request', async done => {
                const res = await myGate.statics.patch('http://localhost/api/v1/users', {
                    testData: 1
                });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users patched successfuly',
                    body: { testData: 1 }
                });
                done();
            });

            test('check biult in crudly simple all request', async done => {
                const [res1, res2] = await myGate.statics.all([
                    myGate.statics.patch('http://localhost/api/v1/users', {
                        testData: 1
                    }),
                    myGate.statics.head('http://localhost/api/v1/users')
                ]);
                expect(res1).toBeDefined();
                expect(res1.status).toBe(200);
                expect(res1.data).toEqual({
                    message: 'users patched successfuly',
                    body: { testData: 1 }
                });
                expect(res2).toBeDefined();
                expect(res2.status).toBe(200);
                expect(res2.data).toBe('');

                done();
            });
        });

        describe('check crudly integrate with users controller', () => {
            test('controller users ,action gettype ,method get', async done => {
                const res = await myGate.users.getType();
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    type: 'user'
                });
                done();
            });

            test('controller users ,action create ,method post', async done => {
                const res = await myGate.users.create({
                    firstname: 'milad',
                    lastname: 'bonakdar'
                });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    body: { firstname: 'milad', lastname: 'bonakdar' },
                    message: 'users created successfuly'
                });
                done();
            });

            test('controller users ,action update ,method put', async done => {
                const res = await myGate.users.update({
                    firstname: 'milad',
                    lastname: 'bonakdar'
                });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    body: { firstname: 'milad', lastname: 'bonakdar' },
                    message: 'users updated successfuly'
                });
                done();
            });

            test('controller users ,action delete ,method delete', async done => {
                const res = await myGate.users.delete(123123);
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    params: { id: '123123' },
                    message: 'users removed successfuly'
                });
                done();
            });

            test('controller users ,action get ,method get', async done => {
                const res = await myGate.users.get(123123);
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users get successfuly',
                    query: { id: '123123' }
                });
                done();
            });

            test('controller users ,action head ,method head', async done => {
                const res = await myGate.users.head();
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual('');
                done();
            });

            test('controller users ,action patch ,method patch', async done => {
                const res = await myGate.users.patch({ firstname: 'milad' });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users patched successfuly',
                    body: { firstname: 'milad' }
                });
                done();
            });

            test('controller users ,action dastan ,method get', async done => {
                const res = await myGate.users.dastan(1, 2, 'milawd');
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users get successfuly',
                    params: { id: '1', age: '2', name: 'milawd' }
                });
                done();
            });

            test('controller users ,action testPost ,method post', async done => {
                const res = await myGate.users.testPost({ firstname: 'milad' });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users testPost',
                    body: { firstname: 'milad' }
                });
                done();
            });

            test('controller users ,action testGet ,method get', async done => {
                const res = await myGate.users.testGet(123, 'milawd');
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users getTestkon',
                    query: { id: '123', name: 'milawd' }
                });
                done();
            });
        });

        describe('check crudly integrate with posts controller', () => {
            test('controller posts ,action create ,method post', async done => {
                const res = await myGate.posts.create({
                    firstname: 'milad',
                    lastname: 'bonakdar'
                });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    body: { firstname: 'milad', lastname: 'bonakdar' },
                    message: 'post created successfuly'
                });
                done();
            });

            test('controller posts ,action update ,method put', async done => {
                const res = await myGate.posts.update({
                    firstname: 'milad',
                    lastname: 'bonakdar'
                });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    body: { firstname: 'milad', lastname: 'bonakdar' },
                    message: 'post updated successfuly'
                });
                done();
            });

            test('controller posts ,action delete ,method delete', async done => {
                const res = await myGate.posts.delete(123123);
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    params: { id: '123123' },
                    message: 'post removed successfuly'
                });
                done();
            });

            test('controller posts ,action get ,method get', async done => {
                const res = await myGate.posts.get(123123);
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'post get successfuly',
                    query: { id: '123123' }
                });
                done();
            });

            test('controller posts ,action head ,method head', async done => {
                const res = await myGate.posts.head();
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual('');
                done();
            });

            test('controller posts ,action patch ,method patch', async done => {
                const res = await myGate.posts.patch({ firstname: 'milad' });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'post patched successfuly',
                    body: { firstname: 'milad' }
                });
                done();
            });
        });
    });

    describe('check functionality in controller less config file', () => {
        beforeAll(() => {
            myGate = Crudly(testData.controllerLessConfig);
        });

        describe('check crudly integrate with users controller', () => {
            test('action create ,method post => controllerless config', async done => {
                const res = await myGate.create({
                    firstname: 'milad',
                    lastname: 'bonakdar'
                });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    body: { firstname: 'milad', lastname: 'bonakdar' },
                    message: 'users created successfuly'
                });
                done();
            });

            test('action update ,method put => controllerless config', async done => {
                const res = await myGate.update({
                    firstname: 'milad',
                    lastname: 'bonakdar'
                });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    body: { firstname: 'milad', lastname: 'bonakdar' },
                    message: 'users updated successfuly'
                });
                done();
            });

            test('action remove ,method delete => controllerless config', async done => {
                const res = await myGate.remove(123123);
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    params: { id: '123123' },
                    message: 'users removed successfuly'
                });
                done();
            });

            test('action get ,method get => controllerless config', async done => {
                const res = await myGate.get(123123);
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users get successfuly',
                    query: { id: '123123' }
                });
                done();
            });

            test('action head ,method head => controllerless config', async done => {
                const res = await myGate.head();
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual('');
                done();
            });

            test('action patch ,method patch => controllerless config', async done => {
                const res = await myGate.patch({ firstname: 'milad' });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users patched successfuly',
                    body: { firstname: 'milad' }
                });
                done();
            });

            test('action dastan ,method get => controllerless config', async done => {
                const res = await myGate.dastan(1, 2, 'milawd');
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users get successfuly',
                    params: { id: '1', age: '2', name: 'milawd' }
                });
                done();
            });

            test('action testPost ,method post => controllerless config', async done => {
                const res = await myGate.testPost({ firstname: 'milad' });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users testPost',
                    body: { firstname: 'milad' }
                });
                done();
            });

            test('action testGet ,method get => controllerless config', async done => {
                const res = await myGate.testGet(123, 'milawd');
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users getTestkon',
                    query: { id: '123', name: 'milawd' }
                });
                done();
            });
        });
    });

    describe('check functionality in array config file', () => {
        beforeAll(() => {
            myGate = Crudly(testData.arrayConfig);
        });

        describe('check crudly integrate with users controller', () => {
            test('action create ,method post => array config', async done => {
                const res = await myGate.create({
                    firstname: 'milad',
                    lastname: 'bonakdar'
                });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    body: { firstname: 'milad', lastname: 'bonakdar' },
                    message: 'users created successfuly'
                });
                done();
            });

            test('action update ,method put => array config', async done => {
                const res = await myGate.update({
                    firstname: 'milad',
                    lastname: 'bonakdar'
                });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    body: { firstname: 'milad', lastname: 'bonakdar' },
                    message: 'users updated successfuly'
                });
                done();
            });

            test('action delete ,method delete => array config', async done => {
                const res = await myGate.delete(123123);
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    params: { id: '123123' },
                    message: 'users removed successfuly'
                });
                done();
            });

            test('action get ,method get => array config', async done => {
                const res = await myGate.get(123123);
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users get successfuly',
                    query: { id: '123123' }
                });
                done();
            });

            test('action head ,method head => array config', async done => {
                const res = await myGate.head();
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual('');
                done();
            });

            test('action patch ,method patch => array config', async done => {
                const res = await myGate.patch({ firstname: 'milad' });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users patched successfuly',
                    body: { firstname: 'milad' }
                });
                done();
            });

            test('action dastan ,method get => array config', async done => {
                const res = await myGate.dastan(1, 2, 'milawd');
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users get successfuly',
                    params: { id: '1', age: '2', name: 'milawd' }
                });
                done();
            });

            test('action testPost ,method post => array config', async done => {
                const res = await myGate.testPost({ firstname: 'milad' });
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users testPost',
                    body: { firstname: 'milad' }
                });
                done();
            });

            test('action testGet ,method get => array config', async done => {
                const res = await myGate.testGet(123, 'milawd');
                expect(res).toBeDefined();
                expect(res.status).toBe(200);
                expect(res.data).toEqual({
                    message: 'users getTestkon',
                    query: { id: '123', name: 'milawd' }
                });
                done();
            });
        });
    });
});
