const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  try {
    const newTask = new Task({
      ...req.body,
      user: req.user.id,
    });
    const task = await newTask.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.getTaskById = async (req, res) => {
    try {
      const task = await Task.findById(req.params.id);
      if (!task) return res.status(404).send("Task not found");
      res.status(200).json(task);
    } catch (err) {
      res.status(500).send("Server Error");
    }
  };

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) return res.status(404).send("Task not found");
    res.status(200).json(task); 
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.deleteTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).send("Task not found");
      res.status(200).json({ message: "Task deleted" });
    } catch (err) {
      res.status(500).send("Server Error");
    }
  };
