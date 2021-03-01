import React from "react";
import useSWR from "swr";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Flash, Flex, Loader } from "rimble-ui";
import { baseColors, colors } from "serto-ui";
import { Viewport } from "../../components";
import { errorMsg } from "../../utils/helpers";
import { SearchResult, SearchResultTypes } from "./SearchResult";

export const SearchPage: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const urlParams = new URLSearchParams(window.location.search);
  const filter = urlParams.get("filter") || "";
  const { data, error, isValidating } = useSWR(["/v1/search", filter], () => Phonebook.getEntries(filter), {
    revalidateOnFocus: false,
  });

  return (
    <Viewport>
      {data?.length > 0 ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
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
          {errorMsg(error.message)}
        </Flash>
      ) : (
        <Flash my={3} variant="warning">
          No results.
        </Flash>
      )}
    </Viewport>
  );
};
