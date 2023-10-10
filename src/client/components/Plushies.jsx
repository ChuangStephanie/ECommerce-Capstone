import React, { useEffect, useState } from "react";
import { Box } from "@mui/material";
import Product from "./Product";

const Plushies = ({ products, filterBy }) => {
  const [Plushies, setPlushies] = useState([]);
  useEffect(() => {
    const PlushiesProducts = products.filter(
      (product) => product.category == "Plushy"
    );
    setPlushies(PlushiesProducts);
  }, [products, filterBy]);
  return (
    <Box className="productswrapper">
      {Plushies.length > 0 &&
        Plushies.map((product) => {
          return <Product product={product} />;
        })}
    </Box>
  );
};

export default Plushies;
