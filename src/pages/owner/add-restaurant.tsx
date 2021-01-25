import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { createRestaurant, createRestaurantVariables } from "../../__generated__/createRestaurant";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
    }
  }
`;

interface IFormProps {
  name: string;
  address: string;
  categoryName: string;
}

export const AddRestaurant = () => {
  const [createRestaurantMutation, { loading, data }] = useMutation<
    createRestaurant,
    createRestaurantVariables
  >(CREATE_RESTAURANT_MUTATION);
  const { register, getValues, formState, errors, handleSubmit } = useForm<IFormProps>({
    mode: "onChange",
  });
  const onSubmit = () => {
    console.log(getValues());
  };

  return (
    <div className="container">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <h1>Add Restaurant</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="input"
          name="name"
          placeholder="Name"
          ref={register({ required: "Name is required" })}
        />
        <input
          type="text"
          className="input"
          name="address"
          placeholder="Address"
          ref={register({ required: "Address is required" })}
        />
        <input
          type="text"
          className="input"
          name="categoryName"
          placeholder="Category Name"
          ref={register({ required: "Category Name is required" })}
        />
        <Button loading={loading} canClick={formState.isValid} actionText="Create Restaurant" />
      </form>
    </div>
  );
};
