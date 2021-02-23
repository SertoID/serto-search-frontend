import React from "react";
import useSWR from "swr";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Flash, Flex, Loader, Table, Text } from "rimble-ui";
import { baseColors, colors, TBody, TH, TR } from "serto-ui";
import { CopyToClipboard, THead } from "../../components";
import { errorMsg } from "../../utils/helpers";
import { ListingDetails } from "./ListingDetails";
import { ellipsis } from "../../utils/helpers";

export interface ListingsProps {
  search?: string | null;
}

export const Listings: React.FunctionComponent<ListingsProps> = (props) => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const filter = props.search === null ? "" : props.search;
  const { data, error, isValidating } = useSWR(["/v1/search", filter], () => Phonebook.getEntries(filter), {
    revalidateOnFocus: false,
  });

  return (
    <>
      {data?.length > 0 ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Table border={0} boxShadow={0} width="100%">
            <THead borderTop={false}>
              <TR>
                <TH>Domain</TH>
                <TH>DIDs</TH>
                <TH></TH>
              </TR>
            </THead>
            <TBody>
              {data.map((entry: any, i: number) => {
                return (
                  <TR key={i}>
                    <td>{entry.domain}</td>
                    <td>
                      {/* eslint-disable-next-line */}
                      <Text.span key={i} mr={2}>
                        {/* eslint-disable-next-line */}
                        <Text.span mr={1} title={entry.dids}>
                          {ellipsis(entry.dids, 10, 4)}
                        </Text.span>
                        <CopyToClipboard hoverTitle="Copy DID" size="16px" text={entry.dids} />
                      </Text.span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <ListingDetails listingData={entry} />
                    </td>
                  </TR>
                );
              })}
            </TBody>
          </Table>
        </Box>
      ) : isValidating ? (
        <Flex minHeight={8} alignItems="center" justifyContent="center">
          <Loader color={colors.primary.base} size={5} />
        </Flex>
      ) : error ? (
        <Flash my={3} variant="danger">
          {errorMsg(error.message)}
        </Flash>
      ) : (
        <Flash my={3} variant="warning">
          No results.
        </Flash>
      )}
    </>
  );
};
