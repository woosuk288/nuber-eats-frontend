import React from "react";

interface IRestaurantProps {
  coverImg: string;
  name: string;
  categoryName?: string;
}

export default function Restaurant({ coverImg, name, categoryName }: IRestaurantProps) {
  return (
    <div className="flex flex-col">
      <div
        style={{ backgroundImage: `url(${coverImg})` }}
        className="py-24 bg-cover bg-center mb-3"
      ></div>
      <h3 className="text-lg font-medium">{name}</h3>
      <span className="border-t mt-4 py-2 text-xs opacity-50 border-gray-400">{categoryName}</span>
    </div>
  );
}
