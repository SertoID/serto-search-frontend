import React from "react";
import useSWR from "swr";
import { PhonebookContext } from "../context/PhonebookProvider";
import { PhonebookService } from "../services/PhonebookService";
import { Box, Flash, Flex, Loader, Table } from "rimble-ui";
import { baseColors, colors, H2, TBody, TH, TR } from "serto-ui";
import { THead } from "../components";
import { errorMsg } from "../utils/helpers";
import JSONPretty from 'react-json-pretty';

export interface DomainListingProps {
  domain?: string;
}

export const DomainListing: React.FunctionComponent<DomainListingProps> = (props) => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const { data, error, isValidating } = useSWR(
    ["/v1/domain-listing", props.domain],
    () => Phonebook.getDomainListing(props.domain || ""),
    {
      revalidateOnFocus: false,
    },
  );

  console.log("data: ", data);
  console.log("error: ", error);

  return (
    <>
      <H2>{data?.domain}</H2>
      {data?.didDocEntries?.length > 0 ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Table border={0} boxShadow={0} width="100%">
            <THead borderTop={false}>
              <TR>
                <TH>DID</TH>
                <TH>Full DIDDocument</TH>
              </TR>
            </THead>
            <TBody>
              {data.didDocEntries.map((entry: any, i: number) => {
                return (
                  <TR key={i}>
                    <td>{entry.did}</td>
                    <td>
                      <JSONPretty data={entry.didDoc} />
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