import React, { useEffect, useState } from "react";
import { Grid, Divider, Typography } from "@mui/material";
import { purchaseHistoryApi } from "../../apicalls/apicalls";
import { useCart } from "../context/cartContext";
import { Link, useNavigate } from "react-router-dom";
import useReuseHook from "../hooks/useReuseHook";
import { initialise_orders } from "../../store/orderSlice";
import { log_out } from "../../store/userSlice";
const Orders = () => {
  const { orders, navigate, dispatch, logOut } = useReuseHook();

  const getDetails = async () => {
    const res2 = await purchaseHistoryApi();
    if (res2.success) {
      dispatch(initialise_orders(res2.items));
    } else {
      console.log("hello");
      logOut(res2);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <Grid
      container
      justifyContent="center"
      width="100%"
      px={4}
      overflowX="auto"
    >
      <Divider width="100%" />
      {orders.items.length == 0 && (
        <Typography textAlign="center" variant="h6" sx={{ my: "40px" }}>
          No purchases to show
        </Typography>
      )}
      {orders.items.length != 0 && (
        <>
          <Grid item container paddingX="30px" paddingY="15px" gap="20px">
            <Grid item xs={3}>
              <Typography className="headerFont">Order Id</Typography>
            </Grid>

            <Grid item xs={3}>
              <Typography className="headerFont" textAlign="center">
                Date
              </Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className="headerFont" textAlign="center">
                Total Price
              </Typography>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
          <Divider width="100%" />
          {orders.items.map((item) => (
            <>
              <Grid
                item
                container
                padding="30px"
                gap="20px"
                key={item._id}
                onClick={() => navigate(`/purchase-history/${item._id}`)}
              >
                <Grid
                  item
                  xs={3}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography className="normalFont">{item._id}</Typography>
                </Grid>

                <Grid
                  item
                  xs={3}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography className="normalFont" textAlign="center">
                    {item.createdAt.split("T")[0]}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography className="normalFont" textAlign="center">
                    Rs.{item.total}
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
                  <Link to={`/purchase-history/${item._id}`}>More Details</Link>
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

export default Orders;
