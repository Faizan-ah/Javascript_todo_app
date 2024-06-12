const todoInput = document.getElementById("inputTodo")
const todoBtn = document.getElementById("btnTodo")
const todoList = []
let labelCountId = 0

//add todo
const addTodo = (event) => {
    event.preventDefault()
    const todo = todoInput.value.trim()
    if (todo.length) {
        todoList.push(todo)
        todoInput.value = ""
        displayTodo(todo)
    } else {
        alert("add a todo item")
    }
}

//delete todo
const deleteTodo = (value, label) => {
    const index = todoList.indexOf(value);
    if (index > -1) {
        todoList.splice(index, 1);
    }
    const allTodos = document.querySelectorAll("li")
    allTodos.forEach(todo => {
        const lab = todo.querySelector("label")
        if (value === lab.innerHTML && label.id === lab.id) {
            todo.remove()
        }
    })
    if (todoList.length === 0) {
        localStorage.removeItem("todoList")
    } else {
        localStorage.setItem("todoList", todoList)
    }
    updateTodoCounter()
}

//edit todo

//display todo list
const displayTodo = (value) => {
    createList(value)
    localStorage.setItem("todoList", todoList)
    updateTodoCounter()
}

const createList = (value) => {
    const todoListEl = document.getElementById("todoList")
    let li = document.createElement("li");
    let label = document.createElement("label");
    label.setAttribute("id", `label-${++labelCountId}`)
    label.innerHTML = value
    var checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");

    let btnDiv = document.createElement("btnDiv");
    btnDiv.setAttribute("class", "btnDiv")

    const delBtn = document.createElement('button');
    delBtn.setAttribute("class", "delBtn")
    delBtn.type = 'button';
    delBtn.innerHTML = 'Delete';
    delBtn.style.marginLeft = "10px"
    delBtn.addEventListener("click", () => deleteTodo(value, label));

    li.appendChild(checkbox)
    li.appendChild(label)
    btnDiv.appendChild(delBtn)
    li.appendChild(btnDiv)
    todoListEl.appendChild(li)
}

const updateTodoCounter = () => {
    const totalTodos = document.getElementById("totalTodos")
    totalTodos.innerHTML = document.querySelectorAll("li").length
}

//persistant storage
const persistedTodos = localStorage.getItem("todoList")?.split(",")
persistedTodos?.forEach(todo => {
    todoList.push(todo)
    createList(todo)
})

updateTodoCounter()

//events
todoBtn.addEventListener('click', addTodo)