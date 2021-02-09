import React, { useState } from "react";
import { Box, Button, Text } from "rimble-ui";
import { H6, ModalWithX, ModalContent, ModalHeader } from "serto-ui";
import { CopyToClipboard } from "../components";

export interface Listing {
  domain: string;
  did: string;
  wellKnownUri: string;
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
          <Box mb={4} mt={2}>
            <H6 mb={1} mt={0}>
              DID
            </H6>
              <Box borderTop={2} mt={2} pt={2}>
                {/* eslint-disable-next-line */}
                <Text.span fontSize={1} mb={2} mr={1}>
                  {listingData.did}
                </Text.span>
                <CopyToClipboard hoverTitle="Copy DID" size="16px" text={listingData.did} />
              </Box>
          </Box>
        </ModalContent>
      </ModalWithX>
    </>
  );
};