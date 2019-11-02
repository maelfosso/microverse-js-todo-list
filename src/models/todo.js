export default class ToDo {
  constructor(title, description, due, project, priority) {
    this.title = title;
    this.description = description;
    this.due = due;
    this.project = project;
    this.priority = priority;
    this.status = 'progress';
    this.id = -1;
  }
  
}
