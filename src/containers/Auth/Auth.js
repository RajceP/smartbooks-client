import React, { useContext, useEffect, useState } from 'react';

import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import axios, { setHeaders } from '../../api/axios-smartbooks';
import Form from '../../components/Forms/Form/Form';
import UserContext from '../../context/UserContext';

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-weight: bold;
`;

const Auth = ({ type, match }) => {
  const [error, setError] = useState({ message: null });
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    return () => setError({ message: null });
  }, [match]);

  const loginHandler = async (event, email, password) => {
    if (event) {
      event.preventDefault();
    }

    axios
      .post('/users/login', {
        email,
        password,
      })
      .then(({ data: { token, user } }) => {
        localStorage.setItem('x-auth-token', token);
        setHeaders(token);
        setUserData({ token, user, auth: true });
        history.push('/dashboard');
      })
      .catch((e) => {
        setError({ message: e.response.data.message });
      });
  };

  const registrationHandle = async (event, email, password, username) => {
    event.preventDefault();

    axios
      .post('/users/register', {
        email,
        password,
        username,
      })
      .then((_response) => {
        loginHandler(null, email, password);
      })
      .catch((e) => {
        setError({ message: e.response.data.message });
      });
  };

  let form = null;

  if (type === 'login') {
    form = <Form login handleLogin={loginHandler} />;
  }

  if (type === 'register') {
    form = <Form register handleRegister={registrationHandle} />;
  }

  return (
    <div>
      {form}
      <div>
        <ErrorMessage>{error.message}</ErrorMessage>
      </div>
    </div>
  );
};

export default Auth;
