import { isAuthGuardActive } from "constants/defaultValues";
import { Redirect, Route } from "react-router-dom";
import { getCurrentUser } from "./Utils";

const ProtectedRoute = ({
  component: Component,
  roles = undefined,
  ...rest
}) => {
  const setComponent = (props) => {
    if (isAuthGuardActive) {
      const currentUser = getCurrentUser();
      if (currentUser) {
        if (roles) {
          if (roles.includes(currentUser.role)) {
            return <Component {...props} />;
          }
          return (
            <Redirect
              href={{
                pathname: "/unauthorized",
                state: { from: props.location },
              }}
            />
          );
        }
        return <Component {...props} />;
      }
      return (
        <Redirect
          href={{
            pathname: "/user/login",
            state: { from: props.location },
          }}
        />
      );
    }
    return <Component {...props} />;
  };

  return <Route {...rest} render={setComponent} />;
};

// eslint-disable-next-line import/prefer-default-export
export { ProtectedRoute };
