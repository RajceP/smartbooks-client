import React, { useContext } from 'react';

import PropTypes from 'prop-types';
import { NavLink, useHistory } from 'react-router-dom';
import styled from 'styled-components';

import UserContext from '../utils/contexts/UserContext';

const StyledFill = styled.div`
  margin-left: auto;
`;

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
  box-shadow: ${({ theme }) => theme.shadow};

  @media ${({ theme: { mediaQueries } }) => mediaQueries.medium} {
    justify-content: start;
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

const StyledAuth = styled.div`
  margin: 0 10px;
  cursor: pointer;

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
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const handleLogout = () => {
    setUserData({
      toke: undefined,
      user: undefined,
      auth: false,
    });
    localStorage.setItem('x-auth-token', '');
  };

  return (
    <StyledHeader>
      <StyledText>{children}</StyledText>
      {userData.user ? (
        <>
          <Nav>
            <Ul>
              <Li>
                <StyledLink exact to="/dashboard">
                  Dashboard
                </StyledLink>
              </Li>
              <Li>
                <StyledLink to="/table/books">Books</StyledLink>
              </Li>
              <Li>
                <StyledLink to="/table/employees">Employees</StyledLink>
              </Li>
            </Ul>
          </Nav>

          <StyledFill />

          <StyledAuth onClick={handleLogout}>Log Out</StyledAuth>
        </>
      ) : (
        <>
          <StyledFill />
          <StyledAuth
            onClick={() => {
              history.push('register');
            }}
          >
            Register
          </StyledAuth>
          <StyledAuth
            onClick={() => {
              history.push('login');
            }}
          >
            Log In
          </StyledAuth>
        </>
      )}
    </StyledHeader>
  );
};

Header.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Header;
