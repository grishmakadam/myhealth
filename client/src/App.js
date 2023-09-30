import logo from "./logo.svg";
import "./App.css";
import ResponsiveAppBar from "./components/Navbar/Navbar";
import HeroPage from "./components/Hero/HeroPage";
import { ThemeProvider } from "@emotion/react";
import theme from "./Theme/theme";
import LogIn from "./components/Auth/LogIn";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/Auth/Registration";
import { useEffect } from "react";
import MainContainer from "./components/MainContainer";
import SpecificPlans from "./components/Plans/SpecificPlans";
function App() {
  const user = localStorage.getItem("email");
  return (
    <ThemeProvider theme={theme}>
      <Router>
        {/* <ResponsiveAppBar /> */}
        {user && <ResponsiveAppBar />}
        <Routes>
          <Route exact path="/" element={<MainContainer />}>
            <Route path="/" element={<HeroPage />} />
            <Route path="/plans/:type" element={<SpecificPlans/>}/>
          </Route>
          <Route path="/login" element={<LogIn />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
