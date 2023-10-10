import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import { Box, Link } from '@mui/material';
import Ghost from "../assets/ghost.png";

const OnSale = () => {
  const [onSale, setOnSale] = useState([])
  const {
    products
  } = useContext(UserContext);
  useEffect(() => {
  const OnSaleProducts = products.filter(product => product.onsale == "true")
  setOnSale(OnSaleProducts)
  },[])
  return (
    
    <Box className="productswrapper">
          {onSale.length > 0 && onSale.map((product) => {
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

export default OnSale