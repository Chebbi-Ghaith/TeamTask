import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import TaskForm from "../components/TaskForm";
import { Plus, Filter, Edit, Trash2, ChevronDown } from "lucide-react";
import * as taskAPI from "../features/tasks/taskAPI";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [activeStatusDropdown, setActiveStatusDropdown] = useState(null);

  // Task form states
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Get user from Redux
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "manager";

  // Load tasks and users on component mount
  useEffect(() => {
    loadTasks();
    if (isAdmin) {
      loadUsers();
    }
  }, [isAdmin]);

  // Load tasks from API
  const loadTasks = async () => {
    try {
      setLoading(true);
      const data = await taskAPI.getTasks();
      setTasks(data);
    } catch (error) {
      console.error("Error loading tasks:", error);
    } finally {
      setLoading(false);
    }
  };

  // Load users from API (for task assignment)
  const loadUsers = async () => {
    try {
      const data = await taskAPI.getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error loading users:", error);
    }
  };

  // Filter tasks based on status
  const filteredTasks = tasks.filter((task) => {
    if (filterStatus === "all") return true;
    // Map backend status to frontend status
    const mappedStatus = task.status === "todo" ? "pending" : task.status;
    return mappedStatus === filterStatus;
  });

  // Handle task creation
  const handleCreateTask = async (taskData) => {
    try {
      const newTask = await taskAPI.createTask(taskData);
      setTasks((prev) => [newTask, ...prev]);
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  // Handle task editing
  const handleEditTask = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    setEditingTask(task);
    setShowTaskForm(true);
  };

  // Handle task update
  const handleUpdateTask = async (taskData) => {
    try {
      const updatedTask = await taskAPI.updateTask(editingTask._id, taskData);
      setTasks((prev) =>
        prev.map((task) => (task._id === editingTask._id ? updatedTask : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Failed to update task. Please try again.");
    }
  };

  // Handle task deletion
  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await taskAPI.deleteTask(taskId);
        setTasks(tasks.filter((task) => task._id !== taskId));
      } catch (error) {
        console.error("Error deleting task:", error);
        alert("Failed to delete task. Please try again.");
      }
    }
  };

  // Handle status change (users only)
  const handleStatusChange = async (taskId, newStatus) => {
    try {
      // Map frontend status to backend status
      const mappedStatus = newStatus === "pending" ? "todo" : newStatus;
      const updatedTask = await taskAPI.updateTask(taskId, {
        status: mappedStatus,
      });
      setTasks(tasks.map((task) => (task._id === taskId ? updatedTask : task)));
      setActiveStatusDropdown(null);
    } catch (error) {
      console.error("Error updating task status:", error);
      alert("Failed to update task status. Please try again.");
    }
  };

  // Close task form
  const handleCloseTaskForm = () => {
    setShowTaskForm(false);
    setEditingTask(null);
  };

  // Filter options
  const statusOptions = [
    { value: "all", label: "All Tasks" },
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  // Status options for users
  const statusChangeOptions = [
    { value: "pending", label: "Pending" },
    { value: "in_progress", label: "In Progress" },
    { value: "completed", label: "Completed" },
  ];

  // Get status color
  const getStatusColor = (status) => {
    // Map backend status to frontend status
    const mappedStatus = status === "todo" ? "pending" : status;
    switch (mappedStatus) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Get status label
  const getStatusLabel = (status) => {
    // Map backend status to frontend status
    const mappedStatus = status === "todo" ? "pending" : status;
    switch (mappedStatus) {
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return "Pending";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <div className="lg:ml-64 ml-0 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              Tasks
            </h1>
            <p className="text-gray-600">
              {isAdmin
                ? "Manage and track all tasks"
                : "View your assigned tasks and update status"}
            </p>
          </div>

          {/* New Task button (admin only) */}
          {isAdmin && (
            <button
              onClick={() => setShowTaskForm(true)}
              className="mt-4 sm:mt-0 bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              <span>New Task</span>
            </button>
          )}
        </div>

        {/* Status Filter */}
        <div className="mb-6">
          <div className="relative inline-block">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="bg-white border border-gray-300 rounded-lg px-4 py-2 flex items-center space-x-2 hover:bg-gray-50 transition-colors"
            >
              <Filter className="w-5 h-5 text-gray-400" />
              <span className="text-gray-700">
                {
                  statusOptions.find((option) => option.value === filterStatus)
                    ?.label
                }
              </span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </button>

            {showFilterDropdown && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 min-w-full">
                {statusOptions.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => {
                      setFilterStatus(option.value);
                      setShowFilterDropdown(false);
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                      filterStatus === option.value
                        ? "bg-blue-50 text-blue-700"
                        : "text-gray-700"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Tasks List */}
        <div className="bg-white rounded-lg shadow-md">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
              <p className="mt-4 text-gray-500">Loading tasks...</p>
            </div>
          ) : filteredTasks.length === 0 ? (
            <div className="text-center py-12">
              <Plus className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">
                {filterStatus === "all"
                  ? "No tasks found"
                  : `No ${filterStatus.replace("_", " ")} tasks found`}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-200">
              {filteredTasks.map((task) => (
                <div
                  key={task._id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="font-medium text-gray-900">
                          {task.title}
                        </h3>

                        {/* Admin Actions */}
                        {isAdmin && (
                          <div className="flex items-center space-x-2 ml-4">
                            <button
                              onClick={() => handleEditTask(task._id)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                              title="Edit task"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteTask(task._id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                              title="Delete task"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        )}
                      </div>

                      <p className="text-sm text-gray-600 mb-2">
                        {task.description}
                      </p>

                      {isAdmin && (
                        <div className="text-xs text-gray-500">
                          <span>
                            Assigned to:{" "}
                            {task.assignedTo?.name || task.assignedTo}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Status */}
                    <div className="ml-4 relative">
                      {isAdmin ? (
                        // Manager: Read-only status
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStatusColor(
                            task.status
                          )}`}
                        >
                          {getStatusLabel(task.status)}
                        </span>
                      ) : (
                        // User: Clickable status
                        <>
                          <button
                            onClick={() =>
                              setActiveStatusDropdown(
                                activeStatusDropdown === task._id
                                  ? null
                                  : task._id
                              )
                            }
                            className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 transition-colors ${getStatusColor(
                              task.status
                            )} hover:opacity-80 cursor-pointer`}
                            title="Click to change status"
                          >
                            <span>{getStatusLabel(task.status)}</span>
                            <ChevronDown className="w-3 h-3" />
                          </button>

                          {activeStatusDropdown === task._id && (
                            <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
                              {statusChangeOptions.map((option) => (
                                <button
                                  key={option.value}
                                  onClick={() =>
                                    handleStatusChange(task._id, option.value)
                                  }
                                  className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                                    (task.status === "todo"
                                      ? "pending"
                                      : task.status) === option.value
                                      ? "bg-blue-50 text-blue-700 font-medium"
                                      : "text-gray-700"
                                  }`}
                                >
                                  {option.label}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Task Count */}
        <div className="mt-4 text-sm text-gray-500 text-center">
          Showing {filteredTasks.length} of {tasks.length} tasks
        </div>
      </div>

      {/* Task Form Modal */}
      <TaskForm
        isOpen={showTaskForm}
        onClose={handleCloseTaskForm}
        onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
        task={editingTask}
        users={users}
      />

      {/* Close dropdowns when clicking outside */}
      {(showFilterDropdown || activeStatusDropdown) && (
        <div
          className="fixed inset-0 z-5"
          onClick={() => {
            setShowFilterDropdown(false);
            setActiveStatusDropdown(null);
          }}
        ></div>
      )}
    </div>
  );
};

export default Tasks;
