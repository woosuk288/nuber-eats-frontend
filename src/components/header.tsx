import React from "react";
import nuberLogo from "../images/eats-logo.svg";

export default function Header() {
  return (
    <header className="py-4">
      <div className="w-full max-w-screen-xl mx-auto">
        <img src={nuberLogo} alt="Nuber Eats" className="w-40 mb-10" />
        I'm the header'
      </div>
    </header>
  );
}
