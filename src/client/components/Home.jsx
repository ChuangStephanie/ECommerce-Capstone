import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../API";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllProducts() {
      const response = await fetchAllProducts();
      if (response) {
        setProducts(response);
        console.log("Response:", response)
      } else {
        setError(console.log("No products found"));
      }
    }
    getAllProducts();
  },[]);

}
