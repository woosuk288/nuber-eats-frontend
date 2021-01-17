import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Search() {
  const location = useLocation();

  useEffect(() => {
    console.log(location);
    return () => {};
  }, []);

  return <div>Search Page</div>;
}
