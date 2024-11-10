const Task = require("../models/Task");
const asyncWrapper = require("../middlewares/async-wrapper");
const { createCustomError } = require("../errors/custom-error");

// Conroller for getting all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find();
  res.status(200).json({ tasks });
});

// Controller for creating a task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

// Controller for getting a single task
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task found with ${taskID}`, 404));
  }

  res.status(200).json(task);
});

// Controller for deleting a specific task
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  if (!task) {
    return next(createCustomError(`No task found with ${taskID}`, 404));
  }

  res.status(200).json(task);
});

// Controller for updating a specific task
const updateTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(createCustomError(`No task found with ${taskID}`, 404));
  }
  res.status(200).json({ success: true, task });
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
