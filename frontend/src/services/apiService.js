import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const notesApi = {
  list: () => apiClient.get('/notes'),
  read: (id) => apiClient.get(`/notes/${id}`),
  create: (note) => apiClient.post('/notes', note),
  update: (id, note) => apiClient.put(`/notes/${id}`, note),
  delete: (id) => apiClient.delete(`/notes/${id}`),
}

export default apiClient;
