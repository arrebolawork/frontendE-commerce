import { useEffect, useState } from "react";
import axios from 'axios'
import { ProductContext } from '../context/ProductContext';
const API_URL = 'http://localhost:3000'

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([])
    const [product, setProduct] = useState([])

    const getAllProducts = async () => {
        try {
            const res = await axios.get(`${API_URL}/product/sortedDesc`);
            setProducts(res.data.products)
        } catch (error) {
        }
    }

    const deleteProduct = async (id) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const res = await axios.delete(`${API_URL}/product/${id}`, {
                headers: {
                    authorization: token,
                }
            })
            getAllProducts()
        } catch (error) {

        }
    }

    const updateProduct = async (id) => {
        try {
            const token = JSON.parse(localStorage.getItem('token'))
            const res = await axios.update(`${API_URL}/product/${id}`, {
                headers: {
                    authorization: token,
                }
            })
        } catch (error) {

        }
    }

    const getProductById = async (id) => {
        try {
            const res = await axios.get(`${API_URL}/product/${id}`)
            setProduct(res.data.product)
        } catch (error) {

        }
    }

    return <ProductContext.Provider value={{ products, product, getAllProducts, deleteProduct, updateProduct, getProductById }}>{children}</ProductContext.Provider>;
}