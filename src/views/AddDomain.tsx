import React, { useState } from "react";
import { mutate } from "swr";
import { PhonebookContext } from "../context/PhonebookProvider";
import { PhonebookService } from "../services/PhonebookService";
import { AddCircle } from "@rimble/icons";
import { Box, Button, Flash, Input, Text } from "rimble-ui";
import { ModalWithX, ModalContent, ModalFooter, ModalHeader } from "../components";
import { colors } from "../components/themes";

export const AddDomain: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<string | undefined>();

  async function addDomain() {
    setError("");
    try {
      await Phonebook.addDomain(domain);
    } catch (err) {
      console.error("failed to add domain:", err);
      setError("Failed to add domain");
      return;
    }
    setIsModalOpen(false);
    setDomain("");
    mutate("/v1/tenant");
  }

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)} size="small">
        <AddCircle size="14px" mr={1} color={colors.primary.disabled} />
        Add Domain
      </Button>
      <ModalWithX isOpen={isModalOpen} close={() => setIsModalOpen(false)} borderRadius={2} width="425px">
        <ModalHeader>Add Domain</ModalHeader>
        <ModalContent>
          <Text fontSize={1} fontWeight={3} mb={1}>
            URL
          </Text>
          <Input type="text" onChange={(event: any) => setDomain(event.target.value)} width="100%" />
          {error && (
            <Box p={1} mb={1}>
              <Flash my={3} variant="danger">
                {error}
              </Flash>
            </Box>
          )}
        </ModalContent>
        <ModalFooter mb={1}>
          <Button onClick={addDomain} width="100%">
            Add Domain
          </Button>
        </ModalFooter>
      </ModalWithX>
    </>
  );
};
