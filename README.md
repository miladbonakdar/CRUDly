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

- Make [XMLHttpRequests](https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest) from the browser
- Make [http](http://nodejs.org/api/http.html) requests from node.js
- Supports the [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) API
- Intercept request and response
- Transform request and response data
- Automatic transforms for JSON data
- Client side support for protecting against [XSRF](http://en.wikipedia.org/wiki/Cross-site_request_forgery)
- Autogenerate action names
- Categorizing actions in controllers
- Default actions for controllers to ignore redundancy

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

## Resources

- [Changelog](https://github.com/miladbonakdar/CRUDly/blob/master/CHANGELOG.md)
- [Contributing](https://github.com/miladbonakdar/CRUDly/blob/master/CONTRIBUTING.md)

## Credits

CRUDly is a usefull wrapper on the powerfull library [axios](https://github.com/axios/axios).
This is just the beginning of our work and we are going to add new things to it if you help our community and if we succeed to attract attention, it will progress.

## License

MIT
