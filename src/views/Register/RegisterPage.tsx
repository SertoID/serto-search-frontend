import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { mutate } from "swr";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Button, Flash, Flex, Input, Loader, Text, Link } from "rimble-ui";
import { domainRegex } from "../../utils/helpers";
import { baseColors, colors, H3 } from "serto-ui";
import { routes } from "../../constants";
import { ErrorMsg, Global, Viewport } from "../../components";

export const RegisterPage: React.FunctionComponent = () => {
  const history = useHistory();
  const Phonebook = React.useContext<PhonebookService>(PhonebookContext);
  const [domain, setDomain] = useState("");
  const [error, setError] = useState<any | undefined>();
  const [disabled, setDisabled] = useState(true);
  const [isValidating, setIsValidating] = useState(false);

  async function addDomain() {
    setError("");
    setIsValidating(true);
    try {
      await Phonebook.registerDomain(domain);
      setIsValidating(false);
      mutate("/register");
      history.push("add-org-profile/" + domain);
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
        <Flex flexDirection="column" maxWidth="720px" m="50px auto 100px">
          <H3 mb={3} mt={0}>
            Add Your Organization to Serto Search
          </H3>
          <Text color={colors.silver} fontSize={1} fontWeight={4} mb={3}>
            To add your organization, first add your organization's domain. Then, submit your organization profile verifiable credential (VC). If you already added your domain, you can skip this step.{" "}
            <Link to={routes.HOW_IT_WORKS} style={{ color: colors.primary.base, textDecoration: "none" }}>
              Learn more.
            </Link>
          </Text>
          <Text fontSize={1} fontWeight={3} mb={1}>
            Domain Name
          </Text>
          <Flex flexDirection="column" alignItems="center">
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
            <Button disabled={disabled} onClick={addDomain} mt={3} mb={3} width="100%">
              {isValidating ? <Loader color={baseColors.white} /> : <>Add Domain</>}
            </Button>
            <Link href={"/add-org-profile"}>I already added a domain. Skip this step.</Link>
          </Flex>
        </Flex>
      </Viewport>
    </Global>
  );
};
