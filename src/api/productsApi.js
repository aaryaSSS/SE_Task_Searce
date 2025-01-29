// src/api/productsApi.js
import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};
