// src/api.js
const API_URL = "http://localhost:5000/api";

async function fetchData(url, options) {
  const response = await fetch(url, options);
  if (!response.ok) {
    throw new Error(`Failed to fetch: ${response.status}`);
  }
  return response.json();
}

export async function getTasks(userId) {
  return fetchData(`${API_URL}/tasks/${userId}`);
}

export async function getAllMonitorias() {
  return fetchData(`${API_URL}/monitorias`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(),
  });
}

export async function createTask(task, userId) {
  task.user_id = userId;  // Adicione o user_id à tarefa
  return fetchData(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}


export async function updateTask(taskId, task) {
  return fetchData(`${API_URL}/tasks/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });
}

export async function deleteTask(taskId) {
  return fetchData(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
  });
}

export async function loginUser(user) {
  const response = await fetchData(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response.user_id;
}

export async function registerUser(user) {
  const response = await fetchData(`${API_URL}/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
  return response._id;
}
