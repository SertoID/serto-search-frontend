import React from "react";
import { Box, Flex, Text, Pill } from "rimble-ui";
import { baseColors, colors, DomainImage, fonts, H4, SertoVerifiedCheckmark } from "serto-ui";
import { LearnMoreLink } from "../../components";

export interface DomainHeaderProps {
  domain: string;
  baselineStatus?: boolean;
  orgName?: string;
  description?: string;
}

export const DomainHeader: React.FunctionComponent<DomainHeaderProps> = (props) => {
  const { domain, orgName, description } = props;
  return (
    <Box my={5}>
      <Box mb={4}>
        <Flex alignItems="center">
          <DomainImage domain={domain} size="32px" />
          <H4 my={0} mx="12px">
            {domain}
          </H4>
          <Pill bg={baseColors.white} color={colors.primary.base} fontFamily={fonts.sansSerif}>
            Verified
          </Pill>
        </Flex>
        {orgName && <Text ml="28px">{orgName}</Text>}
        {description && <Text ml="28px">{description}</Text>}
      </Box>
      <Box
        borderRadius={1}
        border="1px solid"
        borderColor={colors.primary.light}
        padding="20px"
        bg={colors.primary.background}
      >
        <Flex alignItems="center">
          <Box width="55px">
            <SertoVerifiedCheckmark />
          </Box>
          <Flex flexDirection="column" flexGrow="1" ml={4}>
            <Text fontSize={3}>
              We've verified that the entity {domain} controls the DIDs or public addresses below
            </Text>
            <Text fontSize={1}>
              This entity has cryptographically linked their domain to their DIDs. When you interact with their public
              addresses, you can trust their provenance.{" "}
              <LearnMoreLink as="a" href="#TODO" target="_blank">
                Learn more.
              </LearnMoreLink>
            </Text>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};
