import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getTopCryptos = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/crypto/top`);
    return response.data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    throw error;
  }
};