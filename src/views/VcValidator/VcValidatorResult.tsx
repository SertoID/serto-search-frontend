import { VerifiableCredential } from "@veramo/core";
import { VC } from "vc-schema-tools";
import { Box, Flex, Text } from "rimble-ui";
import { AdditionalVCData, colors, Credential, CredentialViewTypes } from "serto-ui";

export interface VcValidatorResultProps {
  validated: boolean;
  vc?: VerifiableCredential;
  didResults: any[];
  schemaVerified: boolean;
}

export const VcValidatorResult: React.FunctionComponent<VcValidatorResultProps> = (props) => {
  console.log("VcValidatorResult 1");
  const { vc, validated, didResults, schemaVerified } = props;
  const additionalVcData = { didListings: didResults, schemaVerified };
  if (!validated || !vc) {
    return (
      <Flex flexDirection="column" alignItems="center" my={3}>
        <Box maxWidth="500px" bg={colors.danger.light} borderColor={colors.danger.base} border={1} p={2}>
          <Text>
            {
              "Sorry, we were not able to Verify the Credential enterred. Please ensure you're entering the token string of the VC. If you believe your VC is valid, please contact support@serto.id"
            }
          </Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex flexDirection="column" alignItems="center" my={3}>
      <Credential
        vc={vc as VC}
        viewType={CredentialViewTypes.DEFAULT}
        additionalVCData={additionalVcData as AdditionalVCData}
      />
    </Flex>
  );
};
