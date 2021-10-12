import { AddCircle } from "@rimble/icons";
import { Box, Button, Flex, Text } from "rimble-ui";
import { colors } from "serto-ui";
import { routes } from "../../constants";
import { RegisterGlobal } from "./RegisterGlobal";

export const PreRegistrationPage: React.FunctionComponent = () => {
  return (
    <RegisterGlobal>
      <Text color={colors.midGray} mb={5}>
        Would you like to list a social network account or domain?
      </Text>
      <Box border={4} borderRadius={1} maxWidth="450px" mb={4} p={4}>
        <Flex>
          <AddCircle color={colors.primary.base} mr={4} size="40px" />
          <Box>
            <Text color={colors.primary.base}>List a social network account</Text>
            <Text color={colors.silver} mb={3}>
              You can use any accounts from social networks like Twitter, Reddit, or Github, etc.
            </Text>
          </Box>
        </Flex>
        <Box textAlign="center">
          <Button as="a" href={routes.REGISTER_SOCIAL} size="small">
            List account
          </Button>
        </Box>
      </Box>
      <Box border={4} borderRadius={1} maxWidth="450px" mb={4} p={4}>
        <Flex>
          <AddCircle color={colors.primary.base} mr={4} size="40px" />
          <Box>
            <Text color={colors.primary.base}>List a domain</Text>
            <Text color={colors.silver} mb={3}>
              This is your organization’s domain name.
            </Text>
          </Box>
        </Flex>
        <Box textAlign="center">
          <Button as="a" href={routes.REGISTER_DOMAIN} size="small">
            List domain
          </Button>
        </Box>
      </Box>
    </RegisterGlobal>
  );
};
