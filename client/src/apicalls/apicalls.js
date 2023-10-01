import axios from "axios";
import { loginUserUrl, registerUserUrl, verifyUserUrl } from "./url";

const api = async (config) => {
  try {
    const res = await axios({
      ...config,
      withCredentials: true,
      credentials: "include",
    });
    return res.data;
  } catch (e) {
    console.log(e);
    return e.response.data;
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
