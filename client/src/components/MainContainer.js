import React from "react";
import { Box } from "@mui/material";
import ResponsiveAppBar from "./Navbar/Navbar";
import { Outlet } from "react-router-dom";
const MainContainer = () => {
  return (
    <Box width="100vw" sx={{ padding: 0, margin: 0}}>
      <ResponsiveAppBar />
      <Outlet />
    </Box>
  );
};

export default MainContainer;
