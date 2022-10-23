import styled from "styled-components";

export const WinModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.relief};
  border: 5px solid ${({ theme }) => theme.secondary};
  padding: 2rem;
  border-radius: 1rem;
`;

export const WinModalTitle = styled.h1`
  color: ${({ theme }) => theme.standard };
  font-size: 40px;
`;

export const WinModalContent = styled.p`
  color: ${({ theme }) => theme.standard };
  font-size: 20px;
`; 
