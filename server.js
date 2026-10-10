
const express = require("express");
const path = require("path");

const app = express();
const PORT = 5000;

const taskRoutes = require("./routes/tasks");

// Middleware to read JSON request bodies
app.use(express.json());

// Request logger middleware
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Serve frontend files
app.use(express.static(path.join(__dirname, "public")));

// Connect task routes
app.use("/api/tasks", taskRoutes);

// Home route
app.get("/", (req, res) => {
    res.send("Daily Task Manager API is running");
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
