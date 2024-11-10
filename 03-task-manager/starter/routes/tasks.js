const express = require("express");
const router = express.Router();
const {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
} = require("../controllers/tasks");

// Get All the tasks and create task routes
router.route("/").get(getAllTasks).post(createTask);

// Routes to get a single task, update and delete a single task
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

module.exports = router;
