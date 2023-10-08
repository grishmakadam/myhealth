import {
  Box,
  Button,
  Container,
  Grid,
  Typography,
  Divider,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Table from "./Table";
import { useCart } from "../context/cartContext";
import OrderSummary from "./OrderSummary";
import useReuseHook from "../hooks/useReuseHook";
const Cart = () => {
  const { cart } = useReuseHook();
  const [open, setOpen] = React.useState(false);
  console.log(cart);
  const handleCheckout = () => {
    setOpen(true);
  };
  console.log("cart")

  const [details, setDetails] = useState({
    items: [],
    total: 0,
    charges: 500,
    tax: 0,
  });

  useEffect(() => {
    const tax = (cart.total * 18) / 100;
    const total = details.charges + tax + cart.total;
    setDetails((prev) => ({
      ...prev,
      plans: [...cart.items],
      tax: tax,
      total: total,
    }));
  }, [cart]);

  console.log(details);
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

        {cart.total != 0 && (
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
              <Typography>Tax (Gst:18%)</Typography>
              <Typography>Rs.{details.tax}</Typography>
            </Grid>
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography>Additional Charges</Typography>
              <Typography>Rs.{details.charges}</Typography>
            </Grid>
            <Divider width="100%" />
            <Grid
              item
              xs={12}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <Typography variant="h6">Total</Typography>
              <Typography variant="h6">Rs.{details.total}</Typography>
            </Grid>
          </Grid>
        )}
        {cart.total == 0 && (
          <Typography variant="h6" sx={{ p: "40px" }}>
            No Order Summary
          </Typography>
        )}
        {cart.total != 0 && (
          <Button fullWidth variant="contained" onClick={handleCheckout}>
            Proceed to checkout
          </Button>
        )}
        <OrderSummary
          open={open}
          details={details}
          handleClose={() => setOpen(false)}
        />
      </Grid>
    </Grid>
  );
};

export default Cart;
