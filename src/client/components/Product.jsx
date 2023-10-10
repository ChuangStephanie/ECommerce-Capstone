import React from "react";
import { Box, Link } from "@mui/material";
import Ghost from "../assets/ghost.png";

const Product = ({product}) => {
  return (
    <Link href={`/products/${product.id}`} key={product.id}>
      <Box className="productContent">
        <img src={Ghost} alt={product.name} />
        <h3>{product.name}</h3>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </Box>
    </Link>
  );
};

export default Product;
