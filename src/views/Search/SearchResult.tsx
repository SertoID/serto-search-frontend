import styled from "styled-components";
import { Box, Flex } from "rimble-ui";
import { DidByDomain, VerificationStatus } from "serto-ui";

const StyledWrap = styled(Flex)`
  &:last-of-type {
    border-bottom: none;
  }
`;

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
    <StyledWrap borderBottom={2} flexWrap="wrap" justifyContent="space-between" p={[3, 5]}>
      <Box borderBottom={[2, 0]} flexGrow="1" maxWidth="700px" mb={[5, 0]} pb={[5, 0]} width={["100%", "auto"]}>
        <DidByDomain
          did={searchResult.dids}
          didCopy
          domain={searchResult.domain}
          linkDomain={"domain/" + searchResult.domain}
        />
      </Box>
      <Box ml={[0, 5]} width="250px">
        <VerificationStatus didConfig />
      </Box>
    </StyledWrap>
  );
};
