import React from "react";
import { Grid, Typography, Divider ,Button} from "@mui/material";
import "./cart.css";
const Table = ({ plans }) => {
  console.log(plans);
  return (
    <Grid container>
      <Divider width="100%" />

      <Grid item container paddingX="30px" paddingY="15px" gap="20px">
        <Grid item xs={4} >
          <Typography className="headerFont">Plan</Typography>
        </Grid>
        <Grid item xs={2} >
          <Typography className="headerFont">Cover</Typography>
        </Grid>
        <Grid item xs={2} >
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
        <Grid item container padding="30px" gap="20px">
          <Grid item xs={4} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography className="normalFont">{item.title}</Typography>
            <Typography variant="body2">gygu</Typography>

            <Typography variant="body2">gygu</Typography>
            <Typography variant="body2">gygu</Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography className="normalFont">{item.sum}L</Typography>
          </Grid>
          <Grid item xs={2} sx={{ display: "flex", flexDirection: "column" }}>
            <Typography cclassName="normalFont">
              Rs.{item.price}/month
            </Typography>
          </Grid>
          <Grid
            item
            xs={3}
            sx={{
                display: "flex",
                flexDirection:"column",
              alignItems: "center",
            }}
          >
            <div className="cartButton">
              <div
                className="box"
                //   onClick={() => handleCart("REMOVE_FROM_CART", item)}
              >
                -
              </div>
              <div className="box">1</div>
              <div
                className="box"
                //   onClick={() => handleCart("ADD_TO_CART", item)}
              >
                +
              </div>
                  </div>
                  <Button>
                      Remove
                  </Button>
          </Grid>

          <Divider width="100%" />
        </Grid>
      ))}
    </Grid>
  );
};

export default Table;
