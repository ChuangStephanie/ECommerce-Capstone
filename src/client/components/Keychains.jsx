import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import { Box, Link } from '@mui/material';
import Ghost from "../assets/ghost.png";

const Keychains = () => {
  const [keychains, setKeychains] = useState([])
  const {
    products
  } = useContext(UserContext);
  useEffect(() => {
    console.log(products)
  const keychainProducts = products.filter(product => product.category == "Keychain")
  setKeychains(keychainProducts)
  },[])
  return (
    
    <Box className="productswrapper">
          {keychains.length > 0 && keychains.map((product) => {
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

export default Keychains