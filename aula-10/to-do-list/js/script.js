// seleção de elementos
const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const editForm = document.querySelector("#edit-form");
const editInput = document.querySelector("#edit-input");
const editPrioritySelect = document.querySelector("#edit-priority-select");
const cancelEditBtn = document.querySelector("#cancel-edit-btn");
const todoPrioritySelect = document.querySelector("#todo-priority-select");
const searchInput = document.querySelector("#search-input");
const eraseButton = document.querySelector("#erase-button");
const filterSelect = document.querySelector("#filter-select");
const toolbar = document.querySelector("#toolbar");

// salvar o título antigo
let oldInputValue;

// Mapeando as prioridades
const priorityMap = {
    low: "Baixa",
    medium: "Média",
    high: "Alta"
};

// Funções
const saveTodo = (text, priority, done = false) => {
    const todo = document.createElement("div");
    todo.classList.add("todo");

    const todoTitle = document.createElement("h3");
    todoTitle.innerText = text;
    todo.appendChild(todoTitle);

    const priorityDiv = document.createElement("div");
    priorityDiv.classList.add("priority", priority);
    priorityDiv.innerText = priorityMap[priority];
    todo.appendChild(priorityDiv);

    const doneBtn = document.createElement("button");
    doneBtn.classList.add("finish-todo");
    doneBtn.innerHTML = '<i class="fa-solid fa-check"></i>';
    todo.appendChild(doneBtn);

    const editBtn = document.createElement("button");
    editBtn.classList.add("edit-todo");
    editBtn.innerHTML = '<i class="fa-solid fa-pen"></i>';
    todo.appendChild(editBtn);

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("remove-todo");
    deleteBtn.innerHTML = '<i class="fa-solid fa-xmark"></i>';
    todo.appendChild(deleteBtn);

    if (done) {
        todo.classList.add("done");
    }

    todoList.appendChild(todo);

    saveTodoLocalStorage({ text, priority, done });
    todoInput.value = "";
    todoPrioritySelect.value = "low";
    todoInput.focus();
};

// função para esconder o formulário principal e mostrar o de edição
const toggleForms = (todoPriority) => {
    editForm.classList.toggle("hide");
    todoForm.classList.toggle("hide");
    todoList.classList.toggle("hide");
    toolbar.classList.toggle("hide");

    if (todoPriority) {
        editPrioritySelect.value = todoPriority;
    }
};

const updateTodo = (text, priority) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        let todoTitle = todo.querySelector("h3");

        if (todoTitle.innerText === oldInputValue) {
            todoTitle.innerText = text;

            let priorityDiv = todo.querySelector(".priority");
            priorityDiv.className = `priority ${priority}`;
            priorityDiv.innerText = priorityMap[priority];

            updateTodoLocalStorage(oldInputValue, text, priority);
        }
    });
};

const getTodosLocalStorage = () => {
    const todos = JSON.parse(localStorage.getItem("todos")) || [];
    return todos;
};

const loadTodos = () => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        saveTodo(todo.text, todo.priority, todo.done);
    });
};

const saveTodoLocalStorage = (todo) => {
    const todos = getTodosLocalStorage();
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
};

const removeTodoLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    const filteredTodos = todos.filter((todo) => todo.text !== todoText);

    localStorage.setItem("todos", JSON.stringify(filteredTodos));
};

const updateTodoLocalStorage = (todoOldText, todoNewText, newPriority) => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        if (todo.text === todoOldText) {
            todo.text = todoNewText;
            todo.priority = newPriority;
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
};

const updateTodoStatusLocalStorage = (todoText) => {
    const todos = getTodosLocalStorage();

    todos.forEach((todo) => {
        if (todo.text === todoText) {
            todo.done = !todo.done;
        }
    });

    localStorage.setItem("todos", JSON.stringify(todos));
};

const searchTodos = (searchValue) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        const todoTitle = todo.querySelector("h3").innerText.toLowerCase();

        if (todoTitle.includes(searchValue)) {
            todo.style.display = "flex";
        } else {
            todo.style.display = "none";
        }
    });
};

const filterTodos = (filter) => {
    const todos = document.querySelectorAll(".todo");

    todos.forEach((todo) => {
        switch (filter) {
            case "all":
                todo.style.display = "flex";
                break;
            case "done":
                todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none");
                break;
            case "todo":
                !todo.classList.contains("done")
                    ? (todo.style.display = "flex")
                    : (todo.style.display = "none");
                break;
            default:
                todo.style.display = "flex";
        }
    });
};

// Eventos
todoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const inputValue = todoInput.value;
    const priorityValue = todoPrioritySelect.value;

    if (inputValue) {
        saveTodo(inputValue, priorityValue);
    }
});

document.addEventListener("click", (e) => {
    const targetEl = e.target;
    const parentEl = targetEl.closest("div");
    let todoTitle;
    let todoPriority;

    if (parentEl && parentEl.querySelector("h3")) {
        todoTitle = parentEl.querySelector("h3").innerText || "";
        todoPriority = parentEl.querySelector(".priority").classList[1];
    }

// mapeando os botões 
    if (targetEl.classList.contains("finish-todo")) {
        parentEl.classList.toggle("done");
        updateTodoStatusLocalStorage(todoTitle);
    }

    if (targetEl.classList.contains("edit-todo")) {
        toggleForms(todoPriority);

        editInput.value = todoTitle;
        oldInputValue = todoTitle;
    }

    if (targetEl.classList.contains("remove-todo")) {
        parentEl.remove();
        removeTodoLocalStorage(todoTitle);
    }
});

cancelEditBtn.addEventListener("click", (e) => {
    e.preventDefault();
    toggleForms();
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const editInputValue = editInput.value;
    const editPriorityValue = editPrioritySelect.value;

    if (editInputValue) {
        updateTodo(editInputValue, editPriorityValue);
    }

    toggleForms();
});

searchInput.addEventListener("input", (e) => {
    const searchValue = e.target.value.toLowerCase();
    searchTodos(searchValue);
});

eraseButton.addEventListener("click", (e) => {
    e.preventDefault();

    searchInput.value = "";

    searchTodos("");
});

filterSelect.addEventListener("change", (e) => {
    filterTodos(e.target.value);
});

loadTodos();