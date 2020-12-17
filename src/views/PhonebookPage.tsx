import * as React from "react";
import useSWR from "swr";
import { PhonebookContext } from "../context/PhonebookProvider";
import { PhonebookService } from "../services/PhonebookService";
import { AddCircle } from "@rimble/icons";
import { Box, Button, Flash, Flex, Input, Loader, Table, Text } from "rimble-ui";
import { CopyToClipboard, Header, HeaderBox, TBody, TH, THead, TR } from "../components";
import { baseColors, colors } from "../components/themes";
import { ListingDetails } from "./ListingDetails";
import { hexEllipsis } from "../utils/helpers";
import { routes } from "../constants";

export const PhonebookPage: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);

  const { data, error, isValidating } = useSWR("/entries", () => Phonebook.getEntries(), {
    revalidateOnFocus: false,
  });

  return (
    <Box maxWidth="1500px" m="0 auto">
      <HeaderBox>
        <Header heading="Phonebook">
          <Button as="a" href={routes.REGISTER} size="small">
            <AddCircle size="14px" mr={1} color={colors.primary.disabled} />
            Add Domain
          </Button>
        </Header>
        <Box borderTop={2} px={4} py={3} width="100%">
          <Input type="search" required={true} placeholder="Search" width="300px" />
        </Box>
      </HeaderBox>
      {data?.length > 0 ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Table border={0} boxShadow={0} width="100%">
            <THead borderTop={false}>
              <TR>
                <TH>Domain</TH>
                <TH>DID</TH>
                <TH></TH>
              </TR>
            </THead>
            <TBody>
              {data.map((entry: any, i: number) => {
                return (
                  <TR key={i}>
                    <td>{entry.domain}</td>
                    <td>
                      {entry.dids.map((did: any, x: number) => {
                        if (did !== undefined) {
                          return (
                            <React.Fragment key={x}>
                              <Text.span mr={1} title={did}>
                                {hexEllipsis(did)}
                              </Text.span>
                              <CopyToClipboard size="16px" text={did} />
                            </React.Fragment>
                          );
                        }
                        return <></>;
                      })}
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
          Error loading directory: {error.toString()}
        </Flash>
      ) : (
        <Flash my={3} variant="danger">
          Unknown Error
        </Flash>
      )}
    </Box>
  );
};
