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
    <Flex flexWrap="wrap" justifyContent="space-between" m={3}>
      <Flex flexDirection="column" mb={3}>
        <Flex flexDirection="row" alignItems="center">
          <DomainImage domain={domain} />
          <H4 color={baseColors.black} mb={0} mt={0} ml={"12px"} mr={"12px"}>{domain}</H4>
          <Pill color={colors.primary.base} fontFamily={fonts.sansSerif}>Verified</Pill>
        </Flex>
        {orgName && (<Text ml={"28px"}>{orgName}</Text>)}
        {description && (<Text ml={"28px"}>{description}</Text>)}
      </Flex>
      <Box borderRadius={1} border="1px solid" borderColor={colors.primary.light} padding="20px" bg={colors.primary.background}>
        <Flex flexDirection="row" alignItems="center">
          <SertoVerifiedCheckmark />
          <Flex flexDirection="column">
            <Text fontSize={3}>
              We've verified that the entity {domain} controls the DIDs or public addresses below
            </Text>
            <Text fontSize={1}>
              This entity has cryptographically linked their domain to their DIDs. When you interact with their public addresses, you can trust their provenance. <LearnMoreLink as="a" href="">Learn more.</LearnMoreLink>
             </Text>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};
