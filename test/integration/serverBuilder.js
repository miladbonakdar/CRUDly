const express = require("express");
const bodyParser = require("body-parser");

const buildUsers = function(app, root) {
    root += "users/";

    app.get(`${root}getType`, (req, res) => {
        res.json({ type: "user" });
    });

    app.post(`${root}create`, (req, res) => {
        res.json({ message: "users created successfuly", body: req.body });
    });

    app.put(`${root}update`, (req, res) => {
        res.json({ message: "users updated successfuly", body: req.body });
    });

    app.delete(`${root}remove/:id`, (req, res) => {
        res.json({ message: "users removed successfuly", params: req.params });
    });

    app.get(`${root}get`, (req, res) => {
        res.json({ message: "users get successfuly", query: req.query });
    });

    app.head(`${root}head`, (req, res) => {
        res.json({ message: "users head" });
    });

    app.patch(`${root}patch`, (req, res) => {
        res.json({ message: "users patched successfuly", body: req.body });
    });

    app.get(`${root}customAction/:id/:age/:name`, (req, res) => {
        res.json({ message: "users get successfuly", params: req.params });
    });

    app.post(`${root}testkon`, (req, res) => {
        res.json({ message: "users testPost", body: req.body });
    });

    app.get(`${root}getTestkon`, (req, res) => {
        res.json({ message: "users getTestkon", query: req.query });
    });
};

const buildTodos = function(app, root) {
    root += "todos/";

    app.get(`${root}getType`, (req, res) => {
        res.json({ type: "todo" });
    });

    app.post(`${root}create`, (req, res) => {
        res.json({ message: "todo created successfuly", body: req.body });
    });

    app.put(`${root}update`, (req, res) => {
        res.json({ message: "todo updated successfuly", body: req.body });
    });

    app.delete(`${root}remove/:id`, (req, res) => {
        res.json({ message: "todo removed successfuly", params: req.params });
    });

    app.get(`${root}get`, (req, res) => {
        res.json({ message: "todo get successfuly", query: req.query });
    });

    app.head(`${root}head`, (req, res) => {
        res.json({ message: "todo head" });
    });

    app.patch(`${root}patch`, (req, res) => {
        res.json({ message: "todo patched successfuly", body: req.body });
    });
};

const buildPosts = function(app, root) {
    root += "posts/";

    app.post(`${root}create`, (req, res) => {
        res.json({ message: "post created successfuly", body: req.body });
    });

    app.put(`${root}update`, (req, res) => {
        res.json({ message: "post updated successfuly", body: req.body });
    });

    app.delete(`${root}remove/:id`, (req, res) => {
        res.json({ message: "post removed successfuly", params: req.params });
    });

    app.get(`${root}get`, (req, res) => {
        res.json({ message: "post get successfuly", query: req.query });
    });

    app.head(`${root}head`, (req, res) => {
        res.json({ message: "post head" });
    });

    app.patch(`${root}patch`, (req, res) => {
        res.json({ message: "post patched successfuly", body: req.body });
    });
};

const build = function(app, root) {
    buildTodos(app, root);
    buildPosts(app, root);
    buildUsers(app, root);
};

const serverBuilder = function(
    root = "/api/v1/",
    port = 9999,
    startCallBack = null
) {
    let app = express();
    app.use(bodyParser.urlencoded({ extended: true }));
    build(app, root);
    app.listen(port, startCallBack);
};

module.exports = serverBuilder;
