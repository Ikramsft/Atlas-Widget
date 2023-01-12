import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Email from "../../components/Field/Email";
import AuthLayout from "../../components/Layout/Auth";
import { LINKS, STRING } from "../../lib/constants";
import { forgetPasswordSchema } from "../../lib/validationSchema";
import { useForgetPasswordMutation } from "../../services/userApi";
import { theme } from "../_app";

function ForgetPassword(props) {
  const [
    forgetPasswordParam,
    {
      isLoading: forgetPasswordIsLoading,
      data: forgetPasswordData,
      status: forgetPasswordStatus,
      error: forgetPasswordError,
      isError: forgetPasswordIsError,
      isSuccess: forgetPasswordIsSuccess,
    },
  ] = useForgetPasswordMutation();

  const router = useRouter();

  /*Form validation*/
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(forgetPasswordSchema),
    mode: "onChange",
  });
  /*Sign in form submission*/
  const signInFormSubmission = async (signInFormData) => {
    const signInApiResp = await forgetPasswordParam({
      email: signInFormData.email,
    });
  };
  const [successMessage, setSuccessMessage] = useState();
  /*Successful signin*/
  useEffect(() => {
    if (forgetPasswordData) {
      if (forgetPasswordData?.result && forgetPasswordData?.result?.success) {
        // router.push(LINKS.DASHBOARD);
        // setSuccessMessage("Email sent successfully")
      }
    }
  }, [forgetPasswordData]);

  /*Unsuccessful signin*/
  useEffect(() => {
    if (forgetPasswordIsError) {
      if (forgetPasswordIsError?.data?.errors) {
        alert(forgetPasswordIsError.data.errors[0]);
      } else {
        alert(STRING.DEF_ERR);
      }
    }
  }, [forgetPasswordIsError]);

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(signInFormSubmission)} className="position-relative">
        <Box sx={{ position: "absolute", top: "-50px", left: "-20px", zIndex: "11" }}>
          <Link href={LINKS.SIGNIN}>
            <a className="">
              <i className="simple-icon-arrow-left ml-4 icon-size-md float-left cursor-pointer"></i>
            </a>
          </Link>
        </Box>
        <Grid item mb={3}>
          <Email
            {...register("email")}
            error={
              Boolean(errors.email) ||
              Boolean(forgetPasswordIsError?.data?.errors?.email)
            }
            helperText={
              (errors.email && errors.email.message) ||
              forgetPasswordIsError?.data?.errors?.email
            }
            onChange={(event) => {
              setValue("email", event.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
          {forgetPasswordIsSuccess && (
            <Typography color={theme.palette.primary.main} sx={{ my: 1 }}>
              An email has been sent to you to reset the password
            </Typography>
          )}
        </Grid>
        <Grid container mb={3}>
          <Grid item>
            <Button
              type="submit"
              className="btn btn-primary"
              variant="contained"
              style={{ color: "#ffffff", borderRadius: "50px" }}
              disabled={!isValid || !isDirty || forgetPasswordIsLoading}
            >
              {forgetPasswordIsLoading ? STRING.LOADING : STRING.SND_MAIL}
            </Button>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
}

export default ForgetPassword;
