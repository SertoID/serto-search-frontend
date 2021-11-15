import { useContext, useEffect, useState } from "react";
import { VC } from "vc-schema-tools";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Warning } from "@rimble/icons";
import { Loader, Flash, Flex, Table, Text, Box } from "rimble-ui";
import { baseColors, colors, Credential, DidTruncate, SertoUiContext, SertoVerifiedCheckmark } from "serto-ui";
import { Global, ValidateTDLeft, ValidateTDRight, ValidateTR, Viewport } from "../../components";
import { links } from "../../constants";
import { agent } from "../../services/VeramoService";
import { VerifiableCredential } from "@veramo/core";
import { validateVc } from "vc-schema-tools";
import { Link } from "react-router-dom";
import { jwtRegex } from "../../utils/helpers";

export const VcValidatorPage: React.FunctionComponent = () => {
  console.log("what??");
  const Phonebook = useContext<PhonebookService>(PhonebookContext);
  const { renderContext } = useContext(SertoUiContext);
  const urlParams = new URLSearchParams(window.location.search);
  const vc = urlParams.get("vc") || "";
  const [vcValidated, setVcValidated] = useState<boolean>(false);
  const [vcMessage, setVcMessage] = useState<VerifiableCredential | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [didResults, setDidResults] = useState<any>([]);
  const [schemaVerified, setSchemaVerified] = useState<boolean>(false);
  const [expired, setVcExpired] = useState<boolean>(false);
  const [issuer, setIssuer] = useState<string>("");
  const [schemaName, setSchemaName] = useState<string>("");
  console.log("page1");
  useEffect(() => {
    return void (async function validate() {
      try {
        let vcToPass = vc;
        if (!jwtRegex.test(vc)) {
          vcToPass = encodeURIComponent(vc);
        }
        const res = await agent.handleMessage({ raw: vcToPass });
        if (res.isValid() && res.credentials && res.credentials.length === 1) {
          setVcMessage(res.credentials![0]);
          setSchemaName(
            res.credentials![0]?.type?.length > 0
              ? res.credentials![0]?.type[res.credentials![0]?.type.length - 1]
              : "",
          );
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

  let domainHeaderLinks;
  let domainTableLinks;
  if (domains && domains.length > 0) {
    domainHeaderLinks = (
      <>
        {domains.map((domain: string, i: number) => {
          return (
            /* eslint-disable-next-line */
            <Text.span fontSize={["24px", "30px"]} fontWeight={4} key={domain}>
              <Link to={"domain/" + domain} style={{ color: colors.primary.base, textDecoration: "none" }}>
                {domain}
              </Link>
              {i < domains.length - 1 && ", "}
            </Text.span>
          );
        })}
      </>
    );
    domainTableLinks = (
      <>
        {domains.map((domain: string, i: number) => {
          return (
            /* eslint-disable-next-line */
            <Text.span display="block" fontSize={3} fontWeight={4} key={domain}>
              <Link to={"domain/" + domain} style={{ color: baseColors.black }}>
                {domain}
              </Link>
            </Text.span>
          );
        })}
      </>
    );
  }

  return (
    <Global banner vcBar>
      <Viewport>
        {vc && (
          <Box borderBottom={4} mb={[0, 3]} pb={3} pt={5} px={[0, 5]}>
            <Text color={colors.lightSilver} fontSize={2} fontWeight={3} style={{ wordBreak: "break-word" }}>
              Showing result for {/* eslint-disable-next-line */}
              <Text.span color={colors.midGray} fontSize={1} fontWeight={3}>
                {vc}
              </Text.span>
            </Text>
          </Box>
        )}
        {loading && (
          <Flex alignItems="center" justifyContent="center" minHeight="300px" p={[0, 3]}>
            <Loader color={colors.primary.base} size={5} />
          </Flex>
        )}
        {((!loading && !vcValidated) || (!loading && !vcMessage)) && (
          <Flex justifyContent="center" px={[0, 5]} py={[3, 5]} mb={6}>
            <Box maxWidth="480px" mt={["108px", 0]} position="relative">
              <Box left={["calc(50% - 34px)", "-108px"]} position="absolute" top={["-108px", 0]} width="75px">
                <Warning color={colors.warning.base} size="75px" />
              </Box>
              <Box flexGrow="1">
                <Text fontSize="30px" lineHeight="title" mb={5}>
                  We are unable to verify this credential.
                </Text>
                <Text fontWeight={4} mb={5}>
                  An error has occured when we try to verify this credential. Please contact the issuer for more
                  information.
                </Text>
                <Text fontSize={1}>
                  Do you believe this credential should have been verified? Please ensure you're entering the token
                  string of the VC. If you believe your VC is valid, please let us know at{" "}
                  <Link to={`mailto:${links.SUPPORT_EMAIL}`} style={{ textDecoration: "none" }}>
                    support@serto.id
                  </Link>
                </Text>
              </Box>
            </Box>
          </Flex>
        )}
        {!loading && vcMessage && vcValidated && (
          <Flex justifyContent="center" px={[0, 5]} py={[3, 5]}>
            <Flex flexDirection="column" maxWidth="480px">
              {expired && (
                <Flash variant="warning" mb={5}>
                  <Flex>
                    <Warning color={colors.warning.dark} />
                    <Text fontSize={1} ml={2}>
                      This credential has expired. Please proceed with caution.
                    </Text>
                  </Flex>
                </Flash>
              )}
              <Box mb={[3, 5]} mt={["108px", 0]} position="relative">
                <Box left={["calc(50% - 34px)", "-108px"]} position="absolute" top={["-108px", 0]}>
                  {shouldHaveBlueCheck && <SertoVerifiedCheckmark size="80px" />}
                  {shouldHaveYellowCheck && <SertoVerifiedCheckmark color={colors.warning.base} size="80px" />}
                </Box>
                <Box flexGrow="1">
                  {domains && domains.length > 0 && (
                    <Text fontSize={["24px", "30px"]} fontWeight={4} lineHeight="title">
                      {domainHeaderLinks} issued this{" "}
                      {schemaName /* eslint-disable-next-line */ && (
                        <Text.span fontSize={["24px", "30px"]} fontWeight={4}>
                          {schemaName}
                        </Text.span>
                      )}{" "}
                      credential.
                    </Text>
                  )}
                </Box>
              </Box>
              <Box mb={[3, 5]} width="100%">
                <Credential isOpen={true} renderContext={renderContext} vc={vcMessage as VC} />
              </Box>
              <Box mb={[3, 5]} width="100%">
                <Table border={0} boxShadow={0} width="100%" style={{ tableLayout: "fixed" }}>
                  <tbody>
                    <ValidateTR>
                      <ValidateTDLeft>Schema</ValidateTDLeft>
                      <ValidateTDRight>
                        {/* eslint-disable-next-line */}
                        <Text.span color={baseColors.black} fontSize={3} fontWeight="500" lineHeight="copy">
                          {schemaName}
                        </Text.span>
                      </ValidateTDRight>
                    </ValidateTR>
                    <ValidateTR>
                      <ValidateTDLeft>Issuer</ValidateTDLeft>
                      <ValidateTDRight>
                        {domains && domains.length > 0 && domainTableLinks}
                        {/* eslint-disable-next-line */}
                        <Text.span color={baseColors.black} fontSize={2} fontWeight="500" lineHeight="copy">
                          <DidTruncate alignRight={true} did={issuer} />
                        </Text.span>
                      </ValidateTDRight>
                    </ValidateTR>
                  </tbody>
                </Table>
              </Box>
            </Flex>
          </Flex>
        )}
      </Viewport>
    </Global>
  );
};
