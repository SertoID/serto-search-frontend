import * as React from "react";
import { Box } from "rimble-ui";

export const Viewport: React.FunctionComponent = (props) => {
  return (
    <Box maxWidth="1500px" m="0 auto" px={3} width="100%">
      {props.children}
    </Box>
  );
};
