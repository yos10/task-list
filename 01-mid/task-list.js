let tasks = [];

function getTasks() {
  return JSON.parse(JSON.stringify(tasks) || '[]');
}

function addTask(task) {
  tasks.push(task);
}

/**
 *
 * @param {string} id
 */
function deleteTask(id) {
  const filteredTasks = getTasks().filter((task) => task.id !== id);

  tasks = filteredTasks;
}

function createHtmlElement(html) {
  const template = document.createElement('template');
  template.innerHTML = html.trim();

  return template.content.firstElementChild;
}

function removeHtmlElement(querySelector) {
  document.querySelectorAll(querySelector).forEach((e) => e.remove());
}

function displayTaskList() {
  removeHtmlElement('.taskrow');

  const tasks = getTasks();
  tasks.forEach((t) => {
    const html = `
      <tr class="taskrow">
        <td>${t.taskmonth}</td>
        <td>${t.taskstatus}</td>
        <td>${t.tasktitle}</td>
        <td>${t.taskdetail}</td>
        <td><button class="btn-sm btn-dark" data-id="${t.id}">削除</button></td>
      </tr>
    `;
    const task = createHtmlElement(html);
    document.querySelector('#tasklist').appendChild(task);
  });
}

function addSample() {
  const task = {
    id: '1',
    taskmonth: '2021-07',
    taskstatus: '済',
    tasktitle: 'A社経営統合プロジェクト',
    taskdetail:
      '経営統合に伴う業務プロセス統合プロジェクト。<br>プロジェクトリーダー（メンバー４人）として担当。<br>ＱＤＣ目標いずれも達成。ＣＳ評価で５をいただいた。',
  };
  addTask(task);
  displayTaskList();
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
    const value = element.value;
    task[elementId] = value;

    // 入力エリアを初期化
    element.value = '';
  }

  task['id'] = Date.now().toString();

  addTask(task);
  displayTaskList();
});

// 削除ボタンを押した時
const tasklist = document.querySelector('#tasklist');
// Event Delegation
tasklist.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    const id = e.target.dataset.id;
    deleteTask(id);
    displayTaskList();
  }
});

addSample();
