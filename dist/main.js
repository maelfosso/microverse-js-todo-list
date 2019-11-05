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

/***/ "./src/data/project-list-data.js":
/*!***************************************!*\
  !*** ./src/data/project-list-data.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/todo */ \"./src/models/todo.js\");\n/* harmony import */ var _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/event-aggregator */ \"./src/modules/event-aggregator.js\");\n\n\n\nconst projectListData = (() => {\n  let IDS = 0;\n  let originalProjectList = [\"Default\"];\n\n  const addProject = (project) => {\n    originalProjectList.push(project);\n\n    updateProjects();\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"project.added\", project);\n  }\n\n  const listener = () => {\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe(\"project.created\", addProject);\n  }\n\n  const load = () => {\n    loadProjects();\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"project.list\", originalProjectList);\n  }\n\n  const loadProjects = () => {\n    let lsProjects = localStorage.getItem(\"projects\");\n    if (lsProjects) {\n      originalProjectList = JSON.parse(lsProjects);\n\n      if (originalProjectList.length == 0) {\n        originalProjectList.push(\"Default\");\n      }\n    }\n  }\n\n  const updateProjects = () => {\n    let lsProjects = localStorage.getItem(\"projects\");\n    if (lsProjects) {\n      localStorage.removeItem(\"projects\");\n    } \n\n    localStorage.setItem(\"projects\", JSON.stringify(originalProjectList));\n  }\n\n  const init = () => {\n    load();\n    listener();\n  }\n\n  return {\n    init,\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (projectListData);\n\n\n//# sourceURL=webpack:///./src/data/project-list-data.js?");

/***/ }),

/***/ "./src/data/todo-list-data.js":
/*!************************************!*\
  !*** ./src/data/todo-list-data.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/todo */ \"./src/models/todo.js\");\n/* harmony import */ var _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/event-aggregator */ \"./src/modules/event-aggregator.js\");\n\n\n\nconst todoListData = (() => {\n  let IDS = 0;\n  let originalTodoList = [];\n  let filteredTodoList = [];\n\n  const addTodo = (todo) => {\n    todo.id = IDS;\n    IDS++;\n\n    originalTodoList.push(todo);\n    filteredTodoList.push(todo);\n\n    updateTodos();\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"todo.added\", todo);\n  }\n\n  const deleteTodo = (todoIdx) => {\n    originalTodoList = originalTodoList.filter((todo) => todo.id != todoIdx);\n\n    updateTodos();\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"todo.removed\", todoIdx);\n  }\n\n  const editTodo = (todoIdx) => {\n    let todo = originalTodoList.filter((todo) => todo.id == todoIdx)[0];\n\n    updateTodos();\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"todo.edit.to\", todo);\n  }\n\n  const changeStatusTodo = (todoIdx) => {\n    let todo;\n    for (let i=0; i<originalTodoList.length; i++) {\n      if (originalTodoList[i].id == todoIdx) {\n        originalTodoList[i].done = true;\n        todo = originalTodoList[i];\n\n        break;\n      }\n    }\n\n    updateTodos();\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"todo.done\", todo);\n  }\n\n  const filter = (project) => {\n    if (project == 'All') {\n      filteredTodoList = JSON.parse(JSON.stringify(originalTodoList));\n    } else {\n      filteredTodoList = originalTodoList.filter((todo) => todo.project == project);\n    }\n\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"todos.filtered\", filteredTodoList);\n  }\n\n  const updateTodo = (todo) => {\n    for (let i=0; i<originalTodoList.length; i++) {\n      if (originalTodoList[i].id == todo.id) {\n        originalTodoList[i] = todo;\n        break;\n      }\n    }\n\n    updateTodos();\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"todo.edit.update\", todo);\n  }\n\n  const loadTodos = () => {\n    let lsTodos = localStorage.getItem(\"todos\");\n    if (lsTodos) {\n      originalTodoList = JSON.parse(lsTodos);\n      _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"todos.list\", originalTodoList);\n    }\n  }\n\n  const updateTodos = () => {\n    let lsTodos = localStorage.getItem(\"todos\");\n    if (lsTodos) {\n      localStorage.removeItem(\"todos\");\n    } \n\n    localStorage.setItem(\"todos\", JSON.stringify(originalTodoList));\n  }\n\n  const listener = () => {\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe(\"todo.created\", addTodo);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe(\"todo.deleted\", deleteTodo);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe(\"todo.status\", changeStatusTodo);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe(\"todos.filter\", filter);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe(\"todo.edit.start\", editTodo);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe(\"todo.edit.end\", updateTodo);\n  }\n\n  const init = () => {\n    listener();\n    loadTodos();\n  }\n\n  return {\n    init,\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (todoListData);\n\n\n//# sourceURL=webpack:///./src/data/todo-list-data.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _initial_page_load__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./initial_page_load */ \"./src/initial_page_load.js\");\n\n\nObject(_initial_page_load__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/initial_page_load.js":
/*!**********************************!*\
  !*** ./src/initial_page_load.js ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _data_todo_list_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./data/todo-list-data */ \"./src/data/todo-list-data.js\");\n/* harmony import */ var _data_project_list_data__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./data/project-list-data */ \"./src/data/project-list-data.js\");\n/* harmony import */ var _views_create_todo_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./views/create-todo-view */ \"./src/views/create-todo-view.js\");\n/* harmony import */ var _views_todo_list_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./views/todo-list-view */ \"./src/views/todo-list-view.js\");\n/* harmony import */ var _views_projects_list_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./views/projects-list-view */ \"./src/views/projects-list-view.js\");\n\n\n\n\n\n\n\nconst initialPageLoad = () => {\n  let view = `\n  <header>\n    <h1>ToDo List</h1>\n  </header>\n  <main>\n    <aside>\n      <div id=\"todo-form-wrapper\">\n      </div>\n      <div id=\"projects\">\n      </div>\n    </aside>\n    <div id=\"todos\">\n    </div>\n  </main>\n  `;\n  document.getElementById('content').innerHTML = view;\n\n  _views_create_todo_view__WEBPACK_IMPORTED_MODULE_2__[\"default\"].init();\n  _views_todo_list_view__WEBPACK_IMPORTED_MODULE_3__[\"default\"].init();\n  _views_projects_list_view__WEBPACK_IMPORTED_MODULE_4__[\"default\"].init();\n\n  _data_todo_list_data__WEBPACK_IMPORTED_MODULE_0__[\"default\"].init();\n  _data_project_list_data__WEBPACK_IMPORTED_MODULE_1__[\"default\"].init();\n\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (initialPageLoad);\n\n\n//# sourceURL=webpack:///./src/initial_page_load.js?");

/***/ }),

/***/ "./src/models/event.js":
/*!*****************************!*\
  !*** ./src/models/event.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return Event; });\nclass Event {\n\n  constructor(name) {\n    this.name = name;\n    this.handlers = [];\n  }\n\n  addHandler(handler) {\n    this.handlers.push(handler);\n  }\n\n  removeHandler(handler) {\n    for(let i=0; i < this.handlers.length; i++) {\n      if (this.handlers[i] == handler) {\n        this.handlers.splice(i, 1);\n        break;\n      }\n    }\n  }\n\n  fire(eventArgs) {\n    this.handlers.forEach((handler) => {\n      handler(eventArgs);\n    });\n  }\n}\n\n\n//# sourceURL=webpack:///./src/models/event.js?");

/***/ }),

/***/ "./src/models/todo.js":
/*!****************************!*\
  !*** ./src/models/todo.js ***!
  \****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return ToDo; });\nclass ToDo {\n  constructor(title, description, due, project, priority) {\n    this.title = title;\n    this.description = description;\n    this.due = due;\n    this.project = project;\n    this.priority = priority;\n    this.status = 'progress';\n    this.id = -1;\n  }\n  \n}\n\n\n//# sourceURL=webpack:///./src/models/todo.js?");

/***/ }),

/***/ "./src/modules/event-aggregator.js":
/*!*****************************************!*\
  !*** ./src/modules/event-aggregator.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/event */ \"./src/models/event.js\");\n\n\nconst eventAggregator = (() => {\n  let events = [];\n\n  const getEvent = (eventName) => {\n    let event = events.filter((event) => {\n      return event.name == eventName;\n    })[0];\n\n    if (!event) {\n      event = new _models_event__WEBPACK_IMPORTED_MODULE_0__[\"default\"](eventName);\n      events.push(event);\n    }\n\n    return event;\n  }\n\n  const publish = (eventName, eventArgs) => {\n    let event = getEvent(eventName);\n\n    event.fire(eventArgs);\n  }\n\n  const subscribe = (eventName, handler) => {\n    let event = getEvent(eventName);\n    event.addHandler(handler);\n  }\n\n  return {\n    publish,\n    subscribe\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (eventAggregator);\n\n\n//# sourceURL=webpack:///./src/modules/event-aggregator.js?");

/***/ }),

/***/ "./src/views/create-todo-view.js":
/*!***************************************!*\
  !*** ./src/views/create-todo-view.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/todo */ \"./src/models/todo.js\");\n/* harmony import */ var _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/event-aggregator */ \"./src/modules/event-aggregator.js\");\n\n\n\nconst createTodoView = (() => {\n  let content = `\n  <h3>Create a ToDo</h3>\n  <form id=\"todo-form\" method=\"post\">\n    <div class=\"form-group\">\n      <input type=\"text\" class=\"form-control form-control-sm\" name=\"title\" id=\"title\" aria-describedby=\"emailHelp\" placeholder=\"Title\">\n    </div>\n    <div class=\"form-group\">\n      <textarea class=\"form-control form-control-sm\" name=\"description\" id=\"description\" rows=\"3\"></textarea>\n    </div>\n    <div class=\"row\">\n      <div class=\"form-group\">\n        <input type=\"date\" class=\"form-control form-control-sm\" name=\"due\" id=\"due\" placeholder=\"Date\">\n      </div>\n      <div>\n        <select name=\"project\" id=\"project\" class=\"custom-select custom-select-sm\">\n          <option value=\"0\">Select a project</option>\n        </select>\n      </div>\n    </div>\n    <div class=\"form-group\">\n\n      <div class=\"custom-control custom-radio custom-control-inline\">\n        <input class=\"custom-control-input\" type=\"radio\" name=\"priority\" id=\"low\" value=\"Low\">\n        <label class=\"custom-control-label\" for=\"low\">Low</label>\n      </div>\n      <div class=\"custom-control custom-radio custom-control-inline\">\n        <input class=\"custom-control-input\" type=\"radio\" name=\"priority\" id=\"normal\" value=\"Normal\">\n        <label class=\"custom-control-label\" for=\"normal\">Normal</label>\n      </div>\n      <div class=\"custom-control custom-radio custom-control-inline\">\n        <input class=\"custom-control-input\" type=\"radio\" name=\"priority\" id=\"high\" value=\"High\">\n        <label class=\"custom-control-label\" for=\"high\">High</label>\n      </div>\n    </div>\n\n    <div>\n        <button type=\"submit\" name=\"submit\" class=\"btn btn-sm btn-primary\">Submit</button>\n        <button type=\"button\" name=\"cancel\" id=\"cancel\" class=\"btn btn-sm btn-danger d-none\" onClick=\"cancel\">Cancel</button>\n    </div>\n  </form>\n  `;\n  let projects = [];\n\n  const load = () => {\n    document.getElementById(\"todo-form-wrapper\").innerHTML = content;\n  }\n\n  const listener = () => {\n    document.getElementById(\"cancel\").addEventListener('click', function(e) {\n      document.getElementById(\"todo-form\").reset();\n      document.querySelector(\"#todo-form button[name='submit']\").firstChild.data = \"Submit\"\n      this.classList.toggle(\"d-none\");\n    });\n\n    document.querySelector('form').addEventListener('submit', function(e) {\n      e.preventDefault();\n\n      let elements = this.elements;\n\n      let payload = {};\n      for(let i=0; i < elements.length; i++) {\n        if (elements[i].type == 'radio') {\n          if (elements[i].checked) {\n            let nameOfElement = elements[i].name;\n            let valueOfElement = elements[i].value;\n\n            payload[nameOfElement] = valueOfElement;\n          }\n        } else if (elements[i].type !== 'submit') {\n          let nameOfElement = elements[i].name;\n          let valueOfElement = elements[i].value;\n\n          payload[nameOfElement] = valueOfElement;\n        }\n      }\n      \n\n      let todo = new _models_todo__WEBPACK_IMPORTED_MODULE_0__[\"default\"](\n        payload.title,\n        payload.description,\n        payload.due,\n        payload.project,\n        payload.priority\n      );\n      \n      this.reset();\n      \n      let eltSubmit = document.querySelector(\"#todo-form button[name='submit']\");\n      if (eltSubmit.firstChild.data == \"Submit\") {\n        _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish('todo.created', todo);\n      } else {\n        todo.id = +eltSubmit.dataset.todoIdx;\n        document.getElementById(\"cancel\").classList.toggle(\"d-none\");\n        document.querySelector(\"#todo-form button[name='submit']\").firstChild.data = \"Submit\";\n        \n        _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish('todo.edit.end', todo);\n      }\n      \n    });\n\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe('project.added', projectAdded);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe('project.list', setProjectsList);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe(\"todo.edit.to\", editTodo);\n  }\n\n  const projectAdded = (project) => {\n    projects.push(project);\n\n    updateProjectsListDOM();\n  }\n\n  const setProjectsList = (projectsList) => {\n    projects = JSON.parse(JSON.stringify(projectsList));\n\n    updateProjectsListDOM();\n  }\n\n  const editTodo = (todo) => {\n    let todoForm = document.getElementById(\"todo-form\");\n    todoForm.elements.namedItem(\"title\").value = todo.title;\n    todoForm.elements.namedItem(\"description\").value = todo.description;\n    todoForm.elements.namedItem(\"due\").value = new Date(todo.due).toISOString().split('T')[0];\n    todoForm.elements.namedItem(\"project\").value = todo.project.toString() || todo.project;\n\n    let eltPriority = todoForm.elements.namedItem(\"priority\");\n    for( var j=0; j < eltPriority.length; j++ ) {\n      eltPriority[j].checked = ( todo.priority.indexOf(eltPriority[j].value) > -1 );\n    }\n\n    todoForm.elements.namedItem(\"submit\").firstChild.data = \"Save\";\n    todoForm.elements.namedItem(\"submit\").dataset.todoIdx = todo.id;\n    todoForm.elements.namedItem(\"cancel\").classList.toggle(\"d-none\");\n  }\n\n  const updateProjectsListDOM = () => {\n    let select = document.getElementById('todo-form-wrapper')\n          .getElementsByTagName('select')[0];\n    select.options.length = 0;\n    for(let i=0; i<projects.length; i++) {\n      select.options[select.options.length] = new Option(projects[i], projects[i]);\n    }\n  }\n\n  const init = () => {\n    load();\n    listener();\n  }\n\n  return {\n    init\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (createTodoView);\n\n\n//# sourceURL=webpack:///./src/views/create-todo-view.js?");

/***/ }),

/***/ "./src/views/projects-list-view.js":
/*!*****************************************!*\
  !*** ./src/views/projects-list-view.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../modules/event-aggregator */ \"./src/modules/event-aggregator.js\");\n\n\nconst projectListView = (() => {\n  let content = `\n  <h3>Projects</h3>\n  <ul id=\"projects-list\" class=\"list-group\"></ul>\n  <form name=\"add-project\" method=\"post\">\n  <div class=\"input-group mb-3\">\n    <input type=\"text\" class=\"form-control\" name=\"name\" id=\"name\" placeholder=\"Add a new project here\">\n    <div class=\"input-group-append\">\n      <button type=\"submit\" class=\"btn btn-primary\">Add</button>\n    </div>\n  </div>\n\n\n  </form>\n  `;\n\n  const projectAdded = (project) => {\n    var node = document.createElement(\"li\");\n    node.setAttribute('class', 'list-group-item')\n    node.innerHTML = project;\n\n    document.getElementById('projects-list').appendChild(node)\n  }\n\n  const load = () => {\n    document.getElementById(\"projects\").innerHTML = content;\n  }\n\n  const list = (projects) => {\n    for(let i=0; i < projects.length; i++) {\n      var node = document.createElement(\"li\");\n      node.setAttribute('class', 'list-group-item')\n      node.innerHTML = projects[i];\n\n      document.getElementById('projects-list').appendChild(node)\n    }\n  }\n\n  const listener = () => {\n    document.querySelector('#projects > form').addEventListener('submit', function(e) {\n      e.preventDefault();\n\n      let elements = this.elements;\n\n      let payload = {};\n      for(let i=0; i < elements.length; i++) {\n        if (elements[i].type !== 'submit') {\n          let nameOfElement = elements[i].name;\n          let valueOfElement = elements[i].value;\n\n          payload[nameOfElement] = valueOfElement;\n        }\n      }\n\n      let project = payload.name;\n\n      this.reset();\n      _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_0__[\"default\"].publish('project.created', project);\n    });\n\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('project.added', projectAdded);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_0__[\"default\"].subscribe('project.list', list);\n  }\n\n  const init = () => {\n    load();\n    listener();\n  }\n\n  return {\n    init\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (projectListView);\n\n\n//# sourceURL=webpack:///./src/views/projects-list-view.js?");

/***/ }),

/***/ "./src/views/todo-list-view.js":
/*!*************************************!*\
  !*** ./src/views/todo-list-view.js ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _models_todo__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../models/todo */ \"./src/models/todo.js\");\n/* harmony import */ var _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../modules/event-aggregator */ \"./src/modules/event-aggregator.js\");\n\n\n\nconst todoListView = (() => {\n  let content = `\n  <section>\n    <header>\n      <h3>ToDos</h3>\n      <div class=\"\">\n        <select class=\"custom-select custom-select-sm\" id=\"projects-list\">\n          <option value=\"all\">All</option>\n          <option value=\"default\">Default</option>\n        </select>\n      </div>\n    </header>\n    <div id=\"todo-list\">\n\n    </div>\n  </section>\n  <section class=\"mt-4\">\n  <header>\n    <h3>Done</h3>\n  </header>\n  <div id=\"todos-done\">\n\n  </div>\n  </section>\n  `;\n\n  let todos = [];\n  let projects = [\n    'All'\n  ];\n\n  const getTodoContent = (todo) => {\n    let todoContent = `\n      <div class=\"todo-infos\">\n        <div class=\"header\">\n          <h6>${todo.title}</h6>\n          <div class=\"badge badge-info\">${todo.project}</div>\n        </div>\n        <div class=\"body\">${todo.description}</div>\n        <div class=\"footer\">\n          <div class=\"infos\">\n            <div class=\"badge badge-secondary\">${todo.due}</div>\n            <div class=\"badge badge-success\">${todo.priority}</div>\n            <button type=\"button\" id=\"todo-done-${todo.id}\" data-todo-idx=${todo.id} class=\"btn btn-success\">DONE</button>\n          </div>\n          <div class=\"actions\">\n            <button type=\"button\" id=\"todo-delete-${todo.id}\" data-todo-idx=${todo.id} class=\"btn btn-sm btn-danger\">Delete</button>\n            <button type=\"button\" id=\"todo-edit-${todo.id}\" data-todo-idx=${todo.id} class=\"btn btn-sm btn-warning\">Edit</button>\n          </div>\n        </div>\n      </div>\n    `;\n\n    return todoContent;\n  }\n\n\n  const todoAdded = (todo) => {\n\n    let todoContent = getTodoContent(todo);\n\n    var node = document.createElement(\"div\");\n    node.setAttribute('class', 'todo');\n    node.setAttribute('id', `todo-${todo.id}`);\n    node.innerHTML = todoContent;\n\n    document.getElementById('todo-list').appendChild(node)\n  }\n\n  const todoRemoved = (id) => {\n    var top = document.getElementById(\"todo-list\");\n    var child = document.getElementById(\"todo-\" + id);\n    top.removeChild(child);\n  }\n\n  const todoDone = (todo) => {\n    // ADD it in the Todo Done List\n    let todoDoneContent = `\n      <div class=\"todo-infos\">\n        <div class=\"header\">\n          <h6>${todo.title}</h6>\n          <div class=\"badge badge-info\">${todo.project}</div>\n        </div>\n        <div class=\"body\">${todo.description}</div>\n        <div class=\"footer\">\n          <div class=\"infos\">\n            <div class=\"badge badge-secondary\">${todo.due}</div>\n            <div class=\"badge badge-success\">${todo.priority}</div>\n          </div>\n        </div>\n      </div>\n    `;\n    var node = document.createElement(\"div\");\n    node.setAttribute('class', 'todo done');\n    node.innerHTML = todoDoneContent;\n    document.getElementById('todos-done').appendChild(node);\n\n    // Remove it from Todo List\n    var top = document.getElementById(\"todo-list\");\n    var child = document.getElementById(\"todo-\" + todo.id);\n    top.removeChild(child);\n  }\n\n  const todoList = (todos) => {\n    var node = document.getElementById(\"todo-list\");\n    while (node.firstChild) node.removeChild(node.firstChild);\n\n    for (let i=0; i<todos.length; i++) {\n      todoAdded(todos[i]);\n    }\n  }\n\n  const projectCreated = (project) => {\n    projects.push(project);\n\n    updateProjectsListDOM();\n  }\n\n  const setProjectsList = (projectsList) => {\n    projects = JSON.parse(JSON.stringify(projectsList));\n    projects.unshift(\"All\");\n\n    updateProjectsListDOM();\n  }\n\n  const updateProjectsListDOM = () => {\n    let select = document.getElementById('todos')\n          .getElementsByTagName('select')[0];\n    select.options.length = 0;\n    for(let i=0; i<projects.length; i++) {\n      select.options[select.options.length] =\n              new Option(projects[i], projects[i]);\n    }\n  }\n\n  const todoUpdate = (todo) => {\n    let todoContent = getTodoContent(todo);\n\n    document.getElementById(`todo-${todo.id}`).innerHTML = todoContent;\n  }\n\n\n  const listener = () => {\n    document.querySelector('#todos').addEventListener('click', function(e) {\n      e.preventDefault();\n\n      if (e.target && e.target.id.startsWith(\"todo-delete\")) {\n        let todoIdx = e.target.dataset.todoIdx;\n        _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"todo.deleted\", todoIdx);\n      }\n\n      if (e.target && e.target.id.startsWith(\"todo-done\")) {\n        let todoIdx = e.target.dataset.todoIdx;\n        _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"todo.status\", todoIdx);\n      }\n\n      if (e.target && e.target.id.startsWith(\"todo-edit\")) {\n        let todoIdx = e.target.dataset.todoIdx;\n        _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"todo.edit.start\", todoIdx);\n      }\n    });\n\n    document.querySelector('#todos').addEventListener('input', function(e) {\n      e.preventDefault();\n\n      if (e.target.id !== 'projects-list') return;\n\n      _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].publish(\"todos.filter\", e.target.value);\n\n    });\n  }\n\n  const load = () => {\n    document.getElementById(\"todos\").innerHTML = content;\n\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe('todo.added', todoAdded);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe('todo.removed', todoRemoved);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe('todo.done', todoDone);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe(\"todo.edit.update\", todoUpdate);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe(\"todos.filtered\", todoList);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe(\"todos.list\", todoList);\n\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe('project.created', projectCreated);\n    _modules_event_aggregator__WEBPACK_IMPORTED_MODULE_1__[\"default\"].subscribe('project.list', setProjectsList);\n  }\n\n  const init = () => {\n    load();\n    listener();\n  }\n\n  return {\n    init\n  };\n})();\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (todoListView);\n\n\n//# sourceURL=webpack:///./src/views/todo-list-view.js?");

/***/ })

/******/ });