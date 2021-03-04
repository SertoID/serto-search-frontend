import * as React from "react";
import { Box, Flex } from "rimble-ui";

export interface ViewportProps {
  fullBgColor?: string;
  fullBorderBottom?: string | number;
  fullBorderTop?: string | number;
  innerBgColor?: string;
  innerBorderBottom?: string | number;
  innerBorderTop?: string | number;
  mb?: string | number;
  mt?: string | number;
}

export const Viewport: React.FunctionComponent<ViewportProps> = (props) => {
  return (
    <Flex
      bg={props.fullBgColor}
      borderBottom={props.fullBorderBottom}
      borderTop={props.fullBorderTop}
      justifyContent="center"
      mb={props.mb}
      mt={props.mt}
      width="100%"
    >
      <Box
        bg={props.innerBgColor}
        borderBottom={props.innerBorderBottom}
        borderTop={props.innerBorderTop}
        px={4}
        maxWidth="1440px"
        width="100%"
      >
        {props.children}
      </Box>
    </Flex>
  );
};
