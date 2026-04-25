const BASE_URL = import.meta.env.VITE_BASE_URL;
// I may add Render URL later

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Auth
export const registerUser = async (user) => {
  const response = await fetch(`${BASE_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return response.json();
};

export const loginUser = async (credentials) => {
  const response = await fetch(`${BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  return response.json();
};

// Projects
export const getProjects = async () => {
  const response = await fetch(`${BASE_URL}/projects`);
  return response.json();
};

export const createProject = async (project) => {
  const response = await fetch(`${BASE_URL}/projects`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(project)
  });
  return response.json();
};

export const updateProject = async (id, project) => {
  const response = await fetch(`${BASE_URL}/projects/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(project)
  });
  return response.json();
};

export const deleteProject = async (id) => {
  const response = await fetch(`${BASE_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
};

// Services
export const getServices = async () => {
  const response = await fetch(`${BASE_URL}/services`);
  return response.json();
};

export const createService = async (service) => {
  const response = await fetch(`${BASE_URL}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(service)
  });
  return response.json();
};

export const updateService = async (id, service) => {
  const response = await fetch(`${BASE_URL}/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(service)
  });
  return response.json();
};

export const deleteService = async (id) => {
  const response = await fetch(`${BASE_URL}/services/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
};

// Users
export const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`);
  return response.json();
};

export const createUser = async (user) => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(user)
  });
  return response.json();
};

export const updateUser = async (id, user) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(user)
  });
  return response.json();
};

export const deleteUser = async (id) => {
  const response = await fetch(`${BASE_URL}/users/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
};

// References
export const getReferences = async () => {
  const response = await fetch(`${BASE_URL}/references`);
  return response.json();
};

export const createReference = async (reference) => {
  const response = await fetch(`${BASE_URL}/references`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(reference)
  });
  return response.json();
};

export const updateReference = async (id, reference) => {
  const response = await fetch(`${BASE_URL}/references/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
    body: JSON.stringify(reference)
  });
  return response.json();
};

export const deleteReference = async (id) => {
  const response = await fetch(`${BASE_URL}/references/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  return response.json();
};

export default BASE_URL;