const todoList = []
const todoInput = document.getElementById("inputTodo")
const todoBtn = document.getElementById("btnTodo")

//add todo
const addTodo = (event) => {
    event.preventDefault()
    const todo = todoInput.value.trim()
    if(todo.length){
        todoList.push(todo)
        todoInput.value = ""
        displayTodo(todo)
    }else{
        alert("add a todo item")
    }
} 
//delete todo
const deleteTodo = (value) => {

}
//edit todo

//display todo list
const displayTodo = (value) => {
    const todoListEl = document.getElementById("todoList")
    let li = document.createElement("li");
    li.innerHTML = value
    todoListEl.appendChild(li)
}

//events
todoBtn.addEventListener('click', addTodo)