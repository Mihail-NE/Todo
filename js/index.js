const form = document.getElementById("form");
const input = document.getElementById("input");
const todoList = document.getElementById("list");

document.addEventListener("DOMContentLoaded", () => {

    let todos = JSON.parse(localStorage.getItem("todos")) || [];
    function saveTodos() {
        localStorage.setItem("todos", JSON.stringify(todos));
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const todoText = input.value.trim();
        if (todoText) {
            todos.push(todoText);
            saveTodos();
            renderTodos();
            input.value = "";
        }
    });

    function addTodoToList(todoText) {
      const li = document.createElement("li");
      li.textContent = todoText;
      todoList.appendChild(li);
  }

  function addTodoToList(todoText) {
      const li = document.createElement("li");
      li.classList.add("item");
      li.innerHTML = `
      <span>${todoText}</span>
      <i class="ri-delete-bin-line"></i>
  `;

      const deleteBtn = li.querySelector(".ri-delete-bin-line");
      deleteBtn.addEventListener("click", () => {
          li.remove();
      });

      todoList.appendChild(li);
  }

    function renderTodos() {
        todoList.innerHTML = "";
        todos.forEach((todo) => addTodoToList(todo));
    }

    renderTodos();
});
