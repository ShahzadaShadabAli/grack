import axios from 'axios';

const api = axios.create();

// Add a request interceptor
api.interceptors.request.use(
  config => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user.token;
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem('token'); // Clear the token from localStorage
      window.location.href = '/login'; // Redirect to login page
    }
    return Promise.reject(error);
  }
);

export default api;
