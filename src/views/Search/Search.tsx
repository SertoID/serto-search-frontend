import React from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../constants";
import { SearchBox } from "../../components/elements";

export const Search: React.FunctionComponent = () => {
  const history = useHistory();

  return (
    <SearchBox
      onSearch={(searchVal) => history.push(routes.SEARCH + "?filter=" + searchVal)}
      placeholderText="Search an organization or DID"
    />
  );
};
