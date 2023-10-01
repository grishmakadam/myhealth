import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";
import { plans } from "../dummy/plans";
import Table from "./Table";
const Cart = () => {
  return (
    <Grid
      container
      sx={{
        display: "flex",

        justifyContent: "center",
        gap: "4rem",
        p: "10px",
        m: 0,
        width: "100vw",
      }}
    >
      <Grid item container justifyContent="center" width="100%" xs={7}>
        <Typography
          variant="h5"
          sx={{
            color: "secondary.main",
            marginY: "20px",
            textTransform: "capitalize",
          }}
        >
          My Cart
        </Typography>

        <Table plans={plans["diabetes-plans"]} />
      </Grid>
      <Grid
        item
        container
        justifyContent="center"
        width="100%"
        xs={3}
        height="fit-content"
      >
        <Typography
          variant="h5"
          sx={{
            color: "secondary.main",
            marginY: "20px",
            textTransform: "capitalize",
          }}
        >
          Order Summary
        </Typography>
        <Divider width="100%" />

        <Grid container>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography>SubTotal</Typography>
            <Typography>SubTotal</Typography>
          </Grid>
          <Grid
            item
            xs={12}
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <Typography>Additional Charges</Typography>
            <Typography>SubTotal</Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Cart;
