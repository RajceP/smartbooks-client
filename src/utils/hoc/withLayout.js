import React from 'react';
import styled from 'styled-components';
import Toolbar from '../../components/Toolbar';

const StyledMain = styled.main`
  width: 100%;
  position: absolute;
  top: 50px;
  bottom: 0;
  overflow-y: scroll;
  font-size: 0.66em;

  @media ${({ theme: { mediaQueries } }) => mediaQueries.medium} {
    font-size: 1em;
  }
`;

const WithLayout = ({ children }) => {
  return (
    <>
      <Toolbar>Smart Books</Toolbar>
      <StyledMain>{children}</StyledMain>
    </>
  );
};

export default WithLayout;
