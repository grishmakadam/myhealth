import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme/theme";

import { useContext, useEffect } from "react";
import {
  AuthContext,
  AuthContextProvider,
} from "./components/context/authContext";
import {
  getAllItemsApi,
  purchaseHistoryApi,
  verifyUserApi,
} from "./apicalls/apicalls";

import { useCart } from "./components/context/cartContext";
import CustomSnackbar from "./components/utils/CustomSnackbar";
import AppRoutes from "./components/Routes/AppRoutes";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
      <CustomSnackbar />
    </ThemeProvider>
  );
}

export default App;
