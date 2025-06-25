const Task = require("../models/Task");

// @desc    Get all tasks
// @route   GET /api/tasks
// @access  Private
const getTasks = async (req, res) => {
  try {
    let filter = {};

    // If user is not a manager, only show their assigned tasks
    if (req.user.role !== "manager") {
      filter.assignedTo = req.user._id;
    }

    const tasks = await Task.find(filter);
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check access
    if (
      req.user.role !== "manager" &&
      task.assignedTo.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new task
// @route   POST /api/tasks
// @access  Private (Manager only for assigning others)
const createTask = async (req, res) => {
  try {
    const { title, description, status, assignedTo } = req.body;

    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const task = await Task.create({
      title,
      description,
      status: status || "todo",
      assignedTo: assignedTo || req.user._id, // if no assignedTo, assign to self
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private (Manager or assigned user)
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Handle both populated and non-populated assignedTo
    const assignedUserId = task.assignedTo._id
      ? task.assignedTo._id.toString()
      : task.assignedTo.toString();
    const isAssignedUser = assignedUserId === req.user._id.toString();
    const isManager = req.user.role === "manager";

    if (!isAssignedUser && !isManager) {
      return res.status(403).json({ message: "Access denied" });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private (Manager only)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    if (req.user.role !== "manager") {
      return res
        .status(403)
        .json({ message: "Only managers can delete tasks" });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task removed" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
