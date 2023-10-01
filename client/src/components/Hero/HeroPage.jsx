import React from "react";
import { Grid, Typography, Button } from "@mui/material";
import "./style.css";
import CustomCard from "../utils/CustomCard";
import { data } from "../dummy/data";
const HeroPage = () => {
  return (
    <Grid container>
      <Grid
        item
        sx={{
          backgroundColor: "primary.main",
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          paddingX: "100px",
          paddingY: "50px",
          flexDirection: "column",
        }}
        className="header"
      >
        <Typography variant="h2" color="#fff" textAlign="center">
          Good Health Is The Root Of All Happiness
        </Typography>
        <Button variant="contained" sx={{ marginTop: "50px" }} href="#plans">
          View Plans
        </Button>
      </Grid>
      <Grid
        item
        id="plans"
        marginTop="30px"
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography variant="h5" color="secondary" textAlign="center" marginBottom="40px">
          Browse Through our Plans
        </Typography>
        <Grid
          container
          columnGap="40px"
          sx={{ display: "flex", justifyContent: "center" }}
        >
          {data.map((item) => (
            <Grid item key={item.title}>
              <CustomCard item={item} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeroPage;
