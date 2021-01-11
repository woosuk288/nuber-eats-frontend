import React from "react";
import { isLoggedInVar } from "../apollo";

export default function LoggedOutRouter() {
  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={() => isLoggedInVar(false)}>LogIn</button>
    </div>
  );
}
