import React from "react";
import { Link } from "react-router-dom";
import { routes } from "../../constants";

export interface ErrorProps {
  error: string;
}

export const ErrorMsg: React.FunctionComponent<ErrorProps> = (props) => {
  const { error } = props;

  if (error.includes("106")) {
    return <>Provided domain is invalid.</>;
  } else if (error.includes("210")) {
    return (
      <>
        Your domain does not have a Decentralized Identifier or DID.{" "}
        <Link to={routes.HOW_IT_WORKS}>Learn more about creating one here.</Link>
      </>
    );
  } else if (error.includes("211")) {
    return <>Requested phonebook entry not found.</>;
  } else if (error.includes("212")) {
    return <>DID configuration not valid.</>;
  } else if (error.includes("215")) {
    return <>Invalid Search Domain.</>;
  }
  return <>{error}</>;
};
