import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAllProducts } from "../API";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllProducts() {
      const response = await fetchAllProducts();
      console.log("test", fetchAllProducts());
      if (response) {
        setProducts(response);
        console.log("Products response:", response);
      } else {
        setError(console.error("No products found"));
      }
    }
    getAllProducts();
  }, []);

  const productsToDisplay = searchParams
    ? products.filter(p =>
        p.name.toLowerCase().includes(searchParams.toLowerCase())
      )
    : products;

  return (
    <>
      <h1 className="hometitle">Products</h1>
      <div className="searchbar">
        <label>
          Search: {""}
          <input
            type="text"
            placeholder="Search Products"
            onChange={(e) => setSearchParams(e.target.value)}
          />
        </label>
      </div>

      <div className="productscontainer">
        {products &&
          productsToDisplay.map((product) => (
            <div key={product.id} className="indivproduct">
              <h3>{product.name}</h3>
              <p>{product.price}</p>
              {/* write if/else code here to control whether or not edit/delete buttons show up */}
              <button>Edit</button>
              <button>Delte</button>
              {/* buttons should only show for admin user */}
            </div>
          ))}
      </div>
    </>
  );
}
