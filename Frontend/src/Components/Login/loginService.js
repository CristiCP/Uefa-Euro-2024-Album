import axios from 'axios';

const register = async (username, email, password) => {
  try {
    const response = await axios.post(import.meta.env.VITE_REGISTER_API, { username, email, password });
    return response.data;
  } catch (error) {
    throw error.response?.data || 'An error occurred';
  }
};

export const login = async (username, password) => {
  try {
    const response = await axios.post(import.meta.env.VITE_LOGIN_API, { username, password });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const validateAccount = async (token) => {
  try {
    const response = await axios.get(`${import.meta.env.VITE_VALIDATE_API}?token=${token}`);
    return response.data; 
  } catch (error) {
    throw error;
  }
};

export default { register,login,validateAccount };