const todoInput = document.getElementById("inputTodo")
const todoBtn = document.getElementById("btnTodo")
let labelCountId = 0

//add todo
const addTodo = (event) => {
    event.preventDefault()
    const todo = todoInput.value.trim()
    if (todo.length) {
        todoInput.value = ""
        displayTodo(todo)
    } else {
        alert("add a todo item")
    }
}
//delete todo
const deleteTodo = (value, label) => {
    const allTodos = document.querySelectorAll("li")
    allTodos.forEach(todo => {
        const lab = todo.querySelector("label")
        if (value === lab.innerHTML && label.id === lab.id) {
            todo.remove()
        }
    })
    updateTodoCounter()
}

//edit todo

//display todo list
const displayTodo = (value) => {
    const todoListEl = document.getElementById("todoList")
    let li = document.createElement("li");
    let label = document.createElement("label");
    label.setAttribute("id", `label-${++labelCountId}`)
    label.innerHTML = value
    var checkbox = document.createElement("INPUT");
    checkbox.setAttribute("type", "checkbox");

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.innerHTML = 'Delete';
    btn.style.marginLeft = "10px"
    btn.addEventListener("click", () => deleteTodo(value, label));
    li.appendChild(checkbox)
    li.appendChild(label)
    li.appendChild(btn)
    todoListEl.appendChild(li)
    updateTodoCounter()
}

const updateTodoCounter = () =>{
    const totalTodos = document.getElementById("totalTodos")
    totalTodos.innerHTML = document.querySelectorAll("li").length
}
//events
todoBtn.addEventListener('click', addTodo)