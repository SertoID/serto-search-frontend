import React from "react";
import useSWR from "swr";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Button, Flash, Flex, Loader, Text } from "rimble-ui";
import { baseColors, colors } from "serto-ui";
import { ErrorMsg, Global, Viewport } from "../../components";
import { SearchResult, SearchResultTypes } from "./SearchResult";
var _ = require('underscore');

export const SearchPage: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const urlParams = new URLSearchParams(window.location.search);
  const filter = urlParams.get("filter") || "";
  const page = urlParams.get("page") ? (parseInt(urlParams.get("page")!) - 1) : 0; // user sees 1-indexed pagenums, but we send 0-indexed pagenums to search
  const { data, error, isValidating } = useSWR(["/v1/search", filter, page], () => Phonebook.getEntries({ filter, page }), {
    revalidateOnFocus: false,
  });

  const { searchResults, count, resultsPerPage } = data || {};
  const numPages = Math.ceil(count / resultsPerPage);

  // remember 1-indexed vs 0-indexed for page
  const hasPrevious = page > 0;
  const previousLink = "/search?filter=" + filter + "&page=" + (page);
  const hasNext = (page + 1) < numPages;
  const nextLink = "/search?filter=" + filter + "&page=" + (page + 2);
  const lowestPageLink = Math.max(1, (page+1) - 4);
  const highestPageLink = Math.min(numPages || 0, (page+1) + 4);


  const pageList = _.range(lowestPageLink, highestPageLink + 1);


  return (
    <Global banner searchBar>
      <Viewport>
        {searchResults?.length > 0 ? (
          <Box bg={baseColors.white} borderRadius={1} py={3}>
            <Box borderBottom={2} pb={1} pt={5} px={5}>
              <Text color={colors.lightSilver} fontSize={2} fontWeight={3}>
                {filter === "" ? (
                  <>
                    Showing {data.length} {data.length === 1 ? "result" : "results"}
                  </>
                ) : (
                  <>
                    Showing {data.length} {data.length === 1 ? "result" : "results"} for{" "}
                    {/* eslint-disable-next-line */}
                    <Text.span color={colors.midGray} fontWeight={3}>
                      {filter}
                    </Text.span>
                  </>
                )}
              </Text>
            </Box>
            {searchResults.map((result: SearchResultTypes, i: number) => {
              return <SearchResult searchResult={result} key={i} />;
            })}
            <Flex flexDirection="row" justifyContent="space-around" pt={2}>
              <Flex flexDirection="row" alignItems="center" >
              {hasPrevious ? <Button.Text as="a" href={previousLink}>{"< Previous"}</Button.Text> : <Button.Text disabled={true}>{" < Previous"}</Button.Text>}
              {
                pageList.map((pagelinkNum:number) => {
                  if (pagelinkNum === page + 1) {
                    return <Button disabled={true} key={"page" + pagelinkNum}>{pagelinkNum}</Button>
                  } else {
                    return (<Button.Text as ="a" href={"/search?filter=" + filter + "&page=" + pagelinkNum} key={"page" + pagelinkNum}>{pagelinkNum}</Button.Text>)
                  }
                })
              }
              {hasNext ? <Button.Text as="a" href={nextLink}>{"Next >"}</Button.Text> : <Button.Text disabled={true}>{"Next >"}</Button.Text>}
              </Flex>
            </Flex>
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
