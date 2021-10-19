import { useState } from "react";
import { Box, Button, Flash, Input, Loader, Text } from "rimble-ui";
import { baseColors, colors } from "serto-ui";
import { RegisterGlobal } from "./RegisterGlobal";
import Web3 from "web3";

export const SignCredentialPage: React.FunctionComponent = () => {
  const [profile, setProfile] = useState<string>("serto_id");
  const [error, setError] = useState<any | undefined>();
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [vc, setVc] = useState<any>({});

  async function signCredential() {
    setError("");
    setIsValidating(true);

    let web3 = new Web3(Web3.givenProvider);

    await web3.eth.requestAccounts();

    const accounts = await web3.eth.getAccounts();

    const from = accounts[0];
    const did = "did:ethr:" + from;

    let message = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://beta.api.schemas.serto.id/v1/public/social-media-linkage-credential/1.0/ld-context.json"
      ],
      "type": [
        "VerifiableCredential",
        "SocialMediaProfileLinkage"
      ],
      "issuer": did,
      "issuanceDate": "2010-01-01T19:23:24Z",
      "credentialSubject": {
        "socialMediaProfileUrl": "https://twitter.com/" + profile,
        "id": did
      },
      "credentialSchema": {
        "id": "https://beta.api.schemas.serto.id/v1/public/social-media-linkage-credential/1.0/json-schema.json",
        "type": "JsonSchemaValidator2018"
      },
      "proof": {
        "verificationMethod": did + "#controller",
        "created":"2021-07-09T19:47:41Z",
        "proofPurpose":"assertionMethod",
        "type":"EthereumEip712Signature2021"
      }
    }

    const domain = {
      chainId: 1,
      name: "Linkage",
      version: "1"
    }

    const types = {
      EIP712Domain: [
        { name: "name", type: "string" },
        { name: "version", type: "string" },
        { name: "chainId", type: "uint256" },
      ],
      VerifiableCredential: [

        { 
          name: "@context", 
          type: "string[]"
        },
        { 
          name: "type", 
          type: "string[]"
        },
        
        {
          name:"issuer",
          type:"string"
        },
        {
          name:"issuanceDate",
          type:"string"
        },        
        { 
          name: "credentialSubject", 
          type: "CredentialSubject"
        },
        { 
          name: "credentialSchema", 
          type: "CredentialSchema"
        },
        { 
          name: "proof", 
          type: "Proof"
        }
      ],
      CredentialSchema: [
        {
           name: "id",
           type: "string"
        },
        {
           name: "type",
           type: "string"
        }
     ],
      CredentialSubject: [
        { 
          name: "socialMediaProfileUrl", 
          type: "string"
        },
        { 
          name: "id", 
          type: "string"
        }
      ],
      Proof:[
         {
           name: "verificationMethod",
           type: "string"
         },
         {
           name: "created",
           type: "string"
         },
         {
           name: "proofPurpose",
           type: "string"
         },
         {
           name: "type",
           type: "string"
         }
      ]
    }


    const msgParams = JSON.stringify({ types, domain, primaryType: "VerifiableCredential", message });
    console.log("msgParams: ", msgParams);

    /* @ts-ignore: Something */
    web3?.currentProvider?.sendAsync({method: "eth_signTypedData_v4", params: [from, msgParams], from}, (err, res) =>  {
      console.log("res: ", res);

      /* @ts-ignore: Something */
      message.proof.proofValue = res.result;

      console.log("message: ", message);

      setVc(message);

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

  const vcString = JSON.stringify(vc);

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
          <Button disabled={false} onClick={signCredential} mb={3} mt={3} width="100%">
            {isValidating ? <Loader color={baseColors.white} /> : <>Sign Credential</>}
          </Button>
          {vcString}
        </Box>
      </Box>
    </RegisterGlobal>
  );
};
