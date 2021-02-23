import * as React from "react";
import styled from "styled-components";
import { Button } from "rimble-ui";
import { colors, ContentCopy, Check } from "serto-ui";
import { copyToClipboard } from "../utils/helpers";

/* TODO: minor differences in this and the serto-ui version update serto-ui version */

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
  hoverTitle?: string;
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
    <IconWrap title={props.hoverTitle}>
      <ContentCopy
        onClick={() => setCopied(copyToClipboard(props.text))}
        size={props.size}
        style={{ cursor: "pointer" }}
      />
    </IconWrap>
  );
};
