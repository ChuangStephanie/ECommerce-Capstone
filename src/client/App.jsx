import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/nav";
import Home from "./components/Home";
import AddUserForm from "./components/AddUserForm";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Nav />

      
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
