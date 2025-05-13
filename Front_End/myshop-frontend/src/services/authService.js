import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users'; // Update if your backend runs elsewhere

const login = async (email, password) => {
  const response = await axios.post(`${API_URL}/login`, { email, password });

  // Save token in localStorage
  localStorage.setItem('token', response.data.token);

  return response.data;
};

const register = async (name, email, password) => {
  const response = await axios.post(`${API_URL}/register`, { name, email, password });
  return response.data;
};

const logout = () => {
  localStorage.removeItem('token');
};

const authService = {
  login,
  logout,
  register
};

export default authService;
