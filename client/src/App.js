import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./components/Navbar/Navbar";
import HeroPage from "./components/Hero/HeroPage";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme/theme";
import LogIn from "./components/Auth/LogIn";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Registration from "./components/Auth/Registration";
import { useContext, useEffect } from "react";
import MainContainer from "./components/MainContainer";
import SpecificPlans from "./components/Plans/SpecificPlans";
import {
  AuthContext,
  AuthContextProvider,
} from "./components/context/authContext";
import { verifyUserApi } from "./apicalls/apicalls";
import Cart from "./components/Cart/Cart";
import ForgetPassword from "./components/Auth/ForgetPassword";
import ChangePassword from "./components/Auth/ChangePassword";
import PurchaseHistory from "./components/Account/PurchaseHistory";
function App() {
  const { user, dispatch } = useContext(AuthContext);

  const verify = async () => {
    const res = await verifyUserApi();
    console.log(res);
    if (res.success) {
      dispatch({
        type: "LOGIN",
        payload: { email: res.email, name: res.name },
      });
    } else {
    }
  };
  useEffect(() => {
    verify();
  }, []);
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <ResponsiveAppBar /> */}
        <Routes>
          <Route exact path="/" element={<MainContainer />}>
            <Route path="/" element={<HeroPage />} />
            <Route path="/plans/:type" element={<SpecificPlans />} />
            <Route
              path="/cart"
              element={user ? <Cart /> : <Navigate to="/" />}
            />
             <Route
              path="/purchase-history"
              element={user ? <PurchaseHistory /> : <Navigate to="/" />}
            />
          </Route>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/reset-password/:token" element={<ChangePassword />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
