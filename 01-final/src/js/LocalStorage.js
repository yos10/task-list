export class LocalStorage {
  constructor(storageName) {
    this.storageName = storageName;
  }

  getTasks() {
    return JSON.parse(localStorage.getItem(this.storageName) || '[]');
  }

  setItem(tasks) {
    localStorage.setItem(this.storageName, JSON.stringify(tasks));
  }

  addTask(task) {
    const tasks = this.getTasks();
    tasks.push(task);
    this.setItem(tasks);
  }

  /**
   *
   * @param {string} id
   */
  deleteTask(id) {
    const filteredTasks = this.getTasks().filter((task) => task.id !== id);
    this.setItem(filteredTasks);
  }
}
