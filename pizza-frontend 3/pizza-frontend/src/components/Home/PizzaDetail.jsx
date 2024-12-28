import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { CartContext } from '../../context/CartContext';
import pizzaImage from '../../assets/loginImage.jpg'; 

const PizzaDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart, getCartItems } = useContext(CartContext);
  
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [showQuantityControls, setShowQuantityControls] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8084/pizza/${id}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [id]);

  const handleBuyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(data, quantity);
    setShowQuantityControls(false);
    setQuantity(1);
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

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>Pizza not found</div>;

  const cartItems = getCartItems();
  const cartQuantity = cartItems.find(item => item.id === data.id)?.quantity || 0;

  return (
    <div className="flex flex-col md:flex-row h-screen pt-9 bg-orange-50">
      <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/2 mx-auto my-auto flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 h-full">
          <img
            src={data.imageUrl || pizzaImage}
            alt={data.name}
            className="w-full h-fit object-cover rounded-md"
          />
        </div>

        <div className="w-full md:w-1/2 pl-6 flex flex-col justify-center">
          <h2 className="text-2xl font-semibold">{data.name}</h2>
          <p className="text-gray-600 mt-2">{data.description}</p>
          <p className="text-orange-500 font-bold mt-4">₹{data.price}</p>
          
          {!showQuantityControls ? (
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowQuantityControls(true);
              }}
              className="bg-orange-400 rounded-md px-4 py-1 text-gray-50 cursor-pointer mt-4"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center mt-4">
              <button
                onClick={decrementQuantity}
                className="bg-orange-400 rounded-md px-2 py-1 text-gray-700"
              >
                -
              </button>
              <p className="mx-4">{quantity}</p>
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
            <p className="text-gray-500 text-sm mt-4">
              In Cart: {cartQuantity}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PizzaDetail;
