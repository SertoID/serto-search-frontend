import React, { useState } from "react";
import { Box, Button, Input } from "rimble-ui";

/* TODO: move this component to serto-ui */

export interface SearchBoxProps {
  onSearch(value: string): void;
}

export const SearchBox: React.FunctionComponent<SearchBoxProps> = (props) => {
  const [search, setSearch] = useState("");

  React.useEffect(() => {
    window.addEventListener("keydown", (event) => {
      if (event.code === "Enter") {
        props.onSearch(search);
      }
    });
  });

  return (
    <Box position="relative" width="100%">
      <Input
        onChange={(event: any) => setSearch(event.target.value)}
        placeholder="Search"
        type="text"
        required={true}
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
