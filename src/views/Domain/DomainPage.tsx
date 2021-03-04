import React from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Flash, Flex, Loader, Text } from "rimble-ui";
import { baseColors, colors, H4, HighlightedJson } from "serto-ui";
import { ArrowDown, ArrowUp, DomainDidDetails } from "./DomainDidDetails";
import { DomainHeader } from "./DomainHeader";
import { useToggle, ErrorMsg, Global, Viewport } from "../../components";

export const DomainPage: React.FunctionComponent = () => {
  const [isOpen, toggleIsOpen] = useToggle(false);
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
    <Global searchBar>
      <Viewport fullBgColor={colors.primary.border}>
        {data?.domain ? (
          <Box borderRadius={1} bg={baseColors.white} my={5}>
            <Box borderBottom={2} p={5}>
              <DomainHeader domain={data.domain} />
            </Box>
            <Box borderBottom={2} p={5}>
              <Flex alignItems="center" justifyContent="space-between">
                <H4 my={0}>DID Configuration</H4>
                <Box onClick={toggleIsOpen} style={{ cursor: "pointer" }}>
                  {isOpen ? <ArrowUp /> : <ArrowDown />}
                </Box>
              </Flex>
              {isOpen && (
                <Box mt={5}>
                  <HighlightedJson json={data.didConfigEntry.didConfig} />
                </Box>
              )}
            </Box>
            <Box borderBottom={2} p={5}>
              <H4 mb={3} mt={0}>
                Decentralized Identifiers (DID)
              </H4>
              <Text color={colors.silver} fontSize={2} fontWeight={4} mb={0}>
                View and verify the signature for each DID below.
              </Text>
              <Text color={colors.silver} fontSize={2} mb={0}>
                A decentralized identifier or DID enables verifiable, decentralized digital identity. A DID identifies
                any subject that the controller of the DID decides that it identifies.
              </Text>
            </Box>
            {data.didDocEntries.map((didDocEntry: any, i: number) => {
              return (
                <Box borderBottom={2} p={5} key={i}>
                  <DomainDidDetails didDocEntry={didDocEntry} />
                </Box>
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
