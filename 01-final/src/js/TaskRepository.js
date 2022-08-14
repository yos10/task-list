export class TaskRepository {
  constructor() {
    this.storageName = 'tasks';
  }

  // 全件取得
  getAll() {
    return JSON.parse(localStorage.getItem(this.storageName) || '[]');
  }

  #setItem(tasks) {
    localStorage.setItem(this.storageName, JSON.stringify(tasks));
  }

  // この4つをもらうようにして変なデータが入らないようにする
  add(month, status, title, detail) {
    const tasks = this.getAll();
    // idの生成は他のオブジェクトではさせない
    const id = this.#generateId();
    const task = {
      id: id,
      month: month,
      status: status,
      title: title,
      detail: detail,
    };

    tasks.push(task);
    this.#setItem(tasks);
  }

  delete(id) {
    const filteredTasks = this.getAll().filter((task) => task.id !== id);
    this.#setItem(filteredTasks);
  }

  // idはこの関数でユニークなものを一意に生成する
  // 他では使わせないようにする
  // # をつけることでカプセル化できる
  // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Classes/Private_class_fields
  #generateId() {
    return (
      new Date().getTime().toString(16) +
      Math.floor(1000 * Math.random()).toString(16)
    );
  }
}
