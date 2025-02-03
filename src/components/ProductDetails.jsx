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
  <div className="container mx-auto p-3">
  {/* Navigation Buttons */}
  <div className="flex justify-between mb-6">
    <button
      onClick={handleBackClick}
      className="px-4 py-2 bg-gray-200 text-gray-800 rounded shadow hover:bg-gray-300 transition"
    >
      ⬅️ Back
    </button>
    <button
      className="px-4 py-2 bg-blue-500 rounded shadow hover:bg-blue-600 transition"
      onClick={() => navigate("/cart")}
    >
      🛒 View Cart ({cartItems.length})
    </button>
  </div>
    <br></br>
    <br></br>
    <br></br>
  {/* Product Card */}
  <div className="border p-6 rounded-lg shadow-lg bg-white">
    {/* Product Image */}
    <div className="flex justify-center mb-6">
      <img
        src={selectedProduct.image}
        alt={selectedProduct.title}
        className="w-auto h-[550px] object-contain bg-gray-100 rounded-lg"
      />
    </div>

    {/* Product Details */}
    <h1 className="text-3xl font-bold text-gray-900 mb-3">{selectedProduct.title}</h1>
    <p className="text-xl font-semibold text-blue-600 mb-2">${selectedProduct.price}</p>
    <p className="text-gray-700 mb-4 leading-relaxed">{selectedProduct.description}</p>
    <p className="text-sm text-gray-500 italic">Category: {selectedProduct.category}</p>

    {/* Add to Cart Button */}
    <button
      onClick={handleAddToCart}
      className="w-full mt-6 px-5 py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition"
    >
      ➕ Add to Cart
    </button>
  </div>
</div>

  );
};

export default ProductDetails;
