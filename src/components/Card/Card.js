import React from 'react';

import styled from 'styled-components';

const StyledCard = styled.div`
  position: relative;
  background-color: white;
  display: flex;
  margin: 8px;
  padding: 52px;
  box-shadow: ${({ theme }) => theme.shadow};
  border-radius: 5px;

  @media (max-width: 599px) {
    width: 100%;
    margin: 8px 0;
    padding: 12px 0 8px;
  }
`;

const Card = ({ children }) => {
  return <StyledCard>{children}</StyledCard>;
};

export default Card;
