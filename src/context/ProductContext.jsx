import { createContext } from "react";

export const ProductContext = createContext({
  products: [],
  product: {},
  setProducts: () => { },
  getAllProducts: () => { },
  deleteProduct: () => { },
  updateProduct: () => { },
  getProductById: () => { },
  createProduct: () => { },

});
