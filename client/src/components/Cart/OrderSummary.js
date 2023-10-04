import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, Divider } from "@mui/material";
import { useCart } from "../context/cartContext";
import { buyItemsApi, getAllItemsApi } from "../../apicalls/apicalls";
import OrderDetails from "../utils/OrderDetails";
import useReuseHook from "../hooks/useReuseHook";
import { initialise_cart } from "../../store/cartSlice";

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

export default function OrderSummary({ open, details, handleClose }) {
  const { dispatch } = useReuseHook();

  const buyItem = async () => {
    const res = await buyItemsApi(details);
    if (res.success) {
      dispatch(initialise_cart(res.items));
      handleClose();
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
        <OrderDetails details={details} />
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
