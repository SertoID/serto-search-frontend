import React from "react";
import { Listings } from "./Listings";

export const SearchPage: React.FunctionComponent = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const filter = urlParams.get("filter") === null ? undefined : urlParams.get("filter");

  return <Listings search={filter} />;
};
