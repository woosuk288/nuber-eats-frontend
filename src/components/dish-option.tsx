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
      className={`flex border items-center ${isOptionSelected && "border-gray-800"}`}
      onClick={handleClick}
    >
      <h6 className="mr-2">{name}</h6>
      <h6 className="text-sm opacity-75">(₩{extra})</h6>
    </span>
  );
};
