import ToDo from '../models/todo';
import eventAggregator from '../modules/event-aggregator';

const todoList = (() => {
  let content = `
  <header>
    <h3>ToDos</h3>
    <div class="">
      <button type="button" class="btn btn-sm" disabled name="delete-selected-todos" id="delete-selected-todos">Delete all (before)</button>
      <button type="button" class="btn btn-sm btn-danger active" name="delete-selected-todos" id="delete-selected-todos">Delete all (after)</button>
      <select class="custom-select custom-select-sm" name="projects-list">
        <option value="all">All</option>
        <option value="default">Default</option>
      </select>
    </div>
  </header>
  <div class="todo-list">

  </div>
  `;

  let todos = [];
  let projects = [
    'All'
  ];


  const todoCreated = (todo) => {
    console.log("todoCreated...", todo);
    todos.push(todo);

    let todoContent = `
      <div class="custom-control custom-checkbox">
        <input type="checkbox" class="custom-control-input" id="customCheck1">
        <label class="custom-control-label" for="customCheck1"></label>
      </div>
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
          <div class="actions">
            <button type="button" name="todo-delete" data-todo-id=${todos.length - 1} class="btn btn-sm btn-danger">Delete</button>
            <button type="button" name="todo-edit" data-todo-id=${todos.length - 1} class="btn btn-sm btn-warning">Edit</button>
          </div>
        </div>
      </div>
    `;
    var node = document.createElement("div");
    node.setAttribute('class', 'todo');
    node.innerHTML = todoContent;

    document.getElementsByClassName('todo-list')[0].appendChild(node)
  }

  const projectCreated = (project) => {
    console.log("projectCreated....", project);
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
      select.options[select.options.length] = new Option(projects[i], projects[i]);
    }
  }

  const load = () => {
    document.getElementById("todos").innerHTML = content;

    eventAggregator.subscribe('todo.created', todoCreated);

    eventAggregator.subscribe('project.created', projectCreated);
    eventAggregator.subscribe('project.list', setProjectsList);
  }

  const init = () => {
    load();
  }

  return {
    init
  };
})();

export default todoList;
