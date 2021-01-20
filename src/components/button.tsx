import React from "react";

interface IButtonProps {
  canClick: boolean;
  loading: boolean;
  actionText: string;
}

export const Button = ({ canClick, loading, actionText }: IButtonProps) => (
  <button
    role="button"
    className={`text-white py-4  transition-colors ${
      canClick ? "bg-lime-600 hover:bg-lime-700" : "bg-gray-300 pointer-events-none"
    }`}
  >
    {loading ? "Loading..." : actionText}
  </button>
);
