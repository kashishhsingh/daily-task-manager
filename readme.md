# Daily Task Manager

## Project Description
Daily Task Manager is a simple web application that allows users to create, view, update, and delete daily tasks. It uses a Node.js and Express backend with a frontend built using HTML, CSS, and JavaScript.

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- Postman

## Features
- Add new tasks
- View all tasks
- View a task by ID
- Mark tasks as completed or pending
- Delete tasks
- Filter tasks by completion status through the API
- Validate empty task input

## How to Run the Project
1. Install Node.js.
2. Open the project folder in the terminal.
3. Run `npm install`.
4. Run `npm start`.
5. Open `http://localhost:5000` in your browser.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tasks` | View all tasks |
| GET | `/api/tasks/:id` | View one task |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

## Testing
The API was tested using Postman for creating, viewing, updating, and deleting tasks, including checking invalid input and missing task IDs.

## What I Learned
- Creating REST API endpoints using Express.js
- Handling JSON requests and responses
- Using HTTP methods and status codes
- Organizing code with routes and controllers
- Connecting a frontend to a backend using Fetch API
- Testing APIs using Postman