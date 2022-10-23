import styled, { css } from 'styled-components';
import { ReactNode } from 'react';

export const Element = styled.div<{ visible?: boolean }>`
  postion: absolute;
  height: 100%;
  width: 100%;
  transition: all 0.3s ease;
  transform-style: preserve-3d;

  ${({ visible }) => visible && css`
    transform: rotateY(180deg);
  `}
`;

export const Container = styled.li`
  position: relative;
  height: 100px;
  width: 60px;
`;

export const Front = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  background: ${({ theme }) => theme.background };
  border: 5px solid ${({ theme }) => theme.primary2 };
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  font-size: 40px;
  backface-visibility: hidden;
  font-weight: bold;
  color: ${({ theme }) => theme.primary };
  box-sizing: border-box;
  transform: rotateY(-180deg);
`;

export const Back = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background: ${({ theme }) => theme.secondary };
  border: 5px solid ${({ theme }) => theme.secondary2 };
  color: ${({ theme }) => theme.background };
  font-size: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
  backface-visibility: hidden;
`;

export interface CardProps {
  visible?: boolean;
  children: ReactNode;
  onClick: () => void;
}

export const Card = ({ visible, children, onClick }: CardProps) => {
  return (
    <Container onClick={onClick}>
      <Element visible={visible}>
        <Front>
          {children}
        </Front>
        <Back>
          ?
        </Back>
      </Element>
    </Container>
  )
}
