import * as React from "react";
import useSWR from "swr";
import { PhonebookContext } from "../context/PhonebookProvider";
import { PhonebookService } from "../services/PhonebookService";
import { Box, Flash, Flex, Input, Loader, Table, Text } from "rimble-ui";
import { CopyToClipboard, Header, HeaderBox, TBody, TH, THead, TR } from "../components";
import { baseColors, colors } from "../components/themes";
import { AddDomain } from "./AddDomain";
import { ListingDetails } from "./ListingDetails";
import { hexEllipsis } from "../utils/helpers";

const mockPhonebook = {
  domain: "mesh.xyz",
  did: "did:ethr:rinkeby:0xcfa8829812f1b4fe09b27cacf7d36e4d1b5dce76",
  provider: "did:ethr:rinkeby",
  alias: "test",
  userName: "Consensys Mesh",
};
export const PhonebookPage: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);

  const { data, error, isValidating } = useSWR(
    "/v1/tenant/agent/dataStoreORMGetVerifiableCredentials",
    () => Phonebook.getIdentifiers(),
    {
      revalidateOnFocus: false,
    },
  );

  return (
    <Box maxWidth="1500px" m="0 auto">
      <HeaderBox>
        <Header heading="Phonebook">
          <AddDomain />
        </Header>
        <Box borderTop={2} px={4} py={3} width="100%">
          <Input type="search" required={true} placeholder="Search" width="300px" />
        </Box>
      </HeaderBox>
      <Box bg={baseColors.white} borderRadius={1} py={3}>
        <Table border={0} boxShadow={0} width="100%">
          <THead borderTop={false}>
            <TR>
              <TH>Domain</TH>
              <TH>Alias</TH>
              <TH>DID</TH>
              <TH></TH>
            </TR>
          </THead>
          <TBody>
            <TR>
              <td>mesh.xyz</td>
              <td>test</td>
              <td>
                <Text.span mr={2} title="did:ethr:rinkeby:0xd27bed1695fd0fee15556e4b7c8e8aea4c5c32b5">
                  {hexEllipsis("did:ethr:rinkeby:0xd27bed1695fd0fee15556e4b7c8e8aea4c5c32b5")}
                </Text.span>
                <CopyToClipboard size="16px" text={"did:ethr:rinkeby:0xd27bed1695fd0fee15556e4b7c8e8aea4c5c32b5"} />
              </td>
              <td style={{ textAlign: "right" }}>
                <ListingDetails listingData={mockPhonebook} />
              </td>
            </TR>
            <TR>
              <td>mesh.xyz</td>
              <td>test</td>
              <td>
                <Text.span mr={2} title="did:ethr:rinkeby:0xd27bed1695fd0fee15556e4b7c8e8aea4c5c32b5">
                  {hexEllipsis("did:ethr:rinkeby:0xd27bed1695fd0fee15556e4b7c8e8aea4c5c32b5")}
                </Text.span>
                <CopyToClipboard size="16px" text={"did:ethr:rinkeby:0xd27bed1695fd0fee15556e4b7c8e8aea4c5c32b5"} />
              </td>
              <td style={{ textAlign: "right" }}>
                <ListingDetails listingData={mockPhonebook} />
              </td>
            </TR>
            <TR>
              <td>mesh.xyz</td>
              <td>test</td>
              <td>
                <Text.span mr={2} title="did:ethr:rinkeby:0xd27bed1695fd0fee15556e4b7c8e8aea4c5c32b5">
                  {hexEllipsis("did:ethr:rinkeby:0xd27bed1695fd0fee15556e4b7c8e8aea4c5c32b5")}
                </Text.span>
                <CopyToClipboard size="16px" text={"did:ethr:rinkeby:0xd27bed1695fd0fee15556e4b7c8e8aea4c5c32b5"} />
              </td>
              <td style={{ textAlign: "right" }}>
                <ListingDetails listingData={mockPhonebook} />
              </td>
            </TR>
          </TBody>
        </Table>
      </Box>
      {/* data?.length > 0 ? (
        <Box bg={baseColors.white} borderRadius={1} py={3}>
          <Table border={0} boxShadow={0} width="100%">
            <THead borderTop={false}>
              <TR>
                <TH>Domain</TH>
                <TH>Alias</TH>
                <TH>DID</TH>
                <TH></TH>
              </TR>
            </THead>
            <TBody>
              {data.map((identity: any, i: number) => {
                return (
                  <TR key={i}>
                    <td>{identity.userName}</td>
                    <td>{identity.alias}</td>
                    <td>
                      <Text.span mr={1} title={identity.did}>
                        {hexEllipsis(identity.did)}
                      </Text.span>
                      <CopyToClipboard size="16px" text={identity.did} />
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <ListingDetails listingData={identity} />
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
      ) */}
    </Box>
  );
};
