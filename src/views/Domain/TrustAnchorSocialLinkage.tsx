import { useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";
import { SocialMediaLinkages, SocialMediaPlatform } from "../../types";
import { Box, Button, Flex, Link, Text } from "rimble-ui";
import { baseColors, colors, CopyToClipboard, H5, ModalWithX, Verified } from "serto-ui";

export interface TrustAnchorDidDocProps {
  handle: string;
  platform: string;
  socialMediaLinkage: SocialMediaLinkages;
}

export const TrustAnchorSocialLinkage: React.FunctionComponent<TrustAnchorDidDocProps> = (props) => {
  const { handle, platform, socialMediaLinkage } = props;
  const [isLinkageModalOpen, setIsLinkageModalOpen] = useState<boolean>(false);

  let tweetId = "";
  if (platform === SocialMediaPlatform.TWITTER) {
    tweetId = props.socialMediaLinkage.proofUrl.substring(props.socialMediaLinkage.proofUrl.lastIndexOf("status/") + 7);
  }

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
        <Box pb={[2, 4]} px={[3, 5]} pt={0} overflow="scroll">
          <Flex alignItems="center" borderBottom={1} mb={4} pb={4}>
            <Verified size="24px" />
            <Text ml={2}>
              We’ve verified that the owner of <b>{handle}</b> controls the account below.
            </Text>
          </Flex>
          <H5 mb={1} mt={0}>
            Trust Anchor for Account Ownership
          </H5>
          <Text color={colors.silver} fontSize={1} mb={4}>
            This verifalbe credential is a set of code that cryptographically link this DID to an external account. This
            file was posted by the account owner to prove that they control their account.
          </Text>
          {props.platform === SocialMediaPlatform.TWITTER ? (
            <TwitterTweetEmbed tweetId={tweetId} />
          ) : (
            <Link href={socialMediaLinkage.proofUrl} target="_blank">
              {socialMediaLinkage.proofUrl}
            </Link>
          )}
          <H5>Verifiable Credential</H5>
          <Box position="relative" mb={3}>
            <Box position="absolute" right={3} top={3} zIndex={1}>
              <CopyToClipboard text={socialMediaLinkage.vc} textButton />
            </Box>
            <Box
              bg={colors.nearWhite}
              borderRadius={1}
              maxHeight="300px"
              p={3}
              style={{ overflow: "scroll", overflowWrap: "break-word" }}
            >
              <code style={{ fontSize: "12px" }}>{socialMediaLinkage.vc}</code>
            </Box>
          </Box>
          <Button as="a" href={socialMediaLinkage.vcUrl} size="small" target="_blank" width="150px">
            Verify
          </Button>
        </Box>
      </ModalWithX>
    </>
  );
};
