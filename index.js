import {
  getDataFromLocalStorage,
  saveDataToLocalStorage,
} from "./Handlers/storageHandler.js";

const todoInput = document.getElementById("inputTodo");
const form = document.querySelector("form");
const searchInput = document.getElementById("searchTodo");
let todoList = [];

//Add Todo
const addTodo = (event) => {
  event.preventDefault();
  const todo = todoInput.value.trim();
  if (todo.length) {
    const data = {
      id: crypto.randomUUID(),
      description: todo,
      completed: false,
    };
    todoList.push(data);
    saveDataToLocalStorage(todoList);
    todoInput.value = "";
    renderTodo();
  } else {
    alert("add a todo item");
  }
};

//Render Todo
const renderTodo = (filter = "") => {
  const oldList = document.querySelector("#todoList");
  if (oldList) oldList.innerHTML = "";

  const filteredTodos = todoList.filter((todo) =>
    todo.description.toLowerCase().includes(filter.toLowerCase())
  );

  if (filteredTodos.length === 0) {
    const noItemsMessage = document.createElement("p");
    noItemsMessage.innerText = "Nothing in the list";
    noItemsMessage.className = "no-todo-message"; // Optional: add a class for styling
    oldList.appendChild(noItemsMessage);
    updateTodoCounter();
    updateCompletedTodoCounter();
    return;
  }

  filteredTodos.forEach((todo) => createList(todo));
};

const createList = (todo) => {
  let li = document.createElement("li");

  let checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () =>
    changeCheckboxValue(checkbox, todo)
  );

  let label = document.createElement("label");
  label.setAttribute("id", `label-${todo.id}`);
  label.innerText = todo.description;
  label.style.cursor = "pointer";

  let inputEdit = document.createElement("input");
  inputEdit.type = "text";
  inputEdit.style.display = "none";
  inputEdit.value = todo.description;
  inputEdit.className = "edit-input";

  let editBtn = document.createElement("button");
  editBtn.innerText = "Edit";
  editBtn.className = "editBtn";
  editBtn.style.marginLeft = "10px";
  editBtn.addEventListener("click", () => {
    label.style.display = "none";
    inputEdit.style.display = "inline";
    inputEdit.focus();
  });

  inputEdit.addEventListener("blur", () => {
    const newValue = inputEdit.value.trim();
    if (newValue) {
      todo.description = newValue;
      label.innerText = newValue;
      saveDataToLocalStorage(todoList);
    }
    label.style.display = "inline";
    inputEdit.style.display = "none";
  });

  let delBtn = document.createElement("button");
  delBtn.innerText = "Delete";
  delBtn.className = "delBtn";
  delBtn.addEventListener("click", () => deleteTodo(todo));

  let btnDiv = document.createElement("div");
  btnDiv.className = "btnDiv";
  btnDiv.appendChild(editBtn);
  btnDiv.appendChild(delBtn);

  li.appendChild(checkbox);
  li.appendChild(label);
  li.appendChild(inputEdit);
  li.appendChild(btnDiv);
  document.getElementById("todoList").appendChild(li);

  updateTodoCounter();
  updateCompletedTodoCounter();
};

const changeCheckboxValue = (checkbox, todo) => {
  checkbox.checked = !todo.completed;
  const todoIndex = todoList.findIndex((obj) => obj.id === todo.id);
  todoList[todoIndex].completed = !todo.completed;
  saveDataToLocalStorage(todoList);
  updateCompletedTodoCounter();
};

//Delete Todo
const deleteTodo = (todo) => {
  todoList = todoList.filter((item) => item.id !== todo.id);
  renderTodo();
  saveDataToLocalStorage(todoList);
  updateTodoCounter();
  updateCompletedTodoCounter();
};

//Count Todos
const updateTodoCounter = () => {
  const totalTodos = document.getElementById("totalTodos");
  totalTodos.innerHTML = todoList.length;
};

//Count Completed Todos
const updateCompletedTodoCounter = () => {
  let completedTodos = document.getElementById("completedTodos");
  const completedTodoList = todoList.filter((todo) => todo.completed === true);
  completedTodos.innerHTML = completedTodoList.length;
};

document.addEventListener("DOMContentLoaded", () => {
  form.addEventListener("submit", addTodo);

  if (getDataFromLocalStorage()) {
    todoList = getDataFromLocalStorage();
  }

  renderTodo();

  searchInput.addEventListener("input", (e) => {
    const query = e.target.value;
    renderTodo(query);
  });
});
