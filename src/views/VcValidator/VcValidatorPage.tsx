import React, { useEffect, useState } from "react";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Loader } from "rimble-ui";
import { colors } from "serto-ui";
import { Global, Viewport } from "../../components";
import { VcValidatorResult } from "./VcValidatorResult";
import { agent } from "../../services/VeramoService";
import { VerifiableCredential } from "@veramo/core";

export const VcValidatorPage: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const urlParams = new URLSearchParams(window.location.search);
  const vc = urlParams.get("vc") || "";
  const [vcValidated, setVcValidated] = useState(false);
  const [vcMessage, setVcMessage] = useState<VerifiableCredential | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [didResults, setDidResults] = useState([]);
  useEffect(() => {
    return void async function validate() {
      try {
        const res = await agent.handleMessage({raw: vc});
        
        setVcMessage((res.credentials!)[0]);
        if (res.isValid()) {
          const didResults = await Phonebook.getDidListings([(res.from as any)?.id, (res.to as any)?.id]);
          setDidResults(didResults);
          setVcValidated(true);
        } else {
          setVcValidated(false);
        }
      } catch (error) {
        setVcValidated(false);
      }
      setLoading(false);
    }();
  }, [vc, Phonebook]);

  return (
    <Global banner vcBar>
      <Viewport>
        {loading && <Loader color={colors.primary.base} size={5} /> }
        {(!loading && vcMessage ) && <VcValidatorResult validated={vcValidated} vc={vcMessage} didResults={didResults} /> }
      </Viewport>
    </Global>
  );
};
