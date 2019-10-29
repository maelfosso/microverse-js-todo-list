import ToDo from '../models/todo';
import eventAggregator from '../modules/event-aggregator';

const createTodo = (() => {
  let content = `
  <h3>Create a ToDo</h3>
  <form id="todo-form" method="post">
    <div class="form-group">
      <input type="text" class="form-control form-control-sm" name="title" id="title" aria-describedby="emailHelp" placeholder="Title">
    </div>
    <div class="form-group">
      <textarea class="form-control form-control-sm" name="description" id="description" rows="3"></textarea>
    </div>
    <div class="row">
      <div class="form-group">
        <input type="date" class="form-control form-control-sm" name="due" id="due" placeholder="Date">
      </div>
      <div>
        <select name="project" id="project" class="custom-select custom-select-sm">
          <option value="0">Select a project</option>
        </select>
      </div>
    </div>
    <div class="form-group">

      <div class="custom-control custom-radio custom-control-inline">
        <input class="custom-control-input" type="radio" name="priority" id="low" value="low">
        <label class="custom-control-label" for="low">Low</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input class="custom-control-input" type="radio" name="priority" id="normal" value="normal">
        <label class="custom-control-label" for="normal">Normal</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input class="custom-control-input" type="radio" name="priority" id="hight" value="hight">
        <label class="custom-control-label" for="hight">Hight</label>
      </div>
    </div>

    <div>
        <button type="submit" name="submit" class="btn btn-sm btn-primary">Submit</button>
    </div>
  </form>
  `;
  let projects = [];

  const load = () => {
    document.getElementById("todo-form-wrapper").innerHTML = content;
  }

  const listener = () => {
    document.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();

      let elements = this.elements;
      console.log(elements);

      let payload = {};
      for(let i=0; i < elements.length; i++) {
        if (elements[i].type !== 'submit') {
          let nameOfElement = elements[i].name;
          let valueOfElement = elements[i].value;

          payload[nameOfElement] = valueOfElement;
        }
      }

      console.log(payload);
      let todo = new ToDo(
        payload.title,
        payload.description,
        payload.due,
        payload.project,
        payload.priority
      );

      this.reset();
      console.log(todo);
      eventAggregator.publish('todo.created', todo);
    });

    eventAggregator.subscribe('project.created', projectCreated);
    eventAggregator.subscribe('project.list', setProjectsList);
  }

  const projectCreated = (project) => {
    console.log("projectCreated....", project);
    projects.push(project);

    updateProjectsListDOM();
  }

  const setProjectsList = (projectsList) => {
    projects = JSON.parse(JSON.stringify(projectsList));

    updateProjectsListDOM();
  }

  const updateProjectsListDOM = () => {
    let select = document.getElementById('todo-form-wrapper')
          .getElementsByTagName('select')[0];
    select.options.length = 0;
    for(let i=0; i<projects.length; i++) {
      select.options[select.options.length] = new Option(projects[i], projects[i]);
    }
  }

  const init = () => {
    load();
    listener();
  }

  return {
    init
  };
})();

export default createTodo;
