import * as React from "react";
import { Box } from "rimble-ui";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export interface GlobalProps {
  showSearch?: boolean;
}

export const Global: React.FunctionComponent<GlobalProps> = (props) => {
  return (
    <Box pt="72px" position="relative" height="100vh" width="100%">
      <Nav showSearch={props.showSearch} />
      {props.children}
      <Footer />
    </Box>
  );
};
