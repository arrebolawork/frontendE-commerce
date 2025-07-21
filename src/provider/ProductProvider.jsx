import { useState } from 'react';
import axios from 'axios';
import { ProductContext } from '../context/ProductContext';
import { API_URL } from '../config';

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);

  const getAllProducts = async () => {
    try {
      const res = await axios.get(`${API_URL}/product/sortedDesc`);
      setProducts(res.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const createProduct = async (productData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(
        `${API_URL}/product`,
        {
          ...productData,
          categoryId: 1,
        },
        {
          headers: { authorization: token },
        },
      );
      getAllProducts();
      return res.data;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  };
  const getProductsByName = async (name) => {
    try {
      const res = await axios.get(`${API_URL}/product/search`, {
        params: { name },
      });
      setProducts(res.data.products);
    } catch (error) {
      console.error('Error fetching products by name:', error);
      setProducts([]);
    }
  };

  const deleteProduct = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${API_URL}/product/${id}`, {
        headers: { authorization: token },
      });
      getAllProducts();
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const updateProduct = async (id, productData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`${API_URL}/product/${id}`, productData, {
        headers: { authorization: token },
      });
      return res.data;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  };

  const getProductById = async (id) => {
    try {
      const res = await axios.get(`${API_URL}/product/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

    const createReview = async (reviewData) => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post(`${API_URL}/reviews`, reviewData, {
        headers: { authorization: token },
      });
      
      setReviews(prevReviews => [...prevReviews, res.data.review]);
      
      return {
        message: "Reseña creada exitosamente",
        review: res.data.review
      };
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        product,
        reviews,
        getAllProducts,
        createProduct,
        deleteProduct,
        updateProduct,
        getProductById,
        getProductsByName,
        createReview
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
