const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const buildUsers = function(app, root) {
    root += 'users/';

    app.get(`${root}getType`, (req, res) => {
        res.json({ type: 'user' });
    });

    app.post(`${root}`, (req, res) => {
        res.json({ message: 'users created successfuly', body: req.body });
    });

    app.put(`${root}`, (req, res) => {
        res.json({ message: 'users updated successfuly', body: req.body });
    });

    app.delete(`${root}:id`, (req, res) => {
        res.json({ message: 'users removed successfuly', params: req.params });
    });

    app.get(`${root}`, (req, res) => {
        res.json({ message: 'users get successfuly', query: req.query });
    });

    app.head(`${root}`, (req, res) => {
        res.json({ message: 'users head' });
    });

    app.patch(`${root}`, (req, res) => {
        res.json({ message: 'users patched successfuly', body: req.body });
    });

    app.get(`${root}customAction/:id/:age/:name`, (req, res) => {
        res.json({ message: 'users get successfuly', params: req.params });
    });

    app.post(`${root}testkon`, (req, res) => {
        res.json({ message: 'users testPost', body: req.body });
    });

    app.get(`${root}getTestkon`, (req, res) => {
        res.json({ message: 'users getTestkon', query: req.query });
    });

    app.get(`${root}error`, (req, res) => {
        res.status(500);
        res.json({ message: 'something goes wrong', query: req.query });
    });
    
    app.post(`${root}unauth`, (req, res) => {
        res.status(401).send('unauthorized');
    });
};

const buildTodos = function(app, root) {
    root += 'todos/';

    app.get(`${root}getType`, (req, res) => {
        res.json({ type: 'todo' });
    });

    app.post(`${root}create`, (req, res) => {
        res.json({ message: 'todo created successfuly', body: req.body });
    });

    app.put(`${root}update`, (req, res) => {
        res.json({ message: 'todo updated successfuly', body: req.body });
    });

    app.delete(`${root}remove/:id`, (req, res) => {
        res.json({ message: 'todo removed successfuly', params: req.params });
    });

    app.get(`${root}get`, (req, res) => {
        res.json({ message: 'todo get successfuly', query: req.query });
    });

    app.head(`${root}head`, (req, res) => {
        res.json({ message: 'todo head' });
    });

    app.patch(`${root}patch`, (req, res) => {
        res.json({ message: 'todo patched successfuly', body: req.body });
    });
};

const buildPosts = function(app, root) {
    root += 'posts/';

    app.post(`${root}`, (req, res) => {
        res.json({ message: 'post created successfuly', body: req.body });
    });

    app.put(`${root}`, (req, res) => {
        res.json({ message: 'post updated successfuly', body: req.body });
    });

    app.delete(`${root}:id`, (req, res) => {
        res.json({ message: 'post removed successfuly', params: req.params });
    });

    app.get(`${root}`, (req, res) => {
        res.json({ message: 'post get successfuly', query: req.query });
    });

    app.head(`${root}`, (req, res) => {
        res.json({ message: 'post head' });
    });

    app.patch(`${root}`, (req, res) => {
        res.json({ message: 'post patched successfuly', body: req.body });
    });
};

const build = function(app, root) {
    buildTodos(app, root);
    buildPosts(app, root);
    buildUsers(app, root);
};

const serverBuilder = function(root = '/api/v1/', port = 80, startCallBack = null) {
    let app = express();
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cors());
    build(app, root);
    app.listen(port, startCallBack);
    return app;
};

module.exports = serverBuilder;
