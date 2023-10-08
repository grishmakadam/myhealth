import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { log_out } from "../../store/userSlice";
import { set_snackbar } from "../../store/snackbarSlice";

const useReuseHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orders = useSelector((state) => state.orders);
  const cart = useSelector((state) => state.cart);
  const snackbar = useSelector((state) => state.snackbar);
  const user = useSelector((state) => state.user);

  const logOut = (res) => {
    if (res.status == 401) {
      dispatch(log_out());
      dispatch(set_snackbar({ severity: "error", message: res.data.message }));
      navigate("/login");
      return;
    }
    navigate("/");
  };
  return { dispatch, navigate, orders, cart, snackbar, user, logOut };
};

export default useReuseHook;
