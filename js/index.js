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
        showFooter();
    }

    function addTodoToList(todo, index) {
        const li = document.createElement("li");
        li.textContent = todo.text;
        li.innerHTML = `
        <div  class="todo-text">
            <div class="todo-wrap">
                <input type="checkbox" class="custom-checkbox"
                ${todo.completed ? "checked" : ""}>
                <span class="todo-value">${todo.text}</span>
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

        const span = li.querySelector(".todo-value");
        span.addEventListener("dblclick", (e) => {
            const input = document.createElement("input");
            input.type = "text";
            input.value = todo.text;
            input.className = "edit-input";

            const saveEdit = () => {
                const newText = input.value.trim();
                if (newText) {
                    todos[index].text = newText;
                    saveTodos();
                    renderTodos();
                } else {
                    span.textContent = todo.text;
                }
            };

            input.addEventListener("blur", saveEdit);
            input.addEventListener("keypress", (e) => {
                if (e.key === "Enter") {
                    saveEdit();
                }
            });

            span.replaceWith(input);
            input.focus();
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


    function showFooter() {
        const footer = document.getElementById("todo-filters");
        footer.style.display = todos.length > 0 ? "flex" : "none";
        todoList.style.display = todos.length > 0 ? "flex" : "none";
    }

    renderTodos();
});
