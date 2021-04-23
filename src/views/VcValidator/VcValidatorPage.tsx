import React, { useEffect, useState } from "react";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Loader } from "rimble-ui";
import { colors } from "serto-ui";
import { ErrorMsg, Global, Viewport } from "../../components";
import { VcValidatorResult, VcValidatorResultProps } from "./VcValidatorResult";
import { agent } from "../../services/VeramoService";
import { Message } from "@veramo/message-handler";
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
        console.log("try handle message 1. vc: ", vc);
        console.log("agent: ", agent);
        const res = await agent.handleMessage({raw: vc});
        console.log("try handle message 2. res: ", res);
        
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
  }, [vc]);

  return (
    <Global banner vcBar>
      <Viewport>
        {loading && <Loader color={colors.primary.base} size={5} /> }
        {(!loading && vcMessage ) && <VcValidatorResult validated={vcValidated} vc={vcMessage} didResults={didResults} /> }
      </Viewport>
    </Global>
  );
};
