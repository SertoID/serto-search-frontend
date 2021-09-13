import { Warning } from "@rimble/icons";
import { Flex, Link, Text, Box } from "rimble-ui";
import { colors } from "serto-ui";
import { links } from "../../constants";

export const VcValidatorError: React.FunctionComponent = () => {
  return (
    <Flex alignItems="center" flexDirection="column" p={5}>
      <Flex maxWidth="600px">
        <Box width="75px" mr={3}>
          <Warning color={colors.warning.base} size="75px" />
        </Box>
        <Box flexGrow="1">
          <Text fontSize="30px" lineHeight="title" mb={5}>
            We are unable to verify this credential.
          </Text>
          <Text fontWeight={4} mb={5}>
            An error has occured when we try to verify this credential. Please contact the issuer for more information.
          </Text>
          <Text fontSize={1}>
            Do you believe this credential should have been verified? Please ensure you're entering the token string of
            the VC. If you believe your VC is valid, please let us know at{" "}
            <Link href={`mailto:${links.SUPPORT_EMAIL}`}>support@serto.id</Link>
          </Text>
        </Box>
      </Flex>
    </Flex>
  );
};
