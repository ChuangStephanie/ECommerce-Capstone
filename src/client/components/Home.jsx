import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { fetchAllProducts } from "../API";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await fetchAllProducts();
        if (response) {
          setProducts(response);
          setIsLoading(false);
        } else {
          setError("Error loading products");
          setIsLoading(false);
        }
      } catch (error) {
        setError("Error loading products");
        setIsLoading(false);
      }
    }
    getAllProducts();
  }, []);

  const productsToDisplay = searchParams
    ? products.filter((p) =>
        p.name.toLowerCase().includes(searchParams.toLowerCase())
      )
    : [];

  return (
    <>
      <h1 className="hometitle">Lizards Plushies</h1>
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

      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <>
          {error ? (
            <p className="error-message">{error}</p>
          ) : (
            <div className="productscontainer">
              {productsToDisplay.map((product) => (
                <div key={product.id} className="indivproduct">
                  <h3>
                    <Link to={`/${product.id}`}>{product.name}</Link>
                  </h3>
                  <p>{product.price}</p>
                  <button>Edit</button>
                  <button>Delete</button>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}