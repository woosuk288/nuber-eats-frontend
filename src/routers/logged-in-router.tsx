import React from "react";
import { isLoggedInVar } from "../apollo";

export default function LoggedInRouter() {
  return (
    <div>
      <h1>Logged In</h1>
      <button onClick={() => isLoggedInVar(true)}>LogOut</button>
    </div>
  );
}
