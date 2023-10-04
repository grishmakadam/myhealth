import React from "react";
import { Snackbar, Alert } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { remove_snackbar } from "../../store/snackbarSlice";

const CustomSnackbar = () => {
  const snackbar = useSelector((state) => state.snackbar);

  const dispatch = useDispatch();
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(remove_snackbar());
  };
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      handleClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        severity={snackbar.severity}
        sx={{ width: "100%" }}
        onClose={handleClose}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
};

export default CustomSnackbar;
