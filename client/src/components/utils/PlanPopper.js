import * as React from "react";
import Box from "@mui/material/Box";
import Popover from "@mui/material/Popover";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import "../Hero/style.css";
export default function PlanPopper({ placement }) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        onClick={handleClick}
        className="link"
        sx={{ my: "16px", zIndex: "64" }}
      >
        Plans
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            p: 1,
            bgcolor: "background.paper",
            display: "flex",
            flexDirection: "column",
            padding: "20px",
          }}
        >
          <Button
            onClick={() => navigate("/plans/diabetes-plans")}
            className="link"
          >
            Diabetes Plans
          </Button>
          <Button
            onClick={() => navigate("/plans/cancer-plans")}
            className="link"
          >
            Cancer Plans
          </Button>
          <Button
            onClick={() => navigate("/plans/gynaec-plans")}
            className="link"
          >
            Gynaec Plans
          </Button>
        </Box>
      </Popover>
    </>
  );
}
