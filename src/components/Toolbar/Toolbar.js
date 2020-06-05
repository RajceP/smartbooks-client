import { NavLink } from 'react-router-dom';
import React from 'react';
import styled from 'styled-components';

const StyledHeader = styled.div`
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 20px;
  box-sizing: border-box;
  color: white;
  width: 100%;
  height: 50px;
  z-index: 90;
  background-color: ${({ theme: { colors } }) => colors.green};

  @media ${({ theme: { mediaQueries } }) => mediaQueries.medium} {
    justify-content: space-between;
  }
`;

const StyledText = styled.div`
  font-weight: bold;
`;

const Nav = styled.nav`
  margin: auto 0;
  display: none;

  @media ${({ theme: { mediaQueries } }) => mediaQueries.medium} {
    display: block;
  }
`;

const Ul = styled.ul`
  list-style: none;
`;

const Li = styled.li`
  margin: 0 10px;
  display: inline-block;
  cursor: pointer;
`;

const StyledLink = styled(NavLink)`
  &.active {
    text-decoration: underline;
  }

  @media (hover: hover) {
    :hover {
      color: ${({ theme: { colors } }) => colors.charcoal};
    }
  }
`;

const Header = ({ children }) => {
  return (
    <StyledHeader>
      <StyledText>{children}</StyledText>
      <Nav>
        <Ul>
          <Li>
            <StyledLink exact to="/">
              Dashboard
            </StyledLink>
          </Li>
          <Li>
            <StyledLink to="/books">Books</StyledLink>
          </Li>
          <Li>
            <StyledLink to="/employees">Employees</StyledLink>
          </Li>
        </Ul>
      </Nav>
    </StyledHeader>
  );
};

export default Header;
