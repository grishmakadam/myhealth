import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { Box, Typography } from "@mui/material";
import OrderDetails from "../utils/OrderDetails";
import useReuseHook from "../hooks/useReuseHook";

const OrderDetailsById = () => {
  const { orderId } = useParams();
  const { orders } = useReuseHook();
  const [details, setDetails] = useState({});

  useEffect(() => {
    const order = orders.items.filter((item) => item._id == orderId);
    console.log(order);
    setDetails((prev) => ({ ...order[0] }));
  }, [orders]);

  return (
    <Box width="100%" sx={{ display:"flex",flexDirection:"column",gap:"40px",padding:"3rem" }} margin="auto">
      <Typography variant="h5" textAlign="center">
        Order Details
      </Typography>
      {details.plans && <OrderDetails details={details} />}
    </Box>
  );
};

export default OrderDetailsById;
