import React from "react";
import { Box, Flex, Text } from "rimble-ui";
import { ellipsis } from "../../utils/helpers";
import { CopyToClipboard } from "./CopyToClipboard";
import { EthLogo, SovrinLogo } from "./Icons";

export interface DidProps {
  did: string;
  copy?: boolean;
  ellipsis?: boolean;
  icon?: boolean;
  [key: string]: any;
}

export const Did: React.FunctionComponent<DidProps> = (props) => {
  const { did, icon, copy } = props;

  return (
    <Flex>
      {icon && (
        <Box mr={1}>
          {did.includes("did:ethr") && <EthLogo />}
          {did.includes("did:key") && <SovrinLogo />}
          {did.includes("did:sov") && <SovrinLogo />}
          {did.includes("did:web") && <SovrinLogo />}
        </Box>
      )}
      <Text {...props} lineHeight="solid" m={0}>
        {props.ellipsis ? ellipsis(did, 15, 5) : did}
      </Text>
      {copy && (
        <Box ml={2}>
          <CopyToClipboard hoverTitle="Copy DID" size="16px" text={did} />
        </Box>
      )}
    </Flex>
  );
};
