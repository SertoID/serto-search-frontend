import React from "react";
import { Box } from "rimble-ui";
import { Header, HeaderBox } from "serto-ui";
import { useParams } from "react-router-dom";
import { DomainListing } from "./DomainListing";

interface ParamsType {
  domain: string;
}

export const DomainListingPage: React.FunctionComponent = () => {
  const params = useParams<ParamsType>();
  const { domain } = params;

  return (
    <Box maxWidth="1500px" m="0 auto">
      <HeaderBox>
        <Header heading="Phonebook" />
      </HeaderBox>
      <DomainListing domain={domain} />
    </Box>
  );
};
