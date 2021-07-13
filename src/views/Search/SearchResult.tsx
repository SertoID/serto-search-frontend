import styled from "styled-components";
import { Box, Flex } from "rimble-ui";
import { DidByDomain } from "serto-ui";

const StyledWrap = styled(Flex)`
  &:last-of-type {
    border-bottom: none;
  }
`;

export interface SearchResultTypes {
  domain: string;
  dids: any;
  didDocs: any[];
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
          didDocs={searchResult.didDocs}
          didCopy={false}
          domain={searchResult.domain}
          linkDomain={"domain/" + searchResult.domain}
        />
      </Box>
    </StyledWrap>
  );
};
