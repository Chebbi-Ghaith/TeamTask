import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import { Archive, CheckSquare, Clock, FileCheck } from "lucide-react";
import * as taskAPI from "../features/tasks/taskAPI";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useSelector((state) => state.auth);
  const isAdmin = user?.role === "manager";

  // Load tasks on component mount
  useEffect(() => {
    loadTasks();
  }, []);

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

  // Calculate task statistics
  const getTaskStats = () => {
    const stats = {
      total: tasks.length,
      todo: tasks.filter((task) => task.status === "todo").length,
      inProgress: tasks.filter((task) => task.status === "in_progress").length,
      completed: tasks.filter((task) => task.status === "completed").length,
    };
    return stats;
  };

  // Get recent tasks (last 5 tasks, sorted by creation date)
  const getRecentTasks = () => {
    return tasks
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  };

  // Get status color for task indicators
  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-500";
      case "in_progress":
        return "bg-blue-500";
      case "todo":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  // Get status label
  const getStatusLabel = (status) => {
    switch (status) {
      case "todo":
        return "To Do";
      case "in_progress":
        return "In Progress";
      case "completed":
        return "Completed";
      default:
        return "Unknown";
    }
  };

  const stats = getTaskStats();
  const recentTasks = getRecentTasks();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Main Content */}
      <div className="lg:ml-64 ml-0 p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
            Dashboard
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            {isAdmin
              ? `Welcome back! You have ${stats.total} total tasks to manage.`
              : `Welcome back! You have ${stats.total} assigned tasks.`}
          </p>
        </div>

        {/* Stats Cards - Responsive Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {[...Array(4)].map((_, index) => (
              <div
                key={index}
                className="bg-white p-4 md:p-6 rounded-lg shadow-md"
              >
                <div className="animate-pulse">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-8 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-6 md:mb-8">
            {/* Total Tasks Card */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">
                    Total Tasks
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-gray-900 mt-1 md:mt-2">
                    {stats.total}
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <CheckSquare className="w-5 h-5 md:w-6 md:h-6 text-blue-600" />
                </div>
              </div>
            </div>

            {/* In Progress Card */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">
                    In Progress
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-orange-600 mt-1 md:mt-2">
                    {stats.inProgress}
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Clock className="w-5 h-5 md:w-6 md:h-6 text-orange-600" />
                </div>
              </div>
            </div>

            {/* Completed Card */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">
                    Completed
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-green-600 mt-1 md:mt-2">
                    {stats.completed}
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Archive className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
                </div>
              </div>
            </div>

            {/* To Do Card */}
            <div className="bg-white p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs md:text-sm font-medium text-gray-600">
                    To Do
                  </p>
                  <p className="text-xl md:text-2xl font-bold text-purple-600 mt-1 md:mt-2">
                    {stats.todo}
                  </p>
                </div>
                <div className="w-10 h-10 md:w-12 md:h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FileCheck className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Recent Tasks Section */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6">
          <h2 className="text-lg md:text-xl font-semibold text-gray-900 mb-4">
            Recent Tasks
          </h2>
          {loading ? (
            <div className="space-y-3">
              {[...Array(3)].map((_, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg animate-pulse"
                >
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/4"></div>
                </div>
              ))}
            </div>
          ) : recentTasks.length === 0 ? (
            <div className="text-center py-8">
              <CheckSquare className="w-12 h-12 mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500">
                {isAdmin
                  ? "No tasks created yet"
                  : "No tasks assigned to you yet"}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div
                  key={task._id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg space-y-2 sm:space-y-0"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 ${getStatusColor(
                        task.status
                      )} rounded-full flex-shrink-0`}
                    ></div>
                    <span className="text-sm md:text-base text-gray-900 break-words">
                      {task.title}
                    </span>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 ml-6 sm:ml-0">
                    {isAdmin && task.assignedTo && (
                      <span className="text-xs text-gray-400">
                        {task.assignedTo.name || task.assignedTo}
                      </span>
                    )}
                    <span className="text-xs md:text-sm text-gray-500">
                      {getStatusLabel(task.status)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
