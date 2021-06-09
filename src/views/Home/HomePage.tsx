import { Box, Text } from "rimble-ui";
import { baseColors, colors, H2, H3, Tab, TabbedSearch } from "serto-ui";
import { Search } from "../Search/Search";
import { Global, Viewport } from "../../components";
import { VcValidator } from "../VcValidator/VcValidator";
import { NftSearch } from "../NftSearch/NftSearch";

const tabs: Tab[] = [
  { tabName: "search", title: "Domains & DIDs", content: <Search /> },
  { tabName: "vc", title: "Validate VC", content: <VcValidator /> },
  { tabName: "nft", title: "NFT Lookup", content: <NftSearch /> },
];

export const HomePage: React.FunctionComponent = () => {
  return (
    <Global banner>
      <Box bg={colors.darkGray} position="relative">
        <Viewport>
          <Box maxWidth="750px" mx="auto" py={[5, 7]} width="100%">
            <H2 color={baseColors.white} lineHeight="solid" mb={1} mt={0}>
              Search Engine for Decentralized Identities (DIDs)
            </H2>
            <Text color={baseColors.white} fontSize={[1, "16px"]} fontWeight={3} mb={[2, 5]} mt={0}>
              Use Serto Search to verify credential issuers’ identity, and discover their public keys and endpoints.
            </Text>
            <Box mb={5}>
              <TabbedSearch tabs={tabs} activeTab="search" />
            </Box>
          </Box>
        </Viewport>
      </Box>
      <Viewport mb={7} mt={1}>
        <Box maxWidth="750px" mx="auto" mt={6}>
          <H3 mb={3} mt={0}>
            A Tool To Discover DIDs
          </H3>
          <Text mb={3}>
            This service uses innovative decentralized identity technology to create digital trust. Our goal is to
            provide the foundation for people, organizations, and entities to streamline and modernize digital services
            and Web3 activities.
          </Text>
          <Text mb={3}>
            Right now, you can use Serto Search to quickly verify an entity’s identity - who they say they are - as
            credential issuers. You can verify by seeing if an entity’s DID is cryptographically associated with their
            web address via DNS, and trust its provenance. Learn more about how this works.
          </Text>
          <Text mb={3}>
            In the future, Serto will offer multiple way to use “trust anchors” to provide robust and deep verification
            of DIDs. In addition, verifiable data and credentials will be added to offer each entity a more richer
            profile.
          </Text>
        </Box>
      </Viewport>
    </Global>
  );
};
