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
  useEffect(() => {
    getAllProducts();
  }, []);
  const handleChange = (e) => {
    setFilterBy(e.target.value);
    let filterProducts = products;
    if (e.target.value === "hightolow") {
      filterProducts.sort((a, b) => b.price - a.price);
    } else if (e.target.value === "lowtohigh") {
      filterProducts.sort((a, b) => a.price - b.price);
    }
    console.log(filterProducts);
    setProducts(filterProducts);
  };

  const addToCart = (product) => {
    // Retrieve existing cart items from local storage or initialize an empty array
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];

    // Check if the product is already in the cart
    const existingItemIndex = cartItems.findIndex((item) => item.id === product.id);

    if (existingItemIndex !== -1) {
      // If the product is already in the cart, update its quantity
      cartItems[existingItemIndex].quantity += 1;
    } else {
      // If the product is not in the cart, add it with a quantity of 1
      cartItems.push({ ...product, quantity: 1 });
    }

    // Save the updated cart items back to local storage
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  return (
    <Box className="container-1 products-container">
      <h1 className="products-title">Products</h1>
      <Box className="sort-wrapper">
        <label htmlFor="filter">Sort By</label>
        <select name="filter" id="filter" onChange={handleChange}>
          <option value="lowtohigh">$Low to High</option>
          <option value="hightolow">$High to Low</option>
        </select>
      </Box>
      <Box className="productsContent">
        <VerticalTabs products={products} filterBy={filterBy} />
      </Box>
    </Box>
  );
};

export default Products;
