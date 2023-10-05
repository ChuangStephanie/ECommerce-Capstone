import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Register from "./components/Register";
import Details from "./components/Details";
// import Cart from "./components/Cart"
import { createContext } from "react";
import Products from "./components/Products/";
import Keychains from "./components/Keychains";
import OnSale from "./components/OnSale";
import Plushies from "./components/Plushies";
import { fetchAllProducts } from "./API";

export const UserContext = createContext();
function App() {
  const [userLogged, setUserLogged] = useState(false);

  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const [isLoading, setIsLoading] = useState(true); // Initialize loading state

  async function getAllProducts() {
    try {
      const response = await fetchAllProducts();
      if (response) {
        setProducts(response);
        setIsLoading(false); // Set loading state to false when products are loaded
      } else {
        setError("No products found");
        setIsLoading(false); // Set loading state to false when there's an error
      }
    } catch (error) {
      setError("Error loading products");
      setIsLoading(false); // Set loading state to false when there's an error
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
    <UserContext.Provider value={{ userLogged, setUserLogged, products, setProducts, error, setError, searchParams, setSearchParams, isLoading, setIsLoading, getAllProducts, productsToDisplay }}>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />
          
        <Route path="/products/:id" element={<Details />} />
        {/* <Route path="/profile" element={<Profile />} /> */}

        <Route path="/products" element={<Products />} />

        <Route path="/category/keychains" element={<Keychains />} />

        <Route path="/category/on-sale-items" element={<OnSale />} />

        <Route path="/category/plushies" element={<Plushies />} />

        {/* <Route path="/cart" element={<Cart />} /> */}

      </Routes>
    </UserContext.Provider>
  );
}

export default App;
