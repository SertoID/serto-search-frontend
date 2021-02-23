import React, { useState } from "react";
// import { routes } from "../../constants";
import { Box, Flex, Text } from "rimble-ui";
import { colors, H1, H6 } from "serto-ui";
import { SearchBox } from "../../components/elements";
import { Viewport } from "../../components/layout";
import { Listings } from "../SearchResults/Listings";

export const HomePage: React.FunctionComponent = () => {
  const [search, setSearch] = useState("");

  return (
    <Viewport>
      <Flex alignItems="center" height="500px" justifyContent="center" width="100%">
        <Box maxWidth="780px" width="100%">
          <H1 color={colors.primary.base} lineHeight="solid" mb={5} mt={0}>
            Serto Search
          </H1>
          <Text color={colors.primary.base} fontSize="18px" fontWeight={3} lineHeight="solid" mb={5} mt={0}>
            The internet’s source of entities represented by decentralized identitifers, or DIDs
          </Text>
          <SearchBox onSearch={(searchVal) => setSearch(searchVal)} />
        </Box>
      </Flex>
      <Listings search={search} />
      <Box maxWidth="570px" mb="60px" width="100%">
        <H6 color={colors.midGray}>About This Site</H6>
        <Text color={colors.midGray}>
          An initiative to help everyone find businesses and organizations they can trust. Serto Registry leverages
          standards-based decentralized identifiers, and verfiable credentials technology.
        </Text>
      </Box>
    </Viewport>
  );
};
