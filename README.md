# CRUDly

[![npm version](https://img.shields.io/npm/v/crudly.svg?style=flat-square)](https://www.npmjs.org/crudly)
[![Gitter](https://img.shields.io/gitter/room/miladbonakdar/crudly.svg?style=flat-square)](https://gitter.im/CRUDly/community?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge)
[![Requirements Status](https://requires.io/github/miladbonakdar/CRUDly/requirements.svg?branch=master)](https://requires.io/github/miladbonakdar/CRUDly/requirements/?branch=master)
[![install size](https://img.shields.io/bundlephobia/minzip/crudly.svg?style=flat-square)](https://www.npmjs.org/crudly)
[![license](https://img.shields.io/github/license/miladbonakdar/crudly.svg?style=flat-square)](https://github.com/miladbonakdar/CRUDly)
[![downloads](https://img.shields.io/npm/dm/crudly.svg?style=flat-square)](https://www.npmjs.org/crudly)  
Promise based HTTP request library for browser and node.js.
**CRUDly** gives you a gate object to manage all your API routes.  
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

## CRUDly in a nutshell

The `crudlyObj` in the example below is the object that the **CRUDly** created for you. It has `users` controller with some actions (get,create) and `auth` controller. It also has its own action (getSiteSetting).  
**CRUDly** gives you a gate object to manage all your API routes.

All you have to do is pass a valid config object to the `crudly` function:

```js
const crudly = require('crudly');

const config = {
    actions: [{ type: 'get', url: '/setting', name: 'getSiteSetting' }], // route: your-website/setting
    controllers: [
        {
            name: 'users',
            actions: [
                { type: 'get', url: '/:id' }, // method: get route: your-website/users/:id
                { type: 'post' }, // method: post route: your-website/users
                { type: 'delete', url: '/:id' } // method: delete route: your-website/users/:id
            ]
        },
        {
            name: 'auth',
            actions: [{ type: 'post', name: 'login' }] // method: post route: your-website/auth
        }
    ]
};
// create your gate like this
const crudlyObj = crudly(config);
```

And then nice centralized gate object:

```js
// method: get route: your-website/users/:id
let user = await crudlyObj.users.get(123);
// method: post route: your-website/auth
let token = await crudlyObj.auth.login({ username: 'milawd', pass: '123456' });
// method: post route: your-website/users
let response = await crudlyObj.users.create({ username: 'test', pass: '123' });
// method: delete route: your-website/users/:id
await crudlyObj.users.delete(123);
// method: post route: your-website/setting
let siteSetting = await crudlyObj.getSiteSetting();
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

### How to create config file

1. Consider you just have 3 simple APIs. Best way to create your gate is to pass an array of the actions you want.

```js
const crudly = require('crudly');

const config = [
    { type: 'post', url: '/api/v1/users' },
    { type: 'put', url: '/api/v1/users' },
    { type: 'delete', url: '/api/v1/users/:id' }
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

2. The next way to create your gate is to pass a valid config object (recommended). It will give you more futures and options to work aroud. For example, you can specifiy the route of your API or set [Default actions](#Default-actions). Let's see:

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

We have four events that will call in the request lifecycle.

| lifecycle | name         | info                                                    |
| --------- | ------------ | ------------------------------------------------------- |
| 1         | `beforeAny`  | It will be called before any request was sent to server |
| 2         | `beforeEach` | Before each request, it will be called                  |
| 3         | `afterEach`  | After each request, it will be called                   |
| 4         | `afterAll`   | It will be called if all pending requests are done      |

> You can set all these events on the gate object.

### beforeAny

```js
gate.beforeAny(() => {
    console.log('before any request');
});
```

### beforeEach

Here you can check if request URL is valid or not.

```js
gate.beforeEach(request => {
    if (!request.url.startsWith('somthing_valid')) throw new Error('url is not valid');
});
```

Or change request properties.

```js
gate.beforeEach(request => {
    if (!request.method == 'get')
        request.setProperty('headers', { 'content-type': 'application/json' });
});
```

### afterEach

After each request, you can check the result to be valid or maybe you just want a part of the response.
You just have to return part of the response.

```js
gate.afterEach(response => {
    if (response.ok) return response.data;
});
```

Or maybe transform the result.

```js
gate.afterEach(response => {
    if (response.ok) return response.blob();
});
```

### afterAll

```js
gate.afterAll(() => {
    console.log('after all requests');
});
```

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

### Gate functions

You can check if there is uncompleted request by isRequestPending method.

```js
if (!gate.isRequestPending()) {
    console.log('there is no pending request');
}
```

Add new action to the gate object:

```js
//add new action
gate.addAction({ type: 'post', name: 'testAddAction', url: '/api/v1/users' });
//then use
const res = await gate.testAddAction({ username: 'test', pass: '123' });
```

Add new controller to the gate object:

```js
//add new controller
gate.addController({ name: 'companies', url: '/companies', actions: [{ type: 'post', url: '/' ]});
//then use
const res = await gate.companies.create({ companyName: 'test', postCode: '123 1234' });
//it also will take care of the default actions
//so if you were added some default actions before you can use it now
const res = await gate.companies.delete(123456);
```

If you want to merge requests:

```js
const [createRes, user] = await gate.all([
    gate.companies.create({ companyName: 'test', postCode: '123 1234' }),
    gate.users.get(123123)
]);
```

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

## Request

The request object contains these functions

| name        | params               | return   | description                                                     |
| ----------- | -------------------- | -------- | --------------------------------------------------------------- |
| getUrl      | []                   | `string` | Get the url of the request                                      |
| getBody     | []                   | `Object` | Get the body of the request                                     |
| getResponse | []                   | `Object` | If the request is complited it will returns the response object |
| setProperty | [propertyName,Value] | `string` | It can change or set the propery of the request                 |

example:

```js
gate.beforeEach(request => {
    if (!request.method == 'get')
        request.setProperty('headers', { 'content-type': 'application/json' });
});

//or

gate.beforeEach(request => {
    if (!request.method == 'patch') request.setProperty('method', 'post');
});

//...
```

## Response

The response object contains these functions.

| name | params | return                 | description                                                        |
| ---- | ------ | ---------------------- | ------------------------------------------------------------------ |
| blob | []     | `Promise<ArrayBuffer>` | Returns promise that it will resolve the data as a array buffer    |
| text | []     | `Promise<string>`      | Returns promise that it will resolve the data as a string          |
| json | []     | `Promise<any>`         | Returns promise that it will resolve the data as javascript object |

example:

```js
gate.photos
    .get(1234)
    .then(function(response) {
        response.blob();
    })
    .then(function(arrayBuffer) {
        console.log(arrayBuffer);
    })
    .catch(function(error) {
        console.log(error);
    });

gate.users
    .get(1234)
    .then(function(response) {
        response.json();
    })
    .then(function(user) {
        console.log(user);
    })
    .catch(function(error) {
        console.log(error);
    });

//...
```

## Axios functions

You can also have Axios functions like get, put, post... in the gate object.
(we don't recommend this because the core concept of the crudly is to ignore these functions)

```js
const data = await gate.statics.get('http://localhost/api/v1/posts?id=123');
//or
const res = await gate.statics.post('http://localhost/api/v1/users', { testData: 1 });
//...
```

### list of axios functions

| method | name     |
| ------ | -------- |
| get    | `get`    |
| put    | `put`    |
| post   | `post`   |
| delete | `delete` |
| patch  | `patch`  |
| head   | `head`   |

## Resources

-   [Changelog](https://github.com/miladbonakdar/CRUDly/blob/master/CHANGELOG.md)
-   [Contributing](https://github.com/miladbonakdar/CRUDly/blob/master/CONTRIBUTING.md)

## Credits

CRUDly is a usefull wrapper on the powerfull library [axios](https://github.com/axios/axios).
This is just the beginning of our work and we are going to add new things to it if you help our community and if we succeed to attract attention, it will progress.

## License

MIT
