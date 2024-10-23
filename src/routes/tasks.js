const express = require("express");
const router = express.Router();
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth"); // Import the authentication middleware

// @route   POST api/tasks
// @desc    Create a task
// @access  Private (requires authentication)
router.post("/", auth, taskController.createTask);

// @route   GET api/tasks
// @desc    Get all tasks for a user
// @access  Private
router.get("/", auth, taskController.getTasks);

// @route   GET api/tasks
// @desc    Get all tasks for a user
// @access  Private
router.get("/:id", auth, taskController.getTaskById);

// @route   PUT api/tasks/:id
// @desc    Update a task
// @access  Private
router.put("/:id", auth, taskController.updateTask);

// @route   DELETE api/tasks/:id
// @desc    Delete a task
// @access  Private
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
