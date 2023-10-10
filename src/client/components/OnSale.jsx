import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Product from "./Product";

const OnSale = ({ products, filterBy }) => {
  const [onSale, setOnSale] = useState([]);
  useEffect(() => {
    const OnSaleProducts = products.filter(
      (product) => product.onsale == "true"
    );
    setOnSale(OnSaleProducts);
  }, [products, filterBy]);
  return (
    <Box className="productswrapper">
      {onSale.length > 0 &&
        onSale.map((product) => {
          return <Product product={product} />;
        })}
    </Box>
  );
};

export default OnSale;
