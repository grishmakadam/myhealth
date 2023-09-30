import React, { useState } from "react";
import Input from "../utils/Input";
import { Box, Container, Typography, Button, Divider } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { loginUserApi } from "../../apicalls/apicalls";

const LogIn = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: {error:false,message:"Email is required"},
    password: {error:false,message:"Password is required"},
  });

  const onChangeData = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

    const handleSubmit = async (e) => {
        e.preventDefault();
let m=0
        if (formData.email == "") {
            setError((prev) => ({ ...prev, email: {...prev.email,error:true} }));
            m=1
        } else {
            setError((prev) => ({ ...prev, email:{...prev.email,error:false} }));
        }
        if (formData.password == "") {
            setError((prev) => ({ ...prev, password: {...prev.password,error:true} }));
            m=1
        } else {
            setError((prev) => ({ ...prev, password:{...prev.password,error:false} }));
        }
        if (m == 1) {
            console.log("hii")
            return;
        }
      
        const res = await loginUserApi(formData);
        if (res.success) {
            localStorage.setItem("email", res.email);
            localStorage.setItem("name", res.name);
            navigate("/")
        } else {
      
      
            setError((prev) => ({
                ...prev,
                password: { error: true, message: res.message },
       
            }))
        };
    }

  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        maxWidth: "100vw !important",
      }}
    >
      <Box
        sx={{
          padding: "30px",
          boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
          ":hover": {
            boxShadow:
              "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
          },
          width: "360px",
        }}
      >
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
            _helperText={error.email.error && error.email.message }
          />
          <Input
            label="Password"
            name="password"
            type="password"
            onChange={onChangeData}
            error={error.password.error}
            _helperText={error.password.error &&  error.password.message }
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
          <Button
            sx={{ fontSize: "12px" }}
            onClick={() => navigate("/register")}
          >
            Create Account
          </Button>

          <Link>Forgot Password?</Link>
        </Box>
      </Box>
    </Container>
  );
};

export default LogIn;
