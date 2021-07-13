import React from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@rimble/icons";
import { Box, Flex, Text, Pill } from "rimble-ui";
import { colors, useToggle, CopyableTruncatableText, CopyToClipboard, HighlightedJson, DidMethodIcon } from "serto-ui";

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
    <Box border={1} borderColor={colors.nearWhite}>
      <Flex flexDirection="column" alignItems="left">
        <Box width={["90%", "auto"]} bg={colors.nearWhite} p={3}>
          <Flex flexDirection="row" alignItems="center">
            <DidMethodIcon did={didDocEntry.did} size="32px"/>
            <CopyableTruncatableText fontSize={2} fontWeight={3} text={didDocEntry.did} />
          </Flex>
        </Box>
        <Flex p={3}>
          <Text color={colors.primary.base} fontWeight={3}>Endpoints ({numEndpoints})</Text>
          {services?.map((service: any) => {
            return <Pill>{service.type}</Pill>
          })}
        </Flex>
        <Box onClick={toggleIsOpen} style={{ cursor: "pointer" }}>
          {isOpen ? 
            <Flex p={2} justifyContent="start">
              <KeyboardArrowDown color={colors.primary.base} />
              <Text color={colors.primary.base} fontWeight={3}>Trust Anchor Details for DID (DID Document)</Text>
            </Flex> 
            : 
            <Flex p={2} justifyContent="center">
              <KeyboardArrowUp color={colors.primary.base} />
              <Text color={colors.primary.base} fontWeight={3}>See Trust Anchor Details (DID Document)</Text>
            </Flex>
          }
        </Box>
      </Flex>
      {isOpen && (
        <Box mt={3}>
          <Text color={colors.silver} fontWeight={4} pl={3}>
            DID Document
          </Text>
          <Box position="relative" p={3}>
            <Box position="absolute" right={4} top={4} zIndex={1}>
              <CopyToClipboard text={didDocEntry.didDoc} textButton />
            </Box>
            <HighlightedJson json={didDocEntry.didDoc} />
          </Box>
        </Box>
      )}
    </Box>
  );
};
