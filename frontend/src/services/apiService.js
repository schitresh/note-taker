import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const notesApi = {
  list: () => apiClient.get('/notes').then((res) => res.data),
  read: (id) => apiClient.get(`/notes/${id}`).then((res) => res.data),
  create: (note) => apiClient.post('/notes', note),
  update: (id, note) => apiClient.put(`/notes/${id}`, note),
  delete: (id) => apiClient.delete(`/notes/${id}`),
}


export const generationApi = {
  text: (prompt, options = {}) => apiClient.post('/generate/text', { prompt, ...options }).then((res) => res.data),
};

export default apiClient;
