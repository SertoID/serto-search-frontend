import React from "react";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors, H1 } from "serto-ui";
import { Search } from "../Search/Search";
import { hpSplashImg, Global, Viewport } from "../../components";

export const HomePage: React.FunctionComponent = () => {
  return (
    <Global>
      <Box bg={baseColors.black} my="auto" maxWidth="1440px" position="relative" width="100%">
        <img src={hpSplashImg} alt="Taken by Olena Sergienko" width="100%" />
        <Viewport>
          <Flex
            alignItems="center"
            height="100%"
            justifyContent="center"
            position="absolute"
            left="0"
            top="0"
            width="100%"
          >
            <Box maxWidth="780px" mb={7} width="100%">
              <H1 color={baseColors.white} lineHeight="solid" mb={4} mt={0}>
                Serto Search
              </H1>
              <Text color={baseColors.white} fontSize="18px" fontWeight={3} lineHeight="solid" mb={5} mt={0}>
                The internet’s source of entities represented by decentralized identitifers, or DIDs
              </Text>
              <Search />
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
