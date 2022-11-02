import * as React from "react";
import Button from "../utils/Button";
import Typography from "@mui/material/Typography";
import ProductHeroLayout from "../view/ProductHeroLayout";

const backgroundImage =
  "https://images.pexels.com/photos/1822608/pexels-photo-1822608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

export default function ProductHero() {
  return (
    <ProductHeroLayout
      sxBackground={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundColor: "#7fc7d9", // Average color of the background image.
        backgroundPosition: "center",
      }}
    >
      {/* Increase the network loading priority of the background image. */}
      <img
        style={{ display: "none" }}
        src={backgroundImage}
        alt="increase priority"
      />
      <Typography color="inherit" align="center" variant="h1" marked="center">
        Welcome to your favorite ToDo-App
      </Typography>
      <Typography
        color="inherit"
        align="center"
        variant="h4"
        sx={{ mb: 4, mt: { sx: 4, sm: 10 } }}
      >
        We help you to stay organised!
      </Typography>
      <Button
        color="secondary"
        variant="contained"
        size="large"
        component="a"
        href="/premium-themes/onepirate/sign-up/"
        sx={{ minWidth: 200 }}
      >
        Register
      </Button>
    </ProductHeroLayout>
  );
}
