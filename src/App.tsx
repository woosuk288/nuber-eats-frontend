import React from "react";
import "./styles/styles.css";

import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, isLoggedInVar } from "./apollo";
import LoggedOutRouter from "./routers/logged-out-router";
import LoggedInRouter from "./routers/logged-in-router";
import { HelmetProvider } from "react-helmet-async";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log(isLoggedIn);

  return (
    <React.StrictMode>
      <ApolloProvider client={client}>
        <HelmetProvider>{isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}</HelmetProvider>
      </ApolloProvider>
    </React.StrictMode>
  );
}

export default App;
