import React from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../constants";
import { CombinedSearchBar } from "serto-ui";

export const CombinedSearch: React.FunctionComponent = () => {
  const history = useHistory();
  return (
    <CombinedSearchBar
      onSearch={(search) => history.push(routes.SEARCH + "?filter=" + search)}
      onNftVerify={(contract, tokenId) => history.push(routes.NFT_SERACH + "?contract=" + contract + "&tokenId=" + tokenId)}
      onVcVerify={(vc) => history.push(routes.VC_VALIDATOR + "?vc=" + vc)}
    />
  );
};
