import ToDo from '../models/todo';
import eventAggregator from '../modules/event-aggregator';

const todoList = (() => {
  let content = `
  <section>
    <header>
      <h3>ToDos</h3>
      <div class="">
        <select class="custom-select custom-select-sm" name="projects-list">
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


  const todoCreated = (todo) => {
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
            <button type="button" id="todo-done-${todos.length - 1}" data-todo-idx=${todos.length - 1} class="btn btn-success">Delete</button>
          </div>
          <div class="actions">
            <button type="button" id="todo-delete-${todos.length - 1}" data-todo-idx=${todos.length - 1} class="btn btn-sm btn-danger">Delete</button>

          </div>
        </div>
      </div>
    `;
    var node = document.createElement("div");
    node.setAttribute('class', 'todo');
    node.setAttribute('id', `todo-${todos.length - 1}`);
    node.innerHTML = todoContent;

    document.getElementById('todo-list').appendChild(node)
  }

  const todoDone = (todo) => {
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
          </div>
        </div>
      </div>
    `;
    var node = document.createElement("div");
    node.setAttribute('class', 'todo done');
    // node.setAttribute('id', `todo-${todos.length - 1}`);
    node.innerHTML = todoContent;

    document.getElementById('todos-done').appendChild(node)
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
      select.options[select.options.length] =
              new Option(projects[i], projects[i]);
    }
  }

  const listener = () => {
    document.querySelector('#todos').addEventListener('click', function(e) {
      e.preventDefault();
      console.log(e)


      if (e.target && e.target.id.startsWith("todo-delete")) {
        console.log(e.target);

        let todoIdx = e.target.dataset.todoIdx;
        console.log(todoIdx);
        todos.splice(todoIdx, 1);

        console.log(todos);

        var top = document.getElementById("todo-list");
        var child = document.getElementById("todo-" + todoIdx);
        top.removeChild(child);
      }
      if (e.target && e.target.id.startsWith("todo-done")) {
        console.log(e.target);

        let todoIdx = e.target.dataset.todoIdx;
        todos[todoIdx].status = 'done';
        let todo = JSON.parse(JSON.stringify(todos[todoIdx]));
        todos.splice(todoIdx, 1);

        console.log(todos);

        var top = document.getElementById("todo-list");
        var child = document.getElementById("todo-" + todoIdx);
        top.removeChild(child);

        todoDone(todo);
      }
    })
  }

  const load = () => {
    document.getElementById("todos").innerHTML = content;

    eventAggregator.subscribe('todo.created', todoCreated);

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

export default todoList;
