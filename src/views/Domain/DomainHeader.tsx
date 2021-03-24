import React from "react";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors, DomainImage, H4, VerificationStatus } from "serto-ui";

export interface DomainHeaderProps {
  domain: string;
  baselineStatus?: boolean;
}

export const DomainHeader: React.FunctionComponent<DomainHeaderProps> = (props) => {
  const { domain } = props;
  return (
    <Flex flexWrap="wrap" justifyContent="space-between">
      <Box borderBottom={[2, 0]} pb={[5, 0]} maxWidth="700px" mb={[5, 0]} width={["100%", "auto"]}>
        <Flex alignItems="center" mb={3}>
          <DomainImage domain={domain} />
          <Text color={baseColors.black}>{domain}</Text>
        </Flex>
        <H4 color={colors.primary.base} lineHeight="solid" mb={1} mt={0}>
          {domain}
        </H4>
      </Box>
      <Box ml={[0, 5]} width={["100%", "250px"]}>
        <VerificationStatus didConfig />
      </Box>
    </Flex>
  );
};
