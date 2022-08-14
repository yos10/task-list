import { TaskRepository } from './TaskRepository.js';
import { sampleData } from './sample-data.js';

const taskRepository = new TaskRepository();

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

  const tasks = taskRepository.getAll();

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
    td[0].textContent = task.month;
    td[1].textContent = task.status;
    td[2].textContent = task.title;
    td[3].textContent = task.detail;

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
  }

  form.reset();

  taskRepository.add(
    task.taskmonth,
    task.taskstatus,
    task.tasktitle,
    task.taskdetail
  );
  displayTaskList();
});

// 月ピッカーを表示
const monthInput = document.querySelector('#taskmonth');
monthInput.addEventListener('click', () => {
  monthInput.showPicker();
});

// 削除ボタンを押した時
const tasklist = document.querySelector('#tasklist');
// Event Delegation
tasklist.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const id = e.target.dataset.id;

    taskRepository.delete(id);
    displayTaskList();
  }
});

// サンプルデータ表示
window.addEventListener('DOMContentLoaded', () => {
  const tasks = taskRepository.getAll();

  if (tasks.length === 0) {
    taskRepository.add(
      sampleData.taskmonth,
      sampleData.taskstatus,
      sampleData.tasktitle,
      sampleData.taskdetail
    );
  }

  displayTaskList();
});
