import { gql, useMutation } from "@apollo/client";
import React, { useState } from "react";
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
  [key: string]: string;
}

export const AddDish = () => {
  const { id } = useParams<IParams>();
  const history = useHistory();
  const [createDishMutation, { loading }] = useMutation<createDish, createDishVariables>(
    CREATE_DISH_MUTATION,
    { refetchQueries: [{ query: MY_RESTAURANT_QUERY, variables: { input: { id: +id } } }] }
  );
  const { register, formState, getValues, handleSubmit, setValue } = useForm<IForm>({
    mode: "onChange",
  });

  const onSubmit = () => {
    const { name, price, description, ...rest } = getValues();
    const optionsObjects = optionsNumber.map((theId) => ({
      name: rest[theId + "-optionName"],
      extra: +rest[theId + "-optionExtra"],
    }));
    console.log(optionsObjects);

    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +id,
          options: optionsObjects,
        },
      },
    });
    history.goBack();
  };

  const [optionsNumber, setOptionsNumber] = useState<number[]>([]);
  const onAddOptionClick = () => {
    setOptionsNumber((current) => [Date.now(), ...current]);
  };
  const onDeleteClick = (idToDelete: number) => {
    setOptionsNumber((current) => current.filter((id) => id !== idToDelete));
    setValue(`${idToDelete}-optionName`, "");
    setValue(`${idToDelete}-optionExtra`, "");
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
        <div className="my-10">
          <h4 className="font-medium  mb-3 text-lg">Dish Options</h4>
          <span
            onClick={onAddOptionClick}
            className="cursor-pointer text-white bg-gray-900 py-1 px-2 mt-5 bg-"
          >
            Add Dish Option
          </span>
          {optionsNumber.length !== 0 &&
            Array.from(optionsNumber).map((id) => (
              <div key={id} className="mt-5">
                <input
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2 mr-3"
                  type="text"
                  ref={register}
                  name={`${id}-optionName`}
                  placeholder="Option Name"
                />
                <input
                  className="py-2 px-4 focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  ref={register}
                  name={`${id}-optionExtra`}
                  placeholder="Option Extra"
                  min={0}
                />
                <span
                  className="cursor-pointer text-white bg-red-500 ml-3 py-3 px-4 mt-5 bg-"
                  onClick={() => onDeleteClick(id)}
                >
                  delete
                </span>
              </div>
            ))}
        </div>
        <Button loading={loading} canClick={formState.isValid} actionText="Create Dish" />
      </form>
    </div>
  );
};
