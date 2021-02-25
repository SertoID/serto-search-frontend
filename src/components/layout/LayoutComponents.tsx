import styled from "styled-components";

/* TODO: minor differences in this and the serto-ui version update serto-ui version */

interface StyledTableProps {
  borderTop?: boolean;
}

export const THead = styled.thead`
  border-top: ${(props: StyledTableProps) => (props.borderTop === false ? "none" : "1px solid #edecfa")};

  th:first-of-type {
    padding: 16px 16px 16px 24px !important;
  }

  th:last-of-type {
    padding: 16px 24px 16px 16px !important;
  }
`;
