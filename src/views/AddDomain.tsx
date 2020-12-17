import React, { useState } from "react";
import { mutate } from "swr";
import { PhonebookContext } from "../context/PhonebookProvider";
import { PhonebookService } from "../services/PhonebookService";
import { Button, Flash, Input, Loader, Text } from "rimble-ui";
import { domainRegex } from "../utils/helpers";
import { baseColors } from "../components/themes";

export const AddDomain: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [disabled, setDisabled] = useState(true);
  const [isValidating, setIsValidating] = useState(false);

  async function addDomain() {
    setError("");
    setIsValidating(true);
    try {
      const listing = await Phonebook.registerDomain(domain);
      console.log(listing);
    } catch (err) {
      console.error("failed to add domain:", err);
      setError("Failed to add domain");
      setIsValidating(false);
      return;
    }
    setIsValidating(false);
    mutate("/register");
  }

  function onChange(value: string) {
    setDomain(value);
    domainRegex.test(value) ? setDisabled(false) : setDisabled(true);
  }

  return (
    <>
      <Text fontSize={1} fontWeight={3} mb={1}>
        Domain
      </Text>
      <Input
        type="url"
        placeholder="example.com"
        onChange={(event: any) => onChange(event.target.value)}
        width="100%"
      />
      {error && (
        <Flash mt={3} variant="danger">
          {error}
        </Flash>
      )}
      <Button disabled={disabled} onClick={addDomain} mt={3} width="100%">
        {isValidating ? <Loader color={baseColors.white} /> : <>Add Domain</>}
      </Button>
    </>
  );
};
