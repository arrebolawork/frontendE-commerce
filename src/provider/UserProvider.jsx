import axios from "axios";
import { UserContext } from "../context/UserContext";
import { useState, useEffect } from "react";

const API_URL = 'http://localhost:3000'

export const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState(
    new Map(JSON.parse(localStorage.getItem('cart')) ?? []),
  );

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

  const fetchProfile = async (authToken = token) => {
    try {
      const res = await axios.get(`${API_URL}/user/me`, {
        headers: { Authorization: authToken },
      });
      setUser(res.data);
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

  const addProductToCart = (product, quantity = 1) => {
    const newCart = new Map(cart);
    let currentQuantity = newCart.get(product.id) ?? 0;
    newCart.set(product.id, currentQuantity + quantity);
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
      value={{ user, token, login, logout, cart, addProductToCart, emptyCart }}
    >
      {children}
    </UserContext.Provider>
  );
};
