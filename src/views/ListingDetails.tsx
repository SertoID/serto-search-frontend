import React, { useState } from "react";
import { Box, Button, Text } from "rimble-ui";
import { CopyToClipboard, H6, ModalWithX, ModalContent, ModalHeader } from "../components";

export interface Listing {
  domain: string;
  did: string;
  provider: string;
  alias?: string;
  userName?: string;
  userType?: string;
}

interface ListingDetailsProps {
  listingData: Listing;
}

export const ListingDetails: React.FunctionComponent<ListingDetailsProps> = (props) => {
  const { listingData } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button.Outline onClick={() => setIsModalOpen(true)} size="small">
        View Details
      </Button.Outline>
      <ModalWithX isOpen={isModalOpen} close={() => setIsModalOpen(false)} borderRadius={2} width="560px">
        <ModalHeader>{listingData.domain}</ModalHeader>
        <ModalContent>
          {listingData.userName && (
            <Box mb={3}>
              <H6 mb={1} mt={0}>
                Organization
              </H6>
              <Text.span> {listingData.userName}</Text.span>
            </Box>
          )}
          {listingData.alias && (
            <Box mb={3}>
              <H6 mb={1} mt={0}>
                Alias
              </H6>
              <Text.span> {listingData.alias}</Text.span>
            </Box>
          )}
          <Box mb={3}>
            <H6 mb={1} mt={0}>
              DID
            </H6>
            <Text.span display="block" mb={2}>{listingData.did}</Text.span>
          <CopyToClipboard size="16px" text={listingData.did} textButton="Copy DID" />
          </Box>
          <Box mb={3}>
            <H6 mb={1} mt={0}>
              Provider
            </H6>
            <Text.span>{listingData.provider}</Text.span>
          </Box>
        </ModalContent>
      </ModalWithX>
    </>
  );
};
