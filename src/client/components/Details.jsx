import React, { useState, useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../API';
import Ghost from '../assets/ghost.png';


export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {

    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) {

      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  useEffect(() => {
    async function getSingleProductData() {
      try {
        const productData = await fetchSingleProduct(id);
        if (productData) {
          setProduct(productData.product);
        } else {
          setError('No product fetched');
        }
      } catch (error) {
        setError('Error fetching product data');
      }
    }
    getSingleProductData();
  }, [id]);

  const handleAddToCart = () => {
    console.log('Adding to cart:', product);
    addToCart(product);
  };

  return (
    <div className="container-1">
      <div className="productdetail">
        {product && (
          <div>
            <img src={Ghost} alt={product.name} />
            <h2>{product.name}</h2>
            <h4>{product.price}</h4>
            <p>{product.description}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
          </div>
        )}
        <form action="/create-checkout-session" method="POST">
          <button type="submit">Checkout</button>
        </form>
      </div>
    </div>
  );
}
