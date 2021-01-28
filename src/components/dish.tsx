import React from "react";

interface IDishProps {
  name: string;
  price: number;
  description: string;
}

export const Dish = ({ name, price, description }: IDishProps) => {
  return (
    <div className="px-8 py-4 border hover:border-gray-800 transition-all">
      <div className="mb-5">
        <h3 className="text-lg font-medium">{name}</h3>
        <h4 className="font-medium">{price}</h4>
      </div>
      <span>{description}</span>
    </div>
  );
};
