import ToDo from '../models/todo';
import eventAggregator from '../modules/event-aggregator';

const todoListView = (() => {
  let content = `
  <section>
    <header>
      <h3>ToDos</h3>
      <div class="">
        <select class="custom-select custom-select-sm" id="projects-list">
          <option value="all">All</option>
          <option value="default">Default</option>
        </select>
      </div>
    </header>
    <div id="todo-list">

    </div>
  </section>
  <section class="mt-4">
  <header>
    <h3>Done</h3>
  </header>
  <div id="todos-done">

  </div>
  </section>
  `;

  let todos = [];
  let projects = [
    'All'
  ];

  const getTodoContent = (todo) => {
    let todoContent = `
      <div class="todo-infos">
        <div class="header">
          <h6>${todo.title}</h6>
          <div class="badge badge-info">${todo.project}</div>
        </div>
        <div class="body">${todo.description}</div>
        <div class="footer">
          <div class="infos">
            <div class="badge badge-secondary">${todo.due}</div>
            <div class="badge badge-success">${todo.priority}</div>
            <button type="button" id="todo-done-${todo.id}" data-todo-idx=${todo.id} class="btn btn-success">DONE</button>
          </div>
          <div class="actions">
            <button type="button" id="todo-delete-${todo.id}" data-todo-idx=${todo.id} class="btn btn-sm btn-danger">Delete</button>
            <button type="button" id="todo-edit-${todo.id}" data-todo-idx=${todo.id} class="btn btn-sm btn-warning">Edit</button>
          </div>
        </div>
      </div>
    `;

    return todoContent;
  }


  const todoAdded = (todo) => {

    let todoContent = getTodoContent(todo);

    var node = document.createElement("div");
    node.setAttribute('class', 'todo');
    node.setAttribute('id', `todo-${todo.id}`);
    node.innerHTML = todoContent;

    document.getElementById('todo-list').appendChild(node)
  }

  const todoRemoved = (id) => {
    var top = document.getElementById("todo-list");
    var child = document.getElementById("todo-" + id);
    top.removeChild(child);
  }

  const todoDone = (todo) => {
    // ADD it in the Todo Done List
    let todoDoneContent = `
      <div class="todo-infos">
        <div class="header">
          <h6>${todo.title}</h6>
          <div class="badge badge-info">${todo.project}</div>
        </div>
        <div class="body">${todo.description}</div>
        <div class="footer">
          <div class="infos">
            <div class="badge badge-secondary">${todo.due}</div>
            <div class="badge badge-success">${todo.priority}</div>
          </div>
        </div>
      </div>
    `;
    var node = document.createElement("div");
    node.setAttribute('class', 'todo done');
    node.innerHTML = todoDoneContent;
    document.getElementById('todos-done').appendChild(node);

    // Remove it from Todo List
    var top = document.getElementById("todo-list");
    var child = document.getElementById("todo-" + todo.id);
    top.removeChild(child);
  }

  const todoList = (todos) => {
    var node = document.getElementById("todo-list");
    while (node.firstChild) node.removeChild(node.firstChild);

    for (let i=0; i<todos.length; i++) {
      todoAdded(todos[i]);
    }
  }

  const projectCreated = (project) => {
    projects.push(project);

    updateProjectsListDOM();
  }

  const setProjectsList = (projectsList) => {
    projects = JSON.parse(JSON.stringify(projectsList));
    projects.unshift("All");

    updateProjectsListDOM();
  }

  const updateProjectsListDOM = () => {
    let select = document.getElementById('todos')
          .getElementsByTagName('select')[0];
    select.options.length = 0;
    for(let i=0; i<projects.length; i++) {
      select.options[select.options.length] =
              new Option(projects[i], projects[i]);
    }
  }

  const todoUpdate = (todo) => {
    let todoContent = getTodoContent(todo);

    document.getElementById(`todo-${todo.id}`).innerHTML = todoContent;
  }


  const listener = () => {
    document.querySelector('#todos').addEventListener('click', function(e) {
      e.preventDefault();

      if (e.target && e.target.id.startsWith("todo-delete")) {
        let todoIdx = e.target.dataset.todoIdx;
        eventAggregator.publish("todo.deleted", todoIdx);
      }

      if (e.target && e.target.id.startsWith("todo-done")) {
        let todoIdx = e.target.dataset.todoIdx;
        eventAggregator.publish("todo.status", todoIdx);
      }

      if (e.target && e.target.id.startsWith("todo-edit")) {
        let todoIdx = e.target.dataset.todoIdx;
        eventAggregator.publish("todo.edit.start", todoIdx);
      }
    });

    document.querySelector('#todos').addEventListener('input', function(e) {
      e.preventDefault();

      if (e.target.id !== 'projects-list') return;

      eventAggregator.publish("todos.filter", e.target.value);

    });
  }

  const load = () => {
    document.getElementById("todos").innerHTML = content;

    eventAggregator.subscribe('todo.added', todoAdded);
    eventAggregator.subscribe('todo.removed', todoRemoved);
    eventAggregator.subscribe('todo.done', todoDone);
    eventAggregator.subscribe("todos.filtered", todoList);
    eventAggregator.subscribe("todo.edit.update", todoUpdate);

    eventAggregator.subscribe('project.created', projectCreated);
    eventAggregator.subscribe('project.list', setProjectsList);
  }

  const init = () => {
    load();
    listener();
  }

  return {
    init
  };
})();

export default todoListView;
