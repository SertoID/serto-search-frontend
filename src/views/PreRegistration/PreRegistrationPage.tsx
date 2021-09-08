import React from "react";
import { Box, Button, Flex, Link, Text } from "rimble-ui";
import { colors, H2, H4, H6 } from "serto-ui";
import { routes } from "../../constants";
import { Global, Viewport } from "../../components";

export const PreRegistrationPage: React.FunctionComponent = () => {
  return (
    <Global banner searchBar>
      <Viewport>
        <Flex m="0 auto 80px" maxWidth="720px">
          <Box py={5} px={3}>
            <H2>Add My Organization to Serto Search</H2>
            <H4 mb={2} mt={0}>Requirements</H4>
            <H6 color={colors.silver}>To add your organization, you must have the following completed:</H6>
            <ul>
              <li>You or your organization have/has created a decentralized identifier or DID.</li>
              <li>You have created a DID configuration file.</li>
              <li>You are hosting the DID configuration file on your or your organization's website domain.</li>
              <li>You have issued your own <Link href="https://beta.schemas.serto.id/schema/serto-organization-profile">organization's profile Verifiable Credential (VC)</Link> using Serto Agent. (you will need the JWT code). <Link href="http://beta.search.serto.id/how-it-works">Learn more about how this works</Link>.</li>
            </ul>
            <Text mb={5}>If you have not completed these steps, you may do so using our Serto Agent tool. You can find Serto Agent in the <Link href="https://beta.schemas.serto.id/schema/serto-organization-profile">AWS marketplace</Link>. Follow the instructions to launch your own Serto Agent instance.</Text>
            <Flex>
              <Button.Outline as="a" href={routes.HOMEPAGE}>
                Cancel
              </Button.Outline>
              <Button ml={3} as="a" href={routes.REGISTER}>
                Continue to Add My Organization
              </Button>
            </Flex>
          </Box>
        </Flex>
      </Viewport>
    </Global>
  );
};
