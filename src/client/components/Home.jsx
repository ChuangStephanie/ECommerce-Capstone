import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../API";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [searchParam, setSearchParam] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllProducts() {
      const APIData = await fetchAllProducts();
      if (APIData) {
        setPosts(APIData.products);
      } else {
        setError(window.alert("No products found"));
      }
    }
  })

}
