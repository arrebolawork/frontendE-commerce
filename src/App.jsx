import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import ShopView from './pages/ShopView/ShopView';
import CartView from './pages/CartView/CartView';
import LoginForm from './components/login/LoginForm';
import Header from './components/header/Header.jsx';

function App() {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/register" element={<LoginForm />} />
          <Route path="/shop" element={<ShopView />} />
          <Route path="/cart" element={<CartView />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminView />} />
          <Route path="/product/:productId" element={<ProductDetails />} />
          {/* <Route path='/home' element={<HomeView />} />
          {/* <Route path='/' element={<HomeView />} />
          <Route path='/home' element={<HomeView />} />
          <Route path='/login' element={<LoginView />} />
          <Route path='/search' element={<SearchView />} />
          <Route path='/cart' element={<CartView />} /> */}
        </Routes>
      </main>
      <Footer />
      <div></div>
    </Router>
  );
}

export default App;
