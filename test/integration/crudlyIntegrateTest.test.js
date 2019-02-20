const serverBuilder = require("./serverBuilder");
const testData = require("../data/gateTest.data");
const Crudly = require("../../src/crudly");

describe("check crudly real integration with api", () => {
    let myGate = null;
    let server = null;
    beforeAll(done => {
        myGate = Crudly(testData.testConfig);
        server = serverBuilder("/api/v1/", 80, () => {
            console.log("test server is up and runnig");
            done();
        });
    });

    afterAll(() => {
        if (server) {
            server.close();
        }
        server = null;
    });

    test("check biult in crudly simple get request", async done => {
        const res = await myGate.get("http://localhost/api/v1/posts/get");
        expect(res).toBeDefined();
        expect(res.status).toBe(200);
        expect(res.data).toEqual({ message: "post get successfuly", query: {} });
        done();
    });
    
    test("check biult in crudly simple post request", async done => {
        const res = await myGate.get("http://localhost/api/v1/posts/get");
        expect(res).toBeDefined();
        done();
    });

    // test("check biult in crudly simple post request", async done => {});

    // test("check biult in crudly simple put request", async done => {});

    // test("check biult in crudly simple delete request", async done => {});

    // test("check biult in crudly simple head request", async done => {});

    // test("check biult in crudly simple patch request", async done => {});

    // test("check biult in crudly simple all request", async done => {});
});
