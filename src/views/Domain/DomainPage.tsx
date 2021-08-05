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
          <Box>
            <DomainHeader domain={data.domain} orgName={data.name} />
            <Tabs
              activeTabName={tabName || "identifiers"}
              tabs={[
                {
                  tabName: "dids",
                  title: "Public Addresses (DIDs)",
                  content: (
                    <Box p={[3, 5]}>
                      <Text color={colors.silver} fontSize={1} mb={4}>
                        A DID or decentralized identifiers is a unique way for an entity to identify themselves. They
                        are simply your public addresses that can be verified by others.{" "}
                        <LearnMoreLink
                          as="a"
                          href="https://www.w3.org/TR/did-core/#dfn-decentralized-identifiers"
                          color={colors.primary.base}
                          target="_blank"
                        >
                          Learn more about DIDs
                        </LearnMoreLink>
                      </Text>
                      {data.didDocEntries.map((didDocEntry: any, i: number) => {
                        return <DomainDidDetails didDocEntry={didDocEntry} key={didDocEntry.id} />;
                      })}
                    </Box>
                  ),
                },
                {
                  tabName: "didConfig",
                  title: "Trust Anchor for Domain Linkage",
                  content: (
                    <Box p={[3, 5]}>
                      <Box mb={5}>
                        <Flex alignItems="center">
                          <Fingerprint />
                          <Text pl={1}>DID Configuration file is hosted on</Text>
                        </Flex>
                        <Flex alignItems="center">
                          <IndentedArrow />
                          <IcoWeb />
                          <Text pl={1}>{data.domain}</Text>
                        </Flex>
                        <Flex alignItems="center" pl={3}>
                          <IndentedArrow />
                          <Verified />
                          <Text pl={1}>This domain linkage is valid</Text>
                        </Flex>
                      </Box>
                      <Text color={colors.silver} fontSize={1} mb={4}>
                        This DID Configuration cryptographically links the entity's DIDs to their domain. This file is
                        hosted on their webiste to prove that they control their domain.{" "}
                        <LearnMoreLink
                          as="a"
                          href="https://identity.foundation/specs/did-configuration/"
                          target="_blank"
                        >
                          Learn More
                        </LearnMoreLink>
                      </Text>
                      <Box position="relative">
                        <Box position="absolute" right={4} top={3} zIndex={1}>
                          <CopyToClipboard text={data.didConfigEntry.didConfig} textButton />
                        </Box>
                        <HighlightedJson json={data.didConfigEntry.didConfig} />
                      </Box>
                    </Box>
                  ),
                },
              ]}
              onTabClicked={(tabName) => setTabName(tabName)}
            />
          </Box>
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
