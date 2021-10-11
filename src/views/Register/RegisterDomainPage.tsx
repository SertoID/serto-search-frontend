import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { mutate } from "swr";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Button, Field, Flash, Form, Input, Loader, Link } from "rimble-ui";
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
        <Box maxWidth="450px" pl={5} position="relative">
          <Box left="0" position="absolute" top="0">
            <OutlineOne />
          </Box>
          <Form maxWidth="450px" onSubmit={addDomain}>
            <Field width="100%" label="Domain Name">
              <Input
                type="url"
                placeholder="example.com"
                onChange={(event: any) => onChange(event.target.value)}
                onKeyDown={(event: any) => onKeyDown(event)}
                required
                width="100%"
              />
            </Field>
            {error && (
              <Flash mt={3} variant="danger">
                {error}
              </Flash>
            )}
            <Button disabled={disabled} mt={3} mb={3} type="submit" width="100%">
              {isValidating ? <Loader color={baseColors.white} /> : <>Next</>}
            </Button>
            <Link href={"/add-org-profile"}>Already listed your domain? Skip this step</Link>
          </Form>
        </Box>
      )}
    </RegisterGlobal>
  );
};
