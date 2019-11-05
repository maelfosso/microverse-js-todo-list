import ToDo from '../models/todo';
import eventAggregator from '../modules/event-aggregator';

const projectListData = (() => {
  let IDS = 0;
  let originalProjectList = ["Default"];

  const addProject = (project) => {
    originalProjectList.push(project);

    updateProjects();
    eventAggregator.publish("project.added", project);
  }

  const listener = () => {
    eventAggregator.subscribe("project.created", addProject);
  }

  const load = () => {
    loadProjects();
    eventAggregator.publish("project.list", originalProjectList);
  }

  const loadProjects = () => {
    let lsProjects = localStorage.getItem("projects");
    if (lsProjects) {
      originalProjectList = JSON.parse(lsProjects);

      if (originalProjectList.length == 0) {
        originalProjectList.push("Default");
      }
    }
  }

  const updateProjects = () => {
    let lsProjects = localStorage.getItem("projects");
    if (lsProjects) {
      localStorage.removeItem("projects");
    } 

    localStorage.setItem("projects", JSON.stringify(originalProjectList));
  }

  const init = () => {
    load();
    listener();
  }

  return {
    init,
  };
})();

export default projectListData;
