
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const message = document.getElementById("message");

async function loadTasks() {
    try {
        const response = await fetch("/api/tasks");

        if (!response.ok) {
            throw new Error("Could not load tasks");
        }

        const tasks = await response.json();

        taskList.innerHTML = "";

        tasks.map(function (task) {
            const li = document.createElement("li");

            const span = document.createElement("span");
            span.className = "task-text";
            span.textContent = task.text;

            if (task.done) {
                span.classList.add("completed");
            }

            const actions = document.createElement("div");
            actions.className = "task-actions";

            const completeBtn = document.createElement("button");
            completeBtn.className = "complete-btn";
            completeBtn.textContent = task.done ? "Undo" : "Complete";

            completeBtn.addEventListener("click", function () {
                updateTask(task.id, !task.done);
            });

            const deleteBtn = document.createElement("button");
            deleteBtn.className = "delete-btn";
            deleteBtn.textContent = "Delete";

            deleteBtn.addEventListener("click", function () {
                deleteTask(task.id);
            });

            actions.append(completeBtn, deleteBtn);
            li.append(span, actions);
            taskList.appendChild(li);
        });

        const completed = tasks.filter(function (task) {
            return task.done;
        }).length;

        taskCount.textContent =
            `Total Tasks: ${tasks.length} | Completed: ${completed}`;

    } catch (error) {
        message.textContent = "Could not load tasks. Please check the server.";
    }
}

async function addTask() {
    const text = taskInput.value.trim();

    if (!text) {
        message.textContent = "Please enter a task.";
        return;
    }

    try {
        const response = await fetch("/api/tasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text: text })
        });

        if (!response.ok) {
            throw new Error("Could not add task");
        }

        taskInput.value = "";
        message.textContent = "Task added successfully!";
        await loadTasks();

    } catch (error) {
        message.textContent = "Could not add task. Check the server.";
    }
}

async function updateTask(id, done) {
    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ done: done })
        });

        if (!response.ok) {
            throw new Error("Could not update task");
        }

        await loadTasks();

    } catch (error) {
        message.textContent = "Could not update task.";
    }
}

async function deleteTask(id) {
    try {
        const response = await fetch(`/api/tasks/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Could not delete task");
        }

        message.textContent = "Task deleted successfully!";
        await loadTasks();

    } catch (error) {
        message.textContent = "Could not delete task.";
    }
}

addTaskBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});

loadTasks();
