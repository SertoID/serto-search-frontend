import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { mutate } from "swr";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { Box, Flex, Checkbox, Button, Input, Loader, Text } from "rimble-ui";
import { AccountBalanceWallet, Eth, Refresh } from "@rimble/icons"
import { baseColors, colors, H6, DropDown, fonts, ReverseOutlineOne, ReverseOutlineTwo, ReverseOutlineThree, ReverseOutlineFour, ReverseOutlineFive, DidTruncate } from "serto-ui";
import { RegisterGlobal } from "./RegisterGlobal";
import Web3 from "web3";
import { canonicalize } from "json-canonicalize";
import { SocialMediaPlatform } from "../../constants";
import styled from "styled-components";
import { ErrorMsg } from "../../components";

const StepText = styled(Text)`
  font-family: ${fonts.sansSerif};
  font-size: 16px;
  font-weight: 400;
  line-height: 22.12px;
`;


const StepDescription = styled(Text)`
  font-family: ${fonts.sansSerifHeader};
  font-size: 16px;
  font-weight: 600;
  line-height: 22.12px;
`;

export const SignCredentialPage: React.FunctionComponent = () => {
  const Phonebook = useContext<PhonebookService>(PhonebookContext);
  const history = useHistory();

  const [error, setError] = useState<any | undefined>();
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [ethAddress, setEthAddress] = useState("");
  const [vc, setVc] = useState<any>(undefined);
  const [platform, setPlatform] = useState<string>("");
  const [profileUrl, setProfileUrl] = useState<string>("");
  const [checkboxChecked, setCheckboxChecked] = useState<boolean>(false);
  const [postUrl, setPostUrl] = useState<string>("");
  const web3 = new Web3(Web3.givenProvider);


  /* @ts-ignore: Something */
  window.ethereum?.on("accountsChanged", function(accounts) {
    setEthAddress(accounts[0]);
    setStep(accounts[0] ? 1 : 0);
  })

  
  const [step, setStep] = useState<number>(ethAddress ? 1 : 0);

  const dropDownOptions = [
    { name: "SELECT" , value: ""},
    { name: SocialMediaPlatform.FACEBOOK , value: SocialMediaPlatform.FACEBOOK},
    { name: SocialMediaPlatform.INSTAGRAM , value: SocialMediaPlatform.INSTAGRAM},
    { name: SocialMediaPlatform.MEDIUM , value: SocialMediaPlatform.MEDIUM},
    { name: SocialMediaPlatform.TWITTER , value: SocialMediaPlatform.TWITTER},
    { name: SocialMediaPlatform.YOUTUBE , value: SocialMediaPlatform.YOUTUBE}
  ]

  async function signCredential() {
    setError("");
    setIsValidating(true);

    const did = "did:ethr:" + ethAddress;
    const date = (new Date()).toISOString();

    let message = {
      "@context": [
        "https://www.w3.org/2018/credentials/v1",
        "https://beta.api.schemas.serto.id/v1/public/social-media-linkage-credential/1.0/ld-context.json",
      ],
      "type": [
        "VerifiableCredential",
        "SocialMediaProfileLinkage"
      ],
      "issuer": did,
      "issuanceDate": date,
      "credentialSubject": {
        "socialMediaProfileUrl": profileUrl,
        "id": did
      },
      credentialSchema: {
        id: "https://beta.api.schemas.serto.id/v1/public/social-media-linkage-credential/1.0/json-schema.json",
        type: "JsonSchemaValidator2018",
      },
      proof: {
        verificationMethod: did + "#controller",
        created: date,
        proofPurpose: "assertionMethod",
        type: "EthereumEip712Signature2021",
      },
    };

    const domain = {
      chainId: 1,
      name: "SocialMediaProfileLinkage",
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
          type: "string[]",
        },
        {
          name: "type",
          type: "string[]",
        },

        {
          name: "issuer",
          type: "string",
        },
        {
          name: "issuanceDate",
          type: "string",
        },
        {
          name: "credentialSubject",
          type: "CredentialSubject",
        },
        {
          name: "credentialSchema",
          type: "CredentialSchema",
        },
        {
          name: "proof",
          type: "Proof",
        },
      ],
      CredentialSchema: [
        {
          name: "id",
          type: "string",
        },
        {
          name: "type",
          type: "string",
        },
      ],
      CredentialSubject: [
        {
          name: "socialMediaProfileUrl",
          type: "string",
        },
        {
          name: "id",
          type: "string",
        },
      ],
      Proof: [
        {
          name: "verificationMethod",
          type: "string",
        },
        {
          name: "created",
          type: "string",
        },
        {
          name: "proofPurpose",
          type: "string",
        },
        {
          name: "type",
          type: "string",
        },
      ],
    };

    const from = ethAddress;
    const obj = { types, domain, primaryType: "VerifiableCredential", message };
    const canonicalizedObj = canonicalize(obj);
    console.log("canonicalizedObj: ", canonicalizedObj);

    /* @ts-ignore: Something */
    web3?.currentProvider?.sendAsync(
      { method: "eth_signTypedData_v4", params: [from, canonicalizedObj], from },
      (err: any, res: any) => {
        console.log("res: ", res);

        const newObj = JSON.parse(JSON.stringify(message));

        newObj.proof.proofValue = res.result;

        newObj.proof.eip712Domain = {
          domain,
          messageSchema: types,
          primaryType: "VerifiableCredential",
        };
      setVc(newObj);
      setIsValidating(false);
    });
  }

  
  async function submitCredential() {
    setError("");
    setIsValidating(true);
    try {
      await Phonebook.registerSocial(postUrl);
      setIsValidating(false);
      mutate("/add-social-media-linkage");
      history.push("/");
    } catch (error: any) {
      console.error(error);
      setError(error);
      setIsValidating(false);
      return;
    }
  }

  const vcString = JSON.stringify(vc);

  let platformPrefix = "";
  switch (platform) {
    case SocialMediaPlatform.FACEBOOK:
      platformPrefix = "https://.facebook.com/";
      break;
    case SocialMediaPlatform.INSTAGRAM:
      platformPrefix = "https://www.instagram.com/";
      break;
    case SocialMediaPlatform.MEDIUM:
      platformPrefix = "https://medium.com/";
      break;
    case SocialMediaPlatform.TWITTER:
      platformPrefix = "https://twitter.com/";
      break;
    case SocialMediaPlatform.YOUTUBE:
      platformPrefix = "https://www.youtube.com/channel/";
      break;
  }

  const stepColors = [colors.lightSilver, colors.lightSilver, colors.lightSilver, colors.lightSilver, colors.lightSilver];
  for (var i = 0; i < 5; i++) {
    if (step > i) {
      stepColors[i] = "#1F9665";
    } else if (step === i) {
      stepColors[i] = colors.darkGray;
    }
  }

  return (
    <RegisterGlobal>
      <Text mb={"40px"}>Use verifiable credentials to link your Ethereum address to your public accounts and domains</Text>
      <Flex flexDirection="row" justifyContent="space-between" p={"14px"} pl={"25px"} pr={"22px"} mt={2} mb={2} bg={colors.nearWhite}>
        <Flex alignItems="center"><ReverseOutlineOne color={stepColors[0]}/><StepText color={stepColors[0]}>Connect Wallet</StepText></Flex>
        <Flex alignItems="center"><ReverseOutlineTwo color={stepColors[1]}/><StepText color={stepColors[1]}>Choose Identifier</StepText></Flex>
        <Flex alignItems="center"><ReverseOutlineThree color={stepColors[2]}/><StepText color={stepColors[2]}>Sign Linkage Credential</StepText></Flex>
        <Flex alignItems="center"><ReverseOutlineFour color={stepColors[3]}/><StepText color={stepColors[3]}>Publish or Host Proof</StepText></Flex>
        <Flex alignItems="center"><ReverseOutlineFive color={stepColors[4]}/><StepText color={stepColors[4]}>Submit Proof</StepText></Flex>
      </Flex>
      <Flex flexDirection="row" alignItems="center" justifyContent="space-between">
        <Flex>
          {step === 0 && <ReverseOutlineOne />}
          {step === 1 && <ReverseOutlineTwo />}
          {step === 2 && <ReverseOutlineThree />}
          {step === 3 && <ReverseOutlineFour />}
          {step === 4 && <ReverseOutlineFive />}
        <StepDescription>
          {step === 0 && "Connect wallet and select the Ethereum address you want to link"}
          {step === 1 && "Choose identifier type you want to link to your Ethereum address"}
          {step === 2 && "Enter your account’s profile URL, and sign credential"}
          {step === 3 && "Publish your new credential to your account"}
          {step === 4 && "Submit proof by entering social media post URL containing your published credential"}
        </StepDescription>
        </Flex>
        <Flex>
          <Refresh />
          <Text onClick={async () => {
            try {
              setError("");
              /* @ts-ignore: Something */
            } catch (error) {
              console.log("error: ", error);
              setError("Error disconnecting wallet. Please refresh page and try again.");
            }
          }}>Start Over</Text>
        </Flex>
      </Flex>
        {(step < 3) && (
        <Flex flexDirection="row">
          <Box mr={1} width="50%" height="156px" border="1px solid" borderColor={ethAddress ? colors.lightGray : baseColors.blurple} bg={ethAddress ? colors.whites[0] : colors.primary.border} borderRadius={2} p={3}>
            <H6 m={1}>Your Ethereum Address</H6>
            {ethAddress ? (
              <Box border="1px solid" borderColor={colors.lightGray} borderRadius={1} bg={colors.nearWhite} p={2}>
                <Flex flexDirection="row" justifyContent="space-between">
                  <Flex>
                    <Eth />
                    <Text ml={1}>{ethAddress.substring(0, 6) + "..." + ethAddress.substring(ethAddress.length - 4)}</Text>
                  </Flex>
                  <AccountBalanceWallet />
                </Flex>
              </Box>) : <Button onClick={async () => {
                try {
                  setError("");
                  await web3.eth.requestAccounts();
                  const accounts = await web3.eth.getAccounts();
                  const from = accounts[0];
                  setEthAddress(from);
                  setStep(1);
                } catch (error) {
                  setError("Unable to connect to wallet. Contact support@serto.id if the issue persists.")
                }
            }}><Flex alignItems="center"><AccountBalanceWallet/> Connect Wallet</Flex></Button>}
          </Box>
          <Box ml={1} width="50%" border="1px solid" borderColor={!ethAddress ? colors.lightGray : baseColors.blurple} bg={!ethAddress ? colors.whites[0] : colors.primary.border} borderRadius={2} p={3}>
            <H6 m={1}>
              Identifier Type
            </H6>
            
            {step === 0 && (
              <DropDown options={dropDownOptions} disabled={true} onChange={() => {}}/>
            )}
            {step === 1 && (
              <DropDown options={dropDownOptions} onChange={(value) => {
                setPlatform(value);
              }}/>
            )}
            {step === 2 && (
              <Input
                placeholder={"e.g. " + platformPrefix + "<profile>"}
                onChange={(event: any) => {
                  setProfileUrl(event.target.value);
                }}
                width="100%"
              />
            )}
            {step === 3 && (
              <Input
                placeholder={"e.g. " + platformPrefix + "<profile>"}
                onChange={(event: any) => {
                  setProfileUrl(event.target.value);
                }}
                width="100%"
              />
            )}
          </Box>
          
        </Flex>
      )}
      {(step === 3) && (
        <Flex flexDirection="column" width="600px">
          <Text>
            To prove that you control the account, publish a post of your credential from your account.
          </Text>
          <Text>
            Copy and paste the pre-populated message at your convenience:
          </Text>
          <Box border="1px solid" borderRadius={2} bg={colors.nearWhite} borderColor={colors.grey} p={3}>
            <Text>I’m linking this account to my Decentralized Identifier (DID) My credential 👉 https://search.serto.id/vc-validator?vc={encodeURIComponent(vcString)} #SertoID</Text>
          </Box>
          <Flex flexDirection="row" >\
            <Flex>
              <Checkbox value={checkboxChecked} onClick={(event:any) => {
                setCheckboxChecked(event.target.checked)
              }} />
              <Text>Yes, I have published my credential</Text>
            </Flex>
            <Button disabled={!checkboxChecked} onClick={() => {setStep(4)}}>Continue</Button>
          </Flex>
        </Flex>
      )}
      {(step === 4) && (
        <Box border="1px solid" borderRadius={2} borderColor={baseColors.blurple} p={2}>
          <H6>
            Social Media Post URL
          </H6>
          <Input
            placeholder={"e.g. https://www.twitter.status/id/14444444444444"}
            onChange={(event: any) => {
              setPostUrl(event.target.value);
            }}
            width="100%"
          />
          <Button disabled={!postUrl} onClick={async () =>{
            await submitCredential();
          }}>{isValidating ? <Loader color={baseColors.white} /> : <>Continue</>}</Button>
        </Box>
      )}
      <Text>{error}</Text>
      {step === 1 && (
        <Button disabled={!platform!} onClick={() => {
          setStep(step + 1);
        }} mb={3} mt={3} width="100%">
          {isValidating ? <Loader color={baseColors.white} /> : <>Continue</>}
        </Button>
      )}
      {step === 2 && (
        <Button disabled={!(profileUrl.startsWith(platformPrefix))} onClick={async () => {
          try {
            await signCredential();
            setStep(step + 1);
          } catch (error) {
            setError("Error signing Credential. Contact support@serto.id if issue persists.");
            console.error(error);
          }
        }} mb={3} mt={3} width="100%">
          {isValidating ? <Loader color={baseColors.white} /> : <>Sign Credential</>}
        </Button>
      )}
      {(step < 4) && (
        <Button.Text onClick={() => setStep(4)}>Skip. I've already posted my credential.</Button.Text>
      )}

    </RegisterGlobal>
  );
};
