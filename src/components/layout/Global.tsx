import * as React from "react";
import { Box } from "rimble-ui";
import { useWindowSize } from "serto-ui";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export interface GlobalProps {
  banner?: boolean;
  searchBar?: boolean;
  nftSearchBar?: boolean;
  vcBar?: boolean;
}

export const Global: React.FunctionComponent<GlobalProps> = (props) => {
  const size = useWindowSize();
  const mobile = size.width <= 800 ? true : false;
  console.log("nftSearchBar: ", props.nftSearchBar)
  return (
    <Box pt={props.banner ? "132px" : "72px"} position="relative" height="100vh" width="100%">
      <Nav {...props} mobile={mobile} />
      {props.children}
      <Footer />
    </Box>
  );
};
