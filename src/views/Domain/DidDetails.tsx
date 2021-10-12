import { Box, Flex, Pill, Text } from "rimble-ui";
import { colors, DidView, H5 } from "serto-ui";
import { TrustAnchorDidDoc } from "./TrustAnchorDidDoc";

export interface DidDocEntryTypes {
  baselineEndpoint: string;
  createdAt: string;
  deletedAt: string;
  did: any;
  didDoc: string;
}

export interface DidDetailsProps {
  didDocEntry: DidDocEntryTypes;
  domain: string;
}

export const DidDetails: React.FunctionComponent<DidDetailsProps> = (props) => {
  const { didDocEntry, domain } = props;
  const parsedDidDoc = JSON.parse(didDocEntry.didDoc);
  const services = parsedDidDoc.service;
  const numEndpoints = services?.length || 0;

  return (
    <Box border={1} borderColor={colors.nearWhite} borderRadius={1} boxShadow={1} mb={5}>
      <Flex bg={colors.nearWhite} justifyContent="space-between" p={3} overflow="scroll">
        <DidView copy={true} did={didDocEntry.did} dontTruncate={true} size="large" />
        <TrustAnchorDidDoc didDocEntry={didDocEntry} domain={domain} />
      </Flex>
      <Box px={3} py={4}>
        <H5 color={colors.primary.base} mb={2} mt={0}>
          Linked IDs ({numEndpoints})
        </H5>
        <Text color={colors.silver} fontSize={0} mb={3}>
          External accounts linked to this DID
        </Text>
        <Flex>
          {services?.map((service: any, i: number) => {
            return (
              <Pill key={i} mr={3}>
                {service.type}
              </Pill>
            );
          })}
        </Flex>
      </Box>
      <Box px={3} py={4}>
        <H5 color={colors.primary.base} mb={2} mt={0}>
          Credentials ({numEndpoints})
        </H5>
        <Text color={colors.silver} fontSize={0} mb={3}>
          Credentials issued to this DID. Verifiable Credentials (VCs) are digital documents that use cryptographic
          methods for making the data they contain temper-evident and/or asserting the method by which it was derived.
        </Text>
        <Flex>
          {services?.map((service: any, i: number) => {
            return (
              <Pill key={i} mr={3}>
                {service.type}
              </Pill>
            );
          })}
        </Flex>
      </Box>
      <Box px={3} py={4}>
        <H5 color={colors.primary.base} mb={2} mt={0}>
          Endpoints ({numEndpoints})
        </H5>
        <Flex>
          {services?.map((service: any, i: number) => {
            return (
              <Pill key={i} mr={3}>
                {service.type}
              </Pill>
            );
          })}
        </Flex>
      </Box>
    </Box>
  );
};
