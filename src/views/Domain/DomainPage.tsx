import { useContext } from "react";
import useSWR from "swr";
import { useParams } from "react-router-dom";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Flash, Flex, Loader } from "rimble-ui";
import { colors, H3 } from "serto-ui";
import { DidDetails } from "./DidDetails";
import { ListingHeader } from "./ListingHeader";
import { ErrorMsg, Global, Viewport } from "../../components";

export const DomainPage: React.FunctionComponent = () => {
  const Phonebook = useContext<PhonebookService>(PhonebookContext);
  const { domain } = useParams<{ domain: string }>();
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
        {data?.linkedId ? (
          <Box mb={[3, 5]}>
            <ListingHeader
              didConfigEntry={data.didConfigEntry}
              domain={data.linkedId}
              orgName={data.name}
              platform="domain"
            />
            <Box px={[3, 5]}>
              <H3>Decentralized Identifiers (DIDs)</H3>
              {data.didDocEntries.map((didDocEntry: any, i: number) => {
                return (
                  <DidDetails
                    didDocEntry={didDocEntry}
                    domain={data.linkedId}
                    linkedIds={data.socialMediaLinkages}
                    key={didDocEntry.id}
                  />
                );
              })}
            </Box>
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
