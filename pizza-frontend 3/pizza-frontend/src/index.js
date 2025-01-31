import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

// import 'bootstrap/dist/css/bootstrap.min.css';


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <ToastContainer position="top-center"  
      autoClose={3000}       
      hideProgressBar={false} 
      newestOnTop={false}    
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover />
  </React.StrictMode>
);


