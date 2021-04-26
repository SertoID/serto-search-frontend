import React from "react";
import useSWR from "swr";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Flash, Flex, Loader, Text, Icon } from "rimble-ui";
import { baseColors, colors, NftDetails, SertoVerifiedCheckmark } from "serto-ui";
import { ErrorMsg, Global, Viewport } from "../../components";
import { SearchResult, SearchResultTypes } from "./NftSearchResult";
import styled from "styled-components";

export const NftSearchPage: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const urlParams = new URLSearchParams(window.location.search);
  const contractAddress = urlParams.get("contract") || "";
  const tokenId = urlParams.get("tokenId") || "";
  const { data, error, isValidating } = useSWR(["/v1/eth-nft-creator", contractAddress, tokenId], () => Phonebook.getNftData(contractAddress, tokenId), {
    revalidateOnFocus: false,
  });

  console.log("data: ", data);
  let nftDetailsProps = { name: data?.ethNftDetails?.name, details: data?.ethNftDetails?.details, imgUrl: data?.ethNftDetails?.imgUrl, domains: data?.didListing?.domains }
//  const newProps = { name, imgUrl, details, domains } = data;

  return (
    <Global banner searchBar>
      <Viewport>
        { error ? (
          <Flash my={3} variant="danger">
            <ErrorMsg error={error.message} />
          </Flash>
        ) : data ? (
          <Flex flexDirection="column" alignItems="center" my={3} >
            <Box maxWidth="500px">
              { (data.didListing && data.didListing.domains && data.didListing.domains.length > 0) ? (
                <Flex flexDirection="column" alignItems="center">
                  <SertoVerifiedCheckmark />
                  <Text textAlign="center">We've verified that the entity owning the domain {data.didListing.domains[0]} created the NFT: {data.ethNftDetails.name}</Text>
                </Flex>
              ) : (
                <Flex>
                  <Text>
                    We were unable to verify that the entity that created the NFT is linked to any known domains.
                  </Text>
                </Flex>
              )}
              <Box>
                <NftDetails {...nftDetailsProps} />
              </Box>
            </Box>
          </Flex>
        ) : isValidating ? (
          <Flex minHeight={8} alignItems="center" justifyContent="center">
            <Loader color={colors.primary.base} size={5} />
          </Flex>
        ) : (
          <Flash my={3} variant="warning">
            No results.
          </Flash>
        )}
      </Viewport>
    </Global>
  );
};
