import { colors } from "serto-ui";
import { Text } from "rimble-ui";
import styled from "styled-components";

export const LearnMoreLink = styled(Text)`
  &:focus,
  &:hover,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
    color: ${colors.primary.base};
  }
`;
