import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors, H4, H6 } from "serto-ui";
import { CredentialCheck, Did } from "../../components";

export interface SearchResultTypes {
  domain: string;
  dids: any;
}

export interface SearchResultProps {
  searchResult: SearchResultTypes;
}

export const SearchResult: React.FunctionComponent<SearchResultProps> = (props) => {
  const { searchResult } = props;

  return (
    <Flex alignItems="flex-start" borderBottom={2} justifyContent="space-between" p={5}>
      <Box maxWidth="700px">
        <Box mb={4}>
          <Link to={"domain/" + searchResult.domain} style={{ textDecoration: "none" }}>
            <Text color={baseColors.black} mb={3}>
              {searchResult.domain}
            </Text>
            <H4 color={colors.primary.base} lineHeight="solid" mb={1} mt={0}>
              {searchResult.domain}
            </H4>
          </Link>
          <Text color={colors.midGray}>
            Build next-generation apps, launch blockchain-based financial infrastructure, and access the decentralized
            web with ConsenSys' Ethereum product suite.
          </Text>
        </Box>
        <Box ml={5}>
          <Did did={searchResult.dids} color={colors.primary.base} icon />
        </Box>
      </Box>
      <Box ml={5} width="300px">
        <H6 color={colors.silver} mb={2} mt={0}>
          Verification Status
        </H6>
        <SearchVerificationStatus title="DID Configuration" />
        <SearchVerificationStatus title="Serto Agent" />
        <SearchVerificationStatus title="Baseline" />
      </Box>
    </Flex>
  );
};

export interface SearchVerificationStatusProps {
  title: string;
}

export const SearchVerificationStatus: React.FunctionComponent<SearchVerificationStatusProps> = (props) => {
  return (
    <Flex alignItems="center" mb={2}>
      <CredentialCheck />
      <Text color={colors.midGray} fontSize={1} ml={1}>
        {props.title}
      </Text>
    </Flex>
  );
};
