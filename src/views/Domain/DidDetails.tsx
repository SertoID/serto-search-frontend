import { Box, Flex, Text } from "rimble-ui";
import { colors, DidView, H5, PillWithImg, SocialPills } from "serto-ui";
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
  linkedIds: any;
}

export const DidDetails: React.FunctionComponent<DidDetailsProps> = (props) => {
  const { didDocEntry, domain, linkedIds } = props;
  const parsedDidDoc = JSON.parse(didDocEntry.didDoc);
  const services = parsedDidDoc.service;
  const numEndpoints = services?.length || 0;

  return (
    <Box border={1} borderColor={colors.nearWhite} borderRadius={1} boxShadow={1} mb={5}>
      <Flex alignItems="center" bg={colors.nearWhite} justifyContent="space-between" p={3}>
        <Box width="calc(100% - 115px)">
          <DidView copy={true} did={didDocEntry.did} dontTruncate={true} size="large" />
        </Box>
        <Box width="115px">
          <TrustAnchorDidDoc didDocEntry={didDocEntry} domain={domain} />
        </Box>
      </Flex>
      <Box px={3} py={4}>
        <H5 color={colors.primary.base} mb={2} mt={0}>
          Linked IDs
        </H5>
        <Text color={colors.silver} fontSize={0} mb={3}>
          External accounts linked to this DID
        </Text>
        <Flex>
          {linkedIds.map((linkedId: any, i: number) => {
            return <SocialPills key={i} linkedId={linkedId} />;
          })}
        </Flex>
      </Box>
      {/*<Box px={3} py={4}>
        <H5 color={colors.primary.base} mb={2} mt={0}>
          Credentials
        </H5>
        <Text color={colors.silver} fontSize={0} mb={3}>
          Credentials issued to this DID. Verifiable Credentials (VCs) are digital documents that use cryptographic
          methods for making the data they contain temper-evident and/or asserting the method by which it was derived.
        </Text>
        </Box>*/}
      <Box px={3} py={4}>
        <H5 color={colors.primary.base} mb={2} mt={0}>
          Endpoints ({numEndpoints})
        </H5>
        <Flex>
          {services?.map((service: any, i: number) => {
            return <PillWithImg key={i} mr={3} text={service.type} />;
          })}
        </Flex>
      </Box>
    </Box>
  );
};
