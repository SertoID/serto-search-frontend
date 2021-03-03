import React from "react";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors, H4 } from "serto-ui";
import { DomainImage, VerificationStatus } from "../../components";

export interface DomainHeaderProps {
  domain: string;
  baselineStatus?: boolean;
}

export const DomainHeader: React.FunctionComponent<DomainHeaderProps> = (props) => {
  const { domain } = props;
  return (
    <Flex borderBottom={2} justifyContent="space-between" mb={5} pb={4} px={4}>
      <Box>
        <Flex alignItems="center" mb={3}>
          <DomainImage domain={domain} />
          <Text color={baseColors.black}>{domain}</Text>
        </Flex>
        <H4 color={colors.primary.base} lineHeight="solid" mb={1} mt={0}>
          {domain}
        </H4>
      </Box>
      <Box ml={5} width="250px">
        <VerificationStatus />
      </Box>
    </Flex>
  );
};
