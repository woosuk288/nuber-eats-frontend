import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateAccount from "../pages/create-account";
import Login from "../pages/login";

export default function LoggedOutRouter() {
  return (
    <Router>
      <Switch>
        <Route path="/create-account">
          <CreateAccount />
        </Route>
        <Route path="/">
          <Login />
        </Route>
      </Switch>
    </Router>
  );
}
