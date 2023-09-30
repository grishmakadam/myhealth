import React from "react";
import { Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import { plans } from "../dummy/plans";
import CustomCard from "../utils/CustomCard";
const SpecificPlans = () => {
  const { type } = useParams();

  return (
    <Grid container>
      {plans[`${type}`].map((item) => (
          <Grid item>
              <CustomCard item={item} />
        </Grid>
      ))}
    </Grid>
  );
};

export default SpecificPlans;
