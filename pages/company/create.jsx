import { Divider, Grid } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import TabViewCompany from "../../components/Field/Comapany/TabViewCompany";
import Logo from "../../components/Logo";
import SignupAppBar from "../../components/SignupAppBar";
const Create = () => {
  return (
    <>
      <Grid container direction="row" p={4}>
        <Grid item xs={12} md={8.7} margin="auto">
          <Link href={"/"}>
            <Logo />
          </Link>
        </Grid>
      </Grid>
      <Grid item mb={3}>
        <Divider />
      </Grid>
      <TabViewCompany />
    </>
  );
};

export default Create;
