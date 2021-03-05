import React from "react";
import { routes } from "../../constants";
import { Box, Button, Flex, Icon, Link } from "rimble-ui";
import { colors, SertoSearchLogo } from "serto-ui";
import { Viewport } from "../";
import { Search } from "../../views/Search/Search";
import { Banner } from "./Banner";
import { useToggle } from "../hooks";

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
  mobile: boolean;
  searchBar?: boolean;
}

export const Nav: React.FunctionComponent<NavProps> = (props) => {
  const [isOpen, toggleIsOpen] = useToggle(false);

  if (props.mobile) {
    return (
      <Box position="fixed" top="0" width="100%" zIndex="10">
        {props.banner && <Banner />}
        <Box bg={colors.primary.border} boxShadow={1}>
          <Viewport>
            <Box position="relative">
              <Flex alignItems="center" height="72px" justifyContent="space-between">
                <Link href={routes.HOMEPAGE} mr={6}>
                  <SertoSearchLogo />
                </Link>
                {isOpen ? (
                  <Icon color={colors.primary.base} name="Close" onClick={toggleIsOpen} />
                ) : (
                  <Icon color={colors.primary.base} name="Dehaze" onClick={toggleIsOpen} />
                )}
              </Flex>
              {isOpen && (
                <Box
                  bg={colors.primary.border}
                  borderTop={1}
                  boxShadow={1}
                  left={"-16px"}
                  p={3}
                  position="absolute"
                  width="calc(100% + 32px)"
                >
                  <Box borderBottom={1} mb={3} pb={3} width="100%">
                    <NavLink href={routes.HOW_IT_WORKS}>How it works</NavLink>
                  </Box>
                  <Box borderBottom={1} mb={3} pb={3} width="100%">
                    <Button as="a" href={routes.REGISTER} width="100%">
                      Add Domain
                    </Button>
                  </Box>
                  <Box pb={3} width="100%">
                    <Search />
                  </Box>
                </Box>
              )}
            </Box>
          </Viewport>
        </Box>
      </Box>
    );
  }

  return (
    <Box position="fixed" top="0" width="100%" zIndex="10">
      {props.banner && <Banner />}
      <Box bg={colors.primary.border} boxShadow={1}>
        <Viewport>
          <Flex alignItems="center" height="72px" justifyContent="space-between">
            <Flex alignItems="center" width="30%">
              <Link href={routes.HOMEPAGE} mr={5}>
                <SertoSearchLogo />
              </Link>
              <NavLink href={routes.HOW_IT_WORKS}>How it works</NavLink>
            </Flex>
            {props.searchBar && (
              <Flex justifyContent="center" width="39%">
                <Search />
              </Flex>
            )}
            <Flex justifyContent="flex-end" width="30%">
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
