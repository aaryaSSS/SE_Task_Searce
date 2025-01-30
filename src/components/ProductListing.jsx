import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProducts } from "../api/productsApi";
import { setProducts, selectProduct } from "../features/products/productsSlice";

const ProductListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const products = useSelector((state) => state.products.items);
  const cartItems = useSelector((state) => state.cart.cartItems); // Get cart state

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        dispatch(setProducts(data));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    getProducts();
  }, [dispatch]);

  // Group products by category
  const groupedProducts = products.reduce((acc, product) => {
    acc[product.category] = acc[product.category] || [];
    acc[product.category].push(product);
    return acc;
  }, {});

  const handleProductClick = (product) => {
    dispatch(selectProduct(product)); // Redux action
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="container mx-auto p-4">
      {/* Header with View Cart Button */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Product Listing</h1>
          <button
            className="px-4 py-2 rounded shadow hover:bg-blue-600 transition"
            onClick={() => navigate("/cart")}
          >
            🛒 View Cart ({cartItems.length})
          </button>

      </div>

      {/* Product Categories */}
      {Object.entries(groupedProducts).map(([category, items]) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-bold mb-4">{category}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {items.map((product) => (
              <div
                key={product.id}
                className="border p-4 rounded shadow cursor-pointer hover:shadow-lg transition"
                onClick={() => handleProductClick(product)}
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-48 object-contain mb-2"
                />
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-700">${product.price}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListing;
