import React, { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const Payment = () => {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const { auth } = useContext(AuthContext);
  const { removeAllCartItems } = useContext(CartContext);

  console.log(state.orderId)

  const name = auth?.username || "N/A";
  const address = auth?.userAddress || "N/A";
  const totalAmount = state?.totalAmount || "0";
  const cartItems = state?.cartItems || [];

  const handleCheckout = (e) => {
    e.preventDefault();

    if (!window.Razorpay) {
      console.error('Razorpay script not loaded');
      return;
    }

    const options = {
      key: "rzp_test_vv1FCZvuDRF6lQ",
      key_secret: "P4JAUwn4VdE6xDLJ6p2Zy8RQ",
      amount: parseInt(totalAmount) * 100,
      currency: "INR",
      name: "Pizza Paradize",
      description: "for testing purpose",
      handler: function (response) {
        const paymentId = response.razorpay_payment_id;

        removeAllCartItems();

        navigate("/order", {
          state: {
            orderDetails: {
              orderId: state.orderId,
              totalAmount: totalAmount,
              items: cartItems,
            },
          },
        });
      },
      theme: {
        color: "#07a291db",
      },
    };
    const pay = new window.Razorpay(options);
    pay.open();
  };

  return (
    <div className="container d-flex justify-content-center mt-28 ml-10">
      <div className="card p-4 shadow-lg" style={{ width: "60%", boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)" }}>
        <h2 className="mb-4 text-center" style={{ color: "#07a291db" }}>
          Checkout Details
        </h2>
        <div className="text-center mb-4">
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Address:</strong> {address}</p>
          <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
        </div>
        <button
          onClick={handleCheckout}
          style={{
            background: "#07a291db",
            borderColor: "#07a291db",
            fontSize: "19px",
          }}
          className="btn btn-primary text-gray-100 bg-green-400 rounded-md p-2"
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Payment;
