import React from "react";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ component: Component, componentProps, ...rest }) => {
  const isAuthenticated = localStorage.getItem("token") !== null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          <Component {...{ ...props, ...componentProps }} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};
export default ProtectedRoute;
