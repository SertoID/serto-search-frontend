import React, { useState } from "react";
import { routes } from "../constants";
import { AddCircle } from "@rimble/icons";
import { Box, Button } from "rimble-ui";
import { Header, HeaderBox, SearchBox } from "../components";
import { colors } from "../components/themes";
import { Listings } from "./Listings";

export const PhonebookPage: React.FunctionComponent = () => {
  const [search, setSearch] = useState("");

  return (
    <Box maxWidth="1500px" m="0 auto">
      <HeaderBox>
        <Header heading="Phonebook">
          <Button as="a" href={routes.REGISTER} size="small">
            <AddCircle size="14px" mr={1} color={colors.primary.disabled} />
            Add Domain
          </Button>
        </Header>
        <Box borderTop={2} px={4} py={3} width="100%">
          <SearchBox onSearch={(searchVal) => setSearch(searchVal)} />
        </Box>
      </HeaderBox>
      <Listings search={search} />
    </Box>
  );
};
