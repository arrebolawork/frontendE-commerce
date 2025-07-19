import axios from 'axios';
import { UserContext } from '../context/UserContext';
import { useState, useEffect } from 'react';

import { API_URL } from '../config';

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(new Map(JSON.parse(localStorage.getItem('cart')) ?? []));

  const login = async (email, passwd) => {
    try {
      const res = await axios.post(`${API_URL}/user/login`, { email, passwd });
      const token = res.data.token;
      localStorage.setItem('token', token);
      setToken(token);
      await fetchProfile(token);
    } catch (error) {
      console.error('Error en login:', error.response?.data || error);
    }
  };
  const register = async ({ name, lastName, email, passwd, birthday }) => {
    try {
      await axios.post(`${API_URL}/user/register`, { name, lastName, email, passwd, birthday });
    } catch (error) {
      console.error('Error en Register:', error.response?.data || error);
    }
  };
  const fetchProfile = async (authToken = token) => {
    try {
      const res = await axios.get(`${API_URL}/user/me`, {
        headers: { Authorization: authToken },
      });
      setUser({ ...res.data, role: 'admin' });
    } catch (error) {
      console.error('Error al obtener perfil:', error.response?.data || error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setToken('');
  };

  const addProductToCart = (productid, quantity = 1) => {
    const newCart = new Map(cart);
    let newQuantity = Math.max(0, (newCart.get(productid) ?? 0) + quantity);
    newCart.set(productid, newQuantity);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart.entries().toArray()));
  };

  const removeProductFromCart = (productId) => {
    const newCart = new Map(cart);
    newCart.delete(productId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart.entries().toArray()));
  };

 const emptyCart = () => {
    setCart(new Map());
    localStorage.removeItem('cart');
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        cart,
        addProductToCart,
        removeProductFromCart,
        emptyCart,
        register,
        fetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
