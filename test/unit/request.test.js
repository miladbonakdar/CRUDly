const checkFunctions = require("../checkFunctions");
const request = require("../../src/gate/request");
const http = require("http");

test("check simple get request", () => {
    let server = http
        .createServer(function(req, res) {
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.write("Hello World!");
            res.end();
        })
        .listen(4567, () => {
            request({ url: "localhost:4567/", method: "get" }).then(res => {
                expect(res).toBeDefined();
                server.close();
            });
        });
});
