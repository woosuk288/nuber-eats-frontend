import React from "react";
import { useForm } from "react-hook-form";
import { isLoggedInVar } from "../apollo";

export default function LoggedOutRouter() {
  const { register, watch, handleSubmit, errors } = useForm();
  // console.log(watch());

  const onSubmit = () => {
    console.log(watch("email"));
  };

  const onInvalid = () => {
    console.log("cant' create account");
  };
  console.log(errors);

  return (
    <div>
      <h1>Logged Out</h1>
      <button onClick={() => isLoggedInVar(false)}>LogIn</button>
      <form onSubmit={handleSubmit(onSubmit, onInvalid)}>
        <div>
          <input
            ref={register({
              required: "This is required",
              validate: (email: string) => email.includes("@gmail.com"),
              // pattern: /^[A-Za-z0-9._%+-]+@gmail.com$/,
            })}
            type="email"
            name="email"
            required
            placeholder="email"
          />
        </div>
        <div>
          <input
            ref={register({ required: true })}
            type="password"
            name="password"
            required
            placeholder="password"
          />
        </div>
        <button type="submit" className="bg-yellow-500">
          submit
        </button>
      </form>
    </div>
  );
}
