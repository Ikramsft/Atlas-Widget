import { Button, Grid, Snackbar, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import Logo from "components/Logo";
import StepOne from "components/signup/stepone";
import StepTwo from "components/signup/steptwo";
import { LINKS } from "lib/constants";
import Link from "next/link";
import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import styles from "../../../../styles/signup.module.css";
const steps = ["Create User", "Create Company"];
function SignupStepper(props) {
  const {
    signUpFormSubmission,
    isValid,
    isDirty,
    isCreateUserAccountSuccess,
    CreateUserAccountData,
    register,
    setValue,
    handleSubmit,
    errors,
    giveError,
    createAccountLoading,
    createCompanyStatus,
  } = props;
  const [activeStep, setActiveStep] = useState(0);
  const [snackbar, setSnackbar] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = snackbar;
  const handleClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const handleNext = () => {
    if (isValid || isDirty) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    } else {
      console.log("Signup stepper error-->", errors);
    }
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setActiveStep(0);
  };
  const handleSnackbar = (newState) => () => {
    setSnackbar({ open: true, ...newState });
  };
  useEffect(() => {
    if (isCreateUserAccountSuccess && CreateUserAccountData) {
      handleSnackbar({
        vertical: "top",
        horizontal: "center",
      });
    }
  }, [CreateUserAccountData, isCreateUserAccountSuccess]);
  return (
    <Grid
      container
      className={`${styles["signup-container"]}`}
      direction="column"
    >
      <Grid
        container
        direction="column"
        className={`${styles["signup-form-container"]}`}
        alignItems="center"
      >
        <Grid item sx={{ marginTop: 6 }} xs={12}>
          <Link href={LINKS.SIGNIN}>
            <a className="">
              <Logo color="#333" />
            </a>
          </Link>
        </Grid>
        <Grid item xs={12} className={`${styles["signup-form"]}`} px={5} py={5}>
          <Grid item xs={12}>
            <Card>
              <CardTitle className="text-center pt-4 mb-0 position-relative">
                <Box sx={{ position: "absolute", top: "50%" }}>
                  <Link href={LINKS.SIGNIN}>
                    <a className="">
                      <i className="simple-icon-arrow-left ml-4 icon-size-md float-left cursor-pointer"></i>
                    </a>
                  </Link>
                </Box>
                <span>Create Account</span>
              </CardTitle>
              <CardBody className="rounded-2">
                <Stepper
                  activeStep={activeStep}
                  className=" mb-4"
                  alternativeLabel
                >
                  {steps.map((label) => {
                    const stepProps = {};
                    const labelProps = {};
                    return (
                      <Step key={label} {...stepProps}>
                        <StepLabel
                          {...labelProps}
                          sx={{
                            "& > span, & span.css-qivjh0-MuiStepLabel-label.Mui-completed":
                              { color: "#666" },
                            "& span.css-qivjh0-MuiStepLabel-label.Mui-active": {
                              color: "#000",
                            },
                          }}
                        >
                          {label}
                        </StepLabel>
                      </Step>
                    );
                  })}
                </Stepper>
                {activeStep === steps.length ? (
                  <React.Fragment>
                    <Typography sx={{ mt: 2, mb: 1 }}>
                      Registration completed - you&apos;re finished
                    </Typography>
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Link href={LINKS.SIGNIN}>Login</Link>
                    </Box>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {activeStep === 0 ? (
                      <StepOne
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        giveError={giveError}
                      />
                    ) : activeStep === 1 ? (
                      <StepTwo
                        register={register}
                        setValue={setValue}
                        errors={errors}
                        giveError={giveError}
                      />
                    ) : null}
                    <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
                      <Button
                        type="Button"
                        variant="contained"
                        className="btn btn-info"
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        style={{
                          mr: 1,
                          display: activeStep === 0 ? "none" : "flex",
                          alignItems: "center",
                          lineHeight: 1,
                        }}
                      >
                        <span>
                          <i className="simple-icon-arrow-left"></i>
                        </span>
                        <span style={{ marginBottom: "2px" }}>Back</span>
                      </Button>
                      <Box sx={{ flex: "1 1 auto" }} />
                      <Button
                        type={"submit"}
                        variant="contained"
                        className="btn btn-primary"
                        disabled={!isValid || !isDirty || createAccountLoading}
                        onClick={
                          activeStep === steps.length - 1
                            ? handleSubmit(signUpFormSubmission)
                            : handleNext
                        }
                      >
                        {activeStep === steps.length - 1 ? "Signup" : "Next"}
                      </Button>
                    </Box>
                  </React.Fragment>
                )}
              </CardBody>
            </Card>
          </Grid>
        </Grid>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Registration completed. Please verify your email "
        key={vertical + horizontal}
      />
    </Grid>
  );
}

export default SignupStepper;
