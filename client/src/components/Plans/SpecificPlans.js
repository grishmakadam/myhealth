import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { plans } from "../dummy/plans";
import { addToCartApi, getAllItemsApi } from "../../apicalls/apicalls";
import { useCart } from "../context/cartContext";
import { AuthContext } from "../context/authContext";
import useReuseHook from "../hooks/useReuseHook";
import { initialise_cart } from "../../store/cartSlice";
const SpecificPlans = (item) => {
  const { type } = useParams();

  const { user, navigate, dispatch, logOut } = useReuseHook();
  const addToCart = async (item) => {
    const res = await addToCartApi(item);
    if (res.success) {
      dispatch(initialise_cart(res.items));
    } else {
      logOut(res);
    }
  };

  const buyNow = async (item) => {
    await addToCart(item);
    navigate("/cart");
  };
  return (
    <Grid
      container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        p: "30px",
        m: 0,
        width: "100vw",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          color: "secondary.main",
          marginY: "20px",
          textTransform: "capitalize",
        }}
      >
        {type.split("-")[0]} HealthCare Plans
      </Typography>
      <hr />
      <Grid container gap="30px" justifyContent="center" width="100%">
        {plans[`${type}`].map((item) => (
          <Grid
            item
            key={item.planId}
            sx={{
              height: "400px",
              width: "350px",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              border: "1px solid #e5e5e5",
              padding: "20px",
              justifyContent: "space-evenly",
            }}
          >
            <Typography variant="h5" textAlign="center">
              {item.planName}
            </Typography>
            <ul>
              {item.desc.split("  ").map((x) => (
                <li key={x}>
                  <Typography>{x}</Typography>
                </li>
              ))}
            </ul>
            <Typography variant="h6">Sum Insured: Rs.{item.sum}L</Typography>
            <Typography variant="body2">
              Starting at{" "}
              <span style={{ fontSize: "18px" }}>Rs.{item.price}/month</span>
            </Typography>
            <Box sx={{ display: "flex", gap: "20px" }}>
              <Button variant="contained" onClick={() => addToCart(item)}>
                Add to cart
              </Button>
              <Button variant="outlined" onClick={() => buyNow(item)}>
                Buy Now
              </Button>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default SpecificPlans;
