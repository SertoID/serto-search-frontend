import * as React from "react";
import { Box } from "rimble-ui";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export interface GlobalProps {
}

export const Global: React.FunctionComponent<GlobalProps> = (props) => {
  return (
    <Box pt="72px" position="relative" height="100vh" width="100%">
      <Nav />
      {props.children}
      <Footer />
    </Box>
  );
};
