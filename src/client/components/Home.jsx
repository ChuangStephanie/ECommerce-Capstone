import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import Banner from "../assets/Banner.png";
import About from "./About";
import { Box, Container, Typography } from "@mui/material";
import VerticalTabs from "./VerticalTabs";

export default function Home() {
  

  
  return (
    <Box>
    <Box className="banner">
      <img src={Banner} alt="Banner" />
    </Box>
    <Container maxWidth="md">
      <Typography variant="h1" style={{fontSize: '26px', fontWeight: '500'}}>
        <br />
        Welcome to Lizards Plushies, Your one stop shop for everything Plushy.
      </Typography>
      <br />
      <About />
    </Container>
  </Box>
  );
}
