
/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, StyledEngineProvider } from "@mui/material/styles";
import Script from "next/script";
import { useEffect } from "react";
import { IntlProvider } from "react-intl";
// import '../helpers/Firebase';
import SnackbarProvider from 'react-simple-snackbar';
import "../../public/static/assets/fonts/iconsmind-s/css/iconsminds.css";
import "../../public/static/assets/fonts/simple-line-icons/css/simple-line-icons.css";
import { getDirection } from "../helpers/Utils";
import AppLocale from "../lang";

// import "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css";
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-circular-progressbar/dist/styles.css";
import "react-image-lightbox/style.css";
import "react-perfect-scrollbar/dist/css/styles.css";
import "video.js/dist/video-js.css";
import "../../styles/css/vendor/bootstrap.min.css";
import "../../styles/css/vendor/bootstrap.rtl.only.min.css";
import "../../styles/globals.css";
config.autoAddCss = false

// import "../../styles/dashboard.scss";
import { NotificationContainer } from "../components/common/react-notifications";

import { SessionProvider } from "next-auth/react";
import { Provider as ReduxProvider } from "react-redux";
import "../../styles/dashboard.scss";
import { store, wrapper } from "../redux/store";
export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#1c9bf3",
    },
    secondary: {
      main: "#f50057",
    },
  },
  props: {
    MuiTooltip: {
      arrow: true,
    },
    MuiButton: {
      size: "small",
    },
    MuiButtonGroup: {
      size: "small",
    },
    MuiCheckbox: {
      size: "small",
    },
    MuiFab: {
      size: "small",
    },
    MuiFormControl: {
      margin: "dense",
      size: "small",
    },
    MuiFormHelperText: {
      margin: "dense",
    },
    MuiIconButton: {
      size: "small",
    },
    MuiInputBase: {
      margin: "dense",
    },
    MuiInputLabel: {
      margin: "dense",
    },
    MuiRadio: {
      size: "small",
    },
    MuiSwitch: {
      size: "small",
    },
    MuiTextField: {
      margin: "dense",
      size: "small",
    },
  },
  typography: {
    fontFamily: "Lato",
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    button: {
      textTransform: "none",
    },
    fontSize: 12,
  },
});

function MyApp({ locale, Component, pageProps: { session, ...pageProps } }) {
  // let persistor = persistStore(store);
  const direction = getDirection();
  const currentAppLocale = AppLocale[locale];
  useEffect(() => {
    if (direction.isRtl) {
      document.body.classList.add("rtl");
      document.body.classList.remove("ltr");
    } else {
      document.body.classList.add("ltr");
      document.body.classList.remove("rtl");
    }
  }, [direction]);
  // basePath="user/api/auth"
  return (
    <SessionProvider session={session} >
      <ReduxProvider store={store}>
        {/* <PersistGate persistor={persistor}> */}
        <IntlProvider
          locale={currentAppLocale?.locale}
          messages={currentAppLocale?.messages}
        >
          <SnackbarProvider>
            <NotificationContainer />
            {/* {isMultiColorActive && <ColorSwitcher />} */}
            <StyledEngineProvider injectFirst>
              {/* <ThemeProvider theme={theme}> */}
              <CssBaseline />
              <Script
                id="GoogsignInIsSuccessleApi"
                src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCVuSbXdFA0crtJlq1Rr-xOIq114425rZE&v=3.31exp&libraries=geometry,drawing,places"
                onLoad={(e) => {
                  // setStripe({ stripe: window.Stripe('pk_test_12345') })
                }}
                strategy="beforeInteractive"
                onError={(e) => {
                  console.error("Script failed to load", e);
                }}
              />
              <Component {...pageProps} />
            </StyledEngineProvider>
          </SnackbarProvider>
        </IntlProvider>
        {/* </PersistGate> */}
      </ReduxProvider>
    </SessionProvider>
  );
}

const mapStateToProps = ({ authUser, settings }) => {
  const { currentUser } = authUser;
  const { locale } = settings;
  return { currentUser, locale };
};
const mapActionsToProps = {};

export default wrapper.withRedux(MyApp);
