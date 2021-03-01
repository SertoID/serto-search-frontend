import * as React from "react";
import { Box } from "rimble-ui";
import { baseColors, H3 } from "serto-ui";
import { AddDomain } from "./AddDomain";
import { Global } from "../../components";

export const RegisterPage: React.FunctionComponent = () => {
  return (
    <Global showSearch>
      <Box bg={baseColors.white} border={2} borderRadius={1} boxShadow={2} maxWidth="480px" m="50px auto 100px">
        <Box py={5} px={3}>
          <H3 mt={0}>Add Domain</H3>
          <AddDomain />
        </Box>
      </Box>
    </Global>
  );
};
