const form = document.getElementById("form");
const input = document.getElementById("input");
const todoList = document.getElementById("list");
const allTab = document.getElementById("all-tab");
const activeTab = document.getElementById("active-tab");
const completedTab = document.getElementById("completed-tab");

document.addEventListener("DOMContentLoaded", () => {
    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach((todo, index) => {
            if (
                currentFilter === "all" ||
                (currentFilter === "active" && !todo.completed) ||
                (currentFilter === "completed" && todo.completed)
            ) {
                addTodoToList(todo, index);
            }
        });
    }

    function addTodoToList(todo, index) {
        const li = document.createElement("li");
        li.textContent = todo.text;
        li.innerHTML = `
        <div  class="todo-text">
            <div class="todo-wrap">
                <input type="checkbox" class="custom-checkbox"
                ${todo.completed ? "checked" : ""}>
                <span>${todo.text}</span>
            </div>
                <i class="ri-delete-bin-line"></i>
        </div>`;

        const checkbox = li.querySelector("input[type='checkbox']");
        checkbox.addEventListener("change", () => {
            todos[index].completed = checkbox.checked;
            saveTodos();
        });

        const deleteBtn = li.querySelector(".ri-delete-bin-line");
        deleteBtn.addEventListener("click", () => {
            todos.splice(index, 1);
            saveTodos();
            renderTodos();
        });

        todoList.appendChild(li);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const todoText = input.value.trim();
        if (todoText) {
            todos.push({ text: todoText, completed: false });
            saveTodos();
            renderTodos();
            input.value = "";
        }
    });

    let currentFilter = "all";
    function filterTodos(filter) {
        currentFilter = filter;
        allTab.classList.remove("active");
        activeTab.classList.remove("active");
        completedTab.classList.remove("active");
        switch (filter) {
            case "all":
                allTab.classList.add("active");
                break;
            case "active":
                activeTab.classList.add("active");
                break;
            case "completed":
                completedTab.classList.add("active");
                break;
        }
        renderTodos();
    }

    allTab.addEventListener("click", () => filterTodos("all"));
    activeTab.addEventListener("click", () => filterTodos("active"));
    completedTab.addEventListener("click", () => filterTodos("completed"));

    renderTodos();
});
