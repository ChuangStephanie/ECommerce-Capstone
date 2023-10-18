import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import ResponsiveAppBar from './components/ResponsiveAppBar';
import Footer from './components/Footer'; // Import the Footer component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import Details from './components/Details';
import Cart from './components/Cart';
import Admin from './components/Admin';
import { createContext } from 'react';
import Products from './components/Products/';
import Keychains from './components/Keychains';
import OnSale from './components/OnSale';
import Plushies from './components/Plushies';
import { fetchAllProducts } from './API';

export const UserContext = createContext();

function App() {
  const [userLogged, setUserLogged] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  async function getAllProducts() {
    try {
      const response = await fetchAllProducts();
      if (response) {
        setProducts(response);
        setIsLoading(false);
      } else {
        setError('No products found');
        setIsLoading(false);
      }
    } catch (error) {
      setError('Error loading products');
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  const productsToDisplay = searchParams
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchParams.toLowerCase())
      )
    : [];

  return (
    <>
      <UserContext.Provider
        value={{
          userLogged,
          setUserLogged,
          products,
          setProducts,
          error,
          setError,
          searchParams,
          setSearchParams,
          isLoading,
          setIsLoading,
          getAllProducts,
          productsToDisplay,
        }}
      >
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/products/:id" element={<Details />} />
          <Route path="/products" element={<Products />} />
          <Route path="/category/keychains" element={<Keychains />} />
          <Route path="/category/on-sale-items" element={<OnSale />} />
          <Route path="/category/plushies" element={<Plushies />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
        <Footer />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} />
      </UserContext.Provider>
    </>
  );
}

export default App;