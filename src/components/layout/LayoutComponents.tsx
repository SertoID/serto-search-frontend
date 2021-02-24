import * as React from "react";
import styled from "styled-components";
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

/* TODO: minor differences in this and the serto-ui version update serto-ui version */

interface StyledTableProps {
  borderTop?: boolean;
}

export const THead = styled.thead`
  border-top: ${(props: StyledTableProps) => (props.borderTop === false ? "none" : "1px solid #edecfa")};

  th:first-of-type {
    padding: 16px 16px 16px 24px !important;
  }

  th:last-of-type {
    padding: 16px 24px 16px 16px !important;
  }
`;
