import React, { useState } from "react";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors, H1, Tab, Tabs } from "serto-ui";
import { Search } from "../Search/Search";
import { hpSplashImg, Global, Viewport } from "../../components";
import { VcValidator } from "../VcValidator/VcValidator";
import { NftSearch } from "../NftSearch/NftSearch";

const tabs: Tab[] = [
  { tabName: "search", title: "Search", content: <Search /> },
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
            <Box maxWidth="780px" mb={[0, 7]} width="100%">
              <H1 color={baseColors.white} lineHeight="solid" mb={[1, 4]} mt={0}>
                Serto Search
              </H1>
              <Text color={baseColors.white} fontSize={[1, "16px"]} fontWeight={3} mb={[2, 5]} mt={0}>
                The internet’s source of entities represented by decentralized identitifers, or DIDs
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
      </Viewport>
    </Global>
  );
};
