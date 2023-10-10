import React from 'react'
import { Box } from '@mui/material';
import Product from './Product';

const AllProducts = ({products}) => {
  return (
    <Box className="productswrapper">
          {products.length > 0 && products.map((product) => {
            return (
                <Product product={product} />
            );
          })}
        </Box>
  )
}

export default AllProducts