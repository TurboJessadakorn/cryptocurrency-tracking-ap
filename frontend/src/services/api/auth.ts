import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const registerUser = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/user/register`, { username, password });
        return response.data;
    } catch (error) {
        console.error('Error registering user:', error);
        throw error;
    }
};

export const signInUser = async (username: string, password: string) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/auth/login`, { username, password });
        const { access_token } = response.data;
        localStorage.setItem('accessToken', access_token);
        return response.data;
    } catch (error) {
        console.error('Error signing in user:', error);
        throw error;
    }
};

export const getUserInfo = async () => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      try {
        const response = await axios.get(`${API_BASE_URL}/user/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        return response.data
      } catch (error) {

      }
    }
};