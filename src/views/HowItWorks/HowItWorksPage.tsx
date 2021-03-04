import React from "react";
import { Flex, Text } from "rimble-ui";
import { baseColors, colors, H1, H3 } from "serto-ui";
import { links } from "../../constants";
import { Global, Viewport } from "../../components";

export interface HowItWorksItemProps {
  number: string;
}

export const HowItWorksItem: React.FunctionComponent<HowItWorksItemProps> = (props) => {
  return (
    <Flex maxWidth="450px" mb={5} mx="auto">
      <H3 color={colors.primary.base} mr={2} my={0} textAlign="right" width="50px">
        {props.number}
      </H3>
      <Text>{props.children}</Text>
    </Flex>
  );
};

export const HowItWorksPage: React.FunctionComponent = () => {
  return (
    <Global banner searchBar>
      <Viewport fullBgColor={baseColors.white}>
        <H1 my={6} textAlign="center">
          How it works?
        </H1>
        <HowItWorksItem number="01.">
          Businesses, brands and individuals listed on Serto Search control their own public identities.{" "}
          <b>This means they have all adopted a decentralized identifier (DID).</b>
        </HowItWorksItem>
        <HowItWorksItem number="02.">
          Serto Search results show information taken directly from each entry's own website, Twitter account or other
          forms of social identity. <b>This helps Serto Search provide human-readable search results.</b>
        </HowItWorksItem>
        <HowItWorksItem number="03.">
          Serto Search displays cryptographically signed data, so anyone can independently check the original source.{" "}
          <b>This means that anyone can verify Serto Search results.</b>
        </HowItWorksItem>
        <HowItWorksItem number="04.">
          Use Serto Search to <b>verify the source</b> of information you find in the wild.
        </HowItWorksItem>
        <Text mb={7} mt={6} textAlign="center">
          Want to add your domain but need help with creating a DID? We’re here to help.{" "}
          <a href={links.FEEDBACK} rel="noreferrer" target="_blank" style={{ color: colors.primary.base }}>
            Contact us
          </a>
          .
        </Text>
      </Viewport>
    </Global>
  );
};
