import React, { useContext, useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import useReuseHook from "../hooks/useReuseHook";
import { verifyUserApi } from "../../apicalls/apicalls";
import { log_in, log_out } from "../../store/userSlice";
const ProtectedRoute = (props) => {
  const { user, dispatch } = useReuseHook();
  console.log(user);
  const verify = async () => {
    const res = await verifyUserApi();
    if (res.success) {
      dispatch(log_in({ email: res.email, name: res.name }));
    } else {
      dispatch(log_out());
    }
  };
  useEffect(() => {
    verify();
  }, []);

  if (user.email=="" && user.name=="") {
    return <Navigate to="/login" replace />;
  }
  return <Outlet {...props} />;
};

export default ProtectedRoute;
