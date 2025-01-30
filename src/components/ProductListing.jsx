import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetProductsQuery } from "../api/productsApi";
import { setProducts, selectProduct } from "../features/products/productsSlice";

const ProductListing = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItems); // Get cart state


  const { data: products = [], isLoading, error } = useGetProductsQuery();

  useEffect(() => {
    if (products.length > 0) {
      dispatch(setProducts(products));
    }
  }, [products, dispatch]);
  
  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products!</p>;

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
    
    <div className="container mx-auto p-6">
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-900">🛍️ Product Listing</h1>
      
      <button
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition"
        onClick={() => navigate("/cart")}
      >
        🛒 View Cart ({cartItems.length})
      </button>
    </div>
    <br></br>
      <br></br>
      <br></br>
    {Object.entries(groupedProducts).map(([category, items]) => (
      <div key={category} className="mb-10">
        <h1 className="text-2xl font-semibold text-gray-800 mb-3 border-b pb-2">
          {category}
        </h1>

        <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {items.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition cursor-pointer relative flex flex-col"  // Added flex flex-col
              onClick={() => handleProductClick(product)}
            >
              <div className="aspect-square overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover bg-gray-100 rounded"
                />
              </div> 
              
              <div className="p-2 flex-grow"> {/* Added flex-grow */}
                <h6 className="text-sm font-medium text-gray-900 truncate h-10 whitespace-normal break-words">
                  {product.title}
                </h6>
                <p className="text-gray-700 text-sm mt-1">${product.price}</p>
              </div>
              {/* Optional "Add to Cart" button */}
              <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-2 w-full">
                Add to Cart
              </button>
            </div>
          ))}
        </div>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
      </div>
    ))}
  </div>
  );
};

export default ProductListing;
