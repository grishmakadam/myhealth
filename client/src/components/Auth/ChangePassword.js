import React, { useState, useEffect } from "react";
import Card from "../utils/Card";
import { useNavigate, useParams } from "react-router-dom";
import { changePasswordApi, verifyUserApi } from "../../apicalls/apicalls";
import { Container, Box, Typography, Button } from "@mui/material";
import Input from "../utils/Input";

const ChangePassword = () => {
  const [data, setData] = useState({
    newPassword: "",
    confirmNewPassword: "",
  });

  const navigate = useNavigate();
  const { token } = useParams();

  const [error, setError] = useState({
    newPassword: {
      error: false,
      message:
        "Password should be 8 characters long*Password should be combination of uppercase,lowercase,numbers and special characters",
    },
    confirmNewPassword: {
      error: false,
      message: "Both passwords did not match",
    },
  });

  const onChangeData = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const changePassword = async (e) => {
    e.preventDefault();
    console.log(data);
    const regex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,}$/;
    if (data.newPassword == "" || !data.newPassword.match(regex)) {
      setError((prev) => ({
        ...prev,
        newPassword: {
          ...prev.newPassword,
          error: true,
        },
      }));
      return;
    } else {
      setError((prev) => ({
        ...prev,
        newPassword: {
          ...prev.newPassword,
          error: false,
        },
      }));
    }
    if (
      data.confirmNewPassword == "" ||
      data.newPassword != data.confirmNewPassword
    ) {
      setError((prev) => ({
        ...prev,
        confirmNewPassword: {
          ...prev.confirmNewPassword,
          error: true,
        },
      }));
      return;
    } else {
      setError((prev) => ({
        ...prev,
        confirmNewPassword: {
          ...prev.confirmNewPassword,
          error: false,
        },
      }));
    }
    const res = await changePasswordApi({ ...data, token });
    if (res.success) {
      navigate("/login");
    } else {
      setError((prev) => ({
        ...prev,
        confirmNewPassword: {
          error: true,
          message: res.message,
        },
      }));
    }
  };

  return (
    <Card>
      <Typography textAlign="center" marginBottom="20px">
        Reset Password
      </Typography>

      <Input
        label="New Password"
        type="password"
        name="newPassword"
        onChange={onChangeData}
        error={error.newPassword.error}
        _helperText={error.newPassword.error && error.newPassword.message}
      />
      <Input
        label="Confirm New Password"
        type="password"
        name="confirmNewPassword"
        onChange={onChangeData}
        error={error.confirmNewPassword.error}
        _helperText={
          error.confirmNewPassword.error && error.confirmNewPassword.message
        }
      />

      <Button fullWidth variant="contained" onClick={changePassword}>
        Submit
      </Button>
    </Card>
  );
};

export default ChangePassword;
