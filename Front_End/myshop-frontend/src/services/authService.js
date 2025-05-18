import axios from '../utils/axios';

export const register = async (userData) => {
  const res = await axios.post('/auth/register', userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await axios.post('/auth/login', credentials);
  localStorage.setItem('token', res.data.token);
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
