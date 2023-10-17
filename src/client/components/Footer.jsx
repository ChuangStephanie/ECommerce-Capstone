import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import { Facebook, Instagram, Twitter } from "@mui/icons-material";
import { Box } from "@mui/material";

export default function Footer() {
  const [showFooter, setShowFooter] = useState(false);

  useEffect(() => {
    // Function to check if the user has scrolled to the bottom
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight
      ) {
        setShowFooter(true);
      } else {
        setShowFooter(false);
      }
    }

    // Add the scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  return (
    <footer className={showFooter ? "footer visible" : "footer"}>
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" style={{ color: "yellow", fontSize: "18px" }} gutterBottom>
              Contact Us
            </Typography>
            <Typography variant="body2" style={{ color: "white" }}>
              123 Main Street, Anytown, USA
            </Typography>
            <Typography variant="body2" style={{ color: "white" }}>
              Email: info@example.com
            </Typography>
            <Typography variant="body2" style={{ color: "white" }}>
              Phone: +1 234 567 8901
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" style={{ color: "yellow", fontSize: "18px" }} gutterBottom>
              Follow Us
            </Typography>
            <Link href="https://www.etsy.com/shop/LizardsPlushies" style={{ color: "white" }}>
              <Facebook />
            </Link>
            <Link
              href="https://www.etsy.com/shop/LizardsPlushies"
              style={{ color: "white" }}
              sx={{ pl: 1, pr: 1 }}
            >
              <Instagram />
            </Link>
            <Link href="https://www.etsy.com/shop/LizardsPlushies" style={{ color: "white" }}>
              <Twitter />
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" style={{ color: "yellow", fontSize: "18px" }} gutterBottom>
              Copyright
            </Typography>
            <Typography variant="body2" style={{ color: "white", fontSize: "18px" }}>
              &copy; Lizards Plushies {new Date().getFullYear()}
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
}
