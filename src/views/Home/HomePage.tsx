import React, { useState } from "react";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors, H2, H3, Tab, Tabs } from "serto-ui";
import { Search } from "../Search/Search";
import { hpSplashImg, Global, Viewport } from "../../components";
import { VcValidator } from "../VcValidator/VcValidator";
import { NftSearch } from "../NftSearch/NftSearch";

const tabs: Tab[] = [
  { tabName: "search", title: "Domains & DIDs", content: <Search /> },
  { tabName: "vc", title: "Validate VC", content: <VcValidator /> },
  { tabName: "nft", title: "NFT Lookup", content: <NftSearch /> },
];

export const HomePage: React.FunctionComponent = () => {
  const [activeTabName, setActiveTabName] = useState("search");
  return (
    <Global banner>
      <Box bg={baseColors.black} mx="auto" maxWidth="1440px" position="relative" width="100%">
        <img src={hpSplashImg} alt="Taken by Olena Sergienko" width="100%" />
        <Viewport>
          <Flex
            alignItems="center"
            height="100%"
            justifyContent="center"
            p={4}
            position="absolute"
            left="0"
            top="0"
            width="100%"
          >
            <Box maxWidth="750px" mb={[0, 7]} width="100%">
              <H2 color={baseColors.white} lineHeight="solid" mb={1} mt={0}>
                Search Engine for Decentralized Identities (DIDs)
              </H2>
              <Text color={baseColors.white} fontSize={[1, "16px"]} fontWeight={3} mb={[2, 5]} mt={0}>
                Use Serto Search to verify credential issuers’ identity, and discover their public keys and endpoints.
              </Text>
              <Tabs tabs={tabs} activeTabName={activeTabName} onTabClicked={(tabName) => setActiveTabName(tabName)} />
            </Box>
          </Flex>
        </Viewport>
      </Box>
      <Viewport mb={7} mt={1}>
        <Text color={colors.silver} fontSize={0}>
          Photo by Olena Sergienko
        </Text>
        <Box maxWidth="750px" mx="auto" mt={6}>
          <H3 mb={3} mt={0}>A Tool To Discover DIDs</H3>
          <Text mb={3}>
            This service uses innovative decentralized identity technology to create digital trust. Our goal is to provide
            the foundation for people, organizations, and entities to streamline and modernize digital services and Web3
            activities.
          </Text>
          <Text mb={3}>
            Right now, you can use Serto Search to quickly verify an entity’s identity - who they say they are - as
            credential issuers. You can verify by seeing if an entity’s DID is cryptographically associated with their web
            address via DNS, and trust its provenance. Learn more about how this works.
          </Text>
          <Text mb={3}>
            In the future, Serto will offer multiple way to use “trust anchors” to provide robust and deep verification of
            DIDs. In addition, verifiable data and credentials will be added to offer each entity a more richer profile.
          </Text>
        </Box>
      </Viewport>
    </Global>
  );
};
