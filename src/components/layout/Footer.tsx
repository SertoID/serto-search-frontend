import * as React from "react";
import { links, routes } from "../../constants";
import { Box, Flex, Link, Text } from "rimble-ui";
import { baseColors, colors, H6, SertoLogo } from "serto-ui";
import { Viewport } from "../";

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
    <Viewport fullBorderTop={2} fullBgColor={baseColors.white}>
      <Flex alignItems="center" flexWrap="wrap" justifyContent="space-between" py={5} width="100%">
        <Flex flexWrap="wrap">
          <Flex flexDirection="column" maxWidth="450px" mb={5} mr={5}>
            <H6 mt={0} mb={2}>
              About This Site
            </H6>
            <Text color={colors.midGray} fontSize={2} fontWeight={2}>
              Serto Search helps everyone find people and organizations that are set up for blockchain and web3
              activities.
            </Text>
          </Flex>
          <Flex flexDirection="column" mb={5} mr={5}>
            <H6 mt={0} mb={2}>
              Company
            </H6>
            <FooterLink href={links.SERTO}>Serto.id</FooterLink>
            <FooterLink href={routes.HOW_IT_WORKS}>How Serto Search works</FooterLink>
            <FooterLink href={links.FEEDBACK}>Send Feedback</FooterLink>
          </Flex>
          <Flex flexDirection="column" mb={5} mr={5}>
            <H6 mt={0} mb={2}>
              Social
            </H6>
            <FooterLink href={links.TWITTER}>Twitter</FooterLink>
            <FooterLink href={links.BLOG}>Blog</FooterLink>
            <Flex alignItems="flex-start">
              <FooterLink href={links.TERMS}>Terms of use</FooterLink>
              {/* eslint-disable-next-line */}
              <Text.span color={colors.midGray} fontSize={1} fontWeight={2} lineHeight="title">
                &nbsp;and&nbsp;
              </Text.span>
              <FooterLink href={links.PRIVACY}> Privacy</FooterLink>
            </Flex>
          </Flex>
        </Flex>
        <Box>
          <Box mb={1}>
            <Link href={links.SERTO}>
              <SertoLogo />
            </Link>
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
