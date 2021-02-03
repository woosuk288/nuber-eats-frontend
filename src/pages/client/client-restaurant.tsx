import { gql, useMutation, useQuery } from "@apollo/client";
import React, { useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Dish } from "../../components/dish";
import { DishOption } from "../../components/dish-option";
import { DISH_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { createOrder, createOrderVariables } from "../../__generated__/createOrder";
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
      orderId
    }
  }
`;

interface IRestaurantParams {
  id: string;
}

export default function ClientRestaurant() {
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
  const [orderItems, setOrderItems] = useState<CreateOrderitemInput[]>([]);
  const triggerStartOrder = () => {
    setIsOrderStarted(true);
  };
  const getItem = (dishId: number) => {
    return orderItems?.find((order) => order.dishId === dishId);
  };
  const isSelected = (dishId: number) => {
    return Boolean(getItem(dishId));
  };
  const addItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      return;
    }
    setOrderItems((current) => [{ dishId }, ...current]);
  };
  const removeFromOrder = (dishId: number) => {
    setOrderItems((current) => current.filter((order) => order.dishId !== dishId));
  };
  const addOptionToItem = (dishId: number, newOption: string) => {
    if (!isSelected(dishId)) {
      return;
    }

    const oldItem = getItem(dishId);
    const options = oldItem?.options
      ? [...oldItem?.options, { name: newOption }]
      : [{ name: newOption }];

    if (oldItem && options) {
      const hasOption = oldItem.options?.find((option) => option.name === newOption);

      if (!hasOption) {
        removeFromOrder(dishId);
        setOrderItems((current) => [{ dishId, options }, ...current]);
      }
    }
  };

  const removeOptionFromItem = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      removeFromOrder(dishId);
      setOrderItems((current) => [
        { dishId, options: item.options?.filter((option) => option.name !== optionName) },
        ...current,
      ]);
    }
  };

  const getOptionFromItem = (item: CreateOrderitemInput, optionName: string) => {
    return item.options?.find((option) => option.name === optionName);
  };

  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
    return false;
  };

  const triggerCancelOrder = () => {
    setIsOrderStarted(false);
    setOrderItems([]);
  };

  const history = useHistory();
  const onCompleted = (data: createOrder) => {
    const {
      createOrder: { ok, orderId },
    } = data;
    if (data.createOrder.ok) {
      history.push(`/orders/${orderId}`);
    }
  };

  const [createOrderMutation, { loading: placingOrder }] = useMutation<
    createOrder,
    createOrderVariables
  >(CREATE_ORDER_MUTATION, {
    onCompleted,
  });

  const triggerConfirmOrder = () => {
    if (orderItems.length === 0) {
      alert("Can't place empty order");
      return;
    }
    const ok = window.confirm("You are about to place an order");
    if (ok) {
      createOrderMutation({
        variables: {
          input: {
            restaurantId: +id,
            items: orderItems,
          },
        },
      });
    }
  };

  console.log(orderItems);

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
        {isOrderStarted ? (
          <div>
            <button className="btn px-10 mr-3" onClick={triggerConfirmOrder}>
              Confirm Order
            </button>
            <button className="btn px-10 bg-black hover:bg-black" onClick={triggerCancelOrder}>
              Cancle Order
            </button>
          </div>
        ) : (
          <button className="btn px-10" onClick={triggerStartOrder}>
            Start Order
          </button>
        )}

        <div className="w-full grid mt-16 md:grid-cols-3 gap-x-5 gap-y-10">
          {restaurant?.restaurant?.menu.map((dish) => (
            <Dish
              isSelected={isSelected(dish.id)}
              key={dish.id}
              id={dish.id}
              name={dish.name}
              price={dish.price}
              description={dish.description}
              isCustomer={true}
              isOrderStarted={isOrderStarted}
              options={dish.options}
              addItemToOrder={addItemToOrder}
              removeFromOrder={removeFromOrder}
            >
              {dish.options?.map((option, index) => (
                <DishOption
                  key={index}
                  dishId={dish.id}
                  name={option.name}
                  extra={option.extra}
                  isOptionSelected={isOptionSelected(dish.id, option.name)}
                  addOptionToItem={addOptionToItem}
                  removeOptionFromItem={removeOptionFromItem}
                />
              ))}
            </Dish>
          ))}
        </div>
      </div>
    </div>
  );
}
