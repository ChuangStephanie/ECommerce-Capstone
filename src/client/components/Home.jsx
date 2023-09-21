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
        setError(console.log("No products found"));
      }
    }
    getAllProducts();
  }, []);

  const productsToDisplay = searchParams
    ? products.filter((p) =>
        p.title.toLowerCase().includes(searchParams.toLowerCase())
      )
    : products;
  console.log("Display", productsToDisplay);

  return (
    <>
      <h2 className="hometitle">Products</h2>
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
              <h2>{product.name}</h2>
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
