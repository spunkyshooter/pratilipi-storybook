import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PATHS from "./paths.json";
import ProtectedRoute from "./ProtectedRoute";
import ScrollToTop from "./ScrollToTop";
// import NavBar from "Components/Navbar";
import Landing from "Pages/Landing";
import Auth from "Pages/Auth";
import Blogs from "Pages/Blogs";
import Blog from "Pages/Blog";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Switch>
        <Route path={PATHS.auth} children={<Auth />} />
        <ProtectedRoute exact path={PATHS.blog + "/:slug"} component={Blog} />
        <ProtectedRoute exact path={PATHS.blogs} component={Blogs} />
        <Route path="/" children={<Landing />} />
      </Switch>
    </BrowserRouter>
  );
};

export default AppRouter;
