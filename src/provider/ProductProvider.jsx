import { useEffect, useState } from "react";
import axios from 'axios'
import { ProductContext } from '../context/ProductContext';
const API_URL = 'http://localhost:3000'

export const ProductProvider = ({ children }) => {

    const [products, setProducts] = useState([])

    const getAllProducts = async () => {
        try {
            const res = await axios.get(`${API_URL}/product/sortedDesc`);
            setProducts(res.data.products)
            console.log(res)
        } catch (error) {
        }
    }

    useEffect(() => {
        getAllProducts()
    }, [])
    useEffect(() => {
        console.log(products)
    }, [products])

    return <ProductContext.Provider value={{ products, getAllProducts }}>{children}</ProductContext.Provider>;
}
