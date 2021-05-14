import React from "react";
import { useHistory } from "react-router-dom";
import { routes } from "../../constants";
import { NftSearchBox } from "serto-ui";

export const NftSearch: React.FunctionComponent = () => {
  const history = useHistory();
  return (
    <NftSearchBox
      onSearch={(contract, tokenId) =>
        history.push(routes.NFT_SERACH + "?contract=" + contract + "&tokenId=" + tokenId)
      }
    />
  );
};
