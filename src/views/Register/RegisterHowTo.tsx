import styled from "styled-components";
import { Box, Button, Text, Link } from "rimble-ui";
import { colors } from "serto-ui";
import { routes } from "../../constants";

const UL = styled.ul`
  padding-left: 20px;
`;

const LI = styled.li`
  color: ${colors.midGray};
  font-size: 14px;
  line-height: 24px;
`;

export interface RegisterHowToProps {
  onClick(): void;
}

export const RegisterDomainHowTo: React.FunctionComponent<RegisterHowToProps> = (props) => {
  return (
    <Box maxWidth="700px">
      <Text color={colors.midGray}>To list a domain, you must have the following completed:</Text>
      <UL>
        <LI>You or your organization have/has created a decentralized identifier or DID.</LI>
        <LI>You have created a DID configuration file.</LI>
        <LI>You are hosting the DID configuration file on your or your organization's website domain.</LI>
        <LI>
          You have issued your own organization’s profile Verifiable Credential (VC) using Serto Agent. (you will need
          the JWT code). <Link href={routes.HOW_IT_WORKS}>Learn more about how this works.</Link>
        </LI>
      </UL>
      <Text color={colors.midGray} mb={5}>
        If you have not completed these steps, you may do so using our Serto Agent tool. You can find Serto Agent in the{" "}
        <Link href="https://beta.schemas.serto.id/schema/serto-organization-profile">AWS marketplace</Link>. Follow the
        instructions to launch your own Serto Agent instance.
      </Text>
      <Box>
        <Button mb={3} onClick={() => props.onClick()} width="250px">
          Continue
        </Button>
      </Box>
      <Box>
        <Button.Text as="a" href={routes.HOMEPAGE} width="250px">
          Cancel
        </Button.Text>
      </Box>
    </Box>
  );
};

export const RegisterSocialHowTo: React.FunctionComponent<RegisterHowToProps> = (props) => {
  return (
    <Box maxWidth="700px">
      <Text color={colors.midGray}>To list a social network account, you must have the following completed:</Text>
      <UL>
        <LI>You have created a decentralized identifier or DID.</LI>
        <LI>
          You have issued your own Social Media Profile Verifiable Credential (VC) [link to schema] using Serto Agent.
        </LI>
        <LI>You have verified your account on your social network.</LI>
        <LI>You have the URL of the published post containing the proof of account ownership. </LI>
      </UL>
      <Text color={colors.midGray} mb={5}>
        If you have not completed these steps, you may do so using our Serto Agent tool. You can find Serto Agent in the{" "}
        <Link href="https://beta.schemas.serto.id/schema/serto-organization-profile">AWS marketplace</Link>. Follow the
        instructions to launch your own Serto Agent instance.
      </Text>
      <Box>
        <Button mb={3} onClick={() => props.onClick()} width="250px">
          Continue
        </Button>
      </Box>
      <Box>
        <Button.Text as="a" href={routes.HOMEPAGE} width="250px">
          Cancel
        </Button.Text>
      </Box>
    </Box>
  );
};
