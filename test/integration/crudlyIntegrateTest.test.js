const serverBuilder = require ("./serverBuilder");
const testData = require ("../data/gateTest.data");
const Crudly = require ("../../src/crudly");

describe ("check crudly real integration with api", () => {
    let myGate = null;
    let server = null;
    beforeAll (done => {
        myGate = Crudly (testData.testConfig);
        server = serverBuilder ("/api/v1/", 80, () => {
            console.log ("test server is up and runnig");
            done ();
        });
    });

    afterAll (() => {
        if (server) {
            server.close ();
        }
        server = null;
    });

    describe("check crudly statis functions",()=>{
        test ("check biult in crudly simple get request", async done => {
            const res = await myGate.get ("http://localhost/api/v1/posts/get?id=123");
            expect (res).toBeDefined ();
            expect (res.status).toBe (200);
            expect (res.data).toEqual ({
                message: "post get successfuly",
                query: {id: "123"},
            });
            done ();
        });
    
        test ("check biult in crudly simple post request", async done => {
            const res = await myGate.post ("http://localhost/api/v1/users/create", {
                testData: 1,
            });
            expect (res).toBeDefined ();
            expect (res.status).toBe (200);
            expect (res.data).toEqual ({
                message: "users created successfuly",
                body: {testData: 1},
            });
            done ();
        });
    
        test ("check biult in crudly simple put request", async done => {
            const res = await myGate.put ("http://localhost/api/v1/users/update", {
                testData: 1,
            });
            expect (res).toBeDefined ();
            expect (res.status).toBe (200);
            expect (res.data).toEqual ({
                message: "users updated successfuly",
                body: {testData: 1},
            });
            done ();
        });
    
        test ("check biult in crudly simple delete request", async done => {
            const res = await myGate.delete (
                "http://localhost/api/v1/users/remove/123123"
            );
            expect (res).toBeDefined ();
            expect (res.status).toBe (200);
            expect (res.data).toEqual ({
                message: "users removed successfuly",
                params: {id: "123123"},
            });
            done ();
        });
    
        test ("check biult in crudly simple head request", async done => {
            const res = await myGate.head ("http://localhost/api/v1/users/head");
            expect (res).toBeDefined ();
            expect (res.status).toBe (200);
            expect (res.data).toBe ("");
            done ();
        });
    
        test ("check biult in crudly simple patch request", async done => {
            const res = await myGate.patch ("http://localhost/api/v1/users/patch", {
                testData: 1,
            });
            expect (res).toBeDefined ();
            expect (res.status).toBe (200);
            expect (res.data).toEqual ({
                message: "users patched successfuly",
                body: {testData: 1},
            });
            done ();
        });
    
        test ("check biult in crudly simple all request", async done => {
            const [res1, res2] = await myGate.all ([
                myGate.patch ("http://localhost/api/v1/users/patch",{testData: 1}),
                myGate.head ("http://localhost/api/v1/users/head"),
            ]);
            expect (res1).toBeDefined ();
            expect (res1.status).toBe (200);
            expect (res1.data).toEqual ({
                message: "users patched successfuly",
                body: {testData: 1},
            });
            expect (res2).toBeDefined ();
            expect (res2.status).toBe (200);
            expect (res2.data).toBe ("");
            
            done ();
        });
    });

});
