import React, { useEffect, useState } from "react";
import useSWR from "swr";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Flash, Flex, Loader, Text } from "rimble-ui";
import { baseColors, colors } from "serto-ui";
import { ErrorMsg, Global, Viewport } from "../../components";
import { VcValidatorResult, VcValidatorResultTypes } from "./VcValidatorResult";
import { agent } from "../../services/VeramoService";

export const VcValidatorPage: React.FunctionComponent = () => {
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const urlParams = new URLSearchParams(window.location.search);
  const vc = urlParams.get("vc") || "";
  const [vcValidated, setVcValidated] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log("useEffect 1.");
    return void async function validate() {
      try {
        console.log("useEffect 2.");
        const res = await agent.handleMessage({raw: vc})
        console.log("res: ", res);
        if (res.isValid()) {
          setVcValidated(true);
        }
      } catch (error) {
        console.log("useEffect 3. error: ", error);
        setVcValidated(false);
      }
      setLoading(false);
    }();
  }, [vc]);

  return (
    <Global banner vcBar>
      <Viewport>
        {loading && <Loader color={colors.primary.base} size={5} /> }
        {(!loading && vcValidated) && <div>VC Validated!</div>}
        {(!loading && !vcValidated) && <div>VC NOT Validated!</div>}
      </Viewport>
    </Global>
  );
};
