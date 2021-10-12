import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { CheckCircle } from "@rimble/icons";
import { Box, Button, Flash, Loader, Text } from "rimble-ui";
import { jwtRegex } from "../../utils/helpers";
import { baseColors, colors, H6, OutlineOne, OutlineTwo } from "serto-ui";
import { ErrorMsg } from "../../components";
import styled from "styled-components";
import { agent } from "../../services/VeramoService";
import { RegisterGlobal } from "../Register/RegisterGlobal";

const JWTTextArea = styled.textarea`
  resize: none;
  font-size: 18px;
  width: 100%;
`;

export const AddOrgProfilePage: React.FunctionComponent = () => {
  const history = useHistory();
  const Phonebook = useContext<PhonebookService>(PhonebookContext);
  const [jwt, setJwt] = useState("");
  const [error, setError] = useState<any | undefined>();
  const [disabled, setDisabled] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const { domain } = useParams<{ domain: string }>();

  async function addOrgProfile() {
    setError("");
    setIsValidating(true);
    try {
      const res = await agent.handleMessage({ raw: jwt });
      const jwtDomain = res.credentials && res.credentials[0].credentialSubject.domain;
      await Phonebook.processVc(jwt);
      setIsValidating(false);
      history.push("/domain/" + jwtDomain);
    } catch (err) {
      console.error(err);
      setError(<ErrorMsg error={err.message} />);
      setIsValidating(false);
      return;
    }
  }

  function onChange(value: string) {
    setJwt(value);
    jwtRegex.test(value) ? setDisabled(false) : setDisabled(true);
  }

  function onKeyDown(event: any) {
    if (event.code === "Enter") {
      addOrgProfile();
    }
  }

  return (
    <RegisterGlobal>
      <Box maxWidth="450px" mb={3} pl={5} position="relative">
        {domain ? (
          <Box mb={5}>
            <Box left="0" position="absolute" top="0">
              <CheckCircle color={colors.success.base} />
            </Box>
            <Text color={colors.midGray} mb={3}>
              Enter your organization’s domain name
            </Text>
            <H6 mb={3} mt={0}>
              Domain Name
            </H6>
            <Text mb={3} color={colors.silver}>
              {domain}
            </Text>
          </Box>
        ) : (
          <Box mb={5}>
            <Box left="0" position="absolute" top="0">
              <OutlineOne />
            </Box>
            <Text color={colors.midGray}>Domain already added.</Text>
          </Box>
        )}
      </Box>
      <Box maxWidth="450px" mb={3} pl={5} position="relative">
        <Box left="0" position="absolute" top="0">
          <OutlineTwo />
        </Box>
        <Text color={colors.midGray} mb={1}>
          Enter the Organization Profile Verifiable Credential token
        </Text>
        <Text color={colors.silver} fontSize={0} mb={3}>
          The token is a long alphanumberic string. You can find it on the Verifiable Credential card. Make sure to copy
          and paste the whole string.
        </Text>
        <H6 mb={3}>Organization Profile Verifiable Credential</H6>
        <JWTTextArea
          rows={6}
          placeholder="xxxxx.yyyyy.zzzzz"
          onChange={(event: any) => onChange(event.target.value)}
          onKeyDown={(event: any) => onKeyDown(event)}
        />
        {error && (
          <Flash mt={3} variant="danger">
            Sorry, that JWT token isn't right. Please check the JWT token of your Verifiable Credential (VC) and try
            again.
          </Flash>
        )}
        <Button disabled={disabled} onClick={addOrgProfile} mt={3} width="100%">
          {isValidating ? <Loader color={baseColors.white} /> : <>Register to list</>}
        </Button>
      </Box>
    </RegisterGlobal>
  );
};
