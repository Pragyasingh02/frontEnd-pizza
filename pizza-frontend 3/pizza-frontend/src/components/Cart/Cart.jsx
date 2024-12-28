import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const Cart = () => {
  const { getCartItems, decrementQuantity, incrementQuantity, removeFromCart } = useContext(CartContext);
  const cartItems = getCartItems();
  const { auth } = useContext(AuthContext);
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleCheckout = async (e) => {
    e.preventDefault();
    const orderDetails = {
      customerId: auth.userId,
      totalPrice: totalPrice,
      pizzaItems: cartItems.map((item) => ({
        pizzaId: item.id,
        quantity: item.quantity,
      })),
    };

    try {
      const response = await axios.post('http://localhost:8083/order/add', orderDetails, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      });
      console.log(response.data);
      
      
      navigate("/payment", { state: { orderId: response.data.id, totalAmount: totalPrice, cartItems } });
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to complete checkout. Please try again.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen pt-[100px] px-4 pb-12">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <div className="w-[80%] mx-auto">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-4 rounded-lg shadow-md mb-4 flex justify-between items-center"
              >
                <div className="flex gap-4">
                  <div>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-[160px] h-[160px]"
                    />
                  </div>
                  <div className="flex flex-col justify-center">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Size: {item.size}</p>
                    <p className="text-gray-600">Type: {item.type}</p>
                    <p className="text-gray-600">Quantity: {item.quantity}</p>
                    <p className="text-orange-500 font-bold">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    onClick={() => decrementQuantity(item.id)}
                    className="bg-orange-400 rounded-md px-2 py-1 text-gray-700 mr-2"
                  >
                    -
                  </button>
                  <button
                    onClick={() => incrementQuantity(item.id)}
                    className="bg-orange-400 rounded-md px-2 py-1 text-gray-700 mr-2"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 rounded-md px-4 py-1 text-white"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold mt-4">
            Total Price: ${totalPrice.toFixed(2)}
          </h2>
          <button
            onClick={handleCheckout}
            className="bg-green-500 text-white p-3 rounded-md mt-4"
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
