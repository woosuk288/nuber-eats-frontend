import React from "react";
import "./styles/styles.css";

import { ApolloProvider, useReactiveVar } from "@apollo/client";
import { client, isLoggedInVar } from "./apollo";
import LoggedOutRouter from "./routers/logged-out-router";
import LoggedInRouter from "./routers/logged-in-router";

function App() {
  const isLoggedIn = useReactiveVar(isLoggedInVar);
  console.log(isLoggedIn);

  return (
    <ApolloProvider client={client}>
      <div className="bg-red-300">
        <h1 className="text-xl text-white">Hello Tailwind</h1>
      </div>
      {isLoggedIn ? <LoggedInRouter /> : <LoggedOutRouter />}
    </ApolloProvider>
  );
}

export default App;
