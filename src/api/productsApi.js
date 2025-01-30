// src/api/productsApi.js



// import axios from 'axios';

// const BASE_URL = 'https://fakestoreapi.com/products';

// export const fetchProducts = async () => {
//   const response = await axios.get(BASE_URL);
//   return response.data;
// };


import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
  reducerPath: 'productsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com' }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => '/products',
    }),
    getProductById: builder.query({
      query: (id) => `/products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductByIdQuery } = productsApi;