import styled from "styled-components";
import { Box, Flex, Text, Link } from "rimble-ui";
import { baseColors, colors, CredentialCheckFilled, H1, H4 } from "serto-ui";
import { Global, Viewport } from "../../components";

const Circle = styled.div`
  background-color: ${baseColors.white};
  border: 2px solid ${colors.primary.base};
  border-radius: 50%;
  color: ${colors.primary.base};
  height: 32px;
  font-size: 16px;
  font-weight: 700;
  left: 0;
  margin-right: 8px;
  padding: 4px;
  position: absolute;
  text-align: center;
  top: -2px;
  width: 32px;
`;

export interface HowItWorksItemProps {
  last?: boolean;
  number?: string;
  title: string;
}

export const HowItWorksItem: React.FunctionComponent<HowItWorksItemProps> = (props) => {
  return (
    <Box pl={3} position="relative">
      {props.last ? (
        <Box left="0" position="absolute" top="-2px">
          <CredentialCheckFilled />
        </Box>
      ) : (
        <Circle>{props.number}</Circle>
      )}
      <Box borderLeft={props.last ? "none" : "1px dashed" + colors.primary.base} pb={5} pl={5}>
        <H4 mb={2} mt={0}>
          {props.title}
        </H4>
        <Text>{props.children}</Text>
      </Box>
    </Box>
  );
};

export const HowItWorksPage: React.FunctionComponent = () => {
  return (
    <Global banner searchBar>
      <Viewport fullBgColor={baseColors.white}>
        <Box m="50px auto 100px" maxWidth="850px" width="100%">
          <Box mb={5}>
            <H1 my={5}>How it works</H1>
            <Text.p>Serto Search is a discovery and verification tool for decentralized identities or DIDs.</Text.p>
            <Text.p>
              Businesses, brands and individuals listed on Serto Search control their own public identities.{" "}
              <b>This means they have all adopted a decentralized identifier (DID).</b>
            </Text.p>
            <Text.p>
              Our search engine displays cryptographically signed data, and anyone can independently check the original
              source for authenticity. <b>This means that anyone can verify Serto Search results.</b>
            </Text.p>
            <Text.p>Here’s how the process works:</Text.p>
          </Box>
          <Flex justifyContent="flex-end">
            <Box maxWidth="670px">
              <HowItWorksItem number="1" title="Create a decentralized identifier or DID">
                <Text mb={3}>
                  DIDs are like your public addresses that allow others to identify you. An IT Manager can create a DID
                  to represent an entity using Serto Agent, a low-code tool. A free version is available on{" "}
                  <Link href="https://aws.amazon.com/marketplace/pp/prodview-x55rqwei63kuw">AWS Marketplace</Link>.
                  Learn more about{" "}
                  <Link href="https://docs.serto.id/docs/serto-agent/aws-deploy">
                    launching a Serto Agent in AWS here
                  </Link>
                  .
                </Text>
                <Text>
                  Soon, Serto Agent, a low-code tool, will make this process easier. It is currently in private beta.
                </Text>
              </HowItWorksItem>
              <HowItWorksItem number="2" title="Generate a DID Configuration">
                <Text>
                  A DID Configuration is a file that contains a cryptographically signed Verfiable Credential (VC)
                  linking your site domain to your DID. Using Serto Agent, you can easily generate one after you create
                  a DID.
                </Text>
              </HowItWorksItem>
              <HowItWorksItem number="3" title="Store the DID Configuration file in your website">
                <Text>
                  Upload the file to the company website and host it under the well-known URI. The location of this file
                  may be: https://yourwebsite.com/.well-known/did-configuration.json
                </Text>
              </HowItWorksItem>
              <HowItWorksItem last title="Validated public addresses">
                <Text>
                  When anyone enters your domain name into Serto Search, they will find the public addresses with which
                  it is associated. In this way, your public address is directly verifiable.{" "}
                </Text>
              </HowItWorksItem>
              <Box bg={colors.primary.background} border={3} mt={5} p={4}>
                <H4 my={0}>Trust Anchors</H4>
                <Text.p>
                  Serto establishes this by piggybacking on the trustworthiness of the domain name. All domain names are
                  verified by the centralized entity known as ICANN through the Domain Name System (DNS). In being able
                  to control your domain name by adding the DID Configuration file to the website, you effectively
                  endorse your DID.
                </Text.p>
                <Text.p>
                  One endorsement alone is not infallible, but it is a starting point for authentication. The long-term
                  goal of Serto is to use multiple “trust anchors” to provide robust and deep verification of DIDs. Many
                  varied endorsements may come from corporations, institutions, the media, or social peers, among
                  others.
                </Text.p>
              </Box>
            </Box>
          </Flex>
        </Box>
      </Viewport>
    </Global>
  );
};
