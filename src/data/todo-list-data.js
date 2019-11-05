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

    updateTodos();
    eventAggregator.publish("todo.added", todo);
  }

  const deleteTodo = (todoIdx) => {
    originalTodoList = originalTodoList.filter((todo) => todo.id != todoIdx);

    updateTodos();
    eventAggregator.publish("todo.removed", todoIdx);
  }

  const editTodo = (todoIdx) => {
    let todo = originalTodoList.filter((todo) => todo.id == todoIdx)[0];

    updateTodos();
    eventAggregator.publish("todo.edit.to", todo);
  }

  const changeStatusTodo = (todoIdx) => {
    let todo;
    for (let i=0; i<originalTodoList.length; i++) {
      if (originalTodoList[i].id == todoIdx) {
        originalTodoList[i].done = true;
        todo = originalTodoList[i];

        break;
      }
    }

    updateTodos();
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

  const updateTodo = (todo) => {
    for (let i=0; i<originalTodoList.length; i++) {
      if (originalTodoList[i].id == todo.id) {
        originalTodoList[i] = todo;
        break;
      }
    }

    updateTodos();
    eventAggregator.publish("todo.edit.update", todo);
  }

  const loadTodos = () => {
    let lsTodos = localStorage.getItem("todos");
    if (lsTodos) {
      originalTodoList = JSON.parse(lsTodos);
      eventAggregator.publish("todos.list", originalTodoList);
    }
  }

  const updateTodos = () => {
    let lsTodos = localStorage.getItem("todos");
    if (lsTodos) {
      localStorage.removeItem("todos");
    } 

    localStorage.setItem("todos", JSON.stringify(originalTodoList));
  }

  const listener = () => {
    eventAggregator.subscribe("todo.created", addTodo);
    eventAggregator.subscribe("todo.deleted", deleteTodo);
    eventAggregator.subscribe("todo.status", changeStatusTodo);
    eventAggregator.subscribe("todos.filter", filter);
    eventAggregator.subscribe("todo.edit.start", editTodo);
    eventAggregator.subscribe("todo.edit.end", updateTodo);
  }

  const init = () => {
    listener();
    loadTodos();
  }

  return {
    init,
  };
})();

export default todoListData;
