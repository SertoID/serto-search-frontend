import * as React from "react";
import { Box, Flex } from "rimble-ui";

export interface ViewportProps {
  fullWidthBgColor?: string;
  innerBgColor?: string;
}

export const Viewport: React.FunctionComponent<ViewportProps> = (props) => {
  return (
    <Flex bg={props.fullWidthBgColor} justifyContent="center" width="100%">
      <Box bg={props.innerBgColor} px={4} maxWidth="1500px" width="100%">
        {props.children}
      </Box>
    </Flex>
  );
};
