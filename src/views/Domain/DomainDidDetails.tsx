import React from "react";
import { Box, Flex, Icon, Text } from "rimble-ui";
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
        <Box mr={3} width="550px">
          <H6 mb={2} mt={0}>
            DID Address
          </H6>
          <CopyableTruncatableText text={didDocEntry.did} />
        </Box>
        <Box onClick={toggleIsOpen} style={{ cursor: "pointer" }}>
          {isOpen ? <Icon name="KeyboardArrowUp" /> : <Icon name="KeyboardArrowDown" />}
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
