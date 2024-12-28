import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import axios from 'axios'

const OrderList = () => {

  const [ordersList, setOrdersList] = useState([])
  const {auth} = useContext(AuthContext)
  console.log(auth.token)

  useEffect(() =>{
    const fetchOrders = async () => {
      try{
        const response = await axios.get(`http://localhost:8083/order/user/${auth.userId}`, {
          headers: {
            'Authorization': `Bearer ${auth.token}`
          }
        })
        setOrdersList(response.data)
      }catch(e){
        console.error(e)
        alert('Failed to fetch orders')
      }
    }
    fetchOrders()
    console.log(ordersList)
  },[])
  return (
    <div className="container mx-auto mt-20">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      {ordersList.length > 0 ? (
        <ul className="space-y-4">
          {ordersList.map((order) => (
            <li key={order.id} className="bg-white p-4 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-2">Order ID: {order.id}</h2>
              <p><strong>Order Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
              <p><strong>Status:</strong> {order.status[0]}</p>
              <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
              <div className="mt-2">
                <h3 className="text-lg font-semibold">Pizza Items:</h3>
                <ul className="list-disc pl-5">
                  {order.pizzaItems.map((item) => (
                    <li key={item.id}>
                      Pizza ID: {item.pizzaId}, Quantity: {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No orders found</p>
      )}
    </div>
  )
}

export default OrderList