import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../API";

export default function Details() {
  let { id } = useParams();
  const [product, setProduct] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    async function getSingleProduct() {
      const productData = await fetchSingleProduct(id);
      if (productData) {
        setProduct(productData);
      } else {
        setError(console.error("No product fetched"));
      }
    }
    getSingleProduct();
  }, [id]);

  return (
    <>
      <div className="productdetail">
        {product && (
          <div>
            <h2>{product.name}</h2>
            <h4>{product.price}</h4>
            <p>{product.description}</p>
          </div>
        )}
      </div>
    </>
  );
}
