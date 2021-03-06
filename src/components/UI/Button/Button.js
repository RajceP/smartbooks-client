import React from 'react';

import PropTypes from 'prop-types';
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
  transition: all 150ms ease-out;

  :disabled {
    color: black;
    background-color: lightgrey;

    @media (hover: hover) {
      :hover {
        cursor: not-allowed;
        background-color: #a8a8a8;
      }
    }
  }

  @media (hover: hover) {
    :hover {
      background-color: #0c7c71;
    }
  }
`;

const Button = ({ children, clicked, buttonType, buttonDisabled }) => {
  return (
    <StyledButton type={buttonType} onClick={clicked} disabled={buttonDisabled}>
      {children}
    </StyledButton>
  );
};

Button.defaultProps = {
  buttonDisabled: false,
  buttonType: 'button',
  clicked: null,
};

Button.propTypes = {
  buttonDisabled: PropTypes.bool,
  buttonType: PropTypes.string,
  children: PropTypes.node.isRequired,
  clicked: PropTypes.func,
};

export default Button;
