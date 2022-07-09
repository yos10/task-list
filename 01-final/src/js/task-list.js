import { LocalStorage } from './LocalStorage.js';
import { sampleData } from './sample-data.js';

const repo = new LocalStorage('tasks');

function createHtmlElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();

  return template.content.firstElementChild;
}

function removeHtmlElement(querySelector) {
  const nodeList = document.querySelectorAll(querySelector);
  for (const node of nodeList) {
    node.remove();
  }
}

function displayTaskList() {
  removeHtmlElement('.taskrow');

  const tasks = repo.getTasks();

  for (const task of tasks) {
    const html = `
      <tr class="taskrow">
        <td></td>
        <td></td>
        <td></td>
        <td></td>
        <td><button class="btn-sm btn-dark" data-id="${task.id}">削除</button></td>
      </tr>
    `;
    const tableRow = createHtmlElement(html);
    const td = tableRow.querySelectorAll('td');
    td[0].textContent = task.taskmonth;
    td[1].textContent = task.taskstatus;
    td[2].textContent = task.tasktitle;
    td[3].textContent = task.taskdetail;

    document.querySelector('#tasklist').appendChild(tableRow);
  }
}

// 登録ボタンを押した時
const form = document.querySelector('#form');
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const task = {};

  const formElements = Array.from(form.elements).filter(
    (element) => element.id !== 'submit'
  );
  for (const element of formElements) {
    const elementId = element.id;
    const elementValue = element.value;
    task[elementId] = elementValue;

    // 入力エリアを初期化
    element.value = '';
  }

  task['id'] = Date.now().toString();

  repo.addTask(task);
  displayTaskList();
});

// 削除ボタンを押した時
const tasklist = document.querySelector('#tasklist');
// Event Delegation
tasklist.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const id = e.target.dataset.id;
    repo.deleteTask(id);
    displayTaskList();
  }
});

window.addEventListener('DOMContentLoaded', (e) => {
  const tasks = repo.getTasks();

  if (tasks.length === 0) {
    repo.addTask(sampleData);
  }

  displayTaskList();
});
