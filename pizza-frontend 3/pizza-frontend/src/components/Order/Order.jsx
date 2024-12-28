import React from 'react';
import { useLocation } from 'react-router-dom';

const Order = () => {
  const location = useLocation();
  const { state } = location;
  const orderDetails = state?.orderDetails || {};

  return (
    <div className="container mx-auto mt-42 px-4">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">Order Confirmation</h1>
      {orderDetails ? (
        <div>
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8 max-w-3xl mx-auto">
            {/* <h2 className="text-2xl font-semibold mb-4">Order ID: {orderDetails.orderId}</h2> */}
            <p className="text-lg mb-4">Total Amount: ₹{orderDetails.totalAmount}</p>
            <h3 className="text-xl font-semibold mb-4">Order Items:</h3>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {orderDetails.items.map((item, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-md">
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-md mb-4"
                  />
                  <h4 className="text-lg font-semibold mb-2">{item.name}</h4>
                  <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                  <p className="text-sm text-gray-600">Price: ₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <p className="text-lg mt-6 text-center text-gray-700">Thank you for your purchase!</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-lg text-gray-700">No order details available.</p>
      )}
    </div>
  );
};

export default Order;
