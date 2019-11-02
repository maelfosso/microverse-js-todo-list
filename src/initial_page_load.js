import todoListData from './data/todo-list-data';
import projectListData from './data/project-list-data';

import createTodoView from './views/create-todo-view';
import todoListView from './views/todo-list-view';
import projectsListView from './views/projects-list-view';

const initialPageLoad = () => {
  let view = `
  <header>
    <h1>ToDo List</h1>
  </header>
  <main>
    <aside>
      <div id="todo-form-wrapper">
      </div>
      <div id="projects">
      </div>
    </aside>
    <div id="todos">
    </div>
  </main>
  `;
  document.getElementById('content').innerHTML = view;

  createTodoView.init();
  todoListView.init();
  projectsListView.init();

  todoListData.init();
  projectListData.init();

}

export default initialPageLoad;
