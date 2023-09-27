import React, { useState, useEffect } from "react";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filterBy, setFilterBy] = useState("");

  useEffect(() => {
    async function getProducts() {
      fetch(`http://localhost:3000/api/products`)
        .then((response) => response.json())
        .then((data) => {
          setProducts(data.products); //update this to data.products when backend is done
        });
    }
    getProducts();
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
    <div>
      <h1>Products</h1>
      <label htmlFor="filter">Sort By</label>
      <select name="filter" id="filter" onChange={handleChange}>
        <option value="hightolow">$High to Low</option>
        <option value="lowtohigh">$Low to High</option>
      </select>
      {products.map((product) => {
        return (
          <div key={product.id} className="productscontainer">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>{product.price}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Products;
