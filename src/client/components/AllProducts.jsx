import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import { Box, Link } from '@mui/material';
import Ghost from "../assets/ghost.png";

const AllProducts = () => {
  const {
    products
  } = useContext(UserContext);
  return (
    <Box className="productswrapper">
          {products.length > 0 && products.map((product) => {
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
          })}
        </Box>
  )
}

export default AllProducts