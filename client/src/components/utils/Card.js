import React from "react";
import { Container, Box } from "@mui/material";
const Card = ({ children }) => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        maxWidth: "100vw !important",
      }}
    >
      <Box
        sx={{
          padding: "30px",
          boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
          ":hover": {
            boxShadow:
              "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
          },
          width: "360px",
        }}
      >
        {children}
      </Box>
    </Container>
  );
};

export default Card;
