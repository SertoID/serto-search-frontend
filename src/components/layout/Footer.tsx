import * as React from "react";
import { links, routes } from "../../constants";
import { Box, Flex, Link, Text } from "rimble-ui";
import { colors, H6 } from "serto-ui";
import { SertoIcon } from "../elements";
import { Viewport } from "./";

export interface FooterLinkProps {
  href: string;
}

export const FooterLink: React.FunctionComponent<FooterLinkProps> = (props) => {
  return (
    <Link href={props.href} color={colors.midGray} fontWeight={2} mb={2}>
      {props.children}
    </Link>
  );
};

export const Footer: React.FunctionComponent = () => {
  const date = new Date();
  const year = date.getFullYear();

  return (
    <Viewport>
      <Flex alignItems="center" justifyContent="space-between" py={5} width="100%">
        <Flex>
          <Flex flexDirection="column" minWidth="200px">
            <H6 mt={0} mb={2}>
              Products
            </H6>
            <FooterLink href={links.SERTO_AGENT}>Serto Agent</FooterLink>
            <FooterLink href={links.SERTO_SCHEMAS}>Serto Schemas</FooterLink>
          </Flex>
          <Flex flexDirection="column" minWidth="200px">
            <H6 mt={0} mb={2}>
              Company
            </H6>
            <FooterLink href={links.SERTO}>Serto.id</FooterLink>
            <FooterLink href={links.SUPPORT}>Support</FooterLink>
            <FooterLink href={links.FEEDBACK}>Send Feedback</FooterLink>
          </Flex>
          <Flex flexDirection="column" minWidth="200px">
            <H6 mt={0} mb={2}>
              &nbsp;
            </H6>
            <FooterLink href={routes.TERMS}>Terms</FooterLink>
            <FooterLink href={routes.PRIVACY}>Privacy</FooterLink>
          </Flex>
        </Flex>
        <Box>
          <Box mb={1}>
            <SertoIcon />
          </Box>
          <Text textAlign="right" color={colors.midGray} fontSize={0}>
            &#169;{year} Serto
          </Text>
          <Text textAlign="right" color={colors.midGray} fontSize={0}>
            <i>Data meets identity.</i>
          </Text>
        </Box>
      </Flex>
    </Viewport>
  );
};
