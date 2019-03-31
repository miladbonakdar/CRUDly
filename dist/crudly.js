exports["crudly"] =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./index.js":
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/crudly */ \"./src/crudly.js\");\n\n//# sourceURL=webpack://crudly/./index.js?");

/***/ }),

/***/ "./node_modules/axios/index.js":
/*!*************************************!*\
  !*** ./node_modules/axios/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./lib/axios */ \"./node_modules/axios/lib/axios.js\");\n\n//# sourceURL=webpack://crudly/./node_modules/axios/index.js?");

/***/ }),

/***/ "./node_modules/axios/lib/adapters/xhr.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/adapters/xhr.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar settle = __webpack_require__(/*! ./../core/settle */ \"./node_modules/axios/lib/core/settle.js\");\nvar buildURL = __webpack_require__(/*! ./../helpers/buildURL */ \"./node_modules/axios/lib/helpers/buildURL.js\");\nvar parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ \"./node_modules/axios/lib/helpers/parseHeaders.js\");\nvar isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ \"./node_modules/axios/lib/helpers/isURLSameOrigin.js\");\nvar createError = __webpack_require__(/*! ../core/createError */ \"./node_modules/axios/lib/core/createError.js\");\nvar btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ \"./node_modules/axios/lib/helpers/btoa.js\");\n\nmodule.exports = function xhrAdapter(config) {\n  return new Promise(function dispatchXhrRequest(resolve, reject) {\n    var requestData = config.data;\n    var requestHeaders = config.headers;\n\n    if (utils.isFormData(requestData)) {\n      delete requestHeaders['Content-Type']; // Let the browser set it\n    }\n\n    var request = new XMLHttpRequest();\n    var loadEvent = 'onreadystatechange';\n    var xDomain = false;\n\n    // For IE 8/9 CORS support\n    // Only supports POST and GET calls and doesn't returns the response headers.\n    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.\n    if ( true &&\n        typeof window !== 'undefined' &&\n        window.XDomainRequest && !('withCredentials' in request) &&\n        !isURLSameOrigin(config.url)) {\n      request = new window.XDomainRequest();\n      loadEvent = 'onload';\n      xDomain = true;\n      request.onprogress = function handleProgress() {};\n      request.ontimeout = function handleTimeout() {};\n    }\n\n    // HTTP basic authentication\n    if (config.auth) {\n      var username = config.auth.username || '';\n      var password = config.auth.password || '';\n      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);\n    }\n\n    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);\n\n    // Set the request timeout in MS\n    request.timeout = config.timeout;\n\n    // Listen for ready state\n    request[loadEvent] = function handleLoad() {\n      if (!request || (request.readyState !== 4 && !xDomain)) {\n        return;\n      }\n\n      // The request errored out and we didn't get a response, this will be\n      // handled by onerror instead\n      // With one exception: request that using file: protocol, most browsers\n      // will return status as 0 even though it's a successful request\n      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {\n        return;\n      }\n\n      // Prepare the response\n      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;\n      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;\n      var response = {\n        data: responseData,\n        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)\n        status: request.status === 1223 ? 204 : request.status,\n        statusText: request.status === 1223 ? 'No Content' : request.statusText,\n        headers: responseHeaders,\n        config: config,\n        request: request\n      };\n\n      settle(resolve, reject, response);\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle low level network errors\n    request.onerror = function handleError() {\n      // Real errors are hidden from us by the browser\n      // onerror should only fire if it's a network error\n      reject(createError('Network Error', config, null, request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Handle timeout\n    request.ontimeout = function handleTimeout() {\n      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',\n        request));\n\n      // Clean up request\n      request = null;\n    };\n\n    // Add xsrf header\n    // This is only done if running in a standard browser environment.\n    // Specifically not if we're in a web worker, or react-native.\n    if (utils.isStandardBrowserEnv()) {\n      var cookies = __webpack_require__(/*! ./../helpers/cookies */ \"./node_modules/axios/lib/helpers/cookies.js\");\n\n      // Add xsrf header\n      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?\n          cookies.read(config.xsrfCookieName) :\n          undefined;\n\n      if (xsrfValue) {\n        requestHeaders[config.xsrfHeaderName] = xsrfValue;\n      }\n    }\n\n    // Add headers to the request\n    if ('setRequestHeader' in request) {\n      utils.forEach(requestHeaders, function setRequestHeader(val, key) {\n        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {\n          // Remove Content-Type if data is undefined\n          delete requestHeaders[key];\n        } else {\n          // Otherwise add header to the request\n          request.setRequestHeader(key, val);\n        }\n      });\n    }\n\n    // Add withCredentials to request if needed\n    if (config.withCredentials) {\n      request.withCredentials = true;\n    }\n\n    // Add responseType to request if needed\n    if (config.responseType) {\n      try {\n        request.responseType = config.responseType;\n      } catch (e) {\n        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.\n        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.\n        if (config.responseType !== 'json') {\n          throw e;\n        }\n      }\n    }\n\n    // Handle progress if needed\n    if (typeof config.onDownloadProgress === 'function') {\n      request.addEventListener('progress', config.onDownloadProgress);\n    }\n\n    // Not all browsers support upload events\n    if (typeof config.onUploadProgress === 'function' && request.upload) {\n      request.upload.addEventListener('progress', config.onUploadProgress);\n    }\n\n    if (config.cancelToken) {\n      // Handle cancellation\n      config.cancelToken.promise.then(function onCanceled(cancel) {\n        if (!request) {\n          return;\n        }\n\n        request.abort();\n        reject(cancel);\n        // Clean up request\n        request = null;\n      });\n    }\n\n    if (requestData === undefined) {\n      requestData = null;\n    }\n\n    // Send the request\n    request.send(requestData);\n  });\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/adapters/xhr.js?");

/***/ }),

/***/ "./node_modules/axios/lib/axios.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/axios.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar Axios = __webpack_require__(/*! ./core/Axios */ \"./node_modules/axios/lib/core/Axios.js\");\nvar defaults = __webpack_require__(/*! ./defaults */ \"./node_modules/axios/lib/defaults.js\");\n\n/**\n * Create an instance of Axios\n *\n * @param {Object} defaultConfig The default config for the instance\n * @return {Axios} A new instance of Axios\n */\nfunction createInstance(defaultConfig) {\n  var context = new Axios(defaultConfig);\n  var instance = bind(Axios.prototype.request, context);\n\n  // Copy axios.prototype to instance\n  utils.extend(instance, Axios.prototype, context);\n\n  // Copy context to instance\n  utils.extend(instance, context);\n\n  return instance;\n}\n\n// Create the default instance to be exported\nvar axios = createInstance(defaults);\n\n// Expose Axios class to allow class inheritance\naxios.Axios = Axios;\n\n// Factory for creating new instances\naxios.create = function create(instanceConfig) {\n  return createInstance(utils.merge(defaults, instanceConfig));\n};\n\n// Expose Cancel & CancelToken\naxios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\naxios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ \"./node_modules/axios/lib/cancel/CancelToken.js\");\naxios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\n\n// Expose all/spread\naxios.all = function all(promises) {\n  return Promise.all(promises);\n};\naxios.spread = __webpack_require__(/*! ./helpers/spread */ \"./node_modules/axios/lib/helpers/spread.js\");\n\nmodule.exports = axios;\n\n// Allow use of default import syntax in TypeScript\nmodule.exports.default = axios;\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/Cancel.js":
/*!*************************************************!*\
  !*** ./node_modules/axios/lib/cancel/Cancel.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * A `Cancel` is an object that is thrown when an operation is canceled.\n *\n * @class\n * @param {string=} message The message.\n */\nfunction Cancel(message) {\n  this.message = message;\n}\n\nCancel.prototype.toString = function toString() {\n  return 'Cancel' + (this.message ? ': ' + this.message : '');\n};\n\nCancel.prototype.__CANCEL__ = true;\n\nmodule.exports = Cancel;\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/cancel/Cancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/CancelToken.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/cancel/CancelToken.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Cancel = __webpack_require__(/*! ./Cancel */ \"./node_modules/axios/lib/cancel/Cancel.js\");\n\n/**\n * A `CancelToken` is an object that can be used to request cancellation of an operation.\n *\n * @class\n * @param {Function} executor The executor function.\n */\nfunction CancelToken(executor) {\n  if (typeof executor !== 'function') {\n    throw new TypeError('executor must be a function.');\n  }\n\n  var resolvePromise;\n  this.promise = new Promise(function promiseExecutor(resolve) {\n    resolvePromise = resolve;\n  });\n\n  var token = this;\n  executor(function cancel(message) {\n    if (token.reason) {\n      // Cancellation has already been requested\n      return;\n    }\n\n    token.reason = new Cancel(message);\n    resolvePromise(token.reason);\n  });\n}\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nCancelToken.prototype.throwIfRequested = function throwIfRequested() {\n  if (this.reason) {\n    throw this.reason;\n  }\n};\n\n/**\n * Returns an object that contains a new `CancelToken` and a function that, when called,\n * cancels the `CancelToken`.\n */\nCancelToken.source = function source() {\n  var cancel;\n  var token = new CancelToken(function executor(c) {\n    cancel = c;\n  });\n  return {\n    token: token,\n    cancel: cancel\n  };\n};\n\nmodule.exports = CancelToken;\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/cancel/CancelToken.js?");

/***/ }),

/***/ "./node_modules/axios/lib/cancel/isCancel.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/cancel/isCancel.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function isCancel(value) {\n  return !!(value && value.__CANCEL__);\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/cancel/isCancel.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/Axios.js":
/*!**********************************************!*\
  !*** ./node_modules/axios/lib/core/Axios.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar defaults = __webpack_require__(/*! ./../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ \"./node_modules/axios/lib/core/InterceptorManager.js\");\nvar dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ \"./node_modules/axios/lib/core/dispatchRequest.js\");\n\n/**\n * Create a new instance of Axios\n *\n * @param {Object} instanceConfig The default config for the instance\n */\nfunction Axios(instanceConfig) {\n  this.defaults = instanceConfig;\n  this.interceptors = {\n    request: new InterceptorManager(),\n    response: new InterceptorManager()\n  };\n}\n\n/**\n * Dispatch a request\n *\n * @param {Object} config The config specific for this request (merged with this.defaults)\n */\nAxios.prototype.request = function request(config) {\n  /*eslint no-param-reassign:0*/\n  // Allow for axios('example/url'[, config]) a la fetch API\n  if (typeof config === 'string') {\n    config = utils.merge({\n      url: arguments[0]\n    }, arguments[1]);\n  }\n\n  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);\n  config.method = config.method.toLowerCase();\n\n  // Hook up interceptors middleware\n  var chain = [dispatchRequest, undefined];\n  var promise = Promise.resolve(config);\n\n  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {\n    chain.unshift(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {\n    chain.push(interceptor.fulfilled, interceptor.rejected);\n  });\n\n  while (chain.length) {\n    promise = promise.then(chain.shift(), chain.shift());\n  }\n\n  return promise;\n};\n\n// Provide aliases for supported request methods\nutils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url\n    }));\n  };\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  /*eslint func-names:0*/\n  Axios.prototype[method] = function(url, data, config) {\n    return this.request(utils.merge(config || {}, {\n      method: method,\n      url: url,\n      data: data\n    }));\n  };\n});\n\nmodule.exports = Axios;\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/core/Axios.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/InterceptorManager.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/core/InterceptorManager.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction InterceptorManager() {\n  this.handlers = [];\n}\n\n/**\n * Add a new interceptor to the stack\n *\n * @param {Function} fulfilled The function to handle `then` for a `Promise`\n * @param {Function} rejected The function to handle `reject` for a `Promise`\n *\n * @return {Number} An ID used to remove interceptor later\n */\nInterceptorManager.prototype.use = function use(fulfilled, rejected) {\n  this.handlers.push({\n    fulfilled: fulfilled,\n    rejected: rejected\n  });\n  return this.handlers.length - 1;\n};\n\n/**\n * Remove an interceptor from the stack\n *\n * @param {Number} id The ID that was returned by `use`\n */\nInterceptorManager.prototype.eject = function eject(id) {\n  if (this.handlers[id]) {\n    this.handlers[id] = null;\n  }\n};\n\n/**\n * Iterate over all the registered interceptors\n *\n * This method is particularly useful for skipping over any\n * interceptors that may have become `null` calling `eject`.\n *\n * @param {Function} fn The function to call for each interceptor\n */\nInterceptorManager.prototype.forEach = function forEach(fn) {\n  utils.forEach(this.handlers, function forEachHandler(h) {\n    if (h !== null) {\n      fn(h);\n    }\n  });\n};\n\nmodule.exports = InterceptorManager;\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/core/InterceptorManager.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/createError.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/core/createError.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar enhanceError = __webpack_require__(/*! ./enhanceError */ \"./node_modules/axios/lib/core/enhanceError.js\");\n\n/**\n * Create an Error with the specified message, config, error code, request and response.\n *\n * @param {string} message The error message.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The created error.\n */\nmodule.exports = function createError(message, config, code, request, response) {\n  var error = new Error(message);\n  return enhanceError(error, config, code, request, response);\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/core/createError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/dispatchRequest.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/core/dispatchRequest.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\nvar transformData = __webpack_require__(/*! ./transformData */ \"./node_modules/axios/lib/core/transformData.js\");\nvar isCancel = __webpack_require__(/*! ../cancel/isCancel */ \"./node_modules/axios/lib/cancel/isCancel.js\");\nvar defaults = __webpack_require__(/*! ../defaults */ \"./node_modules/axios/lib/defaults.js\");\nvar isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ \"./node_modules/axios/lib/helpers/isAbsoluteURL.js\");\nvar combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ \"./node_modules/axios/lib/helpers/combineURLs.js\");\n\n/**\n * Throws a `Cancel` if cancellation has been requested.\n */\nfunction throwIfCancellationRequested(config) {\n  if (config.cancelToken) {\n    config.cancelToken.throwIfRequested();\n  }\n}\n\n/**\n * Dispatch a request to the server using the configured adapter.\n *\n * @param {object} config The config that is to be used for the request\n * @returns {Promise} The Promise to be fulfilled\n */\nmodule.exports = function dispatchRequest(config) {\n  throwIfCancellationRequested(config);\n\n  // Support baseURL config\n  if (config.baseURL && !isAbsoluteURL(config.url)) {\n    config.url = combineURLs(config.baseURL, config.url);\n  }\n\n  // Ensure headers exist\n  config.headers = config.headers || {};\n\n  // Transform request data\n  config.data = transformData(\n    config.data,\n    config.headers,\n    config.transformRequest\n  );\n\n  // Flatten headers\n  config.headers = utils.merge(\n    config.headers.common || {},\n    config.headers[config.method] || {},\n    config.headers || {}\n  );\n\n  utils.forEach(\n    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],\n    function cleanHeaderConfig(method) {\n      delete config.headers[method];\n    }\n  );\n\n  var adapter = config.adapter || defaults.adapter;\n\n  return adapter(config).then(function onAdapterResolution(response) {\n    throwIfCancellationRequested(config);\n\n    // Transform response data\n    response.data = transformData(\n      response.data,\n      response.headers,\n      config.transformResponse\n    );\n\n    return response;\n  }, function onAdapterRejection(reason) {\n    if (!isCancel(reason)) {\n      throwIfCancellationRequested(config);\n\n      // Transform response data\n      if (reason && reason.response) {\n        reason.response.data = transformData(\n          reason.response.data,\n          reason.response.headers,\n          config.transformResponse\n        );\n      }\n    }\n\n    return Promise.reject(reason);\n  });\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/core/dispatchRequest.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/enhanceError.js":
/*!*****************************************************!*\
  !*** ./node_modules/axios/lib/core/enhanceError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Update an Error with the specified config, error code, and response.\n *\n * @param {Error} error The error to update.\n * @param {Object} config The config.\n * @param {string} [code] The error code (for example, 'ECONNABORTED').\n * @param {Object} [request] The request.\n * @param {Object} [response] The response.\n * @returns {Error} The error.\n */\nmodule.exports = function enhanceError(error, config, code, request, response) {\n  error.config = config;\n  if (code) {\n    error.code = code;\n  }\n  error.request = request;\n  error.response = response;\n  return error;\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/core/enhanceError.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/settle.js":
/*!***********************************************!*\
  !*** ./node_modules/axios/lib/core/settle.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar createError = __webpack_require__(/*! ./createError */ \"./node_modules/axios/lib/core/createError.js\");\n\n/**\n * Resolve or reject a Promise based on response status.\n *\n * @param {Function} resolve A function that resolves the promise.\n * @param {Function} reject A function that rejects the promise.\n * @param {object} response The response.\n */\nmodule.exports = function settle(resolve, reject, response) {\n  var validateStatus = response.config.validateStatus;\n  // Note: status is not exposed by XDomainRequest\n  if (!response.status || !validateStatus || validateStatus(response.status)) {\n    resolve(response);\n  } else {\n    reject(createError(\n      'Request failed with status code ' + response.status,\n      response.config,\n      null,\n      response.request,\n      response\n    ));\n  }\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/core/settle.js?");

/***/ }),

/***/ "./node_modules/axios/lib/core/transformData.js":
/*!******************************************************!*\
  !*** ./node_modules/axios/lib/core/transformData.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n/**\n * Transform the data for a request or a response\n *\n * @param {Object|String} data The data to be transformed\n * @param {Array} headers The headers for the request or response\n * @param {Array|Function} fns A single function or Array of functions\n * @returns {*} The resulting transformed data\n */\nmodule.exports = function transformData(data, headers, fns) {\n  /*eslint no-param-reassign:0*/\n  utils.forEach(fns, function transform(fn) {\n    data = fn(data, headers);\n  });\n\n  return data;\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/core/transformData.js?");

/***/ }),

/***/ "./node_modules/axios/lib/defaults.js":
/*!********************************************!*\
  !*** ./node_modules/axios/lib/defaults.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("/* WEBPACK VAR INJECTION */(function(process) {\n\nvar utils = __webpack_require__(/*! ./utils */ \"./node_modules/axios/lib/utils.js\");\nvar normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ \"./node_modules/axios/lib/helpers/normalizeHeaderName.js\");\n\nvar DEFAULT_CONTENT_TYPE = {\n  'Content-Type': 'application/x-www-form-urlencoded'\n};\n\nfunction setContentTypeIfUnset(headers, value) {\n  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {\n    headers['Content-Type'] = value;\n  }\n}\n\nfunction getDefaultAdapter() {\n  var adapter;\n  if (typeof XMLHttpRequest !== 'undefined') {\n    // For browsers use XHR adapter\n    adapter = __webpack_require__(/*! ./adapters/xhr */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  } else if (typeof process !== 'undefined') {\n    // For node use HTTP adapter\n    adapter = __webpack_require__(/*! ./adapters/http */ \"./node_modules/axios/lib/adapters/xhr.js\");\n  }\n  return adapter;\n}\n\nvar defaults = {\n  adapter: getDefaultAdapter(),\n\n  transformRequest: [function transformRequest(data, headers) {\n    normalizeHeaderName(headers, 'Content-Type');\n    if (utils.isFormData(data) ||\n      utils.isArrayBuffer(data) ||\n      utils.isBuffer(data) ||\n      utils.isStream(data) ||\n      utils.isFile(data) ||\n      utils.isBlob(data)\n    ) {\n      return data;\n    }\n    if (utils.isArrayBufferView(data)) {\n      return data.buffer;\n    }\n    if (utils.isURLSearchParams(data)) {\n      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');\n      return data.toString();\n    }\n    if (utils.isObject(data)) {\n      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');\n      return JSON.stringify(data);\n    }\n    return data;\n  }],\n\n  transformResponse: [function transformResponse(data) {\n    /*eslint no-param-reassign:0*/\n    if (typeof data === 'string') {\n      try {\n        data = JSON.parse(data);\n      } catch (e) { /* Ignore */ }\n    }\n    return data;\n  }],\n\n  /**\n   * A timeout in milliseconds to abort a request. If set to 0 (default) a\n   * timeout is not created.\n   */\n  timeout: 0,\n\n  xsrfCookieName: 'XSRF-TOKEN',\n  xsrfHeaderName: 'X-XSRF-TOKEN',\n\n  maxContentLength: -1,\n\n  validateStatus: function validateStatus(status) {\n    return status >= 200 && status < 300;\n  }\n};\n\ndefaults.headers = {\n  common: {\n    'Accept': 'application/json, text/plain, */*'\n  }\n};\n\nutils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {\n  defaults.headers[method] = {};\n});\n\nutils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {\n  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);\n});\n\nmodule.exports = defaults;\n\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ \"./node_modules/process/browser.js\")))\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/defaults.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/bind.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/bind.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nmodule.exports = function bind(fn, thisArg) {\n  return function wrap() {\n    var args = new Array(arguments.length);\n    for (var i = 0; i < args.length; i++) {\n      args[i] = arguments[i];\n    }\n    return fn.apply(thisArg, args);\n  };\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/helpers/bind.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/btoa.js":
/*!************************************************!*\
  !*** ./node_modules/axios/lib/helpers/btoa.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js\n\nvar chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';\n\nfunction E() {\n  this.message = 'String contains an invalid character';\n}\nE.prototype = new Error;\nE.prototype.code = 5;\nE.prototype.name = 'InvalidCharacterError';\n\nfunction btoa(input) {\n  var str = String(input);\n  var output = '';\n  for (\n    // initialize result and counter\n    var block, charCode, idx = 0, map = chars;\n    // if the next str index does not exist:\n    //   change the mapping table to \"=\"\n    //   check if d has no fractional digits\n    str.charAt(idx | 0) || (map = '=', idx % 1);\n    // \"8 - idx % 1 * 8\" generates the sequence 2, 4, 6, 8\n    output += map.charAt(63 & block >> 8 - idx % 1 * 8)\n  ) {\n    charCode = str.charCodeAt(idx += 3 / 4);\n    if (charCode > 0xFF) {\n      throw new E();\n    }\n    block = block << 8 | charCode;\n  }\n  return output;\n}\n\nmodule.exports = btoa;\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/helpers/btoa.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/buildURL.js":
/*!****************************************************!*\
  !*** ./node_modules/axios/lib/helpers/buildURL.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nfunction encode(val) {\n  return encodeURIComponent(val).\n    replace(/%40/gi, '@').\n    replace(/%3A/gi, ':').\n    replace(/%24/g, '$').\n    replace(/%2C/gi, ',').\n    replace(/%20/g, '+').\n    replace(/%5B/gi, '[').\n    replace(/%5D/gi, ']');\n}\n\n/**\n * Build a URL by appending params to the end\n *\n * @param {string} url The base of the url (e.g., http://www.google.com)\n * @param {object} [params] The params to be appended\n * @returns {string} The formatted url\n */\nmodule.exports = function buildURL(url, params, paramsSerializer) {\n  /*eslint no-param-reassign:0*/\n  if (!params) {\n    return url;\n  }\n\n  var serializedParams;\n  if (paramsSerializer) {\n    serializedParams = paramsSerializer(params);\n  } else if (utils.isURLSearchParams(params)) {\n    serializedParams = params.toString();\n  } else {\n    var parts = [];\n\n    utils.forEach(params, function serialize(val, key) {\n      if (val === null || typeof val === 'undefined') {\n        return;\n      }\n\n      if (utils.isArray(val)) {\n        key = key + '[]';\n      } else {\n        val = [val];\n      }\n\n      utils.forEach(val, function parseValue(v) {\n        if (utils.isDate(v)) {\n          v = v.toISOString();\n        } else if (utils.isObject(v)) {\n          v = JSON.stringify(v);\n        }\n        parts.push(encode(key) + '=' + encode(v));\n      });\n    });\n\n    serializedParams = parts.join('&');\n  }\n\n  if (serializedParams) {\n    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;\n  }\n\n  return url;\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/helpers/buildURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/combineURLs.js":
/*!*******************************************************!*\
  !*** ./node_modules/axios/lib/helpers/combineURLs.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Creates a new URL by combining the specified URLs\n *\n * @param {string} baseURL The base URL\n * @param {string} relativeURL The relative URL\n * @returns {string} The combined URL\n */\nmodule.exports = function combineURLs(baseURL, relativeURL) {\n  return relativeURL\n    ? baseURL.replace(/\\/+$/, '') + '/' + relativeURL.replace(/^\\/+/, '')\n    : baseURL;\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/helpers/combineURLs.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/cookies.js":
/*!***************************************************!*\
  !*** ./node_modules/axios/lib/helpers/cookies.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs support document.cookie\n  (function standardBrowserEnv() {\n    return {\n      write: function write(name, value, expires, path, domain, secure) {\n        var cookie = [];\n        cookie.push(name + '=' + encodeURIComponent(value));\n\n        if (utils.isNumber(expires)) {\n          cookie.push('expires=' + new Date(expires).toGMTString());\n        }\n\n        if (utils.isString(path)) {\n          cookie.push('path=' + path);\n        }\n\n        if (utils.isString(domain)) {\n          cookie.push('domain=' + domain);\n        }\n\n        if (secure === true) {\n          cookie.push('secure');\n        }\n\n        document.cookie = cookie.join('; ');\n      },\n\n      read: function read(name) {\n        var match = document.cookie.match(new RegExp('(^|;\\\\s*)(' + name + ')=([^;]*)'));\n        return (match ? decodeURIComponent(match[3]) : null);\n      },\n\n      remove: function remove(name) {\n        this.write(name, '', Date.now() - 86400000);\n      }\n    };\n  })() :\n\n  // Non standard browser env (web workers, react-native) lack needed support.\n  (function nonStandardBrowserEnv() {\n    return {\n      write: function write() {},\n      read: function read() { return null; },\n      remove: function remove() {}\n    };\n  })()\n);\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/helpers/cookies.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!*********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Determines whether the specified URL is absolute\n *\n * @param {string} url The URL to test\n * @returns {boolean} True if the specified URL is absolute, otherwise false\n */\nmodule.exports = function isAbsoluteURL(url) {\n  // A URL is considered absolute if it begins with \"<scheme>://\" or \"//\" (protocol-relative URL).\n  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed\n  // by any combination of letters, digits, plus, period, or hyphen.\n  return /^([a-z][a-z\\d\\+\\-\\.]*:)?\\/\\//i.test(url);\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/helpers/isAbsoluteURL.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!***********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = (\n  utils.isStandardBrowserEnv() ?\n\n  // Standard browser envs have full support of the APIs needed to test\n  // whether the request URL is of the same origin as current location.\n  (function standardBrowserEnv() {\n    var msie = /(msie|trident)/i.test(navigator.userAgent);\n    var urlParsingNode = document.createElement('a');\n    var originURL;\n\n    /**\n    * Parse a URL to discover it's components\n    *\n    * @param {String} url The URL to be parsed\n    * @returns {Object}\n    */\n    function resolveURL(url) {\n      var href = url;\n\n      if (msie) {\n        // IE needs attribute set twice to normalize properties\n        urlParsingNode.setAttribute('href', href);\n        href = urlParsingNode.href;\n      }\n\n      urlParsingNode.setAttribute('href', href);\n\n      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils\n      return {\n        href: urlParsingNode.href,\n        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',\n        host: urlParsingNode.host,\n        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\\?/, '') : '',\n        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',\n        hostname: urlParsingNode.hostname,\n        port: urlParsingNode.port,\n        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?\n                  urlParsingNode.pathname :\n                  '/' + urlParsingNode.pathname\n      };\n    }\n\n    originURL = resolveURL(window.location.href);\n\n    /**\n    * Determine if a URL shares the same origin as the current location\n    *\n    * @param {String} requestURL The URL to test\n    * @returns {boolean} True if URL shares the same origin, otherwise false\n    */\n    return function isURLSameOrigin(requestURL) {\n      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;\n      return (parsed.protocol === originURL.protocol &&\n            parsed.host === originURL.host);\n    };\n  })() :\n\n  // Non standard browser envs (web workers, react-native) lack needed support.\n  (function nonStandardBrowserEnv() {\n    return function isURLSameOrigin() {\n      return true;\n    };\n  })()\n);\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/helpers/isURLSameOrigin.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!***************************************************************!*\
  !*** ./node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ../utils */ \"./node_modules/axios/lib/utils.js\");\n\nmodule.exports = function normalizeHeaderName(headers, normalizedName) {\n  utils.forEach(headers, function processHeader(value, name) {\n    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {\n      headers[normalizedName] = value;\n      delete headers[name];\n    }\n  });\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/helpers/normalizeHeaderName.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/parseHeaders.js":
/*!********************************************************!*\
  !*** ./node_modules/axios/lib/helpers/parseHeaders.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar utils = __webpack_require__(/*! ./../utils */ \"./node_modules/axios/lib/utils.js\");\n\n// Headers whose duplicates are ignored by node\n// c.f. https://nodejs.org/api/http.html#http_message_headers\nvar ignoreDuplicateOf = [\n  'age', 'authorization', 'content-length', 'content-type', 'etag',\n  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',\n  'last-modified', 'location', 'max-forwards', 'proxy-authorization',\n  'referer', 'retry-after', 'user-agent'\n];\n\n/**\n * Parse headers into an object\n *\n * ```\n * Date: Wed, 27 Aug 2014 08:58:49 GMT\n * Content-Type: application/json\n * Connection: keep-alive\n * Transfer-Encoding: chunked\n * ```\n *\n * @param {String} headers Headers needing to be parsed\n * @returns {Object} Headers parsed into an object\n */\nmodule.exports = function parseHeaders(headers) {\n  var parsed = {};\n  var key;\n  var val;\n  var i;\n\n  if (!headers) { return parsed; }\n\n  utils.forEach(headers.split('\\n'), function parser(line) {\n    i = line.indexOf(':');\n    key = utils.trim(line.substr(0, i)).toLowerCase();\n    val = utils.trim(line.substr(i + 1));\n\n    if (key) {\n      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {\n        return;\n      }\n      if (key === 'set-cookie') {\n        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);\n      } else {\n        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;\n      }\n    }\n  });\n\n  return parsed;\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/helpers/parseHeaders.js?");

/***/ }),

/***/ "./node_modules/axios/lib/helpers/spread.js":
/*!**************************************************!*\
  !*** ./node_modules/axios/lib/helpers/spread.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\n/**\n * Syntactic sugar for invoking a function and expanding an array for arguments.\n *\n * Common use case would be to use `Function.prototype.apply`.\n *\n *  ```js\n *  function f(x, y, z) {}\n *  var args = [1, 2, 3];\n *  f.apply(null, args);\n *  ```\n *\n * With `spread` this example can be re-written.\n *\n *  ```js\n *  spread(function(x, y, z) {})([1, 2, 3]);\n *  ```\n *\n * @param {Function} callback\n * @returns {Function}\n */\nmodule.exports = function spread(callback) {\n  return function wrap(arr) {\n    return callback.apply(null, arr);\n  };\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/helpers/spread.js?");

/***/ }),

/***/ "./node_modules/axios/lib/utils.js":
/*!*****************************************!*\
  !*** ./node_modules/axios/lib/utils.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar bind = __webpack_require__(/*! ./helpers/bind */ \"./node_modules/axios/lib/helpers/bind.js\");\nvar isBuffer = __webpack_require__(/*! is-buffer */ \"./node_modules/is-buffer/index.js\");\n\n/*global toString:true*/\n\n// utils is a library of generic helper functions non-specific to axios\n\nvar toString = Object.prototype.toString;\n\n/**\n * Determine if a value is an Array\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Array, otherwise false\n */\nfunction isArray(val) {\n  return toString.call(val) === '[object Array]';\n}\n\n/**\n * Determine if a value is an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an ArrayBuffer, otherwise false\n */\nfunction isArrayBuffer(val) {\n  return toString.call(val) === '[object ArrayBuffer]';\n}\n\n/**\n * Determine if a value is a FormData\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an FormData, otherwise false\n */\nfunction isFormData(val) {\n  return (typeof FormData !== 'undefined') && (val instanceof FormData);\n}\n\n/**\n * Determine if a value is a view on an ArrayBuffer\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false\n */\nfunction isArrayBufferView(val) {\n  var result;\n  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {\n    result = ArrayBuffer.isView(val);\n  } else {\n    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);\n  }\n  return result;\n}\n\n/**\n * Determine if a value is a String\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a String, otherwise false\n */\nfunction isString(val) {\n  return typeof val === 'string';\n}\n\n/**\n * Determine if a value is a Number\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Number, otherwise false\n */\nfunction isNumber(val) {\n  return typeof val === 'number';\n}\n\n/**\n * Determine if a value is undefined\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if the value is undefined, otherwise false\n */\nfunction isUndefined(val) {\n  return typeof val === 'undefined';\n}\n\n/**\n * Determine if a value is an Object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is an Object, otherwise false\n */\nfunction isObject(val) {\n  return val !== null && typeof val === 'object';\n}\n\n/**\n * Determine if a value is a Date\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Date, otherwise false\n */\nfunction isDate(val) {\n  return toString.call(val) === '[object Date]';\n}\n\n/**\n * Determine if a value is a File\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a File, otherwise false\n */\nfunction isFile(val) {\n  return toString.call(val) === '[object File]';\n}\n\n/**\n * Determine if a value is a Blob\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Blob, otherwise false\n */\nfunction isBlob(val) {\n  return toString.call(val) === '[object Blob]';\n}\n\n/**\n * Determine if a value is a Function\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Function, otherwise false\n */\nfunction isFunction(val) {\n  return toString.call(val) === '[object Function]';\n}\n\n/**\n * Determine if a value is a Stream\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a Stream, otherwise false\n */\nfunction isStream(val) {\n  return isObject(val) && isFunction(val.pipe);\n}\n\n/**\n * Determine if a value is a URLSearchParams object\n *\n * @param {Object} val The value to test\n * @returns {boolean} True if value is a URLSearchParams object, otherwise false\n */\nfunction isURLSearchParams(val) {\n  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;\n}\n\n/**\n * Trim excess whitespace off the beginning and end of a string\n *\n * @param {String} str The String to trim\n * @returns {String} The String freed of excess whitespace\n */\nfunction trim(str) {\n  return str.replace(/^\\s*/, '').replace(/\\s*$/, '');\n}\n\n/**\n * Determine if we're running in a standard browser environment\n *\n * This allows axios to run in a web worker, and react-native.\n * Both environments support XMLHttpRequest, but not fully standard globals.\n *\n * web workers:\n *  typeof window -> undefined\n *  typeof document -> undefined\n *\n * react-native:\n *  navigator.product -> 'ReactNative'\n */\nfunction isStandardBrowserEnv() {\n  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {\n    return false;\n  }\n  return (\n    typeof window !== 'undefined' &&\n    typeof document !== 'undefined'\n  );\n}\n\n/**\n * Iterate over an Array or an Object invoking a function for each item.\n *\n * If `obj` is an Array callback will be called passing\n * the value, index, and complete array for each item.\n *\n * If 'obj' is an Object callback will be called passing\n * the value, key, and complete object for each property.\n *\n * @param {Object|Array} obj The object to iterate\n * @param {Function} fn The callback to invoke for each item\n */\nfunction forEach(obj, fn) {\n  // Don't bother if no value provided\n  if (obj === null || typeof obj === 'undefined') {\n    return;\n  }\n\n  // Force an array if not already something iterable\n  if (typeof obj !== 'object') {\n    /*eslint no-param-reassign:0*/\n    obj = [obj];\n  }\n\n  if (isArray(obj)) {\n    // Iterate over array values\n    for (var i = 0, l = obj.length; i < l; i++) {\n      fn.call(null, obj[i], i, obj);\n    }\n  } else {\n    // Iterate over object keys\n    for (var key in obj) {\n      if (Object.prototype.hasOwnProperty.call(obj, key)) {\n        fn.call(null, obj[key], key, obj);\n      }\n    }\n  }\n}\n\n/**\n * Accepts varargs expecting each argument to be an object, then\n * immutably merges the properties of each object and returns result.\n *\n * When multiple objects contain the same key the later object in\n * the arguments list will take precedence.\n *\n * Example:\n *\n * ```js\n * var result = merge({foo: 123}, {foo: 456});\n * console.log(result.foo); // outputs 456\n * ```\n *\n * @param {Object} obj1 Object to merge\n * @returns {Object} Result of all merge properties\n */\nfunction merge(/* obj1, obj2, obj3, ... */) {\n  var result = {};\n  function assignValue(val, key) {\n    if (typeof result[key] === 'object' && typeof val === 'object') {\n      result[key] = merge(result[key], val);\n    } else {\n      result[key] = val;\n    }\n  }\n\n  for (var i = 0, l = arguments.length; i < l; i++) {\n    forEach(arguments[i], assignValue);\n  }\n  return result;\n}\n\n/**\n * Extends object a by mutably adding to it the properties of object b.\n *\n * @param {Object} a The object to be extended\n * @param {Object} b The object to copy properties from\n * @param {Object} thisArg The object to bind function to\n * @return {Object} The resulting value of object a\n */\nfunction extend(a, b, thisArg) {\n  forEach(b, function assignValue(val, key) {\n    if (thisArg && typeof val === 'function') {\n      a[key] = bind(val, thisArg);\n    } else {\n      a[key] = val;\n    }\n  });\n  return a;\n}\n\nmodule.exports = {\n  isArray: isArray,\n  isArrayBuffer: isArrayBuffer,\n  isBuffer: isBuffer,\n  isFormData: isFormData,\n  isArrayBufferView: isArrayBufferView,\n  isString: isString,\n  isNumber: isNumber,\n  isObject: isObject,\n  isUndefined: isUndefined,\n  isDate: isDate,\n  isFile: isFile,\n  isBlob: isBlob,\n  isFunction: isFunction,\n  isStream: isStream,\n  isURLSearchParams: isURLSearchParams,\n  isStandardBrowserEnv: isStandardBrowserEnv,\n  forEach: forEach,\n  merge: merge,\n  extend: extend,\n  trim: trim\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/axios/lib/utils.js?");

/***/ }),

/***/ "./node_modules/cuid/index.js":
/*!************************************!*\
  !*** ./node_modules/cuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/**\n * cuid.js\n * Collision-resistant UID generator for browsers and node.\n * Sequential for fast db lookups and recency sorting.\n * Safe for element IDs and server-side lookups.\n *\n * Extracted from CLCTR\n *\n * Copyright (c) Eric Elliott 2012\n * MIT License\n */\n\nvar fingerprint = __webpack_require__(/*! ./lib/fingerprint.js */ \"./node_modules/cuid/lib/fingerprint.browser.js\");\nvar pad = __webpack_require__(/*! ./lib/pad.js */ \"./node_modules/cuid/lib/pad.js\");\nvar getRandomValue = __webpack_require__(/*! ./lib/getRandomValue.js */ \"./node_modules/cuid/lib/getRandomValue.browser.js\");\n\nvar c = 0,\n  blockSize = 4,\n  base = 36,\n  discreteValues = Math.pow(base, blockSize);\n\nfunction randomBlock () {\n  return pad((getRandomValue() *\n    discreteValues << 0)\n    .toString(base), blockSize);\n}\n\nfunction safeCounter () {\n  c = c < discreteValues ? c : 0;\n  c++; // this is not subliminal\n  return c - 1;\n}\n\nfunction cuid () {\n  // Starting with a lowercase letter makes\n  // it HTML element ID friendly.\n  var letter = 'c', // hard-coded allows for sequential access\n\n    // timestamp\n    // warning: this exposes the exact date and time\n    // that the uid was created.\n    timestamp = (new Date().getTime()).toString(base),\n\n    // Prevent same-machine collisions.\n    counter = pad(safeCounter().toString(base), blockSize),\n\n    // A few chars to generate distinct ids for different\n    // clients (so different computers are far less\n    // likely to generate the same id)\n    print = fingerprint(),\n\n    // Grab some more chars from Math.random()\n    random = randomBlock() + randomBlock();\n\n  return letter + timestamp + counter + print + random;\n}\n\ncuid.slug = function slug () {\n  var date = new Date().getTime().toString(36),\n    counter = safeCounter().toString(36).slice(-4),\n    print = fingerprint().slice(0, 1) +\n      fingerprint().slice(-1),\n    random = randomBlock().slice(-2);\n\n  return date.slice(-2) +\n    counter + print + random;\n};\n\ncuid.isCuid = function isCuid (stringToCheck) {\n  if (typeof stringToCheck !== 'string') return false;\n  if (stringToCheck.startsWith('c')) return true;\n  return false;\n};\n\ncuid.isSlug = function isSlug (stringToCheck) {\n  if (typeof stringToCheck !== 'string') return false;\n  var stringLength = stringToCheck.length;\n  if (stringLength >= 7 && stringLength <= 10) return true;\n  return false;\n};\n\ncuid.fingerprint = fingerprint;\n\nmodule.exports = cuid;\n\n\n//# sourceURL=webpack://crudly/./node_modules/cuid/index.js?");

/***/ }),

/***/ "./node_modules/cuid/lib/fingerprint.browser.js":
/*!******************************************************!*\
  !*** ./node_modules/cuid/lib/fingerprint.browser.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var pad = __webpack_require__(/*! ./pad.js */ \"./node_modules/cuid/lib/pad.js\");\n\nvar env = typeof window === 'object' ? window : self;\nvar globalCount = Object.keys(env).length;\nvar mimeTypesLength = navigator.mimeTypes ? navigator.mimeTypes.length : 0;\nvar clientId = pad((mimeTypesLength +\n  navigator.userAgent.length).toString(36) +\n  globalCount.toString(36), 4);\n\nmodule.exports = function fingerprint () {\n  return clientId;\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/cuid/lib/fingerprint.browser.js?");

/***/ }),

/***/ "./node_modules/cuid/lib/getRandomValue.browser.js":
/*!*********************************************************!*\
  !*** ./node_modules/cuid/lib/getRandomValue.browser.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("\nvar getRandomValue;\n\nvar crypto = window.crypto || window.msCrypto;\n\nif (crypto) {\n    var lim = Math.pow(2, 32) - 1;\n    getRandomValue = function () {\n        return Math.abs(crypto.getRandomValues(new Uint32Array(1))[0] / lim);\n    };\n} else {\n    getRandomValue = Math.random;\n}\n\nmodule.exports = getRandomValue;\n\n\n//# sourceURL=webpack://crudly/./node_modules/cuid/lib/getRandomValue.browser.js?");

/***/ }),

/***/ "./node_modules/cuid/lib/pad.js":
/*!**************************************!*\
  !*** ./node_modules/cuid/lib/pad.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function pad (num, size) {\n  var s = '000000000' + num;\n  return s.substr(s.length - size);\n};\n\n\n//# sourceURL=webpack://crudly/./node_modules/cuid/lib/pad.js?");

/***/ }),

/***/ "./node_modules/is-buffer/index.js":
/*!*****************************************!*\
  !*** ./node_modules/is-buffer/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/*!\n * Determine if an object is a Buffer\n *\n * @author   Feross Aboukhadijeh <https://feross.org>\n * @license  MIT\n */\n\n// The _isBuffer check is for Safari 5-7 support, because it's missing\n// Object.prototype.constructor. Remove this eventually\nmodule.exports = function (obj) {\n  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)\n}\n\nfunction isBuffer (obj) {\n  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)\n}\n\n// For Node v0.10 support. Remove this eventually.\nfunction isSlowBuffer (obj) {\n  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))\n}\n\n\n//# sourceURL=webpack://crudly/./node_modules/is-buffer/index.js?");

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// shim for using process in browser\nvar process = module.exports = {};\n\n// cached from whatever global is present so that test runners that stub it\n// don't break things.  But we need to wrap it in a try catch in case it is\n// wrapped in strict mode code which doesn't define any globals.  It's inside a\n// function because try/catches deoptimize in certain engines.\n\nvar cachedSetTimeout;\nvar cachedClearTimeout;\n\nfunction defaultSetTimout() {\n    throw new Error('setTimeout has not been defined');\n}\nfunction defaultClearTimeout () {\n    throw new Error('clearTimeout has not been defined');\n}\n(function () {\n    try {\n        if (typeof setTimeout === 'function') {\n            cachedSetTimeout = setTimeout;\n        } else {\n            cachedSetTimeout = defaultSetTimout;\n        }\n    } catch (e) {\n        cachedSetTimeout = defaultSetTimout;\n    }\n    try {\n        if (typeof clearTimeout === 'function') {\n            cachedClearTimeout = clearTimeout;\n        } else {\n            cachedClearTimeout = defaultClearTimeout;\n        }\n    } catch (e) {\n        cachedClearTimeout = defaultClearTimeout;\n    }\n} ())\nfunction runTimeout(fun) {\n    if (cachedSetTimeout === setTimeout) {\n        //normal enviroments in sane situations\n        return setTimeout(fun, 0);\n    }\n    // if setTimeout wasn't available but was latter defined\n    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {\n        cachedSetTimeout = setTimeout;\n        return setTimeout(fun, 0);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedSetTimeout(fun, 0);\n    } catch(e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally\n            return cachedSetTimeout.call(null, fun, 0);\n        } catch(e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error\n            return cachedSetTimeout.call(this, fun, 0);\n        }\n    }\n\n\n}\nfunction runClearTimeout(marker) {\n    if (cachedClearTimeout === clearTimeout) {\n        //normal enviroments in sane situations\n        return clearTimeout(marker);\n    }\n    // if clearTimeout wasn't available but was latter defined\n    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {\n        cachedClearTimeout = clearTimeout;\n        return clearTimeout(marker);\n    }\n    try {\n        // when when somebody has screwed with setTimeout but no I.E. maddness\n        return cachedClearTimeout(marker);\n    } catch (e){\n        try {\n            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally\n            return cachedClearTimeout.call(null, marker);\n        } catch (e){\n            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.\n            // Some versions of I.E. have different rules for clearTimeout vs setTimeout\n            return cachedClearTimeout.call(this, marker);\n        }\n    }\n\n\n\n}\nvar queue = [];\nvar draining = false;\nvar currentQueue;\nvar queueIndex = -1;\n\nfunction cleanUpNextTick() {\n    if (!draining || !currentQueue) {\n        return;\n    }\n    draining = false;\n    if (currentQueue.length) {\n        queue = currentQueue.concat(queue);\n    } else {\n        queueIndex = -1;\n    }\n    if (queue.length) {\n        drainQueue();\n    }\n}\n\nfunction drainQueue() {\n    if (draining) {\n        return;\n    }\n    var timeout = runTimeout(cleanUpNextTick);\n    draining = true;\n\n    var len = queue.length;\n    while(len) {\n        currentQueue = queue;\n        queue = [];\n        while (++queueIndex < len) {\n            if (currentQueue) {\n                currentQueue[queueIndex].run();\n            }\n        }\n        queueIndex = -1;\n        len = queue.length;\n    }\n    currentQueue = null;\n    draining = false;\n    runClearTimeout(timeout);\n}\n\nprocess.nextTick = function (fun) {\n    var args = new Array(arguments.length - 1);\n    if (arguments.length > 1) {\n        for (var i = 1; i < arguments.length; i++) {\n            args[i - 1] = arguments[i];\n        }\n    }\n    queue.push(new Item(fun, args));\n    if (queue.length === 1 && !draining) {\n        runTimeout(drainQueue);\n    }\n};\n\n// v8 likes predictible objects\nfunction Item(fun, array) {\n    this.fun = fun;\n    this.array = array;\n}\nItem.prototype.run = function () {\n    this.fun.apply(null, this.array);\n};\nprocess.title = 'browser';\nprocess.browser = true;\nprocess.env = {};\nprocess.argv = [];\nprocess.version = ''; // empty string to avoid regexp issues\nprocess.versions = {};\n\nfunction noop() {}\n\nprocess.on = noop;\nprocess.addListener = noop;\nprocess.once = noop;\nprocess.off = noop;\nprocess.removeListener = noop;\nprocess.removeAllListeners = noop;\nprocess.emit = noop;\nprocess.prependListener = noop;\nprocess.prependOnceListener = noop;\n\nprocess.listeners = function (name) { return [] }\n\nprocess.binding = function (name) {\n    throw new Error('process.binding is not supported');\n};\n\nprocess.cwd = function () { return '/' };\nprocess.chdir = function (dir) {\n    throw new Error('process.chdir is not supported');\n};\nprocess.umask = function() { return 0; };\n\n\n//# sourceURL=webpack://crudly/./node_modules/process/browser.js?");

/***/ }),

/***/ "./src/crudly.js":
/*!***********************!*\
  !*** ./src/crudly.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" //the gate class\n\nvar gate = __webpack_require__(/*! ./gate/gate */ \"./src/gate/gate.js\");\n\nvar defaultActions = __webpack_require__(/*! ./utils/defaultActions */ \"./src/utils/defaultActions.js\");\n\nvar actionConfig = __webpack_require__(/*! ./utils/actionConfigCreator */ \"./src/utils/actionConfigCreator.js\");\n/**\r\n * @description crudly lib function that will create your api gate\r\n * @param config main config object\r\n */\n//copy functions to the crudly object\n\n\nvar crudly = function crudly(config) {\n  return new gate(config);\n};\n/**\r\n * @description gate class object that can be used for creatin multiple gates\r\n * @param config main config object\r\n */\n\n\ncrudly.gate = gate; //gate class that can be use to create new instance for new gate\n\ncrudly.standardCrudActions = defaultActions; //list of default standard actions you can make with REST\n\ncrudly.actionConfig = actionConfig; //function to make creating action config easier\n\nmodule.exports = crudly;\n\n//# sourceURL=webpack://crudly/./src/crudly.js?");

/***/ }),

/***/ "./src/gate/action/action.js":
/*!***********************************!*\
  !*** ./src/gate/action/action.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance\"); }\n\nfunction _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === \"[object Arguments]\") return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar Route = __webpack_require__(/*! ../route */ \"./src/gate/route.js\");\n\nvar Request = __webpack_require__(/*! ../request */ \"./src/gate/request.js\");\n\nvar urlParser = __webpack_require__(/*! ../../utils/urlParser */ \"./src/utils/urlParser.js\");\n/**\r\n * @description Action class\r\n * @param action valid action config\r\n * @param baseRoute base action route\r\n */\n\n\nvar Action = function Action(action, baseRoute) {\n  if (!action) throw new Error('Action config is not valid');\n  if (baseRoute === undefined || baseRoute === null) throw new Error('Base route is not valid');\n  if (action.url && !action.url.startsWith('/')) action.url = \"/\".concat(action.url);\n  Route.call(this, \"\".concat(baseRoute).concat(action.url ? action.url : ''));\n  this.params = action.params || [];\n  this.method = (action.type || 'get').toLowerCase();\n  this.name = action.name;\n  this.urlParams = [];\n  this.extra = action;\n\n  if (action.loadDefaultConfig != undefined && action.loadDefaultConfig != null) {\n    this.loadDefaultConfig = action.loadDefaultConfig;\n  } else this.loadDefaultConfig = true;\n\n  if (this.method === 'get' || this.method === 'delete') urlParser.bind(this)();\n};\n\nAction.prototype = Object.create(Route.prototype);\nAction.prototype.constructor = Action;\n/**\r\n * @description merge the given config to the local config object\r\n * @param config action config for merge\r\n * @param overrideWithThis override the given config to the local config if there is a conflict\r\n */\n\nAction.prototype.mergeConfig = function (config) {\n  var _this = this;\n\n  var overrideWithThis = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n  if (!config) throw new Error('the config object is invalid');\n  if (!config instanceof Object) throw new Error('config must be an object');\n  Object.keys(config).forEach(function (key) {\n    if (overrideWithThis) _this.extra[key] = config[key];else if (!_this.extra[key]) _this.extra[key] = config[key];\n  });\n};\n/**\r\n * @description validate the given params to be fit in the action\r\n * @param params run function params\r\n */\n\n\nAction.prototype.validateParams = function () {\n  if (this.method === 'post' || this.method === 'put' || this.method === 'patch') {\n    if (arguments.length > 1) throw new Error('action params are not valid');\n  } else if (this.params.length + this.urlParams.length !== arguments.length) throw new Error('action params are not valid. make sure you entered all of the params');\n};\n/**\r\n * @description validate the given params to be fit in the action\r\n * @param params run function params\r\n */\n\n\nAction.prototype.createRequest = function () {\n  return new Request(this);\n};\n/**\r\n * @description run action and call api\r\n * @param params api params\r\n */\n\n\nAction.prototype.run =\n/*#__PURE__*/\n_asyncToGenerator(\n/*#__PURE__*/\nregeneratorRuntime.mark(function _callee() {\n  var _this$gate;\n\n  var _len,\n      params,\n      _key,\n      request,\n      res,\n      _args = arguments;\n\n  return regeneratorRuntime.wrap(function _callee$(_context) {\n    while (1) {\n      switch (_context.prev = _context.next) {\n        case 0:\n          for (_len = _args.length, params = new Array(_len), _key = 0; _key < _len; _key++) {\n            params[_key] = _args[_key];\n          }\n\n          //url params + params in get or delete action\n          if (!params) params = [];\n          this.validateParams.apply(this, _toConsumableArray(params));\n          request = this.createRequest.apply(this, _toConsumableArray(params));\n          _context.next = 6;\n          return (_this$gate = this.gate).requestGate.apply(_this$gate, [request].concat(_toConsumableArray(params)));\n\n        case 6:\n          res = _context.sent;\n          return _context.abrupt(\"return\", res);\n\n        case 8:\n        case \"end\":\n          return _context.stop();\n      }\n    }\n  }, _callee, this);\n}));\nmodule.exports = Action;\n\n//# sourceURL=webpack://crudly/./src/gate/action/action.js?");

/***/ }),

/***/ "./src/gate/action/addAction.js":
/*!**************************************!*\
  !*** ./src/gate/action/addAction.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar Action = __webpack_require__(/*! ./action */ \"./src/gate/action/action.js\");\n\nvar statics = __webpack_require__(/*! ../../utils/statics */ \"./src/utils/statics.js\");\n/**\r\n * @description add action objec to the given this object\r\n * @param actionConfig action config object\r\n */\n\n\nvar addAction = function addAction(actionConfig) {\n  if (!actionConfig) throw new Error('action config is not valid');\n  actionConfig.type = (actionConfig.type || 'get').toLowerCase();\n  if (!statics.actionTypes.filter(function (type) {\n    return type === actionConfig.type;\n  })[0]) throw new Error(\"Action type '\".concat(actionConfig.type, \"' is not valid\"));\n  if (!actionConfig.name) actionConfig.name = statics.actionTypeMaps[actionConfig.type];\n  if (this[actionConfig.name]) throw new Error('this action was created before');\n  var newAction = new Action(actionConfig, this.route);\n  this.actions.push(newAction);\n  newAction.gate = this.gate;\n  newAction.config = this.config;\n  if (this.config.defaultActionsConfig) newAction.mergeConfig(this.config.defaultActionsConfig);\n  this[actionConfig.name] = newAction.run.bind(newAction);\n};\n\nmodule.exports = addAction;\n\n//# sourceURL=webpack://crudly/./src/gate/action/addAction.js?");

/***/ }),

/***/ "./src/gate/controller/controller.js":
/*!*******************************************!*\
  !*** ./src/gate/controller/controller.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar validator = __webpack_require__(/*! ../../utils/dataValidator */ \"./src/utils/dataValidator.js\");\n\nvar Route = __webpack_require__(/*! ../route */ \"./src/gate/route.js\");\n\nvar addAction = __webpack_require__(/*! ../action/addAction */ \"./src/gate/action/addAction.js\");\n/**\r\n * @description controller class\r\n * @param ctrlConfig controller config object\r\n * @param baseRoute base api route\r\n * @param baseConfig main config object\r\n */\n\n\nvar Controller = function Controller(ctrl, baseRoute, config, gate) {\n  Route.call(this, \"\".concat(baseRoute, \"/\").concat(ctrl.name));\n  this.gate = gate;\n  this.actions = validator(ctrl, 'actions') || [];\n  this.loadDefaults = validator(ctrl, 'loadDefaults');\n  if (this.loadDefaults === undefined || this.loadDefaults === null) this.loadDefaults = true;\n  this.config = config;\n  this.addActions(this.actions);\n};\n\nController.prototype = Object.create(Route.prototype);\nController.prototype.constructor = Controller;\n/**\r\n * @description you can add actions to the gate object\r\n * @param action action you want to add\r\n */\n\nController.prototype.addAction = addAction;\n/**\r\n * @description add list of actions to the controller\r\n * @param actions list of actions config\r\n */\n\nController.prototype.addActions = function (actions) {\n  var _this = this;\n\n  if (!actions) throw new Error('actions is not defained');\n  if (!Array.isArray(actions)) throw new Error('actions most be an array');\n  actions.forEach(function (action) {\n    _this.addAction(action);\n  });\n};\n\nmodule.exports = Controller;\n\n//# sourceURL=webpack://crudly/./src/gate/controller/controller.js?");

/***/ }),

/***/ "./src/gate/gate.js":
/*!**************************!*\
  !*** ./src/gate/gate.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar utils = __webpack_require__(/*! ../utils/axiosStatics */ \"./src/utils/axiosStatics.js\");\n\nvar Controller = __webpack_require__(/*! ./controller/controller */ \"./src/gate/controller/controller.js\");\n\nvar validator = __webpack_require__(/*! ../utils/dataValidator */ \"./src/utils/dataValidator.js\");\n\nvar Route = __webpack_require__(/*! ./route */ \"./src/gate/route.js\");\n\nvar addAction = __webpack_require__(/*! ./action/addAction */ \"./src/gate/action/addAction.js\");\n\nvar GateManager = __webpack_require__(/*! ./gateManager */ \"./src/gate/gateManager.js\");\n\nvar Request = __webpack_require__(/*! ./request */ \"./src/gate/request.js\");\n\nvar requestFunc = __webpack_require__(/*! ../utils/requestFunc */ \"./src/utils/requestFunc.js\");\n/**\r\n * @description gate class\r\n * @param config main config file\r\n */\n\n\nvar Gate = function Gate(config, generalEventsBindableObject) {\n  if (!config) {\n    throw new Error('config file for controllers does not exist. please pass a valid config file to the Gate controller');\n  }\n\n  Route.call(this, config.root); //set this object route default \"/\"\n\n  config.controllers = validator(config, 'controllers') || [];\n  this.controllers = []; //list of controllers object\n\n  config.actions = validator(config, 'actions') || [];\n  this.actions = []; //list of actions object\n\n  this.config = config;\n  Object.freeze(this.config);\n  this.gate = this;\n  this.gateManager = new GateManager(300);\n  this._generalEventsBindableObject = generalEventsBindableObject; //create actions from config file\n\n  if (Array.isArray(config)) this.addActions(this.config);else createControllers.bind(this)(); //create controllers from config file\n};\n\nGate.prototype = Object.create(Route.prototype);\nGate.prototype.constructor = Gate;\nGate.prototype.statics = {}; //set default prototypes from utils object\n\nObject.keys(utils).forEach(function (key) {\n  return Gate.prototype.statics[key] = utils[key];\n});\nGate.prototype.all = utils['all'];\n/**\r\n * @description you can add new controller to the gate object\r\n * @param ctrl controller you want to add\r\n */\n\nGate.prototype.addController = function (ctrl) {\n  validator(ctrl, 'name', 'please fill the controller name'); //check if ctrl name is valid\n\n  this[ctrl.name] = new Controller(ctrl, this.route, this.config, this);\n  this.controllers.push(this[ctrl.name]); //save in controller list\n\n  if (this.config.defaultActions && this.config.defaultActions.length != 0) this.addDefaultsAction(this[ctrl.name], this.config.defaultActions);\n};\n/**\r\n * @description you can add actions to the gate object\r\n * @param action action you want to add\r\n */\n\n\nGate.prototype.addAction = addAction;\n/**\r\n * @description check if is there any request pending now\r\n * @returns boolean indicate that any request is pending or not\r\n */\n\nGate.prototype.isRequestPending = function () {\n  return this.gateManager.isRequestPending();\n};\n/**\r\n * @description runs after all pending requests are done and you have data and params\r\n * @param fn function you want to execute\r\n */\n\n\nGate.prototype.afterAll = function (fn) {\n  this.afterAllRequests = fn;\n};\n/**\r\n * @description runs before any request send and you have data and params\r\n * @param fn function you want to execute\r\n */\n\n\nGate.prototype.beforeAny = function (fn) {\n  this.beforeAnyRequest = fn;\n};\n/**\r\n * @description it will call befor each request\r\n * @param fn function you want to execute\r\n */\n\n\nGate.prototype.beforeEach = function (fn) {\n  this.beforeEachRequest = fn;\n};\n/**\r\n * @description runs after each request and user can change the response data\r\n * @param fn function you want to execute\r\n */\n\n\nGate.prototype.afterEach = function (fn) {\n  this.afterEachRequest = fn;\n};\n/**\r\n * @description add default actions to the controllers\r\n * @param actions list of default actions\r\n */\n\n\nGate.prototype.addDefaultsActions = function (actions) {\n  var _this = this;\n\n  this.controllers.forEach(function (ctrl) {\n    _this.addDefaultsAction(ctrl, actions);\n  });\n};\n/**\r\n * @description add default actions to the just one controller\r\n * @param ctrl controller to add actions to\r\n * @param actions list of default actions\r\n */\n\n\nGate.prototype.addDefaultsAction = function (ctrl, actions) {\n  if (ctrl.loadDefaults) ctrl.addActions(actions);\n};\n/**\r\n * @description add list of actions to the controller\r\n * @param actions list of actions config\r\n */\n\n\nGate.prototype.addActions = function (actions) {\n  var _this2 = this;\n\n  if (!actions) throw new Error('actions is not defained');\n  if (!Array.isArray(actions)) throw new Error('actions most be an array');\n  actions.forEach(function (action) {\n    _this2.addAction(action);\n  });\n};\n/**\r\n * @description every request will be send from this section.\r\n * @param request request object\r\n * @param params request parameters\r\n * @returns http request response or custom return value\r\n */\n\n\nGate.prototype.requestGate =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(request) {\n    var _len,\n        params,\n        _key,\n        res,\n        _args = arguments;\n\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            if (!(!request instanceof Request)) {\n              _context.next = 2;\n              break;\n            }\n\n            throw new Error('the request param must be instance of Request type');\n\n          case 2:\n            //befor any and befor each\n            this.gateManager.push(request, this.requestPushed);\n\n            for (_len = _args.length, params = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {\n              params[_key - 1] = _args[_key];\n            }\n\n            _context.next = 6;\n            return requestFunc(request.trigger.apply(request, params));\n\n          case 6:\n            res = _context.sent;\n            request.respondWith(res); //after all and after each\n\n            return _context.abrupt(\"return\", this.gateManager.pop(request, this.requestPoped));\n\n          case 9:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, this);\n  }));\n\n  return function (_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n/**\r\n * @description when new request is going to the serevr it will be called\r\n * @param request request object\r\n * @param collectionLeght letngh of the correct requests\r\n */\n\n\nGate.prototype.requestPushed = function (request, collectionLeght) {\n  if (collectionLeght === 1 && typeof this.beforeAnyRequest === 'function') this._generalEventsBindableObject ? this.beforeAnyRequest.bind(this._generalEventsBindableObject)() : this.beforeAnyRequest();\n  if (typeof this.beforeEachRequest === 'function') this.beforeEachRequest(request);\n};\n/**\r\n * @description when the request is done this function will be called\r\n * @param request request object\r\n * @param collectionLeght letngh of the correct requests\r\n */\n\n\nGate.prototype.requestPoped = function (request, collectionLeght) {\n  var afterEachRes = null;\n  if (collectionLeght === 0 && typeof this.afterAllRequests === 'function') this._generalEventsBindableObject ? this.afterAllRequests.bind(this._generalEventsBindableObject)() : this.afterAllRequests();\n  if (typeof this.afterEachRequest === 'function') afterEachRes = this.afterEachRequest(request.response);\n  request.response = afterEachRes ? afterEachRes : request.response;\n};\n/**\r\n * @description add controllers listed in the config object to the gate object\r\n */\n\n\nvar createControllers = function createControllers() {\n  this.addActions(this.config.actions);\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = this.config.controllers[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var ctrl = _step.value;\n      this.addController(ctrl);\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator.return != null) {\n        _iterator.return();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n};\n\nmodule.exports = Gate;\n\n//# sourceURL=webpack://crudly/./src/gate/gate.js?");

/***/ }),

/***/ "./src/gate/gateManager.js":
/*!*********************************!*\
  !*** ./src/gate/gateManager.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var dateDifference = __webpack_require__(/*! ../utils/utils */ \"./src/utils/utils.js\").dateDifference;\n\nvar Request = __webpack_require__(/*! ./request */ \"./src/gate/request.js\");\n/**\r\n * @description gate manager constructor\r\n * @param maxObjectLifeTime objects life time in seconds\r\n */\n\n\nvar GateManager = function GateManager()\n/* in seconds. 0 means for ever */\n{\n  var maxObjectLifeTime = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;\n  this.collection = [];\n  this.maxObjectLifeTime = maxObjectLifeTime;\n};\n\nObject.defineProperty(GateManager.prototype, 'isRequestPending', {\n  get: function get() {\n    this.pruneObjects();\n    return this.collection.length != 0;\n  }\n});\n/**\r\n * @description prune old objects.\r\n */\n\nGateManager.prototype.pruneObjects = function () {\n  if (this.maxObjectLifeTime <= 0) return;\n  var toBeDeletedObjectIds = [];\n  var _iteratorNormalCompletion = true;\n  var _didIteratorError = false;\n  var _iteratorError = undefined;\n\n  try {\n    for (var _iterator = this.collection[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {\n      var obj = _step.value;\n      if (!obj.startedOn || !obj.id || dateDifference(obj.startedOn) >= this.maxObjectLifeTime) toBeDeletedObjectIds.push(obj.id);\n    }\n  } catch (err) {\n    _didIteratorError = true;\n    _iteratorError = err;\n  } finally {\n    try {\n      if (!_iteratorNormalCompletion && _iterator.return != null) {\n        _iterator.return();\n      }\n    } finally {\n      if (_didIteratorError) {\n        throw _iteratorError;\n      }\n    }\n  }\n\n  this.collection = this.collection.filter(function (item) {\n    return !toBeDeletedObjectIds.some(function (d) {\n      return d == item.id;\n    });\n  });\n};\n/**\r\n * @description add new object to the array\r\n * @param obj object to add\r\n * @param objectPushed object pushed callback function\r\n */\n\n\nGateManager.prototype.push = function (obj, objectPushed) {\n  if (!obj instanceof Request) return null;\n  this.collection.push(obj);\n  if (typeof objectPushed == 'function') objectPushed(obj, this.collection.length);\n  return obj;\n};\n/**\r\n * @description remove object from the array\r\n * @param obj object to remove\r\n * @param objectPopped object poped callback function\r\n */\n\n\nGateManager.prototype.pop = function (obj, objectPopped) {\n  var index = this.collection.findIndex(function (item) {\n    return item.id == obj.id;\n  });\n  if (index < 0) return;\n  this.collection.splice(index, 1);\n  if (typeof objectPopped == 'function') objectPopped(obj, this.collection.length);\n  return obj.response || obj;\n};\n\nmodule.exports = GateManager;\n\n//# sourceURL=webpack://crudly/./src/gate/gateManager.js?");

/***/ }),

/***/ "./src/gate/headers.js":
/*!*****************************!*\
  !*** ./src/gate/headers.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var _require = __webpack_require__(/*! ../utils/utils */ \"./src/utils/utils.js\"),\n    each = _require.each,\n    trim = _require.trim,\n    toLower = _require.toLower;\n\nvar Headers = function Headers(headers) {\n  var _this = this;\n\n  this.map = {};\n  each(headers, function (value, name) {\n    return _this.append(name, value);\n  });\n};\n\nHeaders.prototype.has = function (name) {\n  return getName(this.map, name) !== null;\n};\n\nHeaders.prototype.get = function (name) {\n  var list = this.map[getName(this.map, name)];\n  return list ? list.join() : null;\n};\n\nHeaders.prototype.getAll = function (name) {\n  return this.map[getName(this.map, name)] || [];\n};\n\nHeaders.prototype.set = function (name, value) {\n  this.map[normalizeName(getName(this.map, name) || name)] = [value];\n};\n\nHeaders.prototype.append = function (name, value) {\n  var list = this.map[getName(this.map, name)];\n\n  if (list) {\n    list.push(value);\n  } else {\n    this.set(name, value);\n  }\n};\n\nHeaders.prototype.delete = function (name) {\n  delete this.map[getName(this.map, name)];\n};\n\nHeaders.prototype.deleteAll = function () {\n  this.map = {};\n};\n\nHeaders.prototype.forEach = function (callback, thisArg) {\n  var _this2 = this;\n\n  each(this.map, function (list, name) {\n    each(list, function (value) {\n      return callback.call(thisArg, value, name, _this2);\n    });\n  });\n};\n\nvar getName = function getName(map, name) {\n  return Object.keys(map).reduce(function (prev, curr) {\n    return toLower(name) === toLower(curr) ? curr : prev;\n  }, null);\n};\n\nvar normalizeName = function normalizeName(name) {\n  if (/[^a-z0-9\\-#$%&'*+.^_`|~]/i.test(name)) {\n    throw new TypeError('Invalid character in header field name');\n  }\n\n  return trim(name);\n};\n\nmodule.exports = Headers;\n\n//# sourceURL=webpack://crudly/./src/gate/headers.js?");

/***/ }),

/***/ "./src/gate/request.js":
/*!*****************************!*\
  !*** ./src/gate/request.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Route = __webpack_require__(/*! ./route */ \"./src/gate/route.js\");\n\nvar validator = __webpack_require__(/*! ../utils/dataValidator */ \"./src/utils/dataValidator.js\");\n\nvar Response = __webpack_require__(/*! ./response */ \"./src/gate/response.js\");\n\nvar cuid = __webpack_require__(/*! cuid */ \"./node_modules/cuid/index.js\");\n/**\r\n *FIXME: description and test\r\n */\n\n\nvar Request = function Request(options) {\n  if (!options) throw new Error('options to create request is not valid');\n  Route.call(this, options.url);\n  this.url = validator(options, 'url', 'the url should be specified');\n  this.body = validator(options, 'body') || null;\n  this.params = validator(options, 'params') || {};\n  this.urlParams = validator(options, 'urlParams') || {};\n  this.method = validator(options, 'method') || 'get';\n  this.config = validator(options, 'config') || {};\n  this.extra = validator(options, 'extra') || {};\n  this.id = cuid();\n  this.craetedOn = new Date();\n  this.startedOn = null;\n  this.responsedOn = null;\n  this._isPending = false;\n  this.response = null;\n  this.axiosConfig = null;\n};\n\nRequest.prototype = Object.create(Route.prototype);\nRequest.prototype.constructor = Request;\nObject.defineProperty(Request.prototype, 'isPending', {\n  get: function get() {\n    return this._isPending;\n  }\n});\n\nRequest.prototype.getUrl = function () {\n  return this.url;\n};\n\nRequest.prototype.getBody = function () {\n  return this.body;\n};\n\nRequest.prototype.getResponse = function () {\n  return this.response;\n};\n\nRequest.prototype.respondWith = function (response) {\n  this._isPending = false;\n  this.responsedOn = new Date();\n  this.response = new Response(response.data, {\n    url: this.getUrl(),\n    headers: response.headers,\n    status: response.status,\n    statusText: response.statusText,\n    config: response.config\n  });\n  return this.response;\n};\n\nRequest.prototype.makeConfig = function () {\n  this.axiosConfig = {};\n  this.axiosConfig.url = this.url;\n  this.axiosConfig.method = this.method;\n\n  for (var _len = arguments.length, params = new Array(_len), _key = 0; _key < _len; _key++) {\n    params[_key] = arguments[_key];\n  }\n\n  if (this.method === 'get' || this.method === 'delete') {\n    this.axiosConfig.url = this.parseUrl.apply(this, [this.url].concat(params));\n    this.axiosConfig.params = {};\n\n    for (var i = this.urlParams.length; i < params.length; i++) {\n      if (this.params[i - this.urlParams.length]) this.axiosConfig.params[this.params[i - this.urlParams.length]] = params[i];else {\n        throw new Error('there is no params for this argument');\n      }\n    }\n  }\n\n  if (this.method === 'post' || this.method === 'put' || this.method === 'patch') this.axiosConfig.data = params[0] || {};\n  if (this.extra.auth) this.axiosConfig.auth = this.extra.auth;\n  if (this.extra.responseType) this.axiosConfig.responseType = this.extra.responseType;\n  if (this.extra.responseEncoding) this.axiosConfig.responseEncoding = this.extra.responseEncoding;\n  if (this.extra.xsrfHeaderName) this.axiosConfig.xsrfHeaderName = this.extra.xsrfHeaderName;\n  if (this.extra.maxContentLength) this.axiosConfig.maxContentLength = this.extra.maxContentLength;\n  if (this.extra.maxRedirects) this.axiosConfig.maxRedirects = this.extra.maxRedirects;\n  if (this.extra.xsrfCookieName) this.axiosConfig.xsrfCookieName = this.extra.xsrfCookieName;\n  if (this.extra.headers) this.axiosConfig.headers = this.extra.headers;\n  if (this.extra.timeout) this.axiosConfig.timeout = this.extra.timeout;\n  return this.axiosConfig;\n};\n/**\r\n * @description generate valid url from url template and fill the params\r\n * @param urlTemplate url template\r\n * @param params params to fill in the url\r\n */\n\n\nRequest.prototype.parseUrl = function (urlTemplate) {\n  for (var i = 0; i < this.urlParams.length; i++) {\n    urlTemplate = urlTemplate.replace(this.urlParams[i], i + 1 < 1 || arguments.length <= i + 1 ? undefined : arguments[i + 1]);\n  }\n\n  return urlTemplate;\n};\n/***\r\n * @description this function will call when the request is going to send\r\n * @return request config\r\n */\n\n\nRequest.prototype.trigger = function () {\n  this._isPending = true;\n  this.startedOn = this.startedOn || new Date();\n  return this.axiosConfig || this.makeConfig.apply(this, arguments);\n};\n\nmodule.exports = Request;\n\n//# sourceURL=webpack://crudly/./src/gate/request.js?");

/***/ }),

/***/ "./src/gate/response.js":
/*!******************************!*\
  !*** ./src/gate/response.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var Headers = __webpack_require__(/*! ./headers */ \"./src/gate/headers.js\");\n\nvar cuid = __webpack_require__(/*! cuid */ \"./node_modules/cuid/index.js\");\n\nvar _require = __webpack_require__(/*! ../utils/utils */ \"./src/utils/utils.js\"),\n    isString = _require.isString,\n    isBlob = _require.isBlob,\n    when = _require.when;\n\nvar Response = function Response(body, _ref) {\n  var url = _ref.url,\n      headers = _ref.headers,\n      status = _ref.status,\n      statusText = _ref.statusText,\n      config = _ref.config;\n  this.url = url;\n  this.ok = status >= 200 && status < 300;\n  this.status = status || 0;\n  this.statusText = statusText || '';\n  this.headers = new Headers(headers);\n  this.body = body;\n  this.id = cuid();\n  this.config = config;\n\n  if (isString(body)) {\n    this.bodyText = body;\n  } else if (isBlob(body)) {\n    this.bodyBlob = body;\n\n    if (isBlobText(body)) {\n      this.bodyText = blobText(body);\n    }\n  }\n};\n\nResponse.prototype.blob = function () {\n  return when(this.bodyBlob);\n};\n\nResponse.prototype.text = function () {\n  return when(this.bodyText);\n};\n\nResponse.prototype.json = function () {\n  return when(this.text(), function (text) {\n    return JSON.parse(text);\n  });\n};\n\nObject.defineProperty(Response.prototype, 'data', {\n  get: function get() {\n    return this.body;\n  },\n  set: function set(body) {\n    this.body = body;\n  }\n});\n\nvar blobText = function blobText(body) {\n  return new Promise(function (resolve) {\n    var reader = new FileReader();\n    reader.readAsText(body);\n\n    reader.onload = function () {\n      resolve(reader.result);\n    };\n  });\n};\n\nvar isBlobText = function isBlobText(body) {\n  return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;\n};\n\nmodule.exports = Response;\n\n//# sourceURL=webpack://crudly/./src/gate/response.js?");

/***/ }),

/***/ "./src/gate/route.js":
/*!***************************!*\
  !*** ./src/gate/route.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\r\n * @description route base class\r\n * @param routeUrl route url\r\n */\n\nvar Route = function Route(routeUrl) {\n  if (!routeUrl) routeUrl = '';\n  if (routeUrl.endsWith('/')) routeUrl = routeUrl.substr(0, routeUrl.length - 1);\n  this.url = this.route = routeUrl;\n};\n/**\r\n * @description get route of the object (controller or action)\r\n */\n\n\nRoute.prototype.getRoute = Route.prototype.getUrl = function () {\n  return this.url;\n};\n\nmodule.exports = Route;\n\n//# sourceURL=webpack://crudly/./src/gate/route.js?");

/***/ }),

/***/ "./src/utils/actionConfigCreator.js":
/*!******************************************!*\
  !*** ./src/utils/actionConfigCreator.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var statics = __webpack_require__(/*! ./statics */ \"./src/utils/statics.js\");\n/**\r\n * @description helper function to create action config\r\n * @param actionType action type eg 'get' and default is get\r\n * @param actionName name of the action\r\n * @param params url query params\r\n * @param actionUrl action url\r\n */\n\n\nvar createActionConfig = function createActionConfig() {\n  var actionType = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'get';\n  var actionName = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;\n  var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n  var actionUrl = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;\n  actionType = actionType.toLowerCase();\n  if (!statics.actionTypes.filter(function (type) {\n    return type === actionType;\n  })[0]) throw new Error(\"Action type '\".concat(actionType, \"' is not valid\"));\n  var actionConfig = {};\n  actionConfig.type = actionType;\n  if (!actionName) actionName = statics.actionTypeMaps[actionType];\n  if (actionName) actionConfig.name = actionName;\n  if (actionUrl) actionConfig.url = actionUrl;\n  if ((actionType === 'post' || actionType === 'put' || actionType === 'head' || actionType === 'patch') && params) throw new Error(\"Action type \".concat(actionType, \" should not have params\"));\n\n  if (params) {\n    if (!Array.isArray(params)) throw new Error('the params should be an array');\n    actionConfig.params = params;\n  }\n\n  return actionConfig;\n};\n\nmodule.exports = createActionConfig;\n\n//# sourceURL=webpack://crudly/./src/utils/actionConfigCreator.js?");

/***/ }),

/***/ "./src/utils/axiosStatics.js":
/*!***********************************!*\
  !*** ./src/utils/axiosStatics.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar axios = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\"); //axios default functions to export\n\n\nmodule.exports = {\n  get: axios.get,\n  post: axios.post,\n  put: axios.put,\n  delete: axios.delete,\n  head: axios.head,\n  patch: axios.patch,\n  all: axios.all\n};\n\n//# sourceURL=webpack://crudly/./src/utils/axiosStatics.js?");

/***/ }),

/***/ "./src/utils/dataValidator.js":
/*!************************************!*\
  !*** ./src/utils/dataValidator.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n/**\r\n * @description validate object and fill the given key property\r\n * @param data data to check\r\n * @param dataPropertyKey the key of the object to check\r\n * @param exception throw exception if key is not defaind in the object\r\n */\n\nvar validator = function validator(data, dataPropertyKey) {\n  var exception = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;\n\n  if (exception) {\n    if (!data) throw new Error(exception);\n    if (!data[dataPropertyKey] || data[dataPropertyKey].length == 0) throw new Error(\"\".concat(exception, \" -- \").concat(dataPropertyKey, \" is required.\"));\n  } else {\n    if (!data) return null;\n    if (data[dataPropertyKey] === undefined, data[dataPropertyKey] === null) return null;\n  }\n\n  return data[dataPropertyKey];\n};\n\nmodule.exports = validator;\n\n//# sourceURL=webpack://crudly/./src/utils/dataValidator.js?");

/***/ }),

/***/ "./src/utils/defaultActions.js":
/*!*************************************!*\
  !*** ./src/utils/defaultActions.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval(" //function to create action config\n\nvar actionConfigCreator = __webpack_require__(/*! ./actionConfigCreator */ \"./src/utils/actionConfigCreator.js\");\n\nvar get = actionConfigCreator('get', 'get', ['id'], null);\nvar post = actionConfigCreator('post', 'create', null, null);\nvar put = actionConfigCreator('put', 'update', null, null);\nvar patch = actionConfigCreator('patch', 'patch', null, null);\nvar remove = actionConfigCreator('delete', 'delete', ['id'], null);\nvar head = actionConfigCreator('head', 'head', null, null);\nvar getAll = actionConfigCreator('get', null, null, null);\nvar defaultActions = {\n  all: [get, post, put, patch, remove, head, getAll],\n  get: get,\n  post: post,\n  put: put,\n  patch: patch,\n  delete: remove,\n  head: head,\n  getAll: getAll\n};\nmodule.exports = defaultActions;\n\n//# sourceURL=webpack://crudly/./src/utils/defaultActions.js?");

/***/ }),

/***/ "./src/utils/requestFunc.js":
/*!**********************************!*\
  !*** ./src/utils/requestFunc.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar axios = __webpack_require__(/*! axios */ \"./node_modules/axios/index.js\");\n/**\r\n * @description request function\r\n * @param axiosConfig axios request config\r\n */\n\n\nvar axiosRequest =\n/*#__PURE__*/\nfunction () {\n  var _ref = _asyncToGenerator(\n  /*#__PURE__*/\n  regeneratorRuntime.mark(function _callee(axiosConfig) {\n    var response;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            _context.prev = 0;\n            _context.next = 3;\n            return axios(axiosConfig);\n\n          case 3:\n            response = _context.sent;\n            return _context.abrupt(\"return\", response);\n\n          case 7:\n            _context.prev = 7;\n            _context.t0 = _context[\"catch\"](0);\n            throw _context.t0;\n\n          case 10:\n            _context.prev = 10;\n            return _context.finish(10);\n\n          case 12:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee, this, [[0, 7, 10, 12]]);\n  }));\n\n  return function axiosRequest(_x) {\n    return _ref.apply(this, arguments);\n  };\n}();\n\nmodule.exports = axiosRequest;\n\n//# sourceURL=webpack://crudly/./src/utils/requestFunc.js?");

/***/ }),

/***/ "./src/utils/statics.js":
/*!******************************!*\
  !*** ./src/utils/statics.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar statics = {\n  actionTypes: ['get', 'put', 'post', 'delete', 'patch', 'head'],\n  actionTypeMaps: {\n    get: 'get',\n    put: 'update',\n    post: 'create',\n    delete: 'delete',\n    patch: 'patch',\n    head: 'head'\n  }\n};\nmodule.exports = statics;\n\n//# sourceURL=webpack://crudly/./src/utils/statics.js?");

/***/ }),

/***/ "./src/utils/urlParser.js":
/*!********************************!*\
  !*** ./src/utils/urlParser.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\r\n * @description get url params from url template\r\n */\nvar urlParser = function urlParser() {\n  var param = null;\n  var url = this.extra.url || '';\n\n  for (var i = 0; i < url.length; i++) {\n    if (param && (url[i] === '/' || url[i] === '\\\\' || url[i] === ':' || url[i] === '?')) {\n      this.urlParams.push(param);\n      param = null;\n    }\n\n    if (param) {\n      param += url[i];\n      continue;\n    }\n\n    if (url[i] === ':') param = ':';\n  }\n\n  if (param) this.urlParams.push(param);\n};\n\nmodule.exports = urlParser;\n\n//# sourceURL=webpack://crudly/./src/utils/urlParser.js?");

/***/ }),

/***/ "./src/utils/utils.js":
/*!****************************!*\
  !*** ./src/utils/utils.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _typeof(obj) { if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nvar _ref = {},\n    hasOwnProperty = _ref.hasOwnProperty,\n    slice = [].slice;\n\nvar dateDifference = function dateDifference(dateFrom, dateTo) {\n  var type = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 's';\n  dateTo = dateTo ? dateTo : new Date();\n  type = type.toLowerCase();\n\n  switch (type) {\n    case 'ms':\n      return dateTo.getTime() - dateFrom.getTime();\n\n    case 's':\n      return (dateTo.getTime() - dateFrom.getTime()) / 1000;\n\n    case 'm':\n      return (dateTo.getTime() - dateFrom.getTime()) / 60000;\n\n    case 'h':\n      return (dateTo.getTime() - dateFrom.getTime()) / 3600000;\n  }\n};\n\nvar error = function error(msg) {\n  if (typeof console !== 'undefined') {\n    console.error(msg);\n  }\n};\n\nvar trim = function trim(str) {\n  return str ? str.replace(/^\\s*|\\s*$/g, '') : '';\n};\n\nvar trimEnd = function trimEnd(str, chars) {\n  if (str && chars === undefined) {\n    return str.replace(/\\s+$/, '');\n  }\n\n  if (!str || !chars) {\n    return str;\n  }\n\n  return str.replace(new RegExp(\"[\".concat(chars, \"]+$\")), '');\n};\n\nvar toLower = function toLower(str) {\n  return str ? str.toLowerCase() : '';\n};\n\nvar toUpper = function toUpper(str) {\n  return str ? str.toUpperCase() : '';\n};\n\nvar isString = function isString(val) {\n  return typeof val === 'string';\n};\n\nvar isBoolean = function isBoolean(val) {\n  return val === true || val === false;\n};\n\nvar isFunction = function isFunction(val) {\n  return typeof val === 'function';\n};\n\nvar isObject = function isObject(obj) {\n  return obj !== null && _typeof(obj) === 'object';\n};\n\nvar isPlainObject = function isPlainObject(obj) {\n  return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;\n};\n\nvar isBlob = function isBlob(obj) {\n  return typeof Blob !== 'undefined' && obj instanceof Blob;\n};\n\nvar isFormData = function isFormData(obj) {\n  return typeof FormData !== 'undefined' && obj instanceof FormData;\n};\n\nvar when = function when(value, fulfilled, rejected) {\n  var promise = Promise.resolve(value);\n\n  if (arguments.length < 2) {\n    return promise;\n  }\n\n  return promise.then(fulfilled, rejected);\n};\n\nvar each = function each(obj, iterator) {\n  var i, key;\n\n  if (Array.isArray(obj)) {\n    for (i = 0; i < obj.length; i++) {\n      iterator.call(obj[i], obj[i], i);\n    }\n  } else if (Object(obj)) {\n    for (key in obj) {\n      if (hasOwnProperty.call(obj, key)) {\n        iterator.call(obj[key], obj[key], key);\n      }\n    }\n  }\n\n  return obj;\n};\n\nvar utils = {\n  dateDifference: dateDifference,\n  inBrowser: typeof window !== 'undefined',\n  error: error,\n  trim: trim,\n  trimEnd: trimEnd,\n  toLower: toLower,\n  toUpper: toUpper,\n  isString: isString,\n  hasOwnProperty: hasOwnProperty,\n  slice: slice,\n  isBoolean: isBoolean,\n  isFunction: isFunction,\n  isObject: isObject,\n  isPlainObject: isPlainObject,\n  isBlob: isBlob,\n  isFormData: isFormData,\n  when: when,\n  each: each\n};\nmodule.exports = utils;\n\n//# sourceURL=webpack://crudly/./src/utils/utils.js?");

/***/ })

/******/ });