let tasks = [];

function getTasks() {
  return JSON.parse(JSON.stringify(tasks) || '[]');
}

function addTask(task) {
  tasks.push(task);
}

function deleteTask(id) {
  const deletedTasks = getTasks().filter(task => task.id !== id);

  tasks = deletedTasks;
}

function createHtmlElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html;

  return template.content.firstElementChild;
}

function displayTaskList () {
  const tasks = getTasks();

  document.querySelectorAll('.taskrow').forEach(e => e.remove());

  tasks.forEach(t => {
    const html = `
      <tr class="taskrow">
        <td>${t.taskmonth}</td>
        <td>${t.taskstatus}</td>
        <td>${t.tasktitle}</td>
        <td>${t.taskdetail}</td>
        <td><button data-id="${t.id}">削除</button></td>
      </tr>
    `;
    const task = createHtmlElement(html);
    document.querySelector('#tasklist').appendChild(task);
  }); 
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
