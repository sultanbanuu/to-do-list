const todoList = document.querySelector("#todoList");
const addBtn = document.querySelector("#addBtn");
const sortBtn = document.querySelector("#sort");

const todos = loadTodos();

addBtn.addEventListener("click", () => {
  addTodo();
  renderTodoElements();
});

let direction = true;

sortBtn.addEventListener("click", () => {
  sortTodo(direction);
  direction = !direction;
  renderTodoElements();
});

function addTodo() {
  const todoItem = {
    id: generateRandomId(),
    title: "",
  };
  todos.push(todoItem);
  commit();
}

function deleteTodo(todoId) {
  const index = todos.findIndex((i) => i.id === todoId);
  todos.splice(index, 1);
  commit();
}

function editTodo(todoId, title) {
  const index = todos.findIndex((i) => i.id === todoId);
  todos[index].title = title;
  commit();
}

function sortTodo(direction) {
  todos.sort((x, y) => {
    let res = 0;
    if (x.title > y.title) {
      res = 1;
    }
    if (x.title < y.title) {
      res = -1;
    }
    return res * (direction ? 1 : -1);
  });
  commit();
}

function renderTodoElements() {
  todoList.innerHTML = "";
  todos.forEach((todo) => {
    const listItem = document.createElement("li");
    const input = document.createElement("input");
    input.value = todo.title;

    input.addEventListener("change", (e) => {
      editTodo(todo.id, e.target.value);
      console.log(e.target.value);
      renderTodoElements();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.innerText = "X";
    deleteBtn.addEventListener("click", () => {
      deleteTodo(todo.id);
      renderTodoElements();
    });

    listItem.append(input, deleteBtn);
    todoList.append(listItem);
  });
}

renderTodoElements();

function generateRandomId() {
  return Math.trunc(Math.random() * 1_000_000);
}

function loadTodos() {
  return JSON.parse(localStorage.getItem("data") || "[]");
}

function commit() {
  localStorage.setItem("data", JSON.stringify(todos));
}
