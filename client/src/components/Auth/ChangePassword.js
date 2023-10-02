import React from "react";
import Card from "../utils/Card";

const ChangePassword = () => {
  const [data, setData] = useState({
    email: "",
    otp: "",
  });

  const [showOtp, setShowOtp] = useState(false);

  const [error, setError] = useState({
    email: { error: false, message: "Email is required" },
    otp: { error: false, message: "OTP is required" },
  });

  const onChangeData = (e) => {
    setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      setShowOtp(true);
    } else {
      setError((prev) => ({
        ...prev,
        email: {
          error: true,
          message: res.message,
        },
      }));
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    if (data.otp == "") {
      setError((prev) => ({
        ...prev,
        otp: {
          ...prev.otp,
          error: true,
        },
      }));
      return;
    } else {
      setError((prev) => ({
        ...prev,
        otp: {
          ...prev.otp,
          error: false,
        },
      }));
    }
    const res = await verifyOtpApi(data);
    if (res.success) {
      console.log(res.message);
    } else {
      setError((prev) => ({
        ...prev,
        otp: {
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
        label="Email"
        type="email"
        name="email"
        disabled={showOtp ? true : false}
        onChange={onChangeData}
        error={error.email.error}
        _helperText={error.email.error && error.email.message}
      />

      {showOtp && (
        <Input
          label="OTP"
          type="text"
          name="otp"
          onChange={onChangeData}
          error={error.otp.error}
          _helperText={error.otp.error && error.otp.message}
        />
      )}
      {showOtp && (
        <Typography
          sx={{ fontSize: "12px", color: "primary.main", mb: 2 }}
          onClick={resetPassword}
          textAlign="end"
        >
          Resend
        </Typography>
      )}
      <Button
        fullWidth
        variant="contained"
        onClick={!showOtp ? resetPassword : verifyOtp}
      >
        {showOtp ? "Submit" : "Send OTP"}
      </Button>
    </Card>
  );
};

export default ChangePassword;