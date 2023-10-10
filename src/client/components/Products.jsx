import React, { useState, useEffect } from 'react';
import { fetchAllProducts } from '../API';
import { Link } from 'react-router-dom';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  IconButton,
} from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

import { styled } from '@mui/system';

const useStyles = styled('div')({
  root: {
    maxWidth: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});

const Products = () => {
  const [products, setProducts] = useState([]);
  const [filterBy, setFilterBy] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const classes = useStyles;

   // Function to add a product to the cart
const addToCart = (product) => {
  // Retrieve existing cart items from local storage or initialize an empty array
  const cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];

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
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

  useEffect(() => {
    async function getAllProducts() {
      try {
        const response = await fetchAllProducts();
        if (response) {
          setProducts(response);
          setIsLoading(false);
        } else {
          setError('No products found');
          setIsLoading(false);
        }
      } catch (error) {
        setError('Error loading products');
        setIsLoading(false);
      }
    }
    getAllProducts();
  }, []);

  const handleChange = (e) => {
    setFilterBy(e.target.value);
    let filterProducts = [...products];
    if (e.target.value === 'hightolow') {
      filterProducts.sort((a, b) => b.price - a.price);
    } else if (e.target.value === 'lowtohigh') {
      filterProducts.sort((a, b) => a.price - b.price);
    }
    setProducts(filterProducts);
  };

  return (
    <div className="container-1">
      <h1 className="products-title">Products</h1>
      <div className="sort-wrapper">
        <label htmlFor="filter">Sort By</label>
        <select name="filter" id="filter" onChange={handleChange}>
          <option value="hightolow">$High to Low</option>
          <option value="lowtohigh">$Low to High</option>
        </select>
      </div>
      <div className="productswrapper">
        {products.map((product) => {
          return (
            <Card key={product.id} className={classes.root}>
              <Link to={`/products/${product.id}`}>
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={product.image}
                  title={product.name}
                />
                <CardContent>
                  <div className={classes.cardContent}>
                    <Typography variant="h5" gutterBottom>
                      {product.name}
                    </Typography>
                    <Typography variant="h5">{product.price}</Typography>
                  </div>
                  <Typography
                    dangerouslySetInnerHTML={{ __html: product.description }}
                    variant="body2"
                    color="textSecondary"
                  />
                </CardContent>
              </Link>
              <CardActions disableSpacing className={classes.cardActions}>
                <IconButton
                  aria-label="Add to Cart"
                  onClick={() => addToCart(product)}
                >
                  <AddShoppingCartIcon />
                </IconButton>
              </CardActions>
            </Card>
          );
        })}
      </div>
    </div>
  );
};

export default Products;
