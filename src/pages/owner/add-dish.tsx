import { gql, useMutation } from "@apollo/client";
import React from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { createDish, createDishVariables } from "../../__generated__/createDish";
import { MY_RESTAURANT_QUERY } from "./my-restaurant";

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

interface IForm {
  name: string;
  price: string;
  description: string;
}

export const AddDish = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const [createDishMutation, { data, loading }] = useMutation<createDish, createDishVariables>(
    CREATE_DISH_MUTATION,
    { refetchQueries: [{ query: MY_RESTAURANT_QUERY, variables: { input: { id: +id } } }] }
  );
  const { register, formState, getValues, handleSubmit } = useForm<IForm>({ mode: "onChange" });

  const onSubmit = () => {
    const { name, price, description } = getValues();
    console.log(description);
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +id,
        },
      },
    });
    history.goBack();
  };

  return (
    <div className="container flex flex-col items-center mt-52">
      <Helmet>
        <title>Add Restaurant | Nuber Eats</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
      >
        <input
          type="text"
          name="name"
          placeholder="Name"
          ref={register({ required: "Name is required" })}
          className="input"
        />
        <input
          type="number"
          className="input"
          name="price"
          min={0}
          placeholder="Price"
          ref={register({ required: "Price is required" })}
        />
        <input
          type="text"
          className="input"
          name="description"
          placeholder="Description"
          ref={register({ required: "Description is required" })}
        />
        <Button loading={loading} canClick={formState.isValid} actionText="Create Dish" />
      </form>
    </div>
  );
};
