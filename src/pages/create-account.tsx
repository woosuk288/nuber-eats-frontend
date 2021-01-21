import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";

import nuberLogo from "../images/eats-logo.svg";
import { Helmet } from "react-helmet-async";
import { Button } from "../components/button";
import { Link, useHistory } from "react-router-dom";
import { UserRole } from "../__generated__/globalTypes";
import {
  CreateAccountnMutation,
  CreateAccountnMutationVariables,
} from "../__generated__/CreateAccountnMutation";

export const CREATE_ACCOUNT_MUTATION = gql`
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

  const history = useHistory();
  const onCompleted = (data: CreateAccountnMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("Account Created! Log in now!");
      history.push("/");
    }
  };

  const [createAccountMutation, { data: createAccountMutaionResult, loading }] = useMutation<
    CreateAccountnMutation,
    CreateAccountnMutationVariables
  >(CREATE_ACCOUNT_MUTATION, { onCompleted });

  const onSubmit = () => {
    if (!loading) {
      const { email, password, role } = getValues();
      createAccountMutation({ variables: { createAccountInput: { email, password, role } } });
    }
  };

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
            ref={register({
              required: "Email is required",
              pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
            name="email"
            placeholder="Email"
            type="email"
            required
            className="input"
          />
          {errors.email?.message && <FormError errorMessage={errors.email.message} />}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage={"Please enter a valid email"} />
          )}
          <input
            ref={register({ required: "Password is required", minLength: 5 })}
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
          {createAccountMutaionResult?.createAccount.error && (
            <FormError errorMessage={createAccountMutaionResult.createAccount.error} />
          )}
        </form>
        <div>
          Alreay have an account?{" "}
          <Link to="/" className="text-lime-600 hover:underline">
            Log in now
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}
