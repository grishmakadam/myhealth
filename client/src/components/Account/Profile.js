import React from "react";
import { Grid, Typography, Box,Button } from "@mui/material";
import Input from "../utils/Input";
const Profile = () => {
  return (
    <form>
      <Box
        sx={{
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          marginX: "40px",
          paddingX: "6em",
          boxSizing: "border-box",
        }}
      >
        <Typography sx={{ marginY: "20px !important", textAlign: "center" }}>
          User Details
        </Typography>

        <Grid
          container
          justifyContent="space-evenly"
          gap={2}
          sx={{
            m: 0,
            p: "20px",
            boxShadow: "rgba(17, 17, 26, 0.1) 0px 0px 16px",
            ":hover": {
              boxShadow:
                "rgba(17, 17, 26, 0.1) 0px 1px 0px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 48px",
            },
          }}
        >
          <Grid container item flexDirection="column !important" md={5}>
            <Grid item sx={{ p: "0 !important", my: "20px" }}>
              {" "}
              <Typography>Personal Details</Typography>
            </Grid>
            <Grid item sx={{ p: "0 !important" }}></Grid>
            <Input
              label="Name"
              type="text"
              name="name"
              sx={{ p: "0 !important" }}
            />

            <Input
              label="Email"
              type="email"
              name="email"
              sx={{ p: "0 !important" }}
            />

            <Input
              label="Phone Number"
              type="text"
              name="number"
              sx={{ p: "0 !important" }}
            />
            <Input
              label="Date of Birth"
              type="date"
              name="dob"
              sx={{ p: "0 !important" }}
            />
          </Grid>
          <Grid container flexDirection="column" md={5}>
            <Grid item sx={{ p: "0 !important", my: "20px" }}>
              {" "}
              <Typography>Address Details</Typography>
            </Grid>
            <Grid item sx={{ p: "0 !important" }}></Grid>
            <Input
              label="Address"
              type="text"
              name="address"
              sx={{ p: "0 !important" }}
            />

            <Input
              label="City"
              type="text"
              name="city"
              sx={{ p: "0 !important" }}
            />

            <Input
              label="State"
              type="text"
              name="state"
              sx={{ p: "0 !important" }}
            />
            <Input
              label="Pincode"
              type="text"
              name="pincode"
              sx={{ p: "0 !important" }}
            />
          </Grid>
          <Grid item xs={10}><Button fullWidth>SUbmit</Button></Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default Profile;
