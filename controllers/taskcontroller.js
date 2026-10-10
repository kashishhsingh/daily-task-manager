
let tasks = [];
let nextId = 1;

// Get all tasks
function getAllTasks(req, res) {
    let result = tasks;

    if (req.query.status === "done") {
        result = tasks.filter(task => task.done);
    } else if (req.query.status === "pending") {
        result = tasks.filter(task => !task.done);
    }

    res.status(200).json(result);
}

// Get one task
function getTaskById(req, res) {
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.status(200).json(task);
}

// Create a task
function createTask(req, res) {
    const text = req.body.text;

    if (typeof text !== "string" || !text.trim()) {
        return res.status(400).json({
            error: "Task text is required"
        });
    }

    const task = {
        id: nextId++,
        text: text.trim(),
        done: false
    };

    tasks.push(task);

    res.status(201).json(task);
}

// Update a task
function updateTask(req, res) {
    const id = Number(req.params.id);
    const task = tasks.find(task => task.id === id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    if (typeof req.body.done !== "boolean") {
        return res.status(400).json({
            error: "done must be true or false"
        });
    }

    task.done = req.body.done;

    res.status(200).json(task);
}

// Delete a task
function deleteTask(req, res) {
    const id = Number(req.params.id);
    const index = tasks.findIndex(task => task.id === id);

    if (index === -1) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    tasks.splice(index, 1);

    res.status(204).end();
}

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};
