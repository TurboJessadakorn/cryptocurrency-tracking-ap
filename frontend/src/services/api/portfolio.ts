import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
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

export const addPortfolioItem = async (cryptocurrency: string, logo: string, symbol: string, amount: number, purchasePrice: number) => {
  try {
    const response = await api.post('/portfolio', { cryptocurrency, logo, symbol, amount, purchasePrice });
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