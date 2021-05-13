import React, { useEffect, useState } from "react";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Loader, Flex, Text, Box } from "rimble-ui";
import { colors, SertoVerificationError, SertoVerifiedCheckmark } from "serto-ui";
import { Global, Viewport } from "../../components";
import { VcValidatorResult } from "./VcValidatorResult";
import { agent } from "../../services/VeramoService";
import { VerifiableCredential } from "@veramo/core";
import { validateVc } from "vc-schema-tools";
import { Link } from "react-router-dom";


export const VcValidatorPage: React.FunctionComponent = () => {
  console.log("WHAT")
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const urlParams = new URLSearchParams(window.location.search);
  const vc = urlParams.get("vc") || "";
  const [vcValidated, setVcValidated] = useState(false);
  const [vcMessage, setVcMessage] = useState<VerifiableCredential | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [didResults, setDidResults] = useState([]);
  const [schemaVerified, setSchemaVerified] = useState(false);
  const [schemaValidation, setSchemaValidation] = useState({});
  const [expired, setVcExpired] = useState(false);
  let issuer = "";
  useEffect(() => {
    return void async function validate() {
      try {
        const res = await agent.handleMessage({raw: vc});
        console.log("res: ", res);
        if (res.isValid() && res.credentials && res.credentials.length === 1) {
          setVcMessage((res.credentials!)[0]);
          const vcToValidate = (res.credentials!)[0];
          const { valid, warnings, errors } = await validateVc(JSON.stringify(vcToValidate));
          setSchemaValidation({ valid, warnings, errors })
          console.log("valid: ", valid);
          console.log("warnings: ", warnings);
          console.log("errors: ", errors);
          if (valid) {
            setSchemaVerified(true);
          } 
          if (warnings.length > 0) {
            warnings.forEach((warning) => {
              console.warn("Schema Warning: ", warning)
            })
          }
          if (errors.length > 0) {
            errors.forEach((error) => {
              console.warn("Schema Error: ", error)
            })
          }
          const { expirationDate } = vcToValidate;
          if (expirationDate) {
            const expiration = new Date(expirationDate);
            if (expiration < new Date(Date.now())) {
              setVcExpired(true);
            }
          }
          setVcExpired(true);
          issuer = (typeof vcToValidate.issuer === "string" && vcToValidate.issuer || (vcToValidate.issuer as any).id);
          let didResults = await Phonebook.getDidListings([issuer, (res.credentials[0].id as any)?.id]);
          didResults = didResults.filter((didListing: any) => didListing.did != null);
          console.log("didResults filtered: ", didResults);
          setDidResults(didResults);
          setVcValidated(true);
        } else {
          setVcValidated(false);
        }
      } catch (error) {
        console.error("error verifying vc: ", error);
        setVcValidated(false);
      }
      setLoading(false);
    }();
  }, [vc, Phonebook]);

  const shouldHaveBlueCheck = vcMessage && vcValidated && schemaVerified && !expired;
  const shouldHaveYellowCheck = vcMessage && vcValidated && (!schemaVerified || expired);

  const domains = issuer && didResults.filter((didResult: any) => didResult.did === issuer).map((didResult: any) => didResult.domains);

  let domainLinks;
  if (domains && domains.length > 0) {
    domainLinks = (
      <>
        {domains.map((domain, i) => {
          return (
            <>
              <Link to={"domain/" + domain} color={colors.primary.base}>{domain}</Link>
              {(i < domains.length - 1) && (<Text.span>{", "}</Text.span>)}
            </>
          )
        })}
      </>
    )
  }

  console.log("loading: ", loading);
  console.log("vcMessage: ", vcMessage);

  return (
    <Global banner vcBar>
      <Viewport>
        {loading && <Loader color={colors.primary.base} size={5} /> }
        {(!loading && !vcMessage) && (
          <Flex flexDirection="column" alignItems="center" mt={3}>
            <SertoVerificationError />
            <Box bg={colors.danger.light} borderColor={colors.danger.base} borderRadius={1} border={1} p={2}>
              <Text.span color={colors.danger.dark}>
                An error has occured while trying to verify this credential. Please contact the Issuer for more information.
              </Text.span>
            </Box>
          </Flex>
        )}
        {(!loading && vcMessage ) && (
          <Flex flexDirection="column" alignItems="center" mt={3}>
            {shouldHaveBlueCheck && <SertoVerifiedCheckmark />}
            {shouldHaveYellowCheck && <SertoVerifiedCheckmark color={colors.warning.base}/>}
            {(domains && domains.length > 0) ? (<Text.span>We've verified that the owner of {domainLinks} is the issuer of this credential</Text.span>) : (<Text.span>We were unable to find any domains linked to the issuer of this Verifiable Credential</Text.span>)}
            {expired && (<Box bg={colors.warning.light} borderColor={colors.warning.base} borderRadius={1}><Text.span color={colors.warning.dark}>This credential is expired. Contact the Issuer for more information.</Text.span></Box>)}
            <VcValidatorResult validated={vcValidated} vc={vcMessage} didResults={didResults} schemaVerified={schemaVerified} /> 
          </Flex>
        )}
      </Viewport>
    </Global>
  );
};
