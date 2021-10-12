import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { mutate } from "swr";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Button, Flash, Input, Loader, Text } from "rimble-ui";
import { urlRegex } from "../../utils/helpers";
import { baseColors, colors } from "serto-ui";
import { ErrorMsg } from "../../components";
import { RegisterGlobal } from "./RegisterGlobal";
import { RegisterSocialHowTo } from "./RegisterHowTo";

export const RegisterSocialPage: React.FunctionComponent = () => {
  const history = useHistory();
  const Phonebook = useContext<PhonebookService>(PhonebookContext);
  const [socialUrl, setSocialUrl] = useState<string>("");
  const [error, setError] = useState<any | undefined>();
  const [disabled, setDisabled] = useState<boolean>(true);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [preRegister, setPreRegister] = useState<boolean>(true);

  async function addSocial() {
    setError("");
    setIsValidating(true);
    try {
      await Phonebook.registerSocial(socialUrl);
      setIsValidating(false);
      mutate("/register");
      history.push("/"); // TODO should go to new listing page
    } catch (err) {
      console.error(err);
      setError(<ErrorMsg error={err.message} />);
      setIsValidating(false);
      return;
    }
  }

  function onChange(value: string) {
    setSocialUrl(value);
    urlRegex.test(value) ? setDisabled(false) : setDisabled(true);
  }

  function onKeyDown(event: any) {
    if (event.code === "Enter") {
      addSocial();
    }
  }

  return (
    <RegisterGlobal>
      {preRegister ? (
        <RegisterSocialHowTo onClick={() => setPreRegister(false)} />
      ) : (
        <Box mb={5}>
          <Text color={colors.midGray} mb={4}>
            Enter the URL of your published post containing the proof of account ownership.
          </Text>
          <Box maxWidth="450px">
            <Text fontSize={1} fontWeight={3} mb={1}>
              URL of Published Post
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
            <Button disabled={disabled} onClick={addSocial} mb={3} mt={3} width="100%">
              {isValidating ? <Loader color={baseColors.white} /> : <>Register to list</>}
            </Button>
          </Box>
        </Box>
      )}
    </RegisterGlobal>
  );
};
