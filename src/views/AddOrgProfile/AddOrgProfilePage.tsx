import React, { useState } from "react";
import { useHistory, Link, useParams } from "react-router-dom";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Button, Flash, Flex, Loader, Text } from "rimble-ui";
import { jwtRegex } from "../../utils/helpers";
import { baseColors, colors, H3, OutlineOne, OutlineTwo, GreenCircleCheck } from "serto-ui";
import { routes } from "../../constants";
import { ErrorMsg, Global, Viewport } from "../../components";
import styled from "styled-components";
import { agent } from "../../services/VeramoService";

const JWTTextArea = styled.textarea`
  resize: none;
  font-size: 18px;
`;

export const AddOrgProfilePage: React.FunctionComponent = () => {
  const history = useHistory();
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
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
    <Global banner searchBar>
      <Viewport>
        <Flex flexDirection="column" maxWidth="720px" m="50px auto 100px">
          <H3 mb={3} mt={0}>
            Add Organization Profile
          </H3>
          <Text color={colors.silver} fontSize={1} fontWeight={4} mb={3}>
            You must create a VC using the Organization Profile Schema.{" "}
            <Link to={routes.HOW_IT_WORKS} style={{ color: colors.primary.base, textDecoration: "none" }}>
              Learn more.
            </Link>
          </Text>
          <Flex mb={3}>
            {domain ? <GreenCircleCheck /> : <OutlineOne />}
            <Flex flexDirection="column">
              <Text fontSize={1} fontWeight={3} mb={1}>
                Domain Name
              </Text>
              <Text fontSize={1} fontWeight={1} mb={1} color={colors.silver}>
                {domain ? domain : "Domain already added"}
              </Text>
            </Flex>
          </Flex>
          <Flex>
            <OutlineTwo />
            <Flex flexDirection="column">
              <Text fontSize={1} fontWeight={3} mb={1}>
                Organization Profile Verifiable Credential
              </Text>
              <Text fontSize={0} color={colors.silver}>
                Enter the Verifiable Credential's JWT token. You can find it on the VC card.
              </Text>
              <JWTTextArea
                rows={6}
                placeholder="xxxxx.yyyyy.zzzzz"
                onChange={(event: any) => onChange(event.target.value)}
                onKeyDown={(event: any) => onKeyDown(event)}
              />
              {error && (
                <Flash mt={3} variant="danger">
                  {"Sorry, that JWT token isn't right. Please check the JWT token of your Verifiable Credential (VC) and try again."}
                </Flash>
              )}
              <Button disabled={disabled} onClick={addOrgProfile} mt={3} width="100%">
                {isValidating ? <Loader color={baseColors.white} /> : <>Add Organization Profile</>}
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Viewport>
    </Global>
  );
};
