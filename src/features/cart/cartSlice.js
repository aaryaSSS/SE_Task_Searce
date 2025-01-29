import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // Stores added products
  totalPrice: 0,  // Stores total cart price
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const product = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += 1; // Increment quantity if item exists
      } else {
        state.cartItems.push({ ...product, quantity: 1 });
      }

      state.totalPrice += product.price;
    },
    removeFromCart(state, action) {
      const productId = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === productId);

      if (itemIndex !== -1) {
        state.totalPrice -= state.cartItems[itemIndex].price * state.cartItems[itemIndex].quantity;
        state.cartItems.splice(itemIndex, 1);
      }
    },
    updateQuantity(state, action) {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);

      if (item && quantity > 0) {
        state.totalPrice += (quantity - item.quantity) * item.price;
        item.quantity = quantity;
      }
    },
    clearCart(state) {
      state.cartItems = [];
      state.totalPrice = 0;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
