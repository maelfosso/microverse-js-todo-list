import ToDo from '../models/todo';
import eventAggregator from '../modules/event-aggregator';

const todoListData = (() => {
  let IDS = 0;
  let originalTodoList = [];
  let filteredTodoList = [];

  const addTodo = (todo) => {
    todo.id = IDS;
    IDS++;

    originalTodoList.push(todo);
    filteredTodoList.push(todo);

    eventAggregator.publish("todo.added", todo);
  }

  const deleteTodo = (todoIdx) => {
    originalTodoList = originalTodoList.filter((todo) => todo.id != todoIdx);

    eventAggregator.publish("todo.removed", todoIdx);
  }

  const changeStatusTodo = (todoIdx) => {
    let todo;
    for (let i=0; i<originalTodoList.length; i++) {
      if (originalTodoList[i].id == todoIdx) {
        originalTodoList[i].done = true;
        todo = originalTodoList[i];
      }
    }

    eventAggregator.publish("todo.done", todo);
  }

  const filter = (project) => {
    if (project == 'All') {
      filteredTodoList = JSON.parse(JSON.stringify(originalTodoList));
    } else {
      filteredTodoList = originalTodoList.filter((todo) => todo.project == project);
    }

    eventAggregator.publish("todos.filtered", filteredTodoList);
  }

  const listener = () => {
    eventAggregator.subscribe("todo.created", addTodo);
    eventAggregator.subscribe("todo.deleted", deleteTodo);
    eventAggregator.subscribe("todo.status", changeStatusTodo);
    eventAggregator.subscribe("todos.filter", filter);
  }

  const init = () => {
    listener();
  }

  return {
    init,
  };
})();

export default todoListData;
