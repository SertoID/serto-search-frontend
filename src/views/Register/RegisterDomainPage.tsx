import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { mutate } from "swr";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Button, Flash, Input, Loader, Text } from "rimble-ui";
import { domainRegex } from "../../utils/helpers";
import { baseColors, OutlineOne } from "serto-ui";
import { ErrorMsg } from "../../components";
import { RegisterGlobal } from "./RegisterGlobal";
import { RegisterDomainHowTo } from "./RegisterHowTo";

export const RegisterDomainPage: React.FunctionComponent = () => {
  const history = useHistory();
  const Phonebook = useContext<PhonebookService>(PhonebookContext);
  const [domain, setDomain] = useState<string>("");
  const [error, setError] = useState<any | undefined>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [preRegister, setPreRegister] = useState<boolean>(true);

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
    <RegisterGlobal>
      {preRegister ? (
        <RegisterDomainHowTo onClick={() => setPreRegister(false)} />
      ) : (
        <Box maxWidth="450px" mb={5} pl={5} position="relative">
          <Box left="0" position="absolute" top="0">
            <OutlineOne />
          </Box>
          <Box maxWidth="450px">
            <Text fontSize={1} fontWeight={3} mb={1}>
              Domain Name
            </Text>
            <Input
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
            <Button disabled={disabled} onClick={addDomain} mb={3} mt={3} width="100%">
              {isValidating ? <Loader color={baseColors.white} /> : <>Next</>}
            </Button>
            <Button.Text as="a" href={"/add-org-profile"} width="100%">
              Already listed your domain? Skip this step
            </Button.Text>
          </Box>
        </Box>
      )}
    </RegisterGlobal>
  );
};
