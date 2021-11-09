import { Box, Flex, Text } from "rimble-ui";
import { colors, DomainImage, H2, SertoVerifiedCheckmark } from "serto-ui";
import { LearnMoreLink } from "../../components";
import { routes } from "../../constants";
import { TrustAnchorDomainLinkage } from "./TrustAnchorDomainLinkage";

export interface DomainHeaderProps {
  didConfigEntry: string;
  domain: string;
  platform: string;
  orgName?: string;
  description?: string;
}

export const DomainHeader: React.FunctionComponent<DomainHeaderProps> = (props) => {
  const { didConfigEntry, domain, orgName, description } = props;
  return (
    <Box my={5}>
      <Box mb={4}>
        <Flex alignItems="center">
          <>
            <DomainImage domain={domain} size="32px" />
            <H2 my={0} mx="12px">
              {domain}
            </H2>
            <TrustAnchorDomainLinkage domain={domain} didConfigEntry={didConfigEntry} />
          </>
        </Flex>
        {orgName && <Text ml="45px">{orgName}</Text>}
        {description && <Text ml="45px">{description}</Text>}
      </Box>
      <Box bg={colors.primary.background} border={3} borderRadius={1} padding={4}>
        <Flex alignItems="center">
          <Box width="55px">
            <SertoVerifiedCheckmark />
          </Box>
          <Box flexGrow="1" ml={4}>
            <Text fontSize={3}>
              We’ve verified that the entity <b>{domain}</b> controls the <b>DIDs or public addresses</b> below.
            </Text>
            <Text fontSize={1}>
              This entity has cryptographically linked their domain to their DIDs. When you interact with their public
              addresses, you can trust their origin.{" "}
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
