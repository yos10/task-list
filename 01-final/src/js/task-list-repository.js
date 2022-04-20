const localstorageName = 'tasks';

function getTasks() {
  return JSON.parse(localStorage.getItem(localstorageName) || '[]');
}

function setItem(tasks) {
  localStorage.setItem(localstorageName, JSON.stringify(tasks));
}

function addTask(task) {
  const tasks = getTasks();
  tasks.push(task);
  setItem(tasks);
}

/**
 *
 * @param {string} id
 */
function deleteTask(id) {
  const filteredTasks = getTasks().filter((task) => task.id !== id);

  setItem(filteredTasks);
}

export { getTasks, setItem, addTask, deleteTask };
