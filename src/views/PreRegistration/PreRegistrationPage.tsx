import React from "react";
import { Box, Button, Flex, Text } from "rimble-ui";
import { H2, H4 } from "serto-ui";
import { routes } from "../../constants";
import { Global, Viewport } from "../../components";

export const PreRegistrationPage: React.FunctionComponent = () => {
  return (
    <Global banner searchBar>
      <Viewport>
        <Flex m="0 auto 80px" maxWidth="720px">
          <Box py={5} px={3}>
            <H2>Add My Organization to Serto Search</H2>
            <H4 mb={2} mt={0}>
              Requirements
            </H4>
            <Text>To add your organization, you must have the following completed:</Text>
            <ul>
              <li>You or your organization have/has created a decentralized identifier or DID.</li>
              <li>You have created a DID configuration file.</li>
              <li>You are hosting the DID configuration file on your or your organization's website domain.</li>
              <li>
                You have issued your own organization's profile Verifiable Credential (VC) using Serto Agent. (you will
                need the JWT code). Learn more about how this works.
              </li>
            </ul>
            <Text mb={5}>
              If you have not completed these steps, you may do so using our Serto Agent tool. You can find Serto Agent
              int he AWS marketplace. Follow the instructions to launch your own Serto Agent instance.
            </Text>
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
