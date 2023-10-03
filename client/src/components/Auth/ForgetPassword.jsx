import React, { useState } from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import Input from "../utils/Input";
import { forgetPasswordApi, verifyOtpApi } from "../../apicalls/apicalls";
import Card from "../utils/Card";
import Alert from "@mui/material/Alert";

const ForgetPassword = () => {
  const [data, setData] = useState({
    email: "",
    otp: "",
  });

  //   const [showOtp, setShowOtp] = useState(false);

  const [error, setError] = useState({
    email: { error: false, message: "Email is required" },
    otp: { error: false, message: "OTP is required" },
  });

  const onChangeData = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const [alert, setAlert] = useState({
    type: null,
    message: "",
  });
  const resetPassword = async (e) => {
    e.preventDefault();

    if (data.email == "") {
      setError((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          error: true,
        },
      }));
      return;
    } else {
      setError((prev) => ({
        ...prev,
        email: {
          ...prev.email,
          error: false,
        },
      }));
    }
    const res = await forgetPasswordApi(data.email);
    if (res.success) {
      //   setShowOtp(true);
      setAlert({ type: "success", message: res.message });
    } else {
      setAlert({ type: "error", message: res.message });
    }
  };

  //   const verifyOtp = async (e) => {
  //     e.preventDefault();

  //     if (data.otp == "") {
  //       setError((prev) => ({
  //         ...prev,
  //         otp: {
  //           ...prev.otp,
  //           error: true,
  //         },
  //       }));
  //       return;
  //     } else {
  //       setError((prev) => ({
  //         ...prev,
  //         otp: {
  //           ...prev.otp,
  //           error: false,
  //         },
  //       }));
  //     }
  //     const res = await verifyOtpApi(data);
  //     if (res.success) {
  //       console.log(res.message);
  //     } else {
  //       setError((prev) => ({
  //         ...prev,
  //         otp: {
  //           error: true,
  //           message: res.message,
  //         },
  //       }));
  //     }
  //   };

  return (
    <>
      {alert.type && <Alert severity={alert.type}>{alert.message}</Alert>}
      <Card>
        <Typography textAlign="center" marginBottom="20px">
          Reset Password
        </Typography>

        <Input
          label="Email"
          type="email"
          name="email"
          // disabled={showOtp ? true : false}
          onChange={onChangeData}
          error={error.email.error}
          _helperText={error.email.error && error.email.message}
        />

        {/* {showOtp && (
        <Input
          label="OTP"
          type="text"
          name="otp"
          onChange={onChangeData}
          error={error.otp.error}
          _helperText={error.otp.error && error.otp.message}
        />
      )} */}
        {/* {showOtp && (
        <Typography
          sx={{ fontSize: "12px", color: "primary.main", mb: 2 }}
          onClick={resetPassword}
          textAlign="end"
        >
          Resend
        </Typography>
      )} */}
        <Button fullWidth variant="contained" onClick={resetPassword}>
          Submit
        </Button>
      </Card>
    </>
  );
};

export default ForgetPassword;
