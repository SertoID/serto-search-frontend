import React from "react";
import useSWR from "swr";
import JSONPretty from "react-json-pretty";
import { useParams } from "react-router-dom";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Flash, Flex, Loader, Text } from "rimble-ui";
import { baseColors, colors } from "serto-ui";
import { errorMsg } from "../../utils/helpers";
import { Viewport } from "../../components";

interface ParamsType {
  domain: string;
}

export const DomainPage: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const params = useParams<ParamsType>();
  const { domain } = params;
  const { data, error, isValidating } = useSWR(
    ["/v1/domain-listing", domain],
    () => Phonebook.getDomainListing(domain || ""),
    {
      revalidateOnFocus: false,
    },
  );

  return (
    <>
      <Viewport>
        <Box py={5}>
          <Text fontSize={2}>{data?.domain}</Text>
        </Box>
      </Viewport>
      <Viewport fullWidthBgColor={colors.primary.border}>
        {data?.didDocEntries?.length > 0 ? (
          <Box borderRadius={1} bg={baseColors.white} my={5} p={5}>
            {data.didDocEntries.map((entry: any, i: number) => {
              return (
                <>
                  {entry.did}
                  <JSONPretty data={entry.didDoc} />
                </>
              );
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
    </>
  );
};
