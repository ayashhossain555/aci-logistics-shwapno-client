import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const register = async (name, email, password) => {
  return await axios.post(`${API_URL}/register`, { name, email, password });
};

const login = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

export default { register, login };
