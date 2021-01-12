import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";

const LOGIN_MUTATION = gql`
  mutation loginMutation($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface ILoginForm {
  email: string;
  password: string;
}

export default function Login() {
  const { register, getValues, errors, handleSubmit } = useForm<ILoginForm>();

  const onCompleted = (data: loginMutation) => {
    const {
      login: { error, ok, token },
    } = data;
    if (ok) {
      console.log(token);
    }
  };

  const [loginMutation, { data: loginMutaionResult, loading }] = useMutation<
    loginMutation,
    loginMutationVariables
  >(LOGIN_MUTATION, { onCompleted });

  const onSubmit = () => {
    if (!loading) {
      const { email, password } = getValues();
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
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
          {errors.email?.message && <FormError errorMessage={errors.email.message} />}

          <input
            ref={register({ required: "Password is required", minLength: 8 })}
            name="password"
            placeholder="Password"
            type="password"
            required
            className="input"
          />
          {errors.password?.message && <FormError errorMessage={errors.password.message} />}

          {errors.password?.type === "minLength" && (
            <FormError errorMessage="Password must be more than 10 chars." />
          )}

          <button className="btn">{loading ? "Loading..." : "Login"}</button>
          {loginMutaionResult?.login.error && (
            <FormError errorMessage={loginMutaionResult.login.error} />
          )}
        </form>
      </div>
    </div>
  );
}
