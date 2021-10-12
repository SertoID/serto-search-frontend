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
  linkedId: string;
  didDocs: any[];
}

export interface SearchResultProps {
  searchResult: SearchResultTypes;
}

export const SearchResult: React.FunctionComponent<SearchResultProps> = (props) => {
  const { searchResult } = props;

  return (
    <OuterWrap as="a" href={"domain/" + searchResult.linkedId}>
      <StyledWrap p={[3, 5]}>
        <Box width="100%">
          <DidByDomain
            didDocs={searchResult.didDocs}
            didCopy
            domain={searchResult.linkedId}
            linkDomain={"domain/" + searchResult.linkedId}
          />
        </Box>
      </StyledWrap>
    </OuterWrap>
  );
};
