import React from "react";
import { Grid, Typography, Divider, Button } from "@mui/material";
import "./cart.css";
import { useCart } from "../context/cartContext";
import {
  addToCartApi,
  deleteItemApi,
  removeItemApi,
} from "../../apicalls/apicalls";

const Table = ({ plans }) => {
  const { cart, getAllItems } = useCart();

  const handleAddToCart = async (item) => {
    const res = await addToCartApi(item);
    await getAllItems();
  };

  const handleRemoveFromCart = async (item) => {
    const res = await removeItemApi(item);
    await getAllItems();
  };

  const handleDeleteFromCart = async (data) => {
    const res = await deleteItemApi(data);
    await getAllItems();
  };

  return (
    <Grid container justifyContent="center">
      <Divider width="100%" />
      {plans.length == 0 && (
        <Typography textAlign="center">Cart is empty</Typography>
      )}
      {plans.length != 0 && (
        <>
          <Grid item container paddingX="30px" paddingY="15px" gap="20px">
            <Grid item xs={4}>
              <Typography className="headerFont">Plan</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className="headerFont">Cover</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className="headerFont">Premium</Typography>
            </Grid>
            <Grid
              item
              xs={3}
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Typography className="headerFont">Quantity</Typography>
            </Grid>
          </Grid>
          <Divider width="100%" />
          {plans.map((item) => (
            <>
            <Grid item container padding="30px" gap="20px" key={item.planId} >
              <Grid
                item
                xs={4}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography className="normalFont">{item.planName}</Typography>
                <ul style={{marginLeft:"2px"}}>
                  {item.desc.split("  ").map((x) => (
                    <li key={x}>
                      <Typography variant="body2">{x}</Typography>
                    </li>
                  ))}
                </ul>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography className="normalFont">Rs.{item.sum}L</Typography>
              </Grid>
              <Grid
                item
                xs={2}
                sx={{ display: "flex", flexDirection: "column" }}
              >
                <Typography className="normalFont">
                  Rs.{item.price}/month
                </Typography>
              </Grid>
              <Grid
                item
                xs={3}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div className="cartButton">
                  <div
                    className="box"
                    onClick={() => handleRemoveFromCart(item)}
                  >
                    -
                  </div>
                  <div className="box">{item.quantity}</div>
                  <div className="box" onClick={() => handleAddToCart(item)}>
                    +
                  </div>
                </div>
                <Typography
                  variant="body2"
                  sx={{
                    textDecoration: "underline",
                    color: "primary.main",
                    cursor: "pointer",
                  }}
                  onClick={() => handleDeleteFromCart(item)}
                >
                  Remove
                </Typography>
              </Grid>

             
              </Grid>
              <Divider width="100%" />
              </>
          ))}
        </>
      )}
    </Grid>
  );
};

export default Table;
