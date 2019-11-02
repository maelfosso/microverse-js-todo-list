import ToDo from '../models/todo';
import eventAggregator from '../modules/event-aggregator';

const projectListData = (() => {
  let IDS = 0;
  let originalProjectList = ["Default"];

  const addProject = (project) => {
    originalProjectList.push(project);

    eventAggregator.publish("project.added", project);
  }

  const listener = () => {
    eventAggregator.subscribe("project.created", addProject);
  }

  const load = () => {
    eventAggregator.publish("project.list", originalProjectList);
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
