import React, { useState } from "react";
import { Box, Button, Text } from "rimble-ui";
import { H6, ModalWithX, ModalContent, ModalHeader } from "serto-ui";
import { CopyToClipboard } from "../components";
import { Link } from "react-router-dom";

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

  return (
    <>
      <Link to={"domain/" + listingData.domain}>
        View Details
      </Link>
    </>
  );
};