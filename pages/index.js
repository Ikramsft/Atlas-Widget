import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button, Divider, Grid, Snackbar, Typography } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { getCsrfToken, signIn, useSession } from "next-auth/react";
import { useEffect } from 'react';

import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { sessionData } from "redux/dashboard/actions";
import Cookies from 'universal-cookie';
import { setValueToStorage } from 'utils';
import Email from "../components/Field/Email";
import Password from "../components/Field/Password";
import AuthLayout from "../components/Layout/Auth";
import { DEFAULT_ERR_DISPLAY_TIME, ERRORS, LABEL, LINKS, STRING } from "../lib/constants";
import { SigninFormSchema } from "../lib/validationSchema";
const cookies = new Cookies();

const SignIn = (props) => {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  // const [getDashboardData] = useGetDashboardDataMutation();
  // const [getReviews] = useGetReviewsMutation();
  const [reviewsData, setReviewsData] = useState([]);
  const [dashboardData, setDashboardData] = useState(null);
  const [currentPagination, onChangePage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [alert, setAlert] = useState();
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = () => {
    setState({ ...state, open: false });
  };

  const dispatch = useDispatch();
  const router = useRouter();

  /*If the api param exists then remove the userData from local storage and cookie and set the api value in cookie*/
  useEffect(() => {
    localStorage.removeItem("user");
    localStorage.removeItem("user_data");
    localStorage.removeItem("userData");
    cookies.remove("user");
    cookies.remove("user_data");
    cookies.remove("userData", { path: '/' });
    cookies.remove("userData", { path: '/reviews' });
    cookies.remove("api");
    cookies.set('reload', true)
    if (router.query.api) {
      cookies.set('api', router.query.api)
      localStorage.setItem('api', router.query.api)
    } else {
      cookies.remove('api', { path: '/' });
      localStorage.removeItem('api');
    }
  }, []);

  /*Form validation*/
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm({
    resolver: yupResolver(SigninFormSchema),
    mode: "onChange",
  });

  /*Sign in form submission*/
  const signInFormSubmission = async (signInFormData) => {
    setLoading(true)
    const api = cookies.get('api') == "live" ? "live" : "beta";
    const res = await signIn("credentials", {
      email: signInFormData.email,
      password: signInFormData.password,
      redirect: false,
      api: api
    });
    if (res.ok) {
      dispatch(sessionData(session))
      router.push(LINKS.DASHBOARD);
      setState({ ...state, open: true });
      setAlert("Logged In Successfully, Welcome!!!");
    } else if (res.error) {
      if (ERRORS[res.status]) {
        setLoading(false)
        setAlert(ERRORS[res.status]);
        setState({ ...state, open: true });
      } else {
        setAlert(res.error);
        setState({ ...state, open: true });
      }
      setLoading(false)
    }
  };



  useEffect(() => {
    if (session) {
      cookies.set('userData', session);
      if (typeof window !== 'undefined') {
        setValueToStorage('userData', JSON.stringify(session));
      }
    }
  }, [session]);


  /*Google SSO success*/
  const googleSSOSuccess = () => {
    console.log("Success");
  };

  /*Google SSO failure*/
  const googleSSOFailure = () => {
    console.log("Fail");
  };
  return (
    <AuthLayout>
      {/* <Grid item mb={3} sx={{ textAlign: "center" }}>
        <GoogleSSO success={googleSSOSuccess} failure={googleSSOFailure} />
      </Grid> */}
      {/* <Grid item mb={3}>
        <Divider className="text-black" sx={{ borderColor: "#333" }}>
          or
        </Divider>
      </Grid> */}
      <form onSubmit={handleSubmit(signInFormSubmission)}>
        <Grid item mb={3}>
          <Email
            {...register("email")}
            error={Boolean(errors.email)}
            helperText={(errors.email && errors.email.message)}
            onChange={(event) => {
              setValue("email", event.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
        </Grid>
        <Grid item mb={3} sx={{ position: "relative" }}>
          <Box sx={{ position: "absolute", right: "0", top: "-8px", zIndex: "11", fontWeight: "600", fontSize: "12px" }}>
            <Link href={LINKS.FORGOT_PASSWORD} >
              <a className="link-primary cursor-pointer" >
                {STRING.LGN_FRGT_PASSWORD}
              </a>
            </Link>
          </Box>
          <Password
            label={LABEL.PASSWORD}
            {...register("password")}
            error={Boolean(errors.password)}
            helperText={(errors.password && errors.password.message)}
            onChange={(event) => {
              setValue("password", event.target.value, {
                shouldValidate: true,
                shouldDirty: true,
              });
            }}
          />
        </Grid>
        <Grid container>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label={STRING.REMEMBER_ME}
            className="text-primary"
          />
        </Grid>
        <Grid container mb={3} sx={{ justifyContent: "space-between" }}>

          <Grid item>
            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || !isDirty || loading}
              sx={{ borderRadius: "50px" }}
              className="text-white btn-shadow btn-multiple-state  btn btn-primary btn-lg "
            >
              {loading ? STRING.LOADING : STRING.SIGNIN_BTN}
            </Button>
          </Grid>

        </Grid>
      </form>
      <Grid item mb={3}>
        <Divider className="text-black" sx={{ borderColor: "#333" }}>
          or
        </Divider>
      </Grid>
      <Grid item>

        <Typography component="span" >
          Not a member?  <Link href={LINKS.SIGNUP}><a className="link-primary cursor-pointer">{STRING.LGN_SIGNUP} </a></Link> now.
        </Typography>

      </Grid>
      <Snackbar
        autoHideDuration={DEFAULT_ERR_DISPLAY_TIME}
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={alert}
        key={vertical + horizontal}
      />
    </AuthLayout>
  );
};

export async function getServerSideProps(context) {
  const csrfToken = await getCsrfToken(context);
  return {
    props: {
      csrfToken: csrfToken || null,
    },
  };
}

export default SignIn;
