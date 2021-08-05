import React from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@rimble/icons";
import { Box, Flex, Text, Pill } from "rimble-ui";
import { colors, useToggle, CopyToClipboard, DidView, H5, HighlightedJson } from "serto-ui";
import { LearnMoreLink } from "../../components";

export interface DidDocEntryTypes {
  baselineEndpoint: string;
  createdAt: string;
  deletedAt: string;
  did: any;
  didDoc: string;
}

export interface DomainDidDetailsProps {
  didDocEntry: DidDocEntryTypes;
}

export const DomainDidDetails: React.FunctionComponent<DomainDidDetailsProps> = (props) => {
  const { didDocEntry } = props;
  const [isOpen, toggleIsOpen] = useToggle(false);

  const parsedDidDoc = JSON.parse(didDocEntry.didDoc);
  const services = parsedDidDoc.service;
  const numEndpoints = services?.length || 0;

  return (
    <Box border={1} borderColor={colors.nearWhite} borderRadius={1} boxShadow={1} mb={5}>
      <Box bg={colors.nearWhite} p={3} overflow="scroll">
        <DidView copy={true} did={didDocEntry.did} dontTruncate={true} size="large" />
      </Box>
      <Box px={3} py={4}>
        <H5 color={colors.primary.base} mb={2} mt={0}>
          Endpoints ({numEndpoints})
        </H5>
        <Flex>
          {services?.map((service: any) => {
            return <Pill mr={3}>{service.type}</Pill>;
          })}
        </Flex>
      </Box>
      {isOpen && (
        <Box borderTop={2} mt={1} px={3} py={5}>
          <H5 color={colors.primary.base} mb={2} mt={0}>
            Trust Anchor Details for DID
          </H5>
          <Text color={colors.silver} fontSize={1} mb={3}>
            This DID Document contains this entity’s cryptographic keys used to sign credentials.{" "}
            <LearnMoreLink as="a" href="https://www.w3.org/TR/did-core/#dfn-did-documents" target="_blank">
              Learn More
            </LearnMoreLink>
          </Text>
          <Box position="relative">
            <Box position="absolute" right={4} top={4} zIndex={1}>
              <CopyToClipboard text={didDocEntry.didDoc} textButton />
            </Box>
            <HighlightedJson json={didDocEntry.didDoc} />
          </Box>
        </Box>
      )}
      <Flex
        alignItems="center"
        borderTop={2}
        justifyContent="center"
        px={2}
        py={3}
        onClick={toggleIsOpen}
        style={{ cursor: "pointer" }}
      >
        {isOpen ? (
          <>
            <KeyboardArrowUp color={colors.primary.base} mr={2} />
            <Text color={colors.primary.base} fontWeight={3}>
              Close
            </Text>
          </>
        ) : (
          <>
            <KeyboardArrowDown color={colors.primary.base} mr={2} />
            <Text color={colors.primary.base} fontWeight={3}>
              See Trust Anchor Details
            </Text>
          </>
        )}
      </Flex>
    </Box>
  );
};
