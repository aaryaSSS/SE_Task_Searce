import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { clearSelectedProduct } from '../features/products/productsSlice';
import { addToCart } from '../features/cart/cartSlice';


const ProductDetails = () => {
  const selectedProduct = useSelector((state) => state.products.selectedProduct);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleBackClick = () => {
    dispatch(clearSelectedProduct());
    navigate('/');
  };

  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
    alert('Added to cart!');
  };

  if (!selectedProduct) {
    return <p className="text-center text-lg">No product selected!</p>;
  }

  return (
    
    <div className="container mx-auto p-4">
      <button
        onClick={handleBackClick}
        className="px-4 py-2 rounded mb-4"
      >
        Back
      </button>
      <button className="px-4 py-2 rounded shadow hover:bg-blue-600 transition"
          onClick={() => navigate("/cart")}
      >
            🛒 View Cart ({cartItems.length})
      </button>
      <div className="border p-4 rounded shadow">
        <img
          src={selectedProduct.image}
          alt={selectedProduct.title}
          className="w-full h-64 object-contain mb-4"
        />
        <h1 className="text-2xl font-bold mb-2">{selectedProduct.title}</h1>
        <p className="text-lg font-semibold text-gray-700 mb-2">${selectedProduct.price}</p>
        <p className="text-gray-700 mb-4">{selectedProduct.description}</p>
        <p className="text-sm text-gray-500">Category: {selectedProduct.category}</p>

        <button
          onClick={handleAddToCart}
          className="px-4 py-2 rounded mt-4"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
