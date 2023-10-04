import React, { useEffect } from "react";
import { Grid, Typography, Divider } from "@mui/material";

const OrderDetails = ({ details }) => {
  useEffect(() => {}, [details]);

  return (
    <Grid container sx={{ overflowY: "auto", height: "300px" }}>
      <Grid
        item
        container
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between", my: "5px" }}
      >
        <Grid item xs={4}>
          <Typography variant="h6">Description</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography textAlign="center" variant="h6">
            Quantity
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography textAlign="center" variant="h6">
            Price
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography textAlign="center" variant="h6">
            Total
          </Typography>
        </Grid>
      </Grid>
      <Divider width="100%" />
      {details.plans.map((item) => (
        <Grid
          item
          container
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            my: "5px",
          }}
          key={item._id}
        >
          <Grid item xs={4}>
            <Typography variant="body1">{item.planName}</Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography textAlign="center" variant="body1">
              {item.quantity}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography textAlign="center" variant="body1">
              Rs.{item.price}
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography textAlign="center" variant="body1">
              Rs.{item.price * item.quantity}
            </Typography>
          </Grid>
        </Grid>
      ))}
      <Divider width="100%" />
      <Grid
        item
        container
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between", my: "5px" }}
      >
        <Grid item xs={9}>
          <Typography variant="body1">Tax @18%</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1" textAlign="center">
            Rs. {details.tax}
          </Typography>
        </Grid>
      </Grid>
      <Grid
        item
        container
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between", my: "5px" }}
      >
        <Grid item xs={9}>
          <Typography variant="body1">Additional Charges</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="body1" textAlign="center">
            Rs. 500
          </Typography>
        </Grid>
      </Grid>
      <Divider width="100%" />
      <Grid
        item
        container
        xs={12}
        sx={{ display: "flex", justifyContent: "space-between", my: "5px" }}
      >
        <Grid item xs={9}>
          <Typography variant="h6">Total</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6" textAlign="center">
            Rs. {details.total}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default OrderDetails;
