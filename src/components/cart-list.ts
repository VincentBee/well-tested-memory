import styled from "styled-components";

export const CardList = styled.ul`
  list-style: none;
  display: grid;
  place-items: center;
  box-sizing: border-box;
  grid-template-columns: repeat(2, 1fr);
  grid-gap: 10px;
  grid-auto-rows: minmax(100px, auto);
  margin: 2rem;
  padding: 2rem;
  background: ${({ theme }) => theme.relief };
  border-radius: 1rem;

  @media screen and (min-width: 320px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (min-width: 480px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (min-width: 600px) {
    padding: 3rem;
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (min-width: 690px) {
    grid-template-columns: repeat(6, 1fr);
    padding: 5rem;
    width: 690px;
    margin: 2rem auto;
  }
`;

