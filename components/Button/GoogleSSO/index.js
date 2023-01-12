import React from "react";
import GoogleLogin from "react-google-login";
import { STRING } from "../../../lib/constants";
import styles from "./googlesso.module.css";

const GoogleSSO = React.forwardRef(({ type, placeholder, ...props }, ref) => {
  return (
    <>
      <GoogleLogin
        clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        onSuccess={props.success}
        onFailure={props.failure}
        cookiePolicy={"single_host_origin"}
        className={styles["google-sso"]}
        buttonText={STRING.GOOGLE_SSO}
      />
    </>
  );
});

export default GoogleSSO;
