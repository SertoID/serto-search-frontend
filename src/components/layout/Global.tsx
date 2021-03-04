import * as React from "react";
import { Box } from "rimble-ui";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export interface GlobalProps {
  banner?: boolean;
  searchBar?: boolean;
}

export const Global: React.FunctionComponent<GlobalProps> = (props) => {
  return (
    <Box pt={props.banner ? "132px" : "72px"} position="relative" height="100vh" width="100%">
      <Nav banner={props.banner} searchBar={props.searchBar} />
      {props.children}
      <Footer />
    </Box>
  );
};
