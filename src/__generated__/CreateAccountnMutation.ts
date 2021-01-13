/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { CreateAccountInput } from "./globalTypes";

// ====================================================
// GraphQL mutation operation: CreateAccountnMutation
// ====================================================

export interface CreateAccountnMutation_createAccount {
  __typename: "CreateAccountOutput";
  ok: boolean;
  error: string | null;
}

export interface CreateAccountnMutation {
  createAccount: CreateAccountnMutation_createAccount;
}

export interface CreateAccountnMutationVariables {
  createAccountInput: CreateAccountInput;
}
