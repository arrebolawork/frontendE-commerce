import ProductList from '../../components/ProductWidget/ProductWidget';
import { ProductContext } from '../../context/ProductContext';
import './ShopView.scss';
import { useContext, useEffect } from 'react';

const ShopView = () => {
  const { products, getAllProducts } = useContext(ProductContext);
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="productList">
      {products && products.map((product) => <ProductList key={product.id} product={product} />)}
    </div>
  );
};

export default ShopView;
