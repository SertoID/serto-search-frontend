import React from "react";
import useSWR from "swr";
import JSONPretty from "react-json-pretty";
import { useParams } from "react-router-dom";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Flash, Flex, Loader, Text } from "rimble-ui";
import { baseColors, colors, H4, H6 } from "serto-ui";
import { errorMsg } from "../../utils/helpers";
import { Did, Viewport } from "../../components";

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
    <>
      <Viewport>
        <Box maxWidth="700px" py={5}>
          <Box mb={4}>
            <Text color={baseColors.black} mb={3}>
              {data?.domain}
            </Text>
            <H4 color={colors.primary.base} lineHeight="solid" mb={1} mt={0}>
              {data?.domain}
            </H4>
            <Text color={colors.midGray}>
              Build next-generation apps, launch blockchain-based financial infrastructure, and access the decentralized
              web with ConsenSys' Ethereum product suite.
            </Text>
          </Box>
        </Box>
      </Viewport>
      <Viewport fullWidthBgColor={colors.primary.border}>
        {data?.didDocEntries?.length > 0 ? (
          <Box borderRadius={1} bg={baseColors.white} my={5} p={5}>
            <H6 color={colors.primary.base} mb={3} mt={0}>
              Decentralized Identifiers (DIDs) in use
            </H6>
            <Text fontSize={2} mb={5} width="650px">
              A decentralized identifie or DID enables verifiable, decentralized digital identity. A DID identifies any
              subject that the controller of the DID decides that it identifies.
            </Text>
            {data.didDocEntries.map((entry: any, i: number) => {
              return (
                <>
                  <Box mb={5}>
                    <Did did={entry.did} icon copy />
                  </Box>
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