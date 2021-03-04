import * as React from "react";
import { Flex, Icon, Text } from "rimble-ui";
import { Viewport } from "../elements";
import { baseColors, colors } from "serto-ui";
import { links } from "../../constants";

export const Banner: React.FunctionComponent = () => {
  return (
    <Viewport fullBgColor={colors.primary.base}>
      <Flex alignItems="center" height="60px" justifyContent="center">
        <Icon color={baseColors.white} mr={1} name="Info" />
        <Text color={baseColors.white} fontSize={[0, 2]}>
          Serto Search is in beta. We welcome{" "}
          <a
            href={links.FEEDBACK}
            rel="noreferrer"
            target="_blank"
            style={{ color: baseColors.white, fontWeight: 600 }}
          >
            your feedback
          </a>{" "}
          as we continue to improve.
        </Text>
      </Flex>
    </Viewport>
  );
};
