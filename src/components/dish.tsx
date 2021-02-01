import React from "react";
import { restaurant_restaurant_restaurant_menu_options } from "../__generated__/restaurant";

interface IDishProps {
  id?: number;
  name: string;
  price: number;
  description: string;
  isCustomer?: boolean;
  isOrderStarted?: boolean;
  options?: restaurant_restaurant_restaurant_menu_options[] | null;
  addItemToOrder?: (dishId: number) => void;
}

export const Dish = ({
  id = 0,
  name,
  price,
  description,
  isCustomer = false,
  isOrderStarted = false,
  options,
  addItemToOrder,
}: IDishProps) => {
  console.log(options);
  return (
    <div
      className="cursor-pointer px-8 py-4 border hover:border-gray-800 transition-all"
      onClick={() => (isOrderStarted && addItemToOrder ? addItemToOrder(id) : null)}
    >
      <div className="mb-5">
        <h3 className="text-lg font-medium">{name}</h3>
        <h4 className="font-medium">{description}</h4>
      </div>
      <span>₩{price}</span>
      {isCustomer && options && (
        <div>
          <h5 className="mt-5 mb-3 font-medium">Dish Options:</h5>
          {options?.map((option, index) => (
            <span className="flex items-center" key={index}>
              <h6 className="mr-2">{option.name}</h6>
              <h6 className="text-sm opacity-75">(₩{option.extra})</h6>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};
