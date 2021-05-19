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
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const urlParams = new URLSearchParams(window.location.search);
  const vc = urlParams.get("vc") || "";
  const [vcValidated, setVcValidated] = useState(false);
  const [vcMessage, setVcMessage] = useState<VerifiableCredential | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [didResults, setDidResults] = useState([]);
  const [schemaVerified, setSchemaVerified] = useState(false);
  const [expired, setVcExpired] = useState(false);
  const [issuer, setIssuer] = useState("");

  useEffect(() => {
    return void (async function validate() {
      try {
        const res = await agent.handleMessage({ raw: vc });
        if (res.isValid() && res.credentials && res.credentials.length === 1) {
          setVcMessage(res.credentials![0]);
          const vcToValidate = res.credentials![0];
          const { valid, warnings, errors } = await validateVc(JSON.stringify(vcToValidate));
          if (valid) {
            setSchemaVerified(true);
          }
          if (warnings.length > 0) {
            warnings.forEach((warning) => {
              console.warn("Schema Warning: ", warning);
            });
          }
          if (errors.length > 0) {
            errors.forEach((error) => {
              console.warn("Schema Error: ", error);
            });
          }
          const { expirationDate } = vcToValidate;
          if (expirationDate) {
            const expiration = new Date(expirationDate);
            if (expiration < new Date(Date.now())) {
              setVcExpired(true);
            }
          }
          setIssuer(typeof vcToValidate.issuer === "string" ? vcToValidate.issuer : (vcToValidate.issuer as any).id);
          let didResults = await Phonebook.getDidListings([issuer, (res.credentials[0].id as any)?.id]);
          didResults = didResults.filter((didListing: any) => didListing.did != null);
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
    })();
  }, [vc, Phonebook, issuer]);

  const shouldHaveBlueCheck = vcMessage && vcValidated && schemaVerified && !expired;
  const shouldHaveYellowCheck = vcMessage && vcValidated && (!schemaVerified || expired);

  const filteredDidResults = issuer && didResults.find((didResult: any) => didResult.did === issuer);
  let domains;
  if (filteredDidResults) {
    domains = (filteredDidResults as any).domains;
  }
  
  let domainLinks;
  if (domains && domains.length > 0) {
    domainLinks = (
      <>
        {domains.map((domain: string, i: number) => {
          return (
            /* eslint-disable-next-line */
            <Text.span key={domain}>
              <Link to={"domain/" + domain} color={colors.primary.base}>
                {domain}
              </Link>
              {/* eslint-disable-next-line */}
              {i < domains.length - 1 && <Text.span>{", "}</Text.span>}
            </Text.span>
          );
        })}
      </>
    );
  }

  return (
    <Global banner vcBar>
      <Viewport>
        {loading && <Loader color={colors.primary.base} size={5} />}
        {!loading && !vcMessage && (
          <Flex flexDirection="column" alignItems="center" m={3}>
            <SertoVerificationError />
            <Box bg={colors.danger.light} borderColor={colors.danger.base} borderRadius={1} border={1} p={2}>
              {/* eslint-disable-next-line */}
              <Text.span color={colors.danger.dark}>
                An error has occured while trying to verify this credential. Please contact the Issuer for more
                information.
              </Text.span>
            </Box>
          </Flex>
        )}
        {!loading && vcMessage && (
          <Flex flexDirection="column" alignItems="center" mt={3}>
            {shouldHaveBlueCheck && <SertoVerifiedCheckmark />}
            {shouldHaveYellowCheck && <SertoVerifiedCheckmark color={colors.warning.base} />}
            {domains && domains.length > 0 ? (
              /* eslint-disable-next-line */
              <Text.span>We've verified that the owner of {domainLinks} is the issuer of this credential</Text.span>
            ) : (
              /* eslint-disable-next-line */
              <Text.span>
                We were unable to find any domains linked to the issuer of this Verifiable Credential
              </Text.span>
            )}
            {expired && (
              <Box bg={colors.warning.light} borderColor={colors.warning.base} borderRadius={1}>
                {/* eslint-disable-next-line */}
                <Text.span color={colors.warning.dark}>
                  This credential is expired. Contact the Issuer for more information.
                </Text.span>
              </Box>
            )}
            <VcValidatorResult
              validated={vcValidated}
              vc={vcMessage}
              didResults={didResults}
              schemaVerified={schemaVerified}
            />
          </Flex>
        )}
      </Viewport>
    </Global>
  );
};
