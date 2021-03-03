import React from "react";
import useSWR from "swr";
import JSONPretty from "react-json-pretty";
import { useParams } from "react-router-dom";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Flash, Flex, Loader, Text } from "rimble-ui";
import { baseColors, colors, DidView, H4, H6 } from "serto-ui";
import { DomainImage, ErrorMsg, Global, Viewport } from "../../components";

export const DomainPage: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const { domain } = useParams<{ domain: string }>();
  const { data, error, isValidating } = useSWR(
    ["/v1/domain-listing", domain],
    () => Phonebook.getDomainListing(domain || ""),
    {
      revalidateOnFocus: false,
    },
  );

  return (
    <Global showSearch>
      <Viewport>
        {data?.domain && (
          <Box maxWidth="700px" py={5}>
            <Box mb={4}>
              <Flex alignItems="center" mb={3}>
                <DomainImage domain={data.domain} />
                <Text color={baseColors.black}>{data.domain}</Text>
              </Flex>
              <H4 color={colors.primary.base} lineHeight="solid" mb={1} mt={0}>
                {data.domain}
              </H4>
            </Box>
          </Box>
        )}
      </Viewport>
      <Viewport fullBgColor={colors.primary.border}>
        {data?.didDocEntries?.length > 0 ? (
          <Box borderRadius={1} bg={baseColors.white} my={5} p={5}>
            <H6 color={colors.primary.base} mb={3} mt={0}>
              Decentralized Identifiers (DIDs) in use
            </H6>
            <Text fontSize={2} mb={5} width="650px">
              A decentralized identifier or DID enables verifiable, decentralized digital identity. A DID identifies any
              subject that the controller of the DID decides that it identifies.
            </Text>
            {data.didDocEntries.map((entry: any, i: number) => {
              return (
                <React.Fragment key={i}>
                  <Box mb={5}>
                    <DidView color={baseColors.black} did={entry.did} fontWeight={4} icon copy />
                  </Box>
                  <JSONPretty data={entry.didDoc} />
                </React.Fragment>
              );
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
