import { Box, Flex, Link, Text } from "rimble-ui";
import { colors, SocialIcons, H2, SertoVerifiedCheckmark } from "serto-ui";
import { SocialMediaLinkages } from "../../types";
import { getSocialUrl } from "../../utils/helpers";
import { LearnMoreLink } from "../../components";
import { routes } from "../../constants";
import { TrustAnchorSocialLinkage } from "./TrustAnchorSocialLinkage";

export interface SocialHeaderProps {
  handle: string;
  platform: string;
  socialMediaLinkages: SocialMediaLinkages[];
}

export const SocialHeader: React.FunctionComponent<SocialHeaderProps> = (props) => {
  const { handle, platform, socialMediaLinkages } = props;
  const socialUrl = getSocialUrl(platform, handle);
  const socialMediaLinkage = socialMediaLinkages.find(
    (obj: any) => obj.platform === platform && obj.linkedId === handle,
  );

  return (
    <Box my={5}>
      <Box mb={4}>
        <Flex alignItems="center">
          <>
            <SocialIcons platform={platform} size={32} />
            <H2 my={0} mx="12px">
              {handle}
            </H2>
            {socialMediaLinkage && (
              <TrustAnchorSocialLinkage handle={handle} platform={platform} socialMediaLinkage={socialMediaLinkage} />
            )}
          </>
        </Flex>
        <Link href={`https://${socialUrl}`} ml="45px" target="_blank">
          {socialUrl}
        </Link>
      </Box>
      <Box bg={colors.primary.background} border={3} borderRadius={1} padding={4}>
        <Flex alignItems="center">
          <Box width="55px">
            <SertoVerifiedCheckmark />
          </Box>
          <Box flexGrow="1" ml={4}>
            <Text fontSize={3}>
              We’ve verified that the owner of this <b>{handle}</b> controls the <b>DIDs</b> below.
            </Text>
            <Text fontSize={1}>
              This entity has cryptographically linked their social network profile to their DIDs.{" "}
              <LearnMoreLink as="a" href={routes.HOW_IT_WORKS} target="_blank">
                Learn more.
              </LearnMoreLink>
            </Text>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};
