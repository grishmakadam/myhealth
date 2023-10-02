import React from "react";
import { Card, CardContent, Typography, Box,Button } from "@mui/material";

const CustomCard = ({ item }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "350px",
        height: "400px",
        background: "rgba(132,142,200,0.2)",
        ":hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 0,
          justifyContent:"space-between",
          height:"100%"
        }}
      >
        <Box
          sx={{
            width: "100%",
            backgroundColor: "#fff",
            display: "flex",
            justifyContent: "center",
            padding: "10px",
          }}
        >
          <img src={item.image} width="200px" height="200px" alt={item.title} />
        </Box>
        <Box sx={{padding:"10px"}}>
          <Typography variant="h5" textAlign="center">{item.title}</Typography>
          <Typography variant="body1" >{item.description}</Typography>
        </Box>

        <Button variant="contained" href={`/plans/${item.link}`}>View Plans</Button>
      </CardContent>
    </Card>
  );
};

export default CustomCard;
