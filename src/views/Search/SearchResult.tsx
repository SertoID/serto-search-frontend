import { Link } from "react-router-dom";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors, DidView, DomainImage, H4, VerificationStatus } from "serto-ui";

export interface SearchResultTypes {
  domain: string;
  dids: any;
}

export interface SearchResultProps {
  searchResult: SearchResultTypes;
}

export const SearchResult: React.FunctionComponent<SearchResultProps> = (props) => {
  const { searchResult } = props;

  return (
    <Flex borderBottom={2} flexWrap="wrap" justifyContent="space-between" p={[3, 5]}>
      <Box borderBottom={[2, 0]} pb={[5, 0]} maxWidth="700px" mb={[5, 0]} width={["100%", "auto"]}>
        <Box mb={4}>
          <Link to={"domain/" + searchResult.domain} style={{ textDecoration: "none" }}>
            <Flex alignItems="center" mb={3}>
              <DomainImage domain={searchResult.domain} />
              <Text color={baseColors.black}>{searchResult.domain}</Text>
            </Flex>
            <H4 color={colors.primary.base} lineHeight="solid" mb={1} mt={0}>
              {searchResult.domain}
            </H4>
          </Link>
        </Box>
        <Box ml={[0, 5]}>
          <DidView did={searchResult.dids} />
        </Box>
      </Box>
      <Box ml={[0, 5]} width="250px">
        <VerificationStatus didConfig />
      </Box>
    </Flex>
  );
};
