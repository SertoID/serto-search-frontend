import styled from "styled-components";
import { Box, Flex } from "rimble-ui";
import { DidByDomain } from "serto-ui";

const StyledWrap = styled(Box)`
  &:last-of-type {
    border-bottom: none;
  }
`;

const OuterWrap = styled(Flex)`
  text-decoration: none;
`;

export interface SearchResultTypes {
  domain: string;
  didDocs: any[];
}

export interface SearchResultProps {
  searchResult: SearchResultTypes;
}

export const SearchResult: React.FunctionComponent<SearchResultProps> = (props) => {
  const { searchResult } = props;

  return (
    <OuterWrap as="a" href={"domain/" + searchResult.domain}>
      <StyledWrap p={[3, 5]}>
        <Box width="100%">
          <DidByDomain
            didDocs={searchResult.didDocs}
            didCopy
            domain={searchResult.domain}
            linkDomain={"domain/" + searchResult.domain}
          />
        </Box>
      </StyledWrap>
    </OuterWrap>
  );
};
