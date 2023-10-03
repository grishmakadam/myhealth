import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, Divider } from "@mui/material";
import { useCart } from "../context/cartContext";
import { buyItemsApi, getAllItemsApi } from "../../apicalls/apicalls";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({ open, details, handleClose }) {
  const { getAllItems } = useCart();

  const buyItem = async () => {
    const res = await buyItemsApi(details);
    if (res.success) {
      handleClose();
      await getAllItems();
    } else {
      console.log(res.message);
    }
  };
  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography
          id="modal-modal-title"
          variant="h5"
          component="h2"
          textAlign="center"
          marginY="10px"
        >
          Order Details
        </Typography>
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
          {details.items.map((item) => (
            <Grid
              item
              container
              xs={12}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                my: "5px",
              }}
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
                Rs. {details.charges}
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
        <Button
          fullWidth
          variant="contained"
          sx={{ mt: "20px" }}
          onClick={buyItem}
        >
          Buy Now
        </Button>
      </Box>
    </Modal>
  );
}
