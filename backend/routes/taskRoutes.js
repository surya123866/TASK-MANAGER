const express = require("express");
const {
  createTask,
  updateTask,
  deleteTask,
  getTasks,
  viewTask,
} = require("../controllers/taskController");
const { authenticate } = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/task/create", authenticate, createTask);
router.put("/task/:id", authenticate, updateTask);
router.delete("/task/:id", authenticate, deleteTask);
router.get("/task/:id", authenticate, viewTask);
router.get("/tasks", authenticate, getTasks);

module.exports = router;
