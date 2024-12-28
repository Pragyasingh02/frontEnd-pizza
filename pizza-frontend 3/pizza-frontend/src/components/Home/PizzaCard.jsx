import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { CartContext } from "../../context/CartContext";

const PizzaCard = ({ pizza }) => {
  const { auth } = useContext(AuthContext);
  const { addToCart, getCartItems } = useContext(CartContext);
  const [showQuantityControls, setShowQuantityControls] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const navigate = useNavigate();

  const handleBuyClick = (e) => {
    e.preventDefault(); 
    e.stopPropagation(); 
    if (auth) {
      addToCart(pizza, quantity);
      setShowQuantityControls(false);
      setQuantity(1); 
    } else {
      navigate('/login');
    }
  };

  const incrementQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuantity(quantity + 1);
  };

  const decrementQuantity = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    } else {
      setShowQuantityControls(false); 
    }
  };

  const cartItems = getCartItems();
  const cartQuantity = cartItems.find(item => item.id === pizza.id)?.quantity || 0;

  return (
    <div className="bg-white pb-6 rounded-lg shadow-md md:w-[28%] sm:w-[70%] mx-auto flex flex-col mb-10 hover:scale-105 hover:shadow-md duration-500">
      <Link to={`/${pizza.id}`} className="flex flex-col w-full">
        <img
          src={pizza.imageUrl}
          alt={pizza.name}
          className="w-full h-40 object-cover rounded-t-md"
        />
        <div className="mt-4 px-3">
          <h2 className="text-xl font-semibold">{pizza.name} | <span className="font-thin">{pizza.size[0]} | {pizza.type}</span></h2>
          <p className="text-gray-600 mt-2">{pizza.description}</p>
          <div className="flex justify-between items-center mt-2">
            <p className="text-orange-500 font-bold">
              ₹{pizza.price}
            </p>
            {!showQuantityControls ? (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setShowQuantityControls(true);
                }}
                className="bg-orange-400 rounded-md px-3 py-1 text-gray-50 cursor-pointer"
              >
                Buy
              </button>
            ) : (
              <div className="flex items-center">
                <button
                  onClick={decrementQuantity}
                  className="bg-orange-400 rounded-md px-2 py-1 text-gray-700"
                >
                  -
                </button>
                <p className="mx-2">{quantity}</p>
                <button
                  onClick={incrementQuantity}
                  className="bg-orange-400 rounded-md px-2 py-1 text-gray-700"
                >
                  +
                </button>
                <button
                  onClick={handleBuyClick}
                  className="bg-green-500 rounded-md px-4 py-1 text-gray-50 ml-4"
                >
                  Add to Cart
                </button>
              </div>
            )}
            {cartQuantity > 0 && (
              <p className="text-gray-500 text-sm ml-4">
                In Cart: {cartQuantity}
              </p>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PizzaCard;
