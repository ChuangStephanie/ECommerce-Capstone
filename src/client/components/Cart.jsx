import React, { useState, useEffect } from "react";


function Cart() {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch product data when the component mounts
    async function fetchProducts() {
      try {
        const response = await fetch("http://localhost:3000/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data); 
      } catch (err) {
        setError("Error fetching products");
      }
    }

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      // Fetch the product by productId using getSingleProduct
      const product = await getSingleProduct(productId);

      // Add the fetched product to the cart
      setCart([...cart, product]);
    } catch (err) {
      setError("Error adding product to cart");
    }
  };

  const removeFromCart = (productId) => {
    const updatedCart = cart.filter((item) => item.id !== productId);
    setCart(updatedCart);
  };

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cart.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <CartItem key={item.id} item={item} onRemove={removeFromCart} />
          ))
        )}
      </div>
      <h3>Products</h3>
      <div className="product-list">
        {products.map((product) => (
          <div key={product.id} className="product">
            <h4>{product.name}</h4>
            <p>Price: ${product.price.toFixed(2)}</p>
            <button onClick={() => addToCart(product.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
      {error && <p>{error}</p>}
    </div>
  );
}

export default Cart;