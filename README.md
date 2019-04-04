# CRUDly

[![npm version](https://img.shields.io/npm/v/crudly.svg?style=flat-square)](https://www.npmjs.org/crudly)
[![Gitter](https://img.shields.io/gitter/room/miladbonakdar/crudly.svg?style=flat-square)](https://gitter.im/CRUDly/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Requirements Status](https://requires.io/github/miladbonakdar/CRUDly/requirements.svg?branch=master)](https://requires.io/github/miladbonakdar/CRUDly/requirements/?branch=master)
[![install size](https://img.shields.io/bundlephobia/minzip/crudly.svg?style=flat-square)](https://www.npmjs.org/crudly)
[![license](https://img.shields.io/github/license/miladbonakdar/crudly.svg?style=flat-square)](https://github.com/miladbonakdar/CRUDly)
[![downloads](https://img.shields.io/npm/dm/crudly.svg?style=flat-square)](https://www.npmjs.org/crudly)  
Centralized promise based HTTP client for the browser and node.js .
You just need to create your own gate  
Wrapper on [Axios](https://github.com/axios/axios)

## Features

-   Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser
-   Make [http](http://nodejs.org/api/http.html) requests from node.js
-   Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
-   Intercept request and response
-   Transform request and response data
-   Automatic transforms for JSON data
-   Client side support for protecting against [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)
-   Autogenerate action names
-   Categorizing actions in controllers
-   Default actions for controllers to ignore redundancy

## Installing

Using npm:

```bash
$ npm install CRUDly --save
```

Using yarn:

```bash
$ yarn add CRUDly
```

Using cdn:

```html
<!-- for production-->
<script src="https://unpkg.com/crudly/dist/crudly.min.js"></script>
<!-- for development-->
<script src="https://unpkg.com/crudly/dist/crudly.js"></script>
```

## Example

Maybe you want to send http request to an api like this to get the user whose id is 123.

```json
{ "url": "/api/v1/users/123", "method": "get" }
```

Or maybe an api like this to create new user.

```json
{ "url": "/api/v1/users", "method": "post" }
```

Also an api to delete the user whose id is 123.

```json
{ "url": "/api/v1/users?id=123", "method": "delete" }
```

With **CRUDly** you just need to create your own **gate** to handle these URLs as well. See the examples bellow:

```js
//it will take care of your request and get the user back
let user = await gate.users.get(123);
//it will create the new user and get the response back
let response = await gate.users.create({ username: 'test', pass: '123' });
//easily remove the user
await gate.users.delete(123);
```

> **NOTE:** `async/await` is a part of ECMAScript 2017 and is not supported in Internet
> Explorer and older browsers, so use with caution.

## Create CRUDly gate

All you have to do is pass valid config object to the crudly function:

```js
// in nodejs
const crudly = require('crudly');
// in es6 module
import crudly from 'crudly';

const gate = crudly(config);
```

### How to create config file :

1. Consider you just have 3 simple APIs. Best way to create your gate is to pass an array of the actions you want.

```js
const crudly = require('crudly');

const config = [
    { type: 'post', url: '/api/v1/users' },
    { type: 'put', url: '/api/v1/users' },
    {
        type: 'delete',
        url: '/api/v1/users/:id'
    }
];
// create your gate like this
const gate = crudly(config);
// then you have gate with 3 actions

gate.create({ username: 'test', pass: '123' })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

gate.update({ id: 1234, username: 'test1', pass: '1234' })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

gate.delete(1234)
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });
```

You can see it helps you to call your APIs easier and you don't have to remember each API route and method.

> **NOTE:** If you are confiused about the function names see [Methods map table](#Methods-map-table).

2. The next way to create your gate is to pass a valid config object (recommended). It will give you more futures and options to work aroud. For example, you can specifiy the route of your API or set Default actions](#Default-actions). Let's see:

```js
const crudly = require('crudly');

const config = {
    root: '/api/v1', //root of your api. default is '/'
    defaultActionsConfig: {
        timeout: 1000 //each action will have this property
    },
    // this is actions that will be in te gate object
    actions: [{ type: 'post', url: '/users/users' }, { type: 'put', url: '/users/users' }],
    controllers: [
        {
            //this will create users object in the gate
            //and actions associated with it
            name: 'users',
            url: '/users',
            actions: [
                { type: 'post', timeout: 2000 }, //also you can change default config
                { type: 'put', loadDefaultConfig: false }, //or ignore the default config
                {
                    type: 'delete',
                    url: '/:id'
                }
            ]
        },
        {
            name: 'posts',
            actions: [
                { type: 'post', timeout: 2000 },
                { type: 'put', loadDefaultConfig: false },
                {
                    type: 'delete',
                    url: '/:id'
                },
                { type: 'get', params: ['id'] }, //posts?id=123123
                { type: 'patch' }
            ]
        }
    ]
};
// create your gate like this
const gate = crudly(config);
// then you have gate with 3 actions

gate.create({ username: 'test1', pass: '1234' })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

gate.users
    .create({ username: 'test2', pass: '4321' })
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

gate.posts
    .delete('postid')
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

gate.users
    .delete(1234)
    .then(function(response) {
        console.log(response);
    })
    .catch(function(error) {
        console.log(error);
    });

//... and so on
```

> You can read about config properties here: [Gate config fields](#Gate-config-fields)

It was Simple and flexible. Also, you can see the delete, put and post actions are the same in both controllers.
For making the config object better and easier you can set [Default actions](#Default-actions) array and both controllers will have thease actions.

## Default actions

Lets make the above example better. `defaultActions` is an array that will add its elements to the controllers.
The config can be changed to this object:

```js
const config = {
    root: '/api/v1',
    defaultActionsConfig: {
        timeout: 1000
    },
    actions: [{ type: 'post', url: '/users/users' }, { type: 'put', url: '/users/users' }],
    defaultActions: [
        { type: 'post', timeout: 2000 },
        { type: 'put', loadDefaultConfig: false },
        {
            type: 'delete',
            url: '/:id'
        }
    ],
    controllers: [
        {
            name: 'users',
            url: '/users',
            actions: []
        },
        {
            name: 'posts',
            actions: [
                { type: 'get', params: ['id'] }, //posts?id=123123
                { type: 'patch' }
            ]
        }
    ]
};
```

It will be the same as the previous config file. You can see the `users` controller action's is empty, but it has the delete action. And in the post controller you just have to add two more missing actions.

<span style="color:orange">**problem:**</span> But if you want one more controller and the actions are all different from these two controllers?  
Consider setting controller and it just has the getSetting action.
The above config wont be changed, you just have to add this controller like this:

```js
const config = {
    //...
    controllers: [
        {
            name: 'users',
            url: '/users',
            actions: []
        },
        {
            name: 'posts',
            actions: [
                { type: 'get', params: ['id'] }, //posts?id=123123
                { type: 'patch' }
            ]
        },
        {
            name: 'setting',
            url: '/setting',
            loadDefaults: false,
            actions: [{ type: 'get', name: 'getSetting', url: '/getSetting' }]
        }
    ]
};
```

`loadDefaults` property will help you to fix this problem.

## Interceptors

## Gate

### Gate config fields

The `controllers` field is the minimum gate config field.

> fields with `?` are unnecessary.

| field                 | type       | info                                                                                          |
| --------------------- | ---------- | --------------------------------------------------------------------------------------------- |
| controllers           | **Array**  | List of [Controller configs](#Controller-config-fields)                                       |
| root?                 | **String** | Base route of the API. Default is `/`                                                         |
| defaultActionsConfig? | **Object** | Default [Action configs fields](#Action-config-fields) that will be merged in each action     |
| defaultActions?       | **Array**  | List of default [Action configs](#Action-config-fields) that will be added to each controller |

## Controller

### Controller config fields

The `name` field is the minimum controller config field. The actions can be null because the list also fill with [Default actions](#Default-actions).

> fields with `?` are unnecessary.

| field         | type        | info                                                                          |
| ------------- | ----------- | ----------------------------------------------------------------------------- |
| name          | **String**  | It will be controller object name                                             |
| actions?      | **Array**   | List of [Action configs](#Action-config-fields)                               |
| url?          | **String**  | Controller url. If it not specified it will be `/{controller name}`           |
| loadDefaults? | **Boolean** | If true it will load the [Default actions](#Default-actions). Default is true |

## Action

### Action config fields

The `type` and `url` fields are the minimum action config fields.

> fields with `?` are unnecessary.

| field              | type        | info                                                               |
| ------------------ | ----------- | ------------------------------------------------------------------ |
| type               | **String**  | Method type (`get`, `put`, `post`, `delete`, `patch`, `head`)      |
| url                | **String**  | Action url. In internal calls it Always start with `/`             |
| name?              | **String**  | It will be gate or controller function name                        |
| params?            | **Array**   | Array of the action url query params                               |
| headers?           | **Object**  | Headers are custom headers to be sent                              |
| timeout?           | **Number**  | Specifies the number of milliseconds before the request times out  |
| proxy?             | **Object**  | Defines the hostname and port of the proxy server                  |
| loadDefaultConfig? | **Boolean** | Merge config to default action config. Default is true             |
| auth?              | **Object**  | Indicates that HTTP Basic auth should be used                      |
| responseType?      | **String**  | Indicates the type of data that the server will respond with       |
| responseEncoding?  | **String**  | Indicates encoding to use for decoding responses                   |
| xsrfHeaderName?    | **String**  | The name of the http header that carries the xsrf token value      |
| maxContentLength?  | **Number**  | Defines the max size of the http response content in bytes allowed |
| maxRedirects?      | **Number**  | Defines the maximum number of redirects to follow in node.js       |
| xsrfCookieName?    | **String**  | The name of the cookie to use as a value for xsrf token            |

> **NOTE:** for more information about fields you an see [axios github page](https://github.com/axios/axios).

## Methods map table

You may see untitled actions in the config which also have names. You can see the post method will get `create` name.  
This is the complete table of the methods and default names.

| method | name     |
| ------ | -------- |
| get    | `get`    |
| put    | `update` |
| post   | `create` |
| delete | `delete` |
| patch  | `patch`  |
| head   | `head`   |

> **NOTE:** You can always pass the name in the action config to ignore default names.  
> <span style="color:orange">**Caution:**</span> Names must be uniqe in each section (controller or gate).

## Axios functions

## Resources

-   [Changelog](https://github.com/miladbonakdar/CRUDly/blob/master/CHANGELOG.md)
-   [Contributing](https://github.com/miladbonakdar/CRUDly/blob/master/CONTRIBUTING.md)

## Credits

CRUDly is a usefull wrapper on the powerfull library [axios](https://github.com/axios/axios).
This is just the beginning of our work and we are going to add new things to it if you help our community and if we succeed to attract attention, it will progress.

## License

MIT
