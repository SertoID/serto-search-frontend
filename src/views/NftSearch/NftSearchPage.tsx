import React from "react";
import useSWR from "swr";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Flash, Flex, Loader, Text } from "rimble-ui";
import { baseColors, colors } from "serto-ui";
import { ErrorMsg, Global, Viewport } from "../../components";
import { SearchResult, SearchResultTypes } from "./NftSearchResult";

export const NftSearchPage: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const urlParams = new URLSearchParams(window.location.search);
  const contractAddress = urlParams.get("contract") || "";
  const tokenId = parseInt(urlParams.get("tokenId") || "0");
  const { data, error, isValidating } = useSWR(["/v1/eth-nft-creator", contractAddress, tokenId], () => Phonebook.getNftData(contractAddress, tokenId), {
    revalidateOnFocus: false,
  });

  return (
    <Global banner nftSearchBar>
      <Viewport>
        {data?.length > 0 ? (
          <Box bg={baseColors.white} borderRadius={1} py={3}>
            <Box borderBottom={2} pb={1} pt={5} px={5}>
              <Text color={colors.lightSilver} fontSize={2} fontWeight={3}>
                {contractAddress === "" ? (
                  <>
                    Showing {data.length} {data.length === 1 ? "result" : "results"}
                  </>
                ) : (
                  <>
                    Showing {data.length} {data.length === 1 ? "result" : "results"} for{" "}
                    {/* eslint-disable-next-line */}
                    <Text.span color={colors.midGray} fontWeight={3}>
                      {contractAddress}
                    </Text.span>
                  </>
                )}
              </Text>
            </Box>
            {data.map((result: SearchResultTypes, i: number) => {
              return <SearchResult searchResult={result} key={i} />;
            })}
          </Box>
        ) : isValidating ? (
          <Flex minHeight={8} alignItems="center" justifyContent="center">
            <Loader color={colors.primary.base} size={5} />
          </Flex>
        ) : error ? (
          <Flash my={3} variant="danger">
            <ErrorMsg error={error.message} />
          </Flash>
        ) : (
          <Flash my={3} variant="warning">
            No results.
          </Flash>
        )}
      </Viewport>
    </Global>
  );
};
