
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import LoginForm from "./components/LoginForm";
function App() {
  return (
    <Router>
      {/* <Header /> */}
      <main>
        <h1>Tiendita online</h1>
        <Routes>
          {/* <Route path='/' element={<HomeView />} />
          <Route path='/home' element={<HomeView />} />
          <Route path='/login' element={<LoginView />} />
          <Route path='/register' element={<RegisterView />} />
          <Route path='/profile' element={<ProfileView />} />
          <Route path='/search' element={<SearchView />} />
          <Route path='/cart' element={<CartView />} /> */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </Router>
  );
}

export default App;
