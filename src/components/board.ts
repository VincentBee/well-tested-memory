import styled from "styled-components";

export const Board = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  background: ${({ theme }) => theme.background };
`;
