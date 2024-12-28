import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar/Navbar";

import Skeleton from "./components/Fallbacks/Skeleton";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import Cart from "./components/Cart/Cart";
import Order from "./components/Order/Order";
import { CartProvider } from "./context/CartContext";
import UserProfile from "./components/User/UserProfile";
import Payment from "./components/Payment/Payment";
import OrderList from "./components/Order/OrderList";
import About from "./components/Extra/About";
import Contact from "./components/Extra/Contact";

const Pizzas = lazy(() => import("./components/Home/Pizzas"));
const PizzaDetail = lazy(() => import("./components/Home/PizzaDetail"));

function App() {
  return (
    <CartProvider>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Skeleton />}>
                  <Pizzas />
                </Suspense>
              }
            />
            <Route
              path="/:id"
              element={
                <Suspense fallback={<div>Loading Pizza Details...</div>}>
                  <PizzaDetail />
                </Suspense>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/order" element={<Order />} />
            <Route path="/orders" element={<OrderList />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Router>
      </AuthProvider>
    </CartProvider>
    // </AuthProvider>
  );
}

export default App;
