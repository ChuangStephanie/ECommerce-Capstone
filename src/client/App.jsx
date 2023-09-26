import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Register from "./components/Register";
// import Cart from "./components/Cart"
import { createContext } from "react";
import Products from "./components/Products";

export const UserContext = createContext()
function App() {
  const [userLogged, setUserLogged] = useState(false);

  return (
    <UserContext.Provider value={{userLogged, setUserLogged}}>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        
        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/products" element={<Products />} />

        {/* <Route path="/cart" element={<Cart />} /> */}
      </Routes>
    </UserContext.Provider >
  );
}

export default App;
