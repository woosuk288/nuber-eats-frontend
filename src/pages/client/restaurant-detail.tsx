import { gql, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { CreateOrderitemInput } from "../../__generated__/globalTypes";
import { restaurant, restaurantVariables } from "../../__generated__/restaurant";

const RESTAURANT_QUERY = gql`
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...DishParts
        }
      }
    }
  }
  ${RESTAURANT_FRAGMENT}
  ${DISH_FRAGMENT}
`;

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      ok
      error
    }
  }
`;

interface IRestaurantParams {
  id: string;
}

export default function RestaurantDetail() {
  const { id } = useParams<IRestaurantParams>();
  const { data: { restaurant } = {} } = useQuery<restaurant, restaurantVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +id,
        },
      },
    }
  );

  const [isOrderStarted, setIsOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderitemInput[]>();
  const triggerStartOrder = () => {
    setIsOrderStarted(true);
  };
  const addItemToOrder = (dishId: number) => {
    setOrderItems((current) => [{ dishId }]);
  };

  return (
    <div>
      <div
        className="bg-red-500 py-24 bg-center bg-cover"
        style={{ backgroundImage: `url(${restaurant?.restaurant?.coverImg})` }}
      >
        <div className="bg-white md:w-5/12 py-4 pl-5">
          <h4 className="text-4xl mb-3">{restaurant?.restaurant?.name}</h4>
          <h5 className="text-sm mb-2">{restaurant?.restaurant?.category?.name}</h5>
          <h6 className="text-sm">{restaurant?.restaurant?.address}</h6>
        </div>
      </div>
      <div className="container mt-20 pb-32 flex flex-col items-end">
        <button className="btn px-10" onClick={triggerStartOrder}>
          Start Order
        </button>
        <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
          {restaurant?.restaurant?.menu.map((dish) => (
            <Dish
              key={dish.id}
              id={dish.id}
              name={dish.name}
              price={dish.price}
              description={dish.description}
              isCustomer={true}
              isOrderStarted={isOrderStarted}
              options={dish.options}
              addItemToOrder={addItemToOrder}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
