import { useState } from "react";
import { Box, Button, Flex, Text } from "rimble-ui";
import { colors, CopyToClipboard, H5, HighlightedJson, ModalWithX, Verified } from "serto-ui";
import { LearnMoreLink } from "../../components";

export interface TrustAnchorDidDocProps {
  domain: string;
  didDocEntry: any;
}

export const TrustAnchorDidDoc: React.FunctionComponent<TrustAnchorDidDocProps> = (props) => {
  const [isLinkageModalOpen, setIsLinkageModalOpen] = useState<boolean>(false);
  return (
    <>
      <Button.Text onClick={() => setIsLinkageModalOpen(true)} size="small">
        DID Document
      </Button.Text>
      <ModalWithX
        borderRadius={2}
        isOpen={isLinkageModalOpen}
        close={() => setIsLinkageModalOpen(false)}
        maxWidth="900px"
      >
        <Box pb={[2, 4]} px={[3, 5]} pt={0}>
          <Flex alignItems="center" borderBottom={1} mb={4} pb={4}>
            <Verified size="24px" />
            <Text ml={2}>
              We’ve verified that the entity <b>{props.domain}</b> controls the <b>DIDs or public addresses</b>.
            </Text>
          </Flex>
          <H5 mb={1} mt={0}>
            Trust anchor details for DID
          </H5>
          <Text color={colors.silver} fontSize={1} mb={4}>
            This <b>DID Document</b> contains this entity’s cryptographic keys used to sign credentials.{" "}
            <LearnMoreLink as="a" href="https://www.w3.org/TR/did-core/#dfn-did-documents" target="_blank">
              Learn more
            </LearnMoreLink>
            .
          </Text>
          <Box position="relative">
            <Box position="absolute" right={4} top={4} zIndex={1}>
              <CopyToClipboard text={props.didDocEntry.didDoc} textButton />
            </Box>
            <HighlightedJson json={props.didDocEntry.didDoc} />
          </Box>
        </Box>
      </ModalWithX>
    </>
  );
};
