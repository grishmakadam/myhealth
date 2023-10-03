import React, { useEffect, useState } from "react";
import { Grid, Divider, Typography } from "@mui/material";
import { purchaseHistoryApi } from "../../apicalls/apicalls";
const Orders = () => {
  const [orders, setOrders] = useState([]);

  const purchaseHist = async () => {
    const res = await purchaseHistoryApi();
    if (res.success) {
      setOrders(res.items);
    }
  };
  useEffect(() => {
    purchaseHist();
  }, []);
  return (
    <Grid container justifyContent="center">
      <Divider width="100%" />
      {orders.length == 0 && (
        <Typography textAlign="center" variant="h6" sx={{ my: "40px" }}>
          Cart is empty
        </Typography>
      )}
      {orders.length != 0 && (
        <>
          <Grid item container paddingX="30px" paddingY="15px" gap="20px">
            <Grid item xs={4}>
              <Typography className="headerFont">Plan</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className="headerFont" textAlign="center">Quantity</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className="headerFont" textAlign="center">Price</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className="headerFont" textAlign="center">Tax+Additional Charges</Typography>
            </Grid>
            <Grid item xs={2}>
              <Typography className="headerFont" textAlign="center">Date</Typography>
            </Grid>
            <Grid item xs={1}>
              <Typography className="headerFont" textAlign="center">Total Price</Typography>
            </Grid>
          </Grid>
          <Divider width="100%" />
          {orders.map((item) => (
            <>
              <Grid item container padding="30px" gap="20px" key={item.planId}>
                <Grid
                  item
                  xs={4}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {item.plans.map((x) => (
                    <Typography className="normalFont">{x.planName}</Typography>
                  ))}
                </Grid>

                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {item.plans.map((x) => (
                    <Typography className="normalFont" textAlign="center">{x.quantity}</Typography>
                  ))}
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  {item.plans.map((x) => (
                    <Typography className="normalFont" textAlign="center">Rs.{x.price}</Typography>
                  ))}
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                    <Typography className="normalFont " textAlign="center">Rs.{500+item.tax}</Typography>
                  
                </Grid>
                <Grid
                  item
                  xs={2}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography className="normalFont" textAlign="center">
                    {item.createdAt.split("T")[0]}
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={1}
                  sx={{ display: "flex", flexDirection: "column" }}
                >
                  <Typography className="normalFont" textAlign="center">
                    Rs.{item.total}
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

export default Orders;
