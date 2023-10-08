import React, { useContext, useState } from "react";
import Input from "../utils/Input";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUserApi } from "../../apicalls/apicalls";
import { AuthContext } from "../context/authContext";
import Card from "../utils/Card";
import { useCart } from "../context/cartContext";
import { set_snackbar } from "../../store/snackbarSlice";
import { useDispatch } from "react-redux";
import useReuseHook from "../hooks/useReuseHook";
import { log_in } from "../../store/userSlice";

const LogIn = () => {
  const { dispatch, navigate }=useReuseHook()
  const { getAllItems, getAllOrders } = useCart();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: { error: false, message: "Email is required" },
    password: { error: false, message: "Password is required" },
  });

  const onChangeData = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let m = 0;
    if (formData.email == "") {
      setError((prev) => ({ ...prev, email: { ...prev.email, error: true } }));
      m = 1;
    } else {
      setError((prev) => ({ ...prev, email: { ...prev.email, error: false } }));
    }
    if (formData.password == "") {
      setError((prev) => ({
        ...prev,
        password: { ...prev.password, error: true },
      }));
      m = 1;
    } else {
      setError((prev) => ({
        ...prev,
        password: { ...prev.password, error: false },
      }));
    }
    if (m == 1) {
      return;
    }

    const res = await loginUserApi(formData);
    if (res.success) {
      dispatch(log_in({ email: res.email, name: res.name }));
      dispatch(set_snackbar({
        severity:"success",message:"User logged in successfully!!!"
      }))
      // await getAllItems();
      // await getAllOrders();
      navigate("/");
    } else {
      setError((prev) => ({
        ...prev,
        password: { error: true, message: res.data.message },
      }));
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Typography textAlign="center" marginBottom="20px">
          Sign In
        </Typography>

        <Input
          label="Email"
          type="email"
          name="email"
          onChange={onChangeData}
          error={error.email.error}
          _helperText={error.email.error && error.email.message}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          onChange={onChangeData}
          error={error.password.error}
          _helperText={error.password.error && error.password.message}
        />
        <Button fullWidth variant="contained" type="submit">
          Sign In
        </Button>
      </form>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginY: "20px",
          alignItems: "center",
        }}
      >
        <Button sx={{ fontSize: "12px" }} onClick={() => navigate("/register")}>
          Create Account
        </Button>

        <Link to="/forget-password">Forgot Password?</Link>
      </Box>
    </Card>
  );
};

export default LogIn;
