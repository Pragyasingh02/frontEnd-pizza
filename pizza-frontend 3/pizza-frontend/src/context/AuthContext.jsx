import React, { createContext, useState, useEffect, useContext } from 'react';
import { CartContext } from './CartContext'; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);
    const { removeAllCartItems } = useContext(CartContext); 

    useEffect(() => {
        const storedAuth = localStorage.getItem('authToken');
        if (storedAuth) {
            setAuth(JSON.parse(storedAuth)); 
        }
    }, []);

    const login = (token, username, userId, userAddress, userPhoneNo, userEmail) => {
        const user = { token, username, userId, userAddress, userPhoneNo, userEmail };
        console.log(auth);
        
        setAuth(user);
        localStorage.setItem('authToken', JSON.stringify(user));
    };

    const updateAuth = (updatedUser) => {
        const updatedAuth = { ...auth, ...updatedUser };
        setAuth(updatedAuth);
        localStorage.setItem('authToken', JSON.stringify(updatedAuth));
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('authToken');
        removeAllCartItems(); 
        // navigate('/login'); 
    };

    return (
        <AuthContext.Provider value={{ auth, login, logout, updateAuth }}>
            {children}
        </AuthContext.Provider>
    );
};
