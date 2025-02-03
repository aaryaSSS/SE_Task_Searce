import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { removeFromCart, updateQuantity, clearCart } from "../features/cart/cartSlice";
import { useNavigate } from "react-router-dom";

const CartItems = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cartItems, totalPrice } = useSelector((state) => state.cart);
  
  const { register, handleSubmit, formState: { errors } } = useForm(); 

  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity > 0) {
      dispatch(updateQuantity({ id, quantity: newQuantity }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
  };

  const onSubmit = (data) => {
    console.log("Payment Details:", data);
    alert("Checkout Successful!");
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Shopping Cart</h2>

      {/* Cart Items Section */}
      <section className="mb-5">
        <h3>Your Cart Items</h3>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div className="row mb-3" key={item.id}>
              <div className="col-12 col-md-4">
                <p><strong>{item.title}</strong></p>
              </div>

              <div className="col-12 col-md-4">
                <label className="form-label">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  value={item.quantity}
                  min={1}
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </div>

              <div className="col-12 col-md-2">
                <p><strong>Price:</strong> ${item.price}</p>
              </div>

              <div className="col-12 col-md-2">
                <button
                  type="button"
                  className="btn btn-danger mt-2"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        )}
        <h4>Total Price: ${totalPrice.toFixed(2)}</h4>
      </section>

      {/* Payment Details Section */}
      {cartItems.length > 0 && (
        <section>
          <h3>Payment Details</h3>
          <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
            <div className="col-12 col-md-6">
              <label htmlFor="firstName" className="form-label">First Name</label>
              <input
                id="firstName"
                type="text"
                className="form-control"
                placeholder="First name"
                {...register("firstName", { required: "First name is required" })}
              />
              {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
            </div>

            <div className="col-12 col-md-6">
              <label htmlFor="lastName" className="form-label">Last Name</label>
              <input
                id="lastName"
                type="text"
                className="form-control"
                placeholder="Last name"
                {...register("lastName", { required: "Last name is required" })}
              />
              {errors.lastName && <p className="text-danger">{errors.lastName.message}</p>}
            </div>

            <div className="col-12">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                id="email"
                type="email"
                className="form-control"
                placeholder="Email"
                {...register("email", { required: "Email is required", pattern: /^[^@]+@[^@]+\.[^@]+$/ })}
              />
              {errors.email && <p className="text-danger">{errors.email.message}</p>}
            </div>

            <div className="col-12">
              <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
              <input
                id="mobileNumber"
                type="tel"
                className="form-control"
                placeholder="Mobile number"
                {...register("mobileNumber", { required: "Mobile number is required" ,pattern: {
                  value: /^[0-9]{10}$/,
                  message: "Phone number must be valid",
                },})}
              />
              {errors.mobileNumber && <p className="text-danger">{errors.mobileNumber.message}</p>}
            </div>

            <div className="col-12">
              <label htmlFor="title" className="form-label">Title</label>
              <select id="title" className="form-select" {...register("title", { required: "Please select a title" })}>
                <option value="">Select a title</option>
                <option value="Mr">Mr</option>
                <option value="Mrs">Mrs</option>
                <option value="Miss">Miss</option>
                <option value="Dr">Dr</option>
              </select>
              {errors.title && <p className="text-danger">{errors.title.message}</p>}
            </div>

            <div className="col-12">
              <label className="form-label">Are you a Developer?</label>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  value="Yes"
                  {...register("developer", { required: "Please select an option" })}
                />
                <label className="form-check-label">Yes</label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  type="radio"
                  className="form-check-input"
                  value="No"
                  {...register("developer", { required: "Please select an option" })}
                />
                <label className="form-check-label">No</label>
              </div>
              {errors.developer && <p className="text-danger">{errors.developer.message}</p>}
            </div>

            <div className="col-12">
              <button type="submit" className="btn btn-primary w-100">Checkout</button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default CartItems;
