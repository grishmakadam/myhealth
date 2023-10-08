import { Grid, InputLabel, TextField, FormHelperText } from "@mui/material";
import React from "react";

const Input = (props) => {
  return (
    <Grid item marginBottom="10px" {...props.sx}>
      <InputLabel
        htmlFor={props.name}
        sx={{
          marginBottom: "5px",
          fontSize: "14px",
          color: "primary",
        }}
      >
        {props.label}
      </InputLabel>
      <TextField
        variant="outlined"
        sx={{ width: { lg: "300px" } }}
        fullWidth
        size="small"
        InputLabelProps={{ shrink: false }}
        {...props}
        label={false}
      />
      <FormHelperText
        error={props.error}
        sx={{ wordWrap: "break-word", wordBreak: "break-all" }}
      >
        {typeof props._helperText == "string" &&
          props._helperText.split("*").map((x) => <div>*{x}</div>)}
      </FormHelperText>
    </Grid>
  );
};

export default Input;
