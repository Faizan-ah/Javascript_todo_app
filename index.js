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
const renderTodo = () => {
  const oldList = document.querySelector("#todoList");
  if (oldList) oldList.innerHTML = "";
  todoList.forEach((todo) => {
    createList(todo);
  });
};

const createList = (todo) => {
  let li = document.createElement("li");

  var checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = todo.completed;
  checkbox.addEventListener("change", () =>
    changeCheckboxValue(checkbox, todo)
  );

  let label = document.createElement("label");
  label.setAttribute("id", `label-${todo.id}`);
  label.innerHTML = todo.description;
  label.addEventListener("click", () => changeCheckboxValue(checkbox, todo));

  let btnDiv = document.createElement("btnDiv");
  btnDiv.setAttribute("class", "btnDiv");

  const delBtn = document.createElement("button");
  delBtn.setAttribute("class", "delBtn");
  delBtn.type = "button";
  delBtn.innerHTML = "Delete";
  delBtn.style.marginLeft = "10px";
  delBtn.addEventListener("click", () => deleteTodo(todo));

  li.appendChild(checkbox);
  li.appendChild(label);
  btnDiv.appendChild(delBtn);
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
});
