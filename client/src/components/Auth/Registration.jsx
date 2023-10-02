import React, { useContext, useState } from "react";
import Input from "../utils/Input";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { registerUserApi } from "../../apicalls/apicalls";
import { AuthContext } from "../context/authContext";
import Card from "../utils/Card";

const Registration = () => {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    name: { error: false, message: "Name is required" },
    email: { error: false, message: "Email is required" },
    password: {
      error: false,
      message:
        "Password should be 8 characters long*Password should be combination of uppercase,lowercase,numbers and special characters",
    },
    confirmPassword: {
      error: false,
      message: "Both password did not match",
    },
  });

  const [touched, setTouched] = useState({
    name: false,
    email: false,
    password: false,
  });

  const onChangeData = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleTouch = (e, value) => {
    setTouched((prev) => ({ ...prev, [e.target.name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let m = 0;
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    if (formData.name == "") {
      setError((prev) => ({ ...prev, name: { ...prev.name, error: true } }));
      m = 1;
    } else {
      setError((prev) => ({ ...prev, name: { ...prev.name, error: false } }));
    }
    if (formData.email == "") {
      setError((prev) => ({ ...prev, email: { ...prev.email, error: true } }));
      m = 1;
    } else {
      setError((prev) => ({ ...prev, email: { ...prev.email, error: false } }));
    }
    if (formData.password == "" || !formData.password.match(regex)) {
      console.log(regex.test(formData.password));
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
    if (
      formData.confirmPassword == "" ||
      formData.confirmPassword != formData.password
    ) {
      setError((prev) => ({
        ...prev,
        confirmPassword: { ...prev.confirmPassword, error: true },
      }));
      m = 1;
    } else {
      setError((prev) => ({
        ...prev,
        confirmPassword: { ...prev.confirmPassword, error: false },
      }));
    }
    if (m == 1) {
      return;
    }

    const res = await registerUserApi(formData);
    if (res.success) {
      dispatch({
        type: "LOGIN",
        payload: { email: res.email, name: res.name },
      });
      navigate("/");
    } else {
      if (res.field == "email") {
        setError((prev) => ({
          ...prev,
          email: { error: true, message: res.message },
        }));
      }
      if (res.field == "password") {
        setError((prev) => ({
          ...prev,
          password: { error: true, message: res.message },
        }));
      }
      return;
    }
  };

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <Typography textAlign="center" marginBottom="20px">
          Create Account
        </Typography>
        <Input
          label="User Name"
          type="text"
          name="name"
          onChange={onChangeData}
          error={error.name.error}
          _helperText={(error.name.error || touched.name) && error.name.message}
          onFocus={(e) => handleTouch(e, true)}
          onBlur={(e) => handleTouch(e, false)}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          onChange={onChangeData}
          error={error.email.error}
          _helperText={
            (error.email.error || touched.email) && error.email.message
          }
          onFocus={(e) => handleTouch(e, true)}
          onBlur={(e) => handleTouch(e, false)}
        />
        <Input
          label="Password"
          name="password"
          type="password"
          onChange={onChangeData}
          error={error.password.error}
          _helperText={
            (error.password.error || touched.password) && error.password.message
          }
          onFocus={(e) => handleTouch(e, true)}
          onBlur={(e) => handleTouch(e, false)}
        />
          <Input
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          onChange={onChangeData}
          error={error.confirmPassword.error}
          _helperText={
            (error.confirmPassword.error ) && error.confirmPassword.message
          }
          onFocus={(e) => handleTouch(e, true)}
          onBlur={(e) => handleTouch(e, false)}
        />
        <Button fullWidth variant="contained" type="submit">
          Register
        </Button>
      </form>
      <Divider sx={{ marginY: "10px" }}>Or</Divider>
      <Typography variant="body2" textAlign="center">
        Already a user?<Link to="/login">LOGIN</Link>
      </Typography>
    </Card>
  );
};

export default Registration;
