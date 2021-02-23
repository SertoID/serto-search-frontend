import React, { useState } from "react";
import { routes } from "../../constants";
import { Box, Button, Flex, Link } from "rimble-ui";
import { colors } from "serto-ui";
import { SearchBox, SertoSearchIcon } from "../elements";
import { Viewport } from "./";

export interface NavLinkProps {
  href: string;
}

export const NavLink: React.FunctionComponent<NavLinkProps> = (props) => {
  return (
    <Link href={props.href} color={colors.primary.base} fontWeight={2} mr={4}>
      {props.children}
    </Link>
  );
};

export const Nav: React.FunctionComponent = () => {
  const [search, setSearch] = useState("");

  console.log(search);

  return (
    <Box bg={colors.primary.border} position="fixed" top="0" width="100%" zIndex="1">
      <Viewport>
        <Flex alignItems="center" height="72px" justifyContent="space-between">
          <SertoSearchIcon />
          <Flex alignItems="center">
            <NavLink href={routes.HOW_IT_WORKS}>How it works</NavLink>
            <Box width="500px">
              <SearchBox onSearch={(searchVal) => setSearch(searchVal)} />
            </Box>
          </Flex>
          <Flex alignItems="center">
            <NavLink href={routes.LOGIN}>Login</NavLink>
            <Button as="a" href={routes.JOIN}>
              Join Free
            </Button>
          </Flex>
        </Flex>
      </Viewport>
    </Box>
  );
};
