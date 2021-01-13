import { ApolloError, gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";

import nuberLogo from "../images/eats-logo.svg";
import Helmet from "react-helmet";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { UserRole } from "../__generated__/globalTypes";
import { watch } from "fs";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccountnMutation($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface ICreateAccountForm {
  email: string;
  password: string;
  role: UserRole;
}

export default function CreateAccount() {
  const {
    register,
    getValues,
    errors,
    handleSubmit,
    formState,
    watch,
  } = useForm<ICreateAccountForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const [createAccountMutation, { data: createAccountMutaionResult, loading }] = useMutation(
    CREATE_ACCOUNT_MUTATION
  );

  const onSubmit = () => {};
  console.log(watch());

  return (
    <div className="h-screen flex items-center flex-col mt-10 lg:mt-28">
      <Helmet>
        <title>Create Account | Nuber Eats</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center">
        <img src={nuberLogo} alt="logo" className="w-52  mb-5 " />
        <h4 className="w-full font-medium text-left text-3xl mb-5 px-5">Let's get started</h4>
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
          <select ref={register({ required: true })} name="role" id="">
            {Object.keys(UserRole).map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
          <Button
            canClick={formState.isValid}
            loading={loading}
            actionText="Create Account"
          ></Button>
          {createAccountMutaionResult?.login.error && (
            <FormError errorMessage={createAccountMutaionResult.login.error} />
          )}
        </form>
        <div>
          Alreay have an account?{" "}
          <Link to="/login" className="text-lime-600 hover:underline">
            Log in now
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}
