import createTodo from './content/create-todo';
import todoList from './content/todo-list';

const initialPageLoad = () => {
  let content = `
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
  document.getElementById('content').innerHTML = content;

  createTodo.init();
  todoList.init();

}

export default initialPageLoad;