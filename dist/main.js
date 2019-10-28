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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/content/create-todo.js":
/*!************************************!*\
  !*** ./src/content/create-todo.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/todo */ \"./src/models/todo.js\");\n/* harmony import */ var _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/event-aggregator */ \"./src/modules/event-aggregator.js\");\n\n\n\nconst createTodo = (() => {\n  let content = `\n  <h3>Create a ToDo</h3>\n  <form id=\"todo-form\" method=\"post\">\n    <div class=\"form-group\">\n      <input type=\"text\" class=\"form-control form-control-sm\" name=\"title\" id=\"title\" aria-describedby=\"emailHelp\" placeholder=\"Title\">\n    </div>\n    <div class=\"form-group\">\n      <textarea class=\"form-control form-control-sm\" name=\"description\" id=\"description\" rows=\"3\"></textarea>\n    </div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n        <input type=\"date\" class=\"form-control form-control-sm\" name=\"due\" id=\"due\" placeholder=\"Date\">\n      </div>\n      <div>\n        <select name=\"project\" id=\"project\" class=\"custom-select custom-select-sm\">\n          <option value=\"0\">Select a project</option>\n        </select>\n      </div>\n    </div>\n    <div class=\"form-group\">\n\n      <div class=\"custom-control custom-radio custom-control-inline\">\n        <input class=\"custom-control-input\" type=\"radio\" name=\"priority\" id=\"low\" value=\"low\">\n        <label class=\"custom-control-label\" for=\"low\">Low</label>\n      </div>\n      <div class=\"custom-control custom-radio custom-control-inline\">\n        <input class=\"custom-control-input\" type=\"radio\" name=\"priority\" id=\"normal\" value=\"normal\">\n        <label class=\"custom-control-label\" for=\"inlineRadio2\">Normal</label>\n      </div>\n      <div class=\"custom-control custom-radio custom-control-inline\">\n        <input class=\"custom-control-input\" type=\"radio\" name=\"priority\" id=\"hight\" value=\"hight\">\n        <label class=\"custom-control-label\" for=\"hight\">Hight</label>\n      </div>\n    </div>\n\n    <div>\n        <button type=\"submit\" name=\"submit\" class=\"btn btn-sm btn-primary\">Submit</button>\n    </div>\n  </form>\n  `;\n\n  const load = () => {\n    document.getElementById(\"todo-form-wrapper\").innerHTML = content;\n  }\n\n  const listener = () => {\n    document.querySelector('form').addEventListener('submit', function(e) {\n      e.preventDefault();\n\n      let elements = this.elements;\n      console.log(elements);\n\n      let payload = {};\n      for(let i=0; i < elements.length; i++) {\n        if (elements[i].type !== 'submit') {\n          let nameOfElement = elements[i].name;\n          let valueOfElement = elements[i].value;\n\n          payload[nameOfElement] = valueOfElement;\n        }\n      }\n\n      let todo = new _models_todo__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n        payload.title,\n        payload.description,\n        payload.due,\n        payload.project,\n        payload.prioriy\n      );\n\n      this.reset();\n      console.log(todo);\n      _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish('todo.created', todo);\n    });\n  }\n\n  const init = () => {\n    load();\n    listener();\n  }\n\n  return {\n    init\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createTodo);\n\n\n//# sourceURL=webpack:///./src/content/create-todo.js?");

/***/ }),

/***/ "./src/content/todo-list.js":
/*!**********************************!*\
  !*** ./src/content/todo-list.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/todo */ \"./src/models/todo.js\");\n/* harmony import */ var _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/event-aggregator */ \"./src/modules/event-aggregator.js\");\n\n\n\nconst todoList = (() => {\n  let content = `\n  <header>\n    <h3>ToDos</h3>\n    <div class=\"\">\n      <button type=\"button\" class=\"btn btn-sm\" disabled name=\"delete-selected-todos\" id=\"delete-selected-todos\">Delete all (before)</button>\n      <button type=\"button\" class=\"btn btn-sm btn-danger active\" name=\"delete-selected-todos\" id=\"delete-selected-todos\">Delete all (after)</button>\n      <select class=\"custom-select custom-select-sm\" name=\"projects-list\">\n        <option value=\"all\">All</option>\n        <option value=\"default\">Default</option>\n      </select>\n    </div>\n  </header>\n  <div class=\"todo-list\">\n\n  </div>\n  `;\n\n  let todos = [];\n\n\n  const todoCreated = (todo) => {\n    console.log(\"todoCreated...\", todo);\n    todos.push(todo);\n\n    let todoContent = `\n    <div class=\"todo\">\n      <div class=\"custom-control custom-checkbox\">\n        <input type=\"checkbox\" class=\"custom-control-input\" id=\"customCheck1\">\n        <label class=\"custom-control-label\" for=\"customCheck1\"></label>\n      </div>\n      <div class=\"todo-infos\">\n        <div class=\"header\">\n          <h6>${todo.title}</h6>\n          <div class=\"badge badge-info\">Project</div>\n        </div>\n        <div class=\"body\">${todo.description}</div>\n        <div class=\"footer\">\n          <div class=\"infos\">\n            <div class=\"badge badge-secondary\">${todo.due}</div>\n            <div class=\"badge badge-success\">${todo.priority}</div>\n          </div>\n          <div class=\"actions\">\n            <button type=\"button\" name=\"todo-delete\" data-todo-id=${todos.length - 1} class=\"btn btn-sm btn-danger\">Delete</button>\n            <button type=\"button\" name=\"todo-edit\" data-todo-id=${todos.length - 1} class=\"btn btn-sm btn-warning\">Edit</button>\n          </div>\n        </div>\n      </div>\n    </div>\n    `;\n    var node = document.createElement(\"div\");                 // Create a <li> node\n    // var textnode = document.createTextNode(todoContent);\n    // node.appendChild(textnode);\n    node.innerHTML = todoContent;\n\n    document.getElementsByClassName('todo-list')[0].appendChild(node)\n  }\n\n  const load = () => {\n    document.getElementById(\"todos\").innerHTML = content;\n\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe('todo.created', todoCreated);\n  }\n\n  const init = () => {\n    load();\n  }\n\n  return {\n    init\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (todoList);\n\n\n//# sourceURL=webpack:///./src/content/todo-list.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _initial_page_load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial_page_load */ \"./src/initial_page_load.js\");\n\n\nconsole.log(\"Here is ToDo List APP\");\nObject(_initial_page_load__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/initial_page_load.js":
/*!**********************************!*\
  !*** ./src/initial_page_load.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _content_create_todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./content/create-todo */ \"./src/content/create-todo.js\");\n/* harmony import */ var _content_todo_list__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./content/todo-list */ \"./src/content/todo-list.js\");\n\n\n\nconst initialPageLoad = () => {\n  let content = `\n  <header>\n    <h1>ToDo List</h1>\n  </header>\n  <main>\n    <aside>\n      <div id=\"todo-form-wrapper\">\n      </div>\n      <div id=\"projects\">\n      </div>\n    </aside>\n    <div id=\"todos\">\n    </div>\n  </main>\n  `;\n  document.getElementById('content').innerHTML = content;\n\n  _content_create_todo__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\n  _content_todo_list__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (initialPageLoad);\n\n\n//# sourceURL=webpack:///./src/initial_page_load.js?");

/***/ }),

/***/ "./src/models/event.js":
/*!*****************************!*\
  !*** ./src/models/event.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Event; });\nclass Event {\n\n  constructor(name) {\n    this.name = name;\n    this.handlers = [];\n  }\n\n  addHandler(handler) {\n    this.handlers.push(handler);\n  }\n\n  removeHandler(handler) {\n    for(let i=0; i < this.handlers.length; i++) {\n      if (this.handlers[i] == handler) {\n        this.handlers.splice(i, 1);\n        break;\n      }\n    }\n  }\n\n  fire(eventArgs) {\n    console.log(\"Fire ..\", this.name, eventArgs, this.handlers);\n\n    this.handlers.forEach((handler) => {\n      handler(eventArgs);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/models/event.js?");

/***/ }),

/***/ "./src/models/todo.js":
/*!****************************!*\
  !*** ./src/models/todo.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ToDo; });\nclass ToDo {\n  constructor(title, description, due, project, prioriy) {\n    this.title = title;\n    this.description = description;\n    this.due = due;\n    this.project = project;\n    this.prioriy = prioriy;\n  }\n}\n\n\n//# sourceURL=webpack:///./src/models/todo.js?");

/***/ }),

/***/ "./src/modules/event-aggregator.js":
/*!*****************************************!*\
  !*** ./src/modules/event-aggregator.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/event */ \"./src/models/event.js\");\n\n\nconst eventAggregator = (() => {\n  let events = [];\n\n  const getEvent = (eventName) => {\n    let event = events.filter((event) => {\n      return event.name == eventName;\n    })[0];\n\n    if (!event) {\n      console.log(\"EVENT NOT EXISIST\", eventName, event);\n      event = new _models_event__WEBPACK_IMPORTED_MODULE_0__[\"default\"](eventName);\n      events.push(event);\n    }\n    console.log(\"GetEvent....\", eventName, event);\n\n    return event;\n  }\n\n  const publish = (eventName, eventArgs) => {\n    console.log('PUBLISH -', eventName, eventArgs);\n    let event = getEvent(eventName);\n\n    // events.push(event);\n    event.fire(eventArgs);\n  }\n\n  const subscribe = (eventName, handler) => {\n    console.log('SUBSCRIBE ', eventName, handler);\n    let event = getEvent(eventName);\n    console.log(event);\n    event.addHandler(handler);\n  }\n\n  return {\n    publish,\n    subscribe\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (eventAggregator);\n\n\n//# sourceURL=webpack:///./src/modules/event-aggregator.js?");

/***/ })

/******/ });