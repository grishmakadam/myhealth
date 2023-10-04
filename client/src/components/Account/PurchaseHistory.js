import React from "react";
import { Grid, Typography } from "@mui/material";
import Orders from "./Orders";

const PurchaseHistory = () => {


    
  return (
    <Grid
      container
      sx={{
        display: "flex",
        gap: "1rem",
        justifyContent: "center",
        p: "10px",
        m: 0,
        width: "100vw",
      }}
    >
      <Typography
        variant="h5"
        sx={{
          color: "secondary.main",
          textTransform: "capitalize",
          marginTop: "20px",
        }}
      >
        Purchase History
      </Typography>
      <Orders />
    </Grid>
  );
};

export default PurchaseHistory;
