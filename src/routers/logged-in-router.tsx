import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Header from "../components/header";
import { useMe } from "../hooks/useMe";
import { NotFound } from "../pages/404";
import Restaurants from "../pages/client/restaurants";
import ConfirmEmail from "../pages/user/confirm-email";

const ClientRoutes = [
  <Route path="/" exact>
    <Restaurants />
  </Route>,
  <Route path="/confirm" exact>
    <ConfirmEmail />
  </Route>,
];

export default function LoggedInRouter() {
  const { data, loading, error } = useMe();

  console.log(data);

  if (!data || loading || error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="font-medium text-xl tracking-wide">Loading...</span>
      </div>
    );
  }

  return (
    <Router>
      <Header />
      <Switch>
        {data.me.role === "Client" && ClientRoutes}
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}
