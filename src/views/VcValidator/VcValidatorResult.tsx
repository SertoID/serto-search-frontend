import { VerifiableCredential } from "@veramo/core";
import { Message } from "@veramo/message-handler";
import React from "react";
import { Link } from "react-router-dom";
import { Box, Flex, Text } from "rimble-ui";
import { baseColors, colors, DidView, H4, VC, Credential, CredentialViewTypes } from "serto-ui";
import { DomainImage, VerificationStatus } from "../../components";

export interface VcValidatorResultProps {
  validated: boolean;
  vc: VerifiableCredential;
  didResults: any[];
}

export const VcValidatorResult: React.FunctionComponent<VcValidatorResultProps> = (props) => {
  const { vc, validated } = props;
  console.log("vc: ", vc);
  if (!validated) {
    return <div>{"NOT VALIDATED"}</div>
  }
  // return <div>{"OK"}</div>
  return (
    <div>
      <Credential vc={vc as VC} viewType={CredentialViewTypes.DEFAULT} />
    </div>
  );

  // return (
  //   <Flex borderBottom={2} flexWrap="wrap" justifyContent="space-between" p={[3, 5]}>
  //     <Box borderBottom={[2, 0]} pb={[5, 0]} maxWidth="700px" mb={[5, 0]} width={["100%", "auto"]}>
  //       <Box mb={4}>
  //         <Link to={"domain/" + searchResult.domain} style={{ textDecoration: "none" }}>
  //           <Flex alignItems="center" mb={3}>
  //             <DomainImage domain={searchResult.domain} />
  //             <Text color={baseColors.black}>{searchResult.domain}</Text>
  //           </Flex>
  //           <H4 color={colors.primary.base} lineHeight="solid" mb={1} mt={0}>
  //             {searchResult.domain}
  //           </H4>
  //         </Link>
  //       </Box>
  //       <Box ml={[0, 5]}>
  //         <DidView did={searchResult.dids} color={colors.primary.base} ellipsis icon />
  //       </Box>
  //     </Box>
  //     <Box ml={[0, 5]} width="250px">
  //       <VerificationStatus />
  //     </Box>
  //   </Flex>
  // );
};
