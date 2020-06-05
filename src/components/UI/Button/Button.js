import React from 'react';

import styled from 'styled-components';

const StyledButton = styled.button`
  padding: 4px 12px;
  margin: 12px 0 12px 12px;
  border: none;
  border-radius: 5px;
  outline: none;
  color: white;
  background-color: ${({ theme: { colors } }) => colors.green};
  font: inherit;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow};

  :disabled {
    background-color: grey;
    border: 1px solid grey;
  }
`;

const Button = ({ children, clicked, buttonType, buttonDisabled }) => {
  return (
    <StyledButton type={buttonType} onClick={clicked} disabled={buttonDisabled}>
      {children}
    </StyledButton>
  );
};

export default Button;
