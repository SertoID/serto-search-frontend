import { VerifiableCredential } from "@veramo/core";
import React from "react";
import { Box, Flex, Text } from "rimble-ui";
import { colors, VC, Credential, CredentialViewTypes } from "serto-ui";

export interface VcValidatorResultProps {
  validated: boolean;
  vc?: VerifiableCredential;
  didResults: any[];
}

export const VcValidatorResult: React.FunctionComponent<VcValidatorResultProps> = (props) => {
  const { vc, validated } = props;
  if (!validated || !vc) {
    return (
      <Flex flexDirection="column" alignItems="center" my={3}>
        <Box maxWidth="500px" bg={colors.danger.light} borderColor={colors.danger.base} border={1} p={2}>
          <Text>
            {"Sorry, we were not able to Verify the Credential enterred. Please ensure you're entering the token string of the VC. If you believe your VC is valid, please contact support@serto.id"}
          </Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" alignItems="center" my={3}>
      <Credential vc={vc as VC} viewType={CredentialViewTypes.DEFAULT} />
    </Flex>
  );
};
