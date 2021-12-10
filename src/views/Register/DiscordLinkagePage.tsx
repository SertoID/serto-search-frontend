import { AccountBalanceWallet, Eth } from "@rimble/icons";
import { canonicalize } from "json-canonicalize";
import { useContext, useState } from "react";
import { Box, Button, Flex, Text } from "rimble-ui";
import { baseColors, colors, H6 } from "serto-ui";
import Web3 from "web3";
import { Global, Viewport } from "../../components";
import { PhonebookContext } from "../../context/PhonebookProvider";
import { PhonebookService } from "../../services/PhonebookService";
import { constructSocialMediaProfileLinkage, socialMediaProfileLinkageTypes } from "./constructCredentials";

export const DiscordLinkagePage: React.FunctionComponent = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const userId = urlParams.get("user");
    console.log(userId);


    const Phonebook = useContext<PhonebookService>(PhonebookContext);

    // const [did] = useState<any | undefined>();
    const [error, setError] = useState<any | undefined>();
    const [isValidating, setIsValidating] = useState<boolean>(false);
    const [ethAddress, setEthAddress] = useState("");
    const [vc, setVc] = useState<any>(undefined);
    // const [did, setDid] = useState<string>("");
    const web3 = new Web3(Web3.givenProvider);

    /* @ts-ignore: Something */
    window.ethereum?.on("accountsChanged", function (accounts) {
        setEthAddress(accounts[0]);
    });

    const profileUrl = `https://discordapp.com/users/${userId}`;

    async function signSocialMediaLinkageCredential() {
        setError("");
        setIsValidating(true);

        const did = "did:ethr:" + ethAddress;
        const date = new Date().toISOString();

        let message = constructSocialMediaProfileLinkage(did, date, profileUrl);

        const domain = {
            chainId: 1,
            name: "SocialMediaProfileLinkage",
            version: "1",
        };

        const types = socialMediaProfileLinkageTypes;

        const from = ethAddress;
        const obj = { types, domain, primaryType: "VerifiableCredential", message };
        const canonicalizedObj = canonicalize(obj);
        console.log("canonicalizedObj: ", canonicalizedObj);

        /* @ts-ignore: Ignore TS issue */
        web3?.currentProvider?.sendAsync(
            { method: "eth_signTypedData_v4", params: [from, canonicalizedObj], from },
            /* @ts-ignore: Ignore TS issue */
            async (err, res) => {
                if (err) {
                    setIsValidating(false);
                } else {
                    console.log("res: ", res);

                    const vc = JSON.parse(JSON.stringify(message));

                    vc.proof.proofValue = res.result;

                    vc.proof.eip712Domain = {
                        domain,
                        messageSchema: types,
                        primaryType: "VerifiableCredential",
                    };

                    setVc(vc);

                    // Send VC to backend and show the thread in Discord
                    await Phonebook.registerDiscordProfile(vc);

                    setIsValidating(false);
                }
            },
        );
    }

    return (
        <Global banner searchBar>
            <Viewport>
                <Box>
                    <Text ml={1}>Discord user ID: {userId}</Text>
                </Box>
                <Box
                    mr={1}
                    width="50%"
                    height="156px"
                    border="1px solid"
                    borderColor={(!ethAddress && ethAddress) ? baseColors.blurple : colors.lightGray}
                    bg={(!ethAddress && ethAddress) ? colors.primary.border : colors.whites[0]}
                    borderRadius={2}
                    p={3}
                    margin="20px">
                    <Flex flexDirection="column" justifyContent="space-around">
                        <H6 m={1} color={(ethAddress && !ethAddress) ? colors.darkGray : colors.silver}>Your Ethereum Address</H6>
                        {ethAddress ? (
                            <Box border="1px solid" borderColor={colors.lightGray} borderRadius={1} bg={colors.nearWhite} p={2}>
                                <Flex flexDirection="row" justifyContent="space-between">
                                    <Flex>
                                        <Eth color={ethAddress ? colors.silver : colors.darkGray} />
                                        <Text ml={1}>
                                            {ethAddress.substring(0, 6) + "..." + ethAddress.substring(ethAddress.length - 4)}
                                        </Text>
                                    </Flex>
                                    <AccountBalanceWallet color={ethAddress ? colors.silver : colors.darkGray} />
                                </Flex>
                            </Box>
                        ) : (
                            <Button
                                disabled={ethAddress}
                                onClick={async () => {
                                    try {
                                        setError("");
                                        await web3.eth.requestAccounts();
                                        const accounts = await web3.eth.getAccounts();
                                        const from = accounts[0];
                                        setEthAddress(from);
                                    } catch (error) {
                                        setError("Unable to connect to wallet. Contact support@serto.id if the issue persists.");
                                    }
                                }}
                            >
                                <Flex alignItems="center">
                                    <AccountBalanceWallet /> Connect Wallet
                                </Flex>
                            </Button>
                        )}
                    </Flex>
                </Box>
                <Box> <Button
                    onClick={async () => {
                        try {
                            await signSocialMediaLinkageCredential();
                        } catch (error) {
                            setError("Error signing Credential. Contact support@serto.id if issue persists.");
                            console.error(error);
                        }
                    }}
                    mb={3}
                    mt={3}
                    width="294px"
                >
                    <>Sign Linkage Credential</>
                </Button>
                </Box>
            </Viewport>
        </Global>
    );
};
