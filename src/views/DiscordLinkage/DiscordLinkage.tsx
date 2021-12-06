import { useParams } from "react-router-dom";
import { Box, Button, Text } from "rimble-ui";
import { colors, H6, OutlineTwo } from "serto-ui";
import { RegisterGlobal } from "../Register/RegisterGlobal";

export const DiscordLinkagePage: React.FunctionComponent = () => {
    const { did, user, interaction } = useParams<{ did: string, user: string, interaction: string }>();
    console.log({ did, user, interaction });

    async function signLinkage() {
    }

    return (
        <RegisterGlobal>
            <Box maxWidth="450px" mb={3} pl={5} position="relative">
                <Box left="0" position="absolute" top="0">
                    <OutlineTwo />
                </Box>
                <Text color={colors.midGray} mb={1}>
                    Now you'll link your decentralized identifier {did} to your Discord account {user}. {interaction}
                </Text>
                <Text color={colors.silver} fontSize={0} mb={3}>

                </Text>
                <H6 mb={3}>Confirm your decentralized identifier by signing the proof</H6>
                <Button onClick={signLinkage} mt={3} width="100%">
                    Sign linkage
                </Button>
            </Box>
        </RegisterGlobal>
    );
};
