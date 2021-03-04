import React from "react";
import { routes } from "../../constants";
import { Box, Button, Flex, Link } from "rimble-ui";
import { colors, SertoSearchLogo } from "serto-ui";
import { Viewport } from "../";
import { Search } from "../../views/Search/Search";
import { Banner } from "./Banner";

export interface NavLinkProps {
  href: string;
}

export const NavLink: React.FunctionComponent<NavLinkProps> = (props) => {
  return (
    <Link href={props.href} color={colors.primary.base} fontWeight={3} mr={4}>
      {props.children}
    </Link>
  );
};

export interface NavProps {
  banner?: boolean;
  searchBar?: boolean;
}

export const Nav: React.FunctionComponent<NavProps> = (props) => {
  return (
    <Box position="fixed" top="0" width="100%" zIndex="1">
      {props.banner && <Banner />}
      <Box bg={colors.primary.border} boxShadow={1}>
        <Viewport>
          <Flex alignItems="center" height="72px" justifyContent="space-between">
            <Flex alignItems="center" width="33%">
              <Link href={routes.HOMEPAGE} mr={6}>
                <SertoSearchLogo />
              </Link>
              <NavLink href={routes.HOW_IT_WORKS}>How it works</NavLink>
            </Flex>
            {props.searchBar && (
              <Flex justifyContent="center" width="33%">
                <Box width="500px">
                  <Search />
                </Box>
              </Flex>
            )}
            <Flex justifyContent="flex-end" width="33%">
              <Button as="a" href={routes.REGISTER}>
                Add Domain
              </Button>
            </Flex>
          </Flex>
        </Viewport>
      </Box>
    </Box>
  );
};
