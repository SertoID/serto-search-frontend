import React, { useState } from "react";
import { Box, Button, Text } from "rimble-ui";
import { CopyToClipboard, H6, ModalWithX, ModalContent, ModalHeader } from "../components";

export interface Listing {
  domain: string;
  dids: any;
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
          <Box mb={3}>
            <H6 mb={1} mt={0}>
              DIDs
            </H6>
            {listingData.dids.map((did: any, i: number) => {
              if (did !== undefined) {
                return (
                  <React.Fragment key={i}>
                    <Text.span display="block" mb={2}>
                      {did}
                    </Text.span>
                    <CopyToClipboard size="16px" text={did} textButton="Copy DID" />
                  </React.Fragment>
                );
              }
              return <></>;
            })}
          </Box>
          <Box mb={3}>
            <H6 mb={1} mt={0}>
              Well Known URI
            </H6>
            <Text.span display="block" mb={2}>
              {listingData.wellKnownUri}
            </Text.span>
          </Box>
        </ModalContent>
      </ModalWithX>
    </>
  );
};
