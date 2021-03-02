import React from "react";
import { Box, Flex, Text } from "rimble-ui";
import { colors, H1 } from "serto-ui";
import { Search } from "../Search/Search";
import { Global, Viewport } from "../../components";

export const HomePage: React.FunctionComponent = () => {
  return (
    <Global>
      <Viewport mb={7} fullBgColor={colors.primary.border}>
        <Flex alignItems="center" height="500px" justifyContent="center" width="100%">
          <Box maxWidth="780px" width="100%">
            <H1 color={colors.primary.base} lineHeight="solid" mb={4} mt={0}>
              Serto Search
            </H1>
            <Text color={colors.primary.base} fontSize="18px" fontWeight={3} lineHeight="solid" mb={5} mt={0}>
              The internet’s source of entities represented by decentralized identitifers, or DIDs
            </Text>
            <Search />
          </Box>
        </Flex>
      </Viewport>
    </Global>
  );
};
