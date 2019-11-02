import eventAggregator from '../modules/event-aggregator';

const projectListView = (() => {
  let content = `
  <h3>Projects</h3>
  <ul id="projects-list" class="list-group"></ul>
  <form name="add-project" method="post">
  <div class="input-group mb-3">
    <input type="text" class="form-control" name="name" id="name" placeholder="Add a new project here">
    <div class="input-group-append">
      <button type="submit" class="btn btn-primary">Add</button>
    </div>
  </div>


  </form>
  `;

  let projects = [
    "Default"
  ];

  const projectCreated = (project) => {
    console.log("projectCreated...", project);
    projects.push(project);

    var node = document.createElement("li");
    node.setAttribute('class', 'list-group-item')
    node.innerHTML = project;

    document.getElementById('projects-list').appendChild(node)
  }

  const load = () => {
    document.getElementById("projects").innerHTML = content;

    for(let i=0; i < projects.length; i++) {
      var node = document.createElement("li");
      node.setAttribute('class', 'list-group-item')
      node.innerHTML = projects[i];

      document.getElementById('projects-list').appendChild(node)
    }

    eventAggregator.subscribe('project.created', projectCreated);
    eventAggregator.publish('project.list', projects);
  }

  const listener = () => {
    document.querySelector('#projects > form').addEventListener('submit', function(e) {
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

      let project = payload.name;

      this.reset();
      eventAggregator.publish('project.created', project);
    });
  }

  const init = () => {
    load();
    listener();
  }

  return {
    init
  };
})();

export default projectListView;
