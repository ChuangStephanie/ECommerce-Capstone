import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Register from "./components/Register";
import Details from "./components/Details";
import { createContext } from "react";

export const UserContext = createContext();
function App() {
  const [userLogged, setUserLogged] = useState(false);

  return (
    <UserContext.Provider value={{ userLogged, setUserLogged }}>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/:id" element={<Details />} />
        {/* <Route path="/profile" element={<Profile />} /> */}
      </Routes>
    </UserContext.Provider>
  );
}

export default App;
