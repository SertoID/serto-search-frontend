import React from "react";
import { KeyboardArrowDown, KeyboardArrowUp } from "@rimble/icons";
import { Box, Flex, Text } from "rimble-ui";
import { colors, useToggle, CopyableTruncatableText, CopyToClipboard, H6, HighlightedJson } from "serto-ui";

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

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Box mr={3} width={["90%", "auto"]}>
          <H6 color={colors.darkGray} mb={2} mt={0}>
            DID Address
          </H6>
          <CopyableTruncatableText fontWeight={3} text={didDocEntry.did} />
        </Box>
        <Box onClick={toggleIsOpen} style={{ cursor: "pointer" }}>
          {isOpen ? <KeyboardArrowDown color={colors.primary.base} /> : <KeyboardArrowUp color={colors.primary.base} />}
        </Box>
      </Flex>
      {isOpen && (
        <Box mt={5}>
          <Box borderBottom={2} mb={4} pb={2}>
            <Text color={colors.silver} fontWeight={4}>
              DID Document
            </Text>
          </Box>

          <Box position="relative">
            <Box position="absolute" right={4} top={3} zIndex={1}>
              <CopyToClipboard text={didDocEntry.didDoc} textButton />
            </Box>
            <HighlightedJson json={didDocEntry.didDoc} />
          </Box>
        </Box>
      )}
    </>
  );
};
