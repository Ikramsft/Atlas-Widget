import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Button, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";
import React from "react";
import Logo from "../../../components/Logo";
import { STRING } from "../../../lib/constants";
import styles from "./auth.module.css";

const AuthLayout = React.forwardRef(({ type, placeholder, ...props }, ref) => {
  return (
    <Grid
      container
      sx={{ backgroundColor: "#fff" }}
      className={styles["signin-container"]}
    >
      <Grid
        container
        item
        direction="column"
        xs={12}
        md={6}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        className={styles["signin-form-container"]}
        p={5}
      >
        <Grid
          container
          direction="column"
          textAlign="left"
          className={styles["signin-form"]}
        >
          <Grid item mb={5} sx={{ marginBottom: "10px", textAlign: 'center' }}>
            <Logo color="#fff" />
          </Grid>
          {props.children}
        </Grid>
      </Grid>
      <Grid
        container
        item
        direction="row"
        xs={12}
        md={6}
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        className={styles["signin-banner-container"]}
        sx={{ display: { xs: "none", sm: "flex" } }}
        p={5}
      >
        <Grid container direction="column" className={styles["signin-banner"]}>
          <Grid item textAlign="left">
            <Card className={styles["lb-card"]} sx={{ fontFamily: " 'Nunito', sans-serif" }}>
              <CardContent>
                <Typography
                  variant="h6"
                  className={styles["lb-card-heading text-white"]}
                >
                  {STRING.LGN_LBC_HEADING}
                </Typography>
                <Typography
                  sx={{ fontSize: 14, fontFamily: " 'Nunito', sans-serif" }}
                  className={styles["lb-card-description text-white"]}
                >
                  {STRING.LGN_LBC_DESC}
                </Typography>{" "}
              </CardContent>
              <CardActions disableSpacing style={{ justifyContent: "right" }}>
                <Button
                  className={styles["lb-card-link "]}
                  endIcon={<ArrowForwardIcon />}
                >
                  {STRING.LGN_LBC_LINK_TXT}
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
});

export default AuthLayout;
