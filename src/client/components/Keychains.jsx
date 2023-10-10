import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Product from "./Product";

const Keychains = ({ products, filterBy }) => {
  const [keychains, setKeychains] = useState([]);
  useEffect(() => {
    const keychainProducts = products.filter(
      (product) => product.category == "Keychain"
    );
    setKeychains(keychainProducts);
  }, [products, filterBy]);
  return (
    <Box className="productswrapper">
      {keychains.length > 0 &&
        keychains.map((product) => {
          return (
            <Product product={product} />
          );
        })}
    </Box>
  );
};

export default Keychains;
