import { useState } from "react";
import { Box, Button, Flex, Text } from "rimble-ui";
import {
  baseColors,
  colors,
  CopyToClipboard,
  Fingerprint,
  H5,
  HighlightedJson,
  IcoWeb,
  IndentedArrow,
  ModalWithX,
  Verified,
} from "serto-ui";
import { LearnMoreLink } from "../../components";

export interface TrustAnchorDomainLinkageProps {
  domain: string;
  didConfigEntry: any;
}

export const TrustAnchorDomainLinkage: React.FunctionComponent<TrustAnchorDomainLinkageProps> = (props) => {
  const [isLinkageModalOpen, setIsLinkageModalOpen] = useState<boolean>(false);
  return (
    <>
      <Button
        border={3}
        borderRadius={5}
        contrastColor={colors.primary.base}
        mainColor={baseColors.white}
        onClick={() => setIsLinkageModalOpen(true)}
        size="small"
      >
        Linkage
      </Button>
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
          <Box mb={5}>
            <Flex alignItems="center" mb={2}>
              <Fingerprint />
              <Text fontSize={0} pl={1}>
                DID Configuration file is hosted on
              </Text>
            </Flex>
            <Flex alignItems="center" mb={2} pl={1}>
              <Box pr={1}>
                <IndentedArrow />
              </Box>
              <IcoWeb />
              <Text fontSize={0} pl={1}>
                {props.domain}
              </Text>
            </Flex>
            <Flex alignItems="center" pl={4}>
              <Box pr={1}>
                <IndentedArrow />
              </Box>
              <Verified />
              <Text fontSize={0} pl={1}>
                This domain linkage is valid
              </Text>
            </Flex>
          </Box>
          <H5 mb={1} mt={0}>
            Trust Anchor for Domain Linkage
          </H5>
          <Text color={colors.silver} fontSize={1} mb={4}>
            This <b>DID Configuration</b> is a set of code that cryptographically link the entity’s DID to their domain.
            This file is hosted on their website to prove that they control their domain.{" "}
            <LearnMoreLink as="a" href="https://identity.foundation/specs/did-configuration/" target="_blank">
              Learn more
            </LearnMoreLink>
          </Text>
          <Box position="relative">
            <Box position="absolute" right={4} top={3} zIndex={1}>
              <CopyToClipboard text={props.didConfigEntry.didConfig} textButton />
            </Box>
            <HighlightedJson json={props.didConfigEntry.didConfig} />
          </Box>
        </Box>
      </ModalWithX>
    </>
  );
};
