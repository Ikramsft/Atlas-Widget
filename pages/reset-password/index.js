import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Grid, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Password from "../../components/Field/Password";
import AuthLayout from "../../components/Layout/Auth";
import { LABEL, LINKS, STRING } from "../../lib/constants";
import {
  resetPasswordSchema,
  RstPassFormSchema,
} from "../../lib/validationSchema";
import { useResetPasswordMutation } from "../../services/userApi";
import { theme } from "../_app";

const ReserPassword = (props) => {
  const router = useRouter();
  const { id } = router.query;
  function reverseString(str) {
    return str.split("").reverse().join("");
  }
  const [userData, setUserData] = useState();
  // useEffect(()=>{},[])
  // useEffect(async () => {
  // }, [id])
  useEffect(() => {
    if (id) {
      const userObject = JSON.parse(atob(reverseString(id)));
      const { email, password } = userObject;
      setUserData(userObject);
      try {
        // await paramsUserLogin({ email, password });
      } catch (err) {
        console.error("Failed to save the post: ", err);
      }
    }
  }, [id]);
  const [
    resetPasswordParam,
    {
      isLoading: resetPasswordIsLoading,
      data: resetPasswordData,
      status: resetPasswordStatus,
      error: resetPasswordError,
      isError: resetPasswordIsError,
      isSuccess: resetPasswordIsSuccess,
      reset,
    },
  ] = useResetPasswordMutation();

  /*Form validation*/
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(RstPassFormSchema),
    mode: "onChange",
  });
  /*Sign in form submission*/
  const signInFormSubmission = async (signInFormData) => {
    const signInApiResp = await resetPasswordParam({
      ...userData,
      password: signInFormData.password,
    });
  };

  /*Successful signin*/
  useEffect(() => {
    if (resetPasswordData) {
      if (resetPasswordData?.result && resetPasswordData?.data?.access_token) {
        router.push(LINKS.DASHBOARD);
      }
    }
  }, [resetPasswordData, router]);

  /*Unsuccessful signin*/
  useEffect(() => {
    if (resetPasswordIsError) {
      if (resetPasswordIsError?.data?.errors) {
        // alert(resetPasswordIsError.data.errors[0]);
      } else {
        // alert(STRING.DEF_ERR);
      }
    }
  }, [resetPasswordIsError]);

  /*Google SSO success*/
  const googleSSOSuccess = () => {};

  /*Google SSO failure*/
  const googleSSOFailure = () => {};

  return (
    <AuthLayout>
      <form onSubmit={handleSubmit(signInFormSubmission)}>
        {/* <Grid item mb={3}>
          <Password
            {...register("password")}
            error={
              Boolean(errors.email) || Boolean(resetPasswordIsError?.data?.errors?.email)
            }
            helperText={
              (errors.email && errors.email.message) ||
              resetPasswordIsError?.data?.errors?.email
            }
            onChange={(event) => {
              setValue("password", event.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
        </Grid> */}
        <Grid item mb={3}>
          <Password
            label={LABEL.PASSWORD}
            {...register("password")}
            error={
              Boolean(errors.password) ||
              Boolean(resetPasswordError?.data?.error?.message)
            }
            helperText={
              (errors.password && errors.password.message) ||
              resetPasswordError?.data?.error?.message
            }
            onChange={(event) => {
              reset();
              setValue("password", event.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
          {resetPasswordIsSuccess && (
            <Typography color={theme.palette.primary.main} sx={{ my: 1 }}>
              Password changed successfully
            </Typography>
          )}
        </Grid>
        <Grid item mb={3}>
          <Password
            label={LABEL.RPT_PASSWORD}
            {...register("confirmPassword")}
            error={
              Boolean(errors.confirmPassword) ||
              Boolean(resetPasswordError?.data?.error?.message)
            }
            helperText={
              errors.confirmPassword && errors.confirmPassword.message
            }
            onChange={(event) => {
              reset();
              setValue("confirmPassword", event.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
          {resetPasswordIsSuccess && (
            <Typography color={theme.palette.primary.main} sx={{ my: 1 }}>
              Password changed successfully
            </Typography>
          )}
        </Grid>
        <Grid container mb={3}>
          <Grid item>
            <Button
              type="submit"
              variant="contained"
              style={{ color: "#ffffff" }}
              disabled={!isValid || !isDirty || resetPasswordIsLoading}
            >
              {resetPasswordIsLoading ? STRING.LOADING : STRING.SND_MAIL}
            </Button>
          </Grid>
        </Grid>
      </form>
      <Grid item>
        <Link href={LINKS.SIGNUP}>
          <Typography color={theme.palette.primary.main}>
            <a>{STRING.LGN_SIGNUP}</a>
          </Typography>
        </Link>
      </Grid>
    </AuthLayout>
  );
};

export default ReserPassword;
