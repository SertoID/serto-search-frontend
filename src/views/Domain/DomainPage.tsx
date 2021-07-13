import React, { useState } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Flash, Flex, Loader, Text } from "rimble-ui";
import { colors, CopyToClipboard, Fingerprint, IcoWeb, IndentedArrow, Verified, HighlightedJson, Tabs } from "serto-ui";
import { DomainDidDetails } from "./DomainDidDetails";
import { DomainHeader } from "./DomainHeader";
import { ErrorMsg, Global, LearnMoreLink, Viewport } from "../../components";

export const DomainPage: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const { domain } = useParams<{ domain: string }>();
  const [tabName, setTabName] = useState("dids");
  const { data, error, isValidating } = useSWR(
    ["/v1/domain-listing", domain],
    () => Phonebook.getDomainListing(domain || ""),
    {
      revalidateOnFocus: false,
    },
  );

  return (
    <Global banner searchBar>
      <Viewport>
        {data?.domain ? (
          <Flex flexDirection="column">
            <DomainHeader domain={data.domain} orgName={data.name} />
            <Tabs 
            activeTabName={tabName || "identifiers"}
            tabs={[
              {
                tabName: "dids",
                title: "Public Addresses (DIDs)",
                content: (
                  <Flex>
                    <Box p={[3, 5]}>
                      <Box pb={5}>
                        <Text color={colors.silver} fontSize={2} mb={0}>
                          A DID or decentralized identifiers is a unique way for an entity to identify themselves. 
                          They are simply your public addresses that can be verified by others.{" "}
                          <LearnMoreLink as="a" href="https://www.w3.org/TR/did-core/#dfn-decentralized-identifiers" color={colors.primary.base}>
                            Learn more about DIDs
                          </LearnMoreLink>
                        </Text> 
                      </Box>
                      {data.didDocEntries.map((didDocEntry: any, i: number) => {
                        return (
                          <DomainDidDetails didDocEntry={didDocEntry} key={didDocEntry.id}/>
                        );
                      })}
                    </Box>
                  </Flex>),
              },
              {
                tabName: "didConfig",
                title: "Trust Anchor for Domain Linkage",
                content: (
                  <Flex>
                    <Box p={[3, 5]}>
                      <Flex alignItems="center" justifyContent="space-between">
                        <Box mr={3}>
                          <Flex flexDirection="column">
                            <Flex flexDirection="row" alignItems="center">
                              <Fingerprint />
                              <Text pl={1}>
                                DID Configuration file is hosted on
                              </Text>
                            </Flex>
                            <Flex flexDirection="row" alignItems="center">
                              <IndentedArrow />
                              <IcoWeb />
                              <Text pl={1}>{data.domain}</Text>
                            </Flex>
                            <Flex flexDirection="row" alignItems="center" pl={3}>
                              <IndentedArrow />
                              <Verified />
                              <Text pl={1}>This domain linkage is valid</Text>
                            </Flex>
                            <Text color={colors.silver} fontSize={2} mb={0} mt={2}>
                              This DID Configuration cryptographically links the entity's DIDs to their domain. This file is hosted on their webiste to prove that they control their domain. <LearnMoreLink as="a" href="https://identity.foundation/specs/did-configuration/">Learn More</LearnMoreLink>
                            </Text>
                          </Flex>
                        </Box>
                      </Flex>
                      <Box mt={3}>
                        <Box position="relative" width="80%">
                          <Box position="absolute" right={4} top={3} zIndex={1}>
                            <CopyToClipboard text={data.didConfigEntry.didConfig} textButton />
                          </Box>
                          <HighlightedJson json={data.didConfigEntry.didConfig} />
                        </Box>
                      </Box>
                    </Box>
                  </Flex>
                ),
              }
            ]}
            onTabClicked={(tabName) =>  setTabName(tabName)}
            />
            
            
          </Flex>
        ) : isValidating ? (
          <Flex minHeight={8} alignItems="center" justifyContent="center">
            <Loader color={colors.primary.base} size={5} />
          </Flex>
        ) : error ? (
          <Flash my={3} variant="danger">
            <ErrorMsg error={error.message} />
          </Flash>
        ) : (
          <Flash my={3} variant="warning">
            No results.
          </Flash>
        )}
      </Viewport>
    </Global>
  );
};
