import axios from "axios";
import {
  addToCartUrl,
  buyItemsUrl,
  changePasswordUrl,
  deleteFromCartUrl,
  forgetPasswordUrl,
  getAllItemsUrl,
  logOutUrl,
  loginUserUrl,
  purchaseHistoryUrl,
  registerUserUrl,
  removeItemUrl,
  verifyOtpUrl,
  verifyUserUrl,
} from "./url";
import useReuseHook from "../components/hooks/useReuseHook";

const api = async (config) => {
  try {
    const res = await axios({
      ...config,
      withCredentials: true,
      credentials: "include",
    });
    return res.data;
  } catch (e) {
    return e.response;
  }
};

export const registerUserApi = (data) => {
  return api({
    data,
    method: "POST",
    url: registerUserUrl,
  });
};

export const loginUserApi = (data) => {
  return api({
    data,
    method: "POST",
    url: loginUserUrl,
  });
};

export const verifyUserApi = () => {
  return api({ url: verifyUserUrl, method: "GET" });
};

export const addToCartApi = (data) => {
  return api({ url: addToCartUrl, method: "POST", data: data });
};

export const removeItemApi = (data) => {
  return api({ url: removeItemUrl, method: "PATCH", data: data });
};

export const deleteItemApi = (data) => {
  return api({ url: deleteFromCartUrl, method: "DELETE", data: data });
};

export const getAllItemsApi = () => {
  return api({ url: getAllItemsUrl, method: "GET" });
};

export const forgetPasswordApi = (email) => {
  return api({ url: forgetPasswordUrl + "/" + email, method: "GET" });
};

export const verifyOtpApi = (data) => {
  return api({ url: verifyOtpUrl, method: "POST", data: data });
};

export const changePasswordApi = (data) => {
  return api({ url: changePasswordUrl, method: "POST", data: data });
};

export const logOutApi = () => {
  return api({ url: logOutUrl, method: "POST" });
};

export const buyItemsApi = (data) => {
  return api({ url: buyItemsUrl, method: "PATCH", data: data });
};

export const purchaseHistoryApi = () => {
  return api({ url: purchaseHistoryUrl, method: "GET" });
};
