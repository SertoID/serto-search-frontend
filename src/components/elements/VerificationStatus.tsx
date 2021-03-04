import React from "react";
import { Flex, Text } from "rimble-ui";
import { colors, CredentialCheck, H6 } from "serto-ui";

export interface VerificationStatusProps {
  didConfig?: boolean;
  baseline?: boolean;
}

export const VerificationStatus: React.FunctionComponent<VerificationStatusProps> = (props) => {
  return (
    <>
      <H6 color={colors.silver} mb={2} mt={0}>
        Verification Status
      </H6>
      <VerificationStatusItem title="DID Configuration" />
      {props.baseline && <VerificationStatusItem title="Baseline" />}
    </>
  );
};

export interface VerificationStatusItemProps {
  title: string;
}

export const VerificationStatusItem: React.FunctionComponent<VerificationStatusItemProps> = (props) => {
  return (
    <Flex alignItems="center" mb={2}>
      <CredentialCheck />
      <Text color={colors.midGray} fontSize={1} mx={1}>
        {props.title}
      </Text>
    </Flex>
  );
};
