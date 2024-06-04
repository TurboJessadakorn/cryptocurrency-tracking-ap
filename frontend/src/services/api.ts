import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const getTopCryptos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/crypto/top`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    throw error;
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users/register`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error;
  }
};

export const signInUser = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    console.error('Error signing in user:', error);
    throw error;
  }
};