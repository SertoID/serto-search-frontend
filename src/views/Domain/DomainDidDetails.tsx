import React from "react";
import { Box, Flex, Text } from "rimble-ui";
import { colors, CopyableTruncatableText, H6, HighlightedJson } from "serto-ui";
import { useToggle } from "../../components";

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
        <Box width="550px">
          <H6 mb={2} mt={0}>
            DID Address
          </H6>
          <CopyableTruncatableText text={didDocEntry.did} />
        </Box>
        <Box onClick={toggleIsOpen} style={{ cursor: "pointer" }}>
          {isOpen ? <ArrowUp /> : <ArrowDown />}
        </Box>
      </Flex>
      {isOpen && (
        <Box mt={5}>
          <Box borderBottom={2} mb={4} pb={2}>
            <Text color={colors.silver} fontWeight={4}>
              DID Document
            </Text>
          </Box>
          <HighlightedJson json={didDocEntry.didDoc} />
        </Box>
      )}
    </>
  );
};

// TODO replace these with rimble icons when npm is published
export const ArrowUp: React.FunctionComponent = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <path d="M0 16.67l2.829 2.83 9.175-9.339 9.167 9.339 2.829-2.83-11.996-12.17z" />
    </svg>
  );
};

export const ArrowDown: React.FunctionComponent = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
      <path d="M0 7.33l2.829-2.83 9.175 9.339 9.167-9.339 2.829 2.83-11.996 12.17z" />
    </svg>
  );
};
