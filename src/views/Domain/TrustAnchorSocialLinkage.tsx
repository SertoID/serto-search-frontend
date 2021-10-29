import { useState } from "react";
import { Box, Button, Flex, Text } from "rimble-ui";
import { baseColors, colors, H5, ModalWithX, Verified } from "serto-ui";

export interface TrustAnchorDidDocProps {
  handle: string;
}

export const TrustAnchorSocialLinkage: React.FunctionComponent<TrustAnchorDidDocProps> = (props) => {
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
              We’ve verified that the owner of <b>{props.handle}</b> controls the DIDs below.
            </Text>
          </Flex>
          <H5 mb={1} mt={0}>
            Trust Anchor for Account Ownership
          </H5>
          <Text color={colors.silver} fontSize={1} mb={4}>
            This verifalbe credential is a set of code that cryptographically link this DID to an external account. This
            file was posted by the account owner to prove that they control their account.
          </Text>
        </Box>
      </ModalWithX>
    </>
  );
};
