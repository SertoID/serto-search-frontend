import { Text } from "rimble-ui";
import { colors } from "serto-ui";

export const ValidateTR: React.FunctionComponent = (props) => {
  return (
    <tr
      style={{
        height: "auto",
      }}
    >
      {props.children}
    </tr>
  );
};

export const ValidateTDRight: React.FunctionComponent = (props) => {
  return (
    <td
      style={{
        border: "none",
        padding: "5px 0",
        textAlign: "right",
        verticalAlign: "top",
        wordBreak: "break-word",
      }}
    >
      {props.children}
    </td>
  );
};

export const ValidateTDLeft: React.FunctionComponent = (props) => {
  return (
    <td
      style={{
        border: "none",
        padding: "5px 0",
        verticalAlign: "top",
        width: "100px",
      }}
    >
      {/* eslint-disable-next-line */}
      <Text.span color={colors.silver} fontSize={3} fontWeight="500" lineHeight="copy">
        {props.children}
      </Text.span>
    </td>
  );
};
