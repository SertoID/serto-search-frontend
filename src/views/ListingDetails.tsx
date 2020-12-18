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
          <Box mb={4} mt={2}>
            <H6 mb={1} mt={0}>
              DIDs
            </H6>
            {listingData.dids.map((did: any, i: number) => {
              if (did !== "undefined") {
                return (
                  <Box key={i} borderTop={2} mt={2} pt={2}>
                    <Text.span fontSize={1} mb={2} mr={1}>
                      {did}
                    </Text.span>
                    <CopyToClipboard hoverTitle="Copy DID" size="16px" text={did} />
                  </Box>
                );
              }
              return <React.Fragment key={i} />;
            })}
          </Box>
          <Box mb={4}>
            <H6 mb={1} mt={0}>
              Well Known URI
            </H6>
            <Text.span fontSize={1} display="block" mb={2}>
              <a href={listingData.wellKnownUri} target="_blank" rel="noopener noreferrer">
                {listingData.wellKnownUri}
              </a>
            </Text.span>
          </Box>
        </ModalContent>
      </ModalWithX>
    </>
  );
};
