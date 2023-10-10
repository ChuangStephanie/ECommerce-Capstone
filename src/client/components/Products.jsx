import React, { useState, useEffect } from "react";
import { fetchAllProducts } from "../API";
import Ghost from "../assets/ghost.png";
import { Link } from "react-router-dom";
import VerticalTabs from "./VerticalTabs";
import { Box } from "@mui/material";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filterBy, setFilterBy] = useState("");
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await fetchAllProducts();
        if (response) {
          console.log(response);
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
    getAllProducts();
  }, []);
  const handleChange = (e) => {
    setFilterBy(e.target.value);
    let filterProducts = products;
    if (e.target.value == "hightolow") {
      filterProducts.sort((a, b) => b.price - a.price);
    } else if (e.target.value == "lowtohigh") {
      filterProducts.sort((a, b) => a.price - b.price);
    }
    setProducts(filterProducts);
  };

  return (
    <Box className="container-1">
      <h1 className="products-title">Products</h1>
      <Box className="sort-wrapper">
        <label htmlFor="filter">Sort By</label>
        <select name="filter" id="filter" onChange={handleChange}>
          <option value="hightolow">$High to Low</option>
          <option value="lowtohigh">$Low to High</option>
        </select>
      </Box>
      <Box className="productsContent" >
        <VerticalTabs products={products}/>
      </Box>
    </Box>
  );
};

export default Products;
