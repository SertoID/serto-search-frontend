import * as React from "react";
import styled from "styled-components";
import { ContentCopy, Check } from "@rimble/icons";
import { Button } from "rimble-ui";
import { colors } from "./themes";
import { copyToClipboard } from "../utils/helpers";

export const IconWrap = styled.span`
  &:hover svg {
    transition: 250ms ease;
    fill: #5952ff;
  }
`;

export interface CopyToClipboardProps {
  text: string;
  size?: string;
  textButton?: string;
}

export const CopyToClipboard: React.FunctionComponent<CopyToClipboardProps> = (props) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (copied) {
      setTimeout(() => {
        setCopied(false);
      }, 1000);
    }
  }, [copied]);

  if (copied) {
    if (props.textButton) {
      return <Button.Outline size="small">Copied</Button.Outline>;
    }
    return <Check color={colors.success.base} size={props.size} />;
  }

  if (props.textButton) {
    return (
      <Button.Outline size="small" onClick={() => setCopied(copyToClipboard(props.text))}>
        {props.textButton}
      </Button.Outline>
    );
  }
  return (
    <IconWrap>
      <ContentCopy
        onClick={() => setCopied(copyToClipboard(props.text))}
        size={props.size}
        style={{ cursor: "pointer" }}
      />
    </IconWrap>
  );
};
