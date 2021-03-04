import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { mutate } from "swr";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Button, Flash, Flex, Input, Loader, Text } from "rimble-ui";
import { domainRegex } from "../../utils/helpers";
import { baseColors, colors, Check, H3 } from "serto-ui";
import { routes } from "../../constants";
import { ErrorMsg, Global, Viewport } from "../../components";

export const RegisterPage: React.FunctionComponent = () => {
  const history = useHistory();
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<any | undefined>();
  const [disabled, setDisabled] = useState(true);
  const [isValidating, setIsValidating] = useState(false);
  const [success, setSuccess] = useState(false);

  async function addDomain() {
    setError("");
    setIsValidating(true);
    try {
      await Phonebook.registerDomain(domain);
      setIsValidating(false);
      setSuccess(true);
      mutate("/register");
    } catch (err) {
      console.error(err);
      setError(<ErrorMsg error={err.message} />);
      setIsValidating(false);
      return;
    }
  }

  function onChange(value: string) {
    setDomain(value);
    domainRegex.test(value) ? setDisabled(false) : setDisabled(true);
  }

  function onKeyDown(event: any) {
    if (event.code === "Enter") {
      addDomain();
    }
  }

  return (
    <Global banner searchBar>
      <Viewport>
        <Box bg={baseColors.white} border={2} borderRadius={1} boxShadow={2} maxWidth="480px" m="50px auto 100px">
          <Box py={5} px={3}>
            {success ? (
              <>
                <Flex
                  alignItems="center"
                  bg={colors.success.light}
                  borderRadius="50%"
                  justifyContent="center"
                  m="0 auto"
                  height="50px"
                  width="50px"
                >
                  <Check color={baseColors.success} size="40px" />
                </Flex>
                <H3 color={baseColors.success} mb={5} mt={3} textAlign="center">
                  {domain} was added
                </H3>
                <Button onClick={() => history.push("/domain/" + domain)} width="100%">
                  Done
                </Button>
              </>
            ) : (
              <>
                <H3 mb={3} mt={0}>
                  Add Domain
                </H3>
                <Text color={colors.silver} fontSize={1} fontWeight={4} mb={3}>
                  Your domain needs a DID configuration to be added to Search.{" "}
                  <Link to={routes.HOW_IT_WORKS} style={{ color: colors.primary.base, textDecoration: "none" }}>
                    Learn more.
                  </Link>
                </Text>
                <Text fontSize={1} fontWeight={3} mb={1}>
                  Domain Name
                </Text>
                <Input
                  type="url"
                  placeholder="example.com"
                  onChange={(event: any) => onChange(event.target.value)}
                  onKeyDown={(event: any) => onKeyDown(event)}
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
            )}
          </Box>
        </Box>
      </Viewport>
    </Global>
  );
};
