import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import MedicineIcon from "../../assets/Medicine";
import { useNavigate } from "react-router-dom";
import PlanPopper from "../utils/PlanPopper";
import { AuthContext } from "../context/authContext";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import {Badge} from "@mui/material"
import { useCart } from "../context/cartContext";
const loggedOut = [
  { text: "Home", link: "/" },
  { text: "Plans" },
  { text: "SignUp", link: "/register" },
  { text: "LogIn", link: "/login" },
];

const loggedIn = [{ text: "Home", link: "/" }, { text: "Plans" }];

const settings = ["Account", "Logout"];

function ResponsiveAppBar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [pages, setPages] = React.useState(loggedOut);
  const navigate = useNavigate();
  const {cart}=useCart()
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (link) => {
    navigate(link);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const { user } = React.useContext(AuthContext);

    React.useEffect(() => {
      console.log(user)
    if (user) {
      setPages(loggedIn);
    } else {
      setPages(loggedOut);
    }
  }, [user]);
  return (
    <AppBar position="sticky" sx={{ backgroundColor: "#fff", top: 0 }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Typography
            variant="h6"
            noWrap
            component="a"
            sx={{
              mr: 2,
              display: "flex",

              fontWeight: 700,
              color: "primary.main",
              textDecoration: "none",
            }}
          >
            MyHealth
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="secondary"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.text}
                    onClick={() => page.link && handleClick(page.link)}
                  >
                    {page.link && (
                      <Typography textAlign="center" color="primary">
                        {page.text}
                      </Typography>
                    )}
                    {!page.link && <PlanPopper placement="left-start" />}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ display: { xs: "none", md: "flex" }, marginX: "30px" }}>
              {pages.map((page) =>
                page.link ? (
                  <Button
                    key={page.text}
                    onClick={() => handleClick(page.link)}
                    sx={{
                      my: 2,
                      color: "primary",
                      display: "block",
                      position: "relative",
                      "&:before": {
                        content: "''",
                        position: "absolute",
                        width: "0",
                        height: "2px",
                        bottom: "-3px",
                        left: "50%",
                        transform: "translate(-50%,0%)",
                        backgroundColor: "primary.main",
                        visibility: "hidden",
                        transition: "all 0.3s ease-in-out",
                      },
                      "&:hover:before": {
                        visibility: "visible",
                        width: "100%",
                      },
                      "&:active": {
                        visibility: "visible",
                        width: "100%",
                      }
                    }}
                  >
                    {page.text}
                  </Button>
                ) : (
                  <PlanPopper />
                )
              )}
              {user && (
                
                <IconButton onClick={() => handleClick("/cart")} color="primary">
                  <Badge badgeContent={cart.quantity} color="primary">
                    <ShoppingCartIcon />
                    </Badge>
                </IconButton>
              )}
            </Box>

            {user && (
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar
                      alt="Remy Sharp"
                      src="/static/images/avatar/2.jpg"
                    />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                      <Typography textAlign="center">{setting}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
