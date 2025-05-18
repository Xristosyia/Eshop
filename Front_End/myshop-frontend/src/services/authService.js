import axios from '../utils/axios';

export const register = async (userData) => {
  const res = await axios.post('/users/register', userData);
  return res.data;
};

export const login = async (credentials) => {
  const res = await axios.post('/users/login', credentials);
  localStorage.setItem('token', res.data.token);
  localStorage.setItem('user', JSON.stringify(res.data.user));
  return res.data;
};

export const logout = () => {
  localStorage.removeItem('token');
};
