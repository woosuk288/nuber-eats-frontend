import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import { useMe } from "../hooks/useMe";
import nuberLogo from "../images/eats-logo.svg";

export default function Header() {
  const { data } = useMe();
  // console.log('for header test ', data);
  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-500 p-3 text-center text-xs text-white">
          <span>Plase verify your email.</span>
        </div>
      )}
      <header className="py-4">
        <div className="w-full px-5 xl:px-0 container flex  justify-between items-center">
          <Link to="/">
            <img src={nuberLogo} alt="Nuber Eats" className="w-24" />
          </Link>

          <span className="text-xs">
            <Link to="/edit-profile">
              <FontAwesomeIcon icon={faUser} className="text-xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
}
