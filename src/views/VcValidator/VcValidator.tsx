import React from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../constants";
import { SearchBox } from "serto-ui";

export const VcValidator: React.FunctionComponent = () => {
  const history = useHistory();

  return (
    <SearchBox
      onSearch={(searchVal) => history.push(routes.VC_VALIDATOR + "?vc=" + searchVal)}
      placeholderText="Validate a VC"
    />
  );
};
