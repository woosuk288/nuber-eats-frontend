import React from "react";

interface IDishOptionProps {
  dishId: number;
  name: string;
  extra?: number | null;
  isOptionSelected: boolean;
  addOptionToItem: (dishId: number, option: string) => void;
  removeOptionFromItem: (dishId: number, option: string) => void;
}

export const DishOption = ({
  dishId,
  name,
  extra,
  isOptionSelected,
  addOptionToItem,
  removeOptionFromItem,
}: IDishOptionProps) => {
  const handleClick = () => {
    if (isOptionSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOptionToItem(dishId, name);
    }
  };

  return (
    <span
      className={`border px-2 py-1 ${
        isOptionSelected ? "border-gray-800 bg-lime-300" : "hover:border-gray-800"
      }`}
      onClick={handleClick}
    >
      <span className="mr-2">{name}</span>
      {<span className="text-sm opacity-75">(${extra})</span>}
    </span>
  );
};
