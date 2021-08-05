import styled from "styled-components";
import { Box } from "rimble-ui";
import { DidByDomain } from "serto-ui";

const StyledWrap = styled(Box)`
  &:last-of-type {
    border-bottom: none;
  }
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
    <StyledWrap p={[3, 5]}>
      <Box width="100%">
        <DidByDomain
          didDocs={searchResult.didDocs}
          didCopy={false}
          domain={searchResult.domain}
          linkDomain={"domain/" + searchResult.domain}
        />
      </Box>
    </StyledWrap>
  );
};
