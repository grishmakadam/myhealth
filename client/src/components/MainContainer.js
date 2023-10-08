import React, { useEffect } from "react";
import { Box } from "@mui/material";
import ResponsiveAppBar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
import useReuseHook from "./hooks/useReuseHook";
import { getAllItemsApi, purchaseHistoryApi } from "../apicalls/apicalls";
import { initialise_cart } from "../store/cartSlice";
import { initialise_orders } from "../store/orderSlice";
import { log_out } from "../store/userSlice";

const MainContainer = () => {
  const { user, dispatch, logOut } = useReuseHook();

  const getDetails = async () => {
    const res1 = await getAllItemsApi();
    if (res1.success) {
      dispatch(initialise_cart(res1.items));
    } else {
      console.log("bebbf")
      logOut(res1);
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  return (
    <Box width="100vw" sx={{ padding: 0, margin: 0 }}>
      <ResponsiveAppBar />
      <Outlet />
    </Box>
  );
};

export default MainContainer;
