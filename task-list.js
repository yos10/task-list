let tasks = [];

function createHtmlElement(html) {
  const template = document.createElement('template');
  template.innerHTML(html);

  return template.content.firstElementChild;
}

function getTasks() {
  return JSON.parse(JSON.stringify(tasks) || '[]');
}

function addTask(task) {
  tasks.push(task);
}

function displayTaskList () {
  document.querySelector('#tasklist').appendChild();
}

function deleteTask(id) {
  const deletedTasks = getTasks().filter(task => task.id !== id);

  tasks = deletedTasks;
}

function addSample() {

}

const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const formElements = Array.from(form.elements).filter(element => element.id !== 'submit');
  const task = {};

  for (const element of formElements) {
    const elementId = element.id;
    const value = element.value;
    task[elementId] = value;
  }

  task['id'] = Date.now();

  addTask(task);
});
