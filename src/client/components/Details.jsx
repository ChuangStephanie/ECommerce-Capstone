import React, { useState, useEffect, useContext } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchSingleProduct } from "../API";
import Ghost from "../assets/ghost.png";
import { Box, Button, Typography } from "@mui/material";

export default function Details() {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [error, setError] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    const existingItemIndex = cartItems.findIndex(
      (item) => item.id === product.id
    );

    if (existingItemIndex !== -1) {
      cartItems[existingItemIndex].quantity += 1;
    } else {
      cartItems.push({ ...product, quantity: 1 });
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  };

  useEffect(() => {
    async function getSingleProductData() {
      try {
        const productData = await fetchSingleProduct(id);
        if (productData) {
          setProduct(productData.product);
        } else {
          setError("No product fetched");
        }
      } catch (error) {
        setError("Error fetching product data");
      }
    }
    getSingleProductData();
  }, [id]);

  const handleAddToCart = () => {
    console.log("Adding to cart:", product);
    addToCart(product);
  };

  const handleClick = async () => {
    const res = await fetch("http://localhost:3000/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // line_items: [
        //   {
        //     // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
        //     price: "price_1NzWUZLy2DFROTD9qmeVEB0C",
        //     quantity: 1,
        //   },
        // ],
        line_items: [
          {
            price_data: {
              currency: "usd",
              product_data: {
                name: product.name,
              },
              unit_amount: parseInt(Math.ceil(product.price * 100)),
            },
            quantity: 1,
          },
        ],
      }),
    });

    const body = await res.json();
    window.location.href = body.url;
  };

  return (
    <Box className="container-1">
      <Box className="productdetail" sx={{paddingTop: '20px'}}>
        {product && (
          <Box>
            <Typography variant="h2" component='h2' sx={{fontSize:'28px', fontWeight: 'bold', marginBottom: '10px'}}>{product.name}</Typography>
            <img className="productContent productImage"  src={Ghost} alt={product.name} />
            <Typography variant="h4" component="h2">
              ${product.price}
            </Typography>
            <Typography variant="p" component="h2">
              {product.description}
            </Typography>

            <Button onClick={handleAddToCart}>Add to Cart</Button>
          </Box>
        )}
        <Button onClick={handleClick}>Buy Now</Button>
      </Box>
    </Box>
  );
}
