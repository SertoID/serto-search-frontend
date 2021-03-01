import React from "react";
import { Box, Flex, Text } from "rimble-ui";
import { ellipsis } from "../../utils/helpers";
import { CopyToClipboard } from "./CopyToClipboard";
import { EthLogo, SovrinLogo } from "./Icons";

export interface DidProps {
  did: string;
  copy?: boolean;
  icon?: boolean;
  [key: string]: any;
}

export const Did: React.FunctionComponent<DidProps> = (props) => {
  const { did, icon, copy } = props;

  return (
    <Flex>
      {icon && (
        <Box mr={1}>
          {did.includes("ethr") && <EthLogo />}
          {did.includes("sov") && <SovrinLogo />}
          {did.includes("key") && <SovrinLogo />}
        </Box>
      )}
      <Text {...props} lineHeight="solid" m={0}>
        {ellipsis(did, 15, 5)}
      </Text>
      {copy && (
        <Box ml={2}>
          <CopyToClipboard hoverTitle="Copy DID" size="16px" text={did} />
        </Box>
      )}
    </Flex>
  );
};
