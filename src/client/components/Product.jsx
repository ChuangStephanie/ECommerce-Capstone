import React from "react";
import Ghost from "../assets/ghost.png";
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

const Product = ({product}) => {
    const classes = useStyles;
  return (
    <Card key={product.id} className={classes.root}>
              <Link to={`/products/${product.id}`}>
                <CardMedia
                  component="img"
                  className={classes.media}
                  image={Ghost}
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
};

export default Product;
