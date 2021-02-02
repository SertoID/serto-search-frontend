import * as React from "react";
import { ArrowBack } from "@rimble/icons";
import { Box, Button } from "rimble-ui";
import { baseColors, H3 } from "serto-ui";
import { AddDomain } from "./AddDomain";

export const RegisterPage: React.FunctionComponent = () => {
  return (
    <Box bg={baseColors.white} borderRadius={1} boxShadow={2} maxWidth="480px" m="0 auto">
      <Button.Text icononly as="a" href="/">
        <ArrowBack mr={1} size="20px" />
      </Button.Text>
      <Box pb={5} px={3}>
        <H3 mt={0}>Add Domain</H3>
        <AddDomain />
      </Box>
    </Box>
  );
};
