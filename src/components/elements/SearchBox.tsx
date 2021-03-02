import React, { useState } from "react";
import { Box, Button, Input } from "rimble-ui";

/* TODO: move this component to serto-ui */

export interface SearchBoxProps {
  placeholderText?: string;
  onSearch(value: string): void;
}

export const SearchBox: React.FunctionComponent<SearchBoxProps> = (props) => {
  const urlParams = new URLSearchParams(window.location.search);
  const filter = urlParams.get("filter");
  const [search, setSearch] = useState(filter || "");

  function onKeyDown(event: any) {
    if (event.code === "Enter") {
      props.onSearch(search);
    }
  }

  return (
    <Box position="relative" width="100%">
      <Input
        onChange={(event: any) => setSearch(event.target.value)}
        onKeyDown={(event: any) => onKeyDown(event)}
        placeholder={props.placeholderText || "Search"}
        required
        type="text"
        value={search}
        width="100%"
      />
      <Button.Text
        icononly
        icon="Search"
        onClick={() => props.onSearch(search)}
        style={{ position: "absolute", top: 0, right: 0, zIndex: 9 }}
      />
    </Box>
  );
};
