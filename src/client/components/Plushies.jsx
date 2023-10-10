import React, { useContext, useEffect, useState } from 'react'
import { UserContext } from '../App';
import { Box, Link } from '@mui/material';
import Ghost from "../assets/ghost.png";

const Plushies = () => {
  const [Plushies, setPlushies] = useState([])
  const {
    products
  } = useContext(UserContext);
  useEffect(() => {
    console.log(products)
  const PlushiesProducts = products.filter(product => product.category == "Plushy")
  setPlushies(PlushiesProducts)
  },[])
  return (
    
    <Box className="productswrapper">
          {Plushies.length > 0 && Plushies.map((product) => {
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

export default Plushies