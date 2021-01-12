import React from "react";
import { useForm } from "react-hook-form";

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>();

  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-800">
      <div className="bg-white w-full max-w-lg py-10 rounded-lg text-center">
        <h3 className="text-2xl text-gray-800">Log In</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 px-5">
          <input
            ref={register({ required: "Email is required" })}
            name="email"
            placeholder="Email"
            type="email"
            required
            className="input"
          />
          {errors.email?.message && (
            <span className="font-medium text-red-500">{errors.email.message}</span>
          )}

          <input
            ref={register({ required: "Password is required", minLength: 10 })}
            name="password"
            placeholder="Password"
            type="password"
            required
            className="input"
          />
          {errors.password?.message && (
            <span className="font-medium text-red-500">{errors.password.message}</span>
          )}
          {errors.password?.type === "minLength" && (
            <span className="font-medium text-red-500">Password must be more than 10 chars.</span>
          )}
          <button className="btn">Login</button>
        </form>
      </div>
    </div>
  );
}
