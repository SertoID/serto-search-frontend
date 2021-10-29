import { useContext, useEffect, useState } from "react";
import { VC } from "vc-schema-tools";
import { Warning } from "@rimble/icons";
import { Flex, Loader, Text } from "rimble-ui";
import { baseColors, colors, Credential, SertoUiContext } from "serto-ui";
import { agent } from "../../services/VeramoService";
import { VerifiableCredential } from "@veramo/core";

export const VcEmbed: React.FunctionComponent = () => {
  const { renderContext } = useContext(SertoUiContext);
  const urlParams = new URLSearchParams(window.location.search);
  const vc = urlParams.get("vc") || "";
  const [vcLoaded, setVcLoaded] = useState<boolean>(false);
  const [vcMessage, setVcMessage] = useState<VerifiableCredential | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    return void (async function getVc() {
      try {
        const res = await agent.handleMessage({ raw: vc });
        if (res.isValid() && res.credentials && res.credentials.length === 1) {
          setVcMessage(res.credentials![0]);
          setVcLoaded(true);
        } else {
          setVcLoaded(false);
        }
      } catch (error) {
        console.error("error loading vc: ", error);
        setVcLoaded(false);
      }
      setLoading(false);
    })();
  }, [vc]);

  if (loading) {
    return (
      <Flex
        alignItems="center"
        bg={baseColors.white}
        borderRadius={1}
        height="100%"
        justifyContent="center"
        width="100%"
      >
        <Loader size="24px" />
      </Flex>
    );
  }

  return (
    <>
      {vcLoaded ? (
        <Credential renderContext={renderContext} vc={vcMessage as VC} />
      ) : (
        <Flex
          alignItems="center"
          bg={baseColors.white}
          borderRadius={1}
          height="100%"
          justifyContent="center"
          width="100%"
        >
          <Warning color={colors.warning.base} mr={2} size="30px" />
          <Text fontSize={2}>We are unable to find this credential.</Text>
        </Flex>
      )}
    </>
  );
};
