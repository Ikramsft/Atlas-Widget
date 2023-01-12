import { Grid } from "@mui/material";
import React from "react";
import Logo from "../Logo";

const SignupAppBar = React.forwardRef(
  ({ type, placeholder, ...props }, ref) => {
    return (
      <Grid container direction="row" p={2} sx={{ backgroundColor: "#093e60" }}>
        <Grid item xs={12} md={8.7} margin="auto">
          <Logo />
        </Grid>
      </Grid>
    );
  }
);

export default SignupAppBar;
