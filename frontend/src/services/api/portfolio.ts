import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';
const token = localStorage.getItem('accessToken');

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getPortfolio = async () => {
  try {
    const response = await api.get('/portfolio');
    return response.data;
  } catch (error) {

  }
};

export const addPortfolioItem = async (cryptocurrency: string, amount: number, purchasePrice: number) => {
  try {
    const response = await api.post('/portfolio', { cryptocurrency, amount, purchasePrice });
    return response.data;
  } catch (error) {

  }
};

export const getPortfolioHistory = async () => {
  try {
    const response = await api.get('/portfolio/history');
    return response.data;
  } catch (error) {

  }
};