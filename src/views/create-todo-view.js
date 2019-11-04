import ToDo from '../models/todo';
import eventAggregator from '../modules/event-aggregator';

const createTodoView = (() => {
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
        <input class="custom-control-input" type="radio" name="priority" id="low" value="Low">
        <label class="custom-control-label" for="low">Low</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input class="custom-control-input" type="radio" name="priority" id="normal" value="Normal">
        <label class="custom-control-label" for="normal">Normal</label>
      </div>
      <div class="custom-control custom-radio custom-control-inline">
        <input class="custom-control-input" type="radio" name="priority" id="high" value="High">
        <label class="custom-control-label" for="high">High</label>
      </div>
    </div>

    <div>
        <button type="submit" name="submit" class="btn btn-sm btn-primary">Submit</button>
        <button type="button" name="cancel" id="cancel" class="btn btn-sm btn-danger d-none" onClick="cancel">Cancel</button>
    </div>
  </form>
  `;
  let projects = [];

  const load = () => {
    document.getElementById("todo-form-wrapper").innerHTML = content;
  }

  const listener = () => {
    document.getElementById("cancel").addEventListener('click', function(e) {
      document.getElementById("todo-form").reset();
      document.querySelector("#todo-form button[name='submit']").firstChild.data = "Submit"
      this.classList.toggle("d-none");
    });

    document.querySelector('form').addEventListener('submit', function(e) {
      e.preventDefault();

      let elements = this.elements;

      let payload = {};
      for(let i=0; i < elements.length; i++) {
        if (elements[i].type == 'radio') {
          if (elements[i].checked) {
            let nameOfElement = elements[i].name;
            let valueOfElement = elements[i].value;

            payload[nameOfElement] = valueOfElement;
          }
        } else if (elements[i].type !== 'submit') {
          let nameOfElement = elements[i].name;
          let valueOfElement = elements[i].value;

          payload[nameOfElement] = valueOfElement;
        }
      }
      

      let todo = new ToDo(
        payload.title,
        payload.description,
        payload.due,
        payload.project,
        payload.priority
      );
      
      this.reset();
      
      let eltSubmit = document.querySelector("#todo-form button[name='submit']");
      if (eltSubmit.firstChild.data == "Submit") {
        eventAggregator.publish('todo.created', todo);
      } else {
        todo.id = +eltSubmit.dataset.todoIdx;
        document.getElementById("cancel").classList.toggle("d-none");
        document.querySelector("#todo-form button[name='submit']").firstChild.data = "Submit";
        
        eventAggregator.publish('todo.edit.end', todo);
      }
      
    });

    eventAggregator.subscribe('project.added', projectAdded);
    eventAggregator.subscribe('project.list', setProjectsList);
    eventAggregator.subscribe("todo.edit.to", editTodo);
  }

  const projectAdded = (project) => {
    projects.push(project);

    updateProjectsListDOM();
  }

  const setProjectsList = (projectsList) => {
    projects = JSON.parse(JSON.stringify(projectsList));

    updateProjectsListDOM();
  }

  const editTodo = (todo) => {
    let todoForm = document.getElementById("todo-form");
    todoForm.elements.namedItem("title").value = todo.title;
    todoForm.elements.namedItem("description").value = todo.description;
    todoForm.elements.namedItem("due").value = new Date(todo.due).toISOString().split('T')[0];
    todoForm.elements.namedItem("project").value = todo.project.toString() || todo.project;

    let eltPriority = todoForm.elements.namedItem("priority");
    for( var j=0; j < eltPriority.length; j++ ) {
      eltPriority[j].checked = ( todo.priority.indexOf(eltPriority[j].value) > -1 );
    }

    todoForm.elements.namedItem("submit").firstChild.data = "Save";
    todoForm.elements.namedItem("submit").dataset.todoIdx = todo.id;
    todoForm.elements.namedItem("cancel").classList.toggle("d-none");
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

export default createTodoView;
