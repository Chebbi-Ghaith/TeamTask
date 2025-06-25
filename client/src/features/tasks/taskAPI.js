import axios from "axios";

const API_URL = "http://localhost:5000/api";

// Create axios instance with auth header
const createAuthRequest = () => {
  const token = localStorage.getItem("token");
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });
};

// Get all tasks
export const getTasks = async () => {
  const api = createAuthRequest();
  const response = await api.get("/tasks");
  return response.data;
};

// Get single task
export const getTask = async (taskId) => {
  const api = createAuthRequest();
  const response = await api.get(`/tasks/${taskId}`);
  return response.data;
};

// Create new task
export const createTask = async (taskData) => {
  const api = createAuthRequest();
  const response = await api.post("/tasks", taskData);
  return response.data;
};

// Update task
export const updateTask = async (taskId, taskData) => {
  const api = createAuthRequest();
  const response = await api.put(`/tasks/${taskId}`, taskData);
  return response.data;
};

// Delete task
export const deleteTask = async (taskId) => {
  const api = createAuthRequest();
  const response = await api.delete(`/tasks/${taskId}`);
  return response.data;
};

// Get all users (for task assignment)
export const getUsers = async () => {
  const api = createAuthRequest();
  const response = await api.get("/auth/users");
  return response.data;
};
