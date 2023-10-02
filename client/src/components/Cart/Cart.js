import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Table from "./Table";
import { useCart } from "../context/cartContext";
const Cart = () => {
  const { cart } = useCart();

  console.log(cart);
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

        <Table plans={cart.items} />
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

        {cart.total != 0 &&
          <Grid container gap="10px" py={2}>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>SubTotal</Typography>
              <Typography>Rs.{cart.total}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Additional Charges</Typography>
              <Typography>Rs.{ 500}</Typography>
            </Grid>
            <Divider/>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography  variant="h6">Rs.{ cart.total+500}</Typography>
            </Grid>
          </Grid>
        }
        {
          cart.total == 0 &&
          <Typography>
              No Order Summary
          </Typography>
        }
      </Grid>
    </Grid>
  );
};

export default Cart;
