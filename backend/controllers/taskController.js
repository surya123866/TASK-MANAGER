const { Task } = require("../models");
const user = require("../models/user");

exports.createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const userId = req.user.id;
  try {
    const task = await Task.create({ userId, title, description, status });
    res.status(201).json({ message: "Task created successfully", task });
  } catch (error) {
    res.status(500).json({ error: "Task creation failed" });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;
  const userId = req.user.id;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (task.userId !== userId) {
      return res.status(403).json({ error: "Authentication failed" });
    }
    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;
    await task.save();
    res.json({ message: "Task updated successfully", task });
  } catch (error) {
    res.status(500).json({ error: "Task update failed" });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (task.userId !== userId) {
      return res.status(403).json({ error: "Authentication failed" });
    }
    await task.destroy();
    res.json({ message: "Task deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Task deletion failed" });
  }
};

exports.viewTask = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.id;
  try {
    const task = await Task.findByPk(id);
    if (!task) {
      return res.status(404).json({ error: "Task not found" });
    }
    if (task.userId !== userId) {
      return res.status(403).json({ error: "Authentication failed" });
    }
    res.json({ task });
  } catch (error) {
    res.status(500).json({ error: "Fetching task failed" });
  }
};

exports.getTasks = async (req, res) => {
  const userId = req.user.id;
  console.log(userId)
  try {
    const tasks = await Task.findAll({
      where: { userId },
    });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: "Fetching tasks failed" });
  }
};
