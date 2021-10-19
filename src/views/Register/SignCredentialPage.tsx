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
import Web3 from "web3";

export const SignCredentialPage: React.FunctionComponent = () => {
  console.log("Sign Credential Page");
  const history = useHistory();
  const Phonebook = useContext<PhonebookService>(PhonebookContext);
  const [profile, setProfile] = useState<string>("serto_id");
  const [platform, setPlatform] = useState<string>("Twitter");
  const [error, setError] = useState<any | undefined>();
  const [disabled, setDisabled] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [preRegister, setPreRegister] = useState<boolean>(true);

  async function signCredential() {
    setError("");
    setIsValidating(true);

    let web3 = new Web3(Web3.givenProvider);

    //await window.ethereum.enable();

    await web3.eth.requestAccounts();

    const accounts = await web3.eth.getAccounts();
    console.log("accounts: ", accounts);

    const from = accounts[0];
    const did = "did:ethr:" + from;

    const message = {
      "vc": {
        "credentialSubject": {
          "socialMediaProfileUrl": "https://twitter.com/" + profile,
        },
        "@context": [
          "https://www.w3.org/2018/credentials/v1",
          "https://beta.api.schemas.serto.id/v1/public/social-media-linkage-credential/1.0/ld-context.json"
        ],
        "type": [
          "VerifiableCredential",
          "SocialMediaProfileLinkage"
        ]
      },
      "credentialSchema": {
        "id": "https://beta.api.schemas.serto.id/v1/public/social-media-linkage-credential/1.0/json-schema.json",
        "type": "JsonSchemaValidator2018"
      },
      "sub": did,
      "nbf": Math.floor(Date.now() / 1000),
      "iss": did
    }

    const domain = {
      chainId: 1,
      name: "Linkage",
      verifyingContract: "0x0",
      version: 1
    }

    const types = {
      EIP712Domain: [
        { name: 'name', type: 'string' },
        { name: 'version', type: 'string' },
        { name: 'chainId', type: 'uint256' },
        { name: 'verifyingContract', type: 'address' }
      ],
      VC: [
        { name: "credentialSubject", type: "CredentialSubject"},
        { name: "@context", type: "string[]"},
        { name: "type", type: "string[]"},
      ],
      CredentialSubject: [
        { name: "socialMediaProfileUrl", type: "string"}
      ],
      Linkage: [
        { name: "sub", type: "string"},
        { name: "iss", type: "string"},
        { name: "nbf", type: "uint"},
        { name: "vc", type: "VC"},
        { name: "credentialSchema", type: "string[]"}
      ]
    }

    const msgParams = JSON.stringify({ domain, message, primaryType: "Linkage", types });
    console.log("msgParams: ", msgParams);

    /* @ts-ignore: Something */
    web3?.currentProvider?.sendAsync({method: "eth_signTypedData_v4", params: [from, msgParams], from}, (err, result) =>  {
      console.log("res: ", result);
      setIsValidating(false);
    });

    
  }

  function onChange(value: string) {
    setProfile(value);
    // urlRegex.test(value) ? setDisabled(false) : setDisabled(true);
  }

  function onKeyDown(event: any) {
    if (event.code === "Enter") {
      signCredential();
    }
  }

  return (
    <RegisterGlobal>
      <Box mb={5}>
        <Text color={colors.midGray} mb={4}>
          Enter the username for your Twitter Account.
        </Text>
        <Box maxWidth="450px">
          <Text fontSize={1} fontWeight={3} mb={1}>
            Twitter Username
          </Text>
          <Input
            placeholder="serto_id"
            onChange={(event: any) => onChange(event.target.value)}
            onKeyDown={(event: any) => onKeyDown(event)}
            width="100%"
          />
          {error && (
            <Flash mt={3} variant="danger">
              {error}
            </Flash>
          )}
          <Button disabled={disabled} onClick={signCredential} mb={3} mt={3} width="100%">
            {isValidating ? <Loader color={baseColors.white} /> : <>Sign Credential</>}
          </Button>
        </Box>
      </Box>
    </RegisterGlobal>
  );
};
