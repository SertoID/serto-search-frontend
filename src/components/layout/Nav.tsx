import React, { useState } from "react";
import { routes } from "../../constants";
import { Button, Flex, Link, Text } from "rimble-ui";
import { colors } from "serto-ui";
import { SearchBox, SertoSearchIcon } from "../elements";

export interface NavProps {}

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

export const Nav: React.FunctionComponent<NavProps> = (props) => {
  const [search, setSearch] = useState("");

  console.log(search);

  return (
    <Flex
      alignItems="center"
      bg={colors.primary.border}
      height="72px"
      justifyContent="space-between"
      p={3}
      position="fixed"
      top="0"
      width="100%"
      zIndex="1"
    >
      <SertoSearchIcon />
      <Flex alignItems="center">
        <NavLink href={routes.HOW_IT_WORKS}>How it works</NavLink>
        <SearchBox onSearch={(searchVal) => setSearch(searchVal)} />
      </Flex>
      <Flex alignItems="center">
        <NavLink href={routes.LOGIN}>Login</NavLink>
        <Button as="a" href={routes.JOIN} >Join Free</Button>
      </Flex>
    </Flex>
  );
};
