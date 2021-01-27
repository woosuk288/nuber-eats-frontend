import { gql, useMutation } from "@apollo/client";
import React from "react";
import { useParams } from "react-router-dom";

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

interface IParams {
  id: string;
}

export const AddDish = () => {
  const params = useParams<IParams>();
  const [createDishMutation, {}] = useMutation(CREATE_DISH_MUTATION);
  return <div></div>;
};
