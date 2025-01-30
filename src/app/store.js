import { configureStore } from '@reduxjs/toolkit';
// import productsReducer from '../features/products/productsSlice';
import { productsApi } from '../features/products/productsApi';
import cartReducer from '../features/cart/cartSlice';

export const store = configureStore({
  reducer: {
    // products: productsReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(productsApi.middleware),
});

export default store;