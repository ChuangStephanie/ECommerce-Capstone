import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Nav from "./components/Nav";
import Home from "./components/Home";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Nav />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
