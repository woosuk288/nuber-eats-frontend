import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { loginMutation, loginMutationVariables } from "../__generated__/loginMutation";
import nuberLogo from "../images/eats-logo.svg";
import Helmet from "react-helmet";
import { Button } from "../components/button";
import { Link } from "react-router-dom";

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
  const { register, getValues, errors, handleSubmit, formState } = useForm<ILoginForm>({
    mode: "onChange",
  });

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
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Login | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center">
        <img src={nuberLogo} alt="logo" className="w-52  mb-5" />
        <h4 className="w-full font-medium text-left text-3xl mb-5 px-5">Welcom back</h4>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mt-5 px-5 w-full mb-5">
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

          <Button canClick={formState.isValid} loading={loading} actionText="Log In"></Button>
          {loginMutaionResult?.login.error && (
            <FormError errorMessage={loginMutaionResult.login.error} />
          )}
        </form>
        <div>
          New to Nuber?{" "}
          <Link to="/create-account" className="text-lime-600 hover:underline">
            Create an Account
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}
