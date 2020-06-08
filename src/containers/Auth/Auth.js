import React, { useContext, useState } from 'react';

import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import axios, { setHeaders } from '../../api/axios-smartbooks';
import Form from '../../components/Form/Form';
import UserContext from '../../context/UserContext';

const ErrorMessage = styled.p`
  text-align: center;
  color: red;
  font-weight: bold;
`;

// TODO: registraition form!
const Auth = () => {
  const [error, setError] = useState({ message: null });
  const { setUserData } = useContext(UserContext);
  const history = useHistory();

  const loginHandler = async (event, email, password) => {
    event.preventDefault();

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

  const form = <Form login handleLogin={loginHandler} />;

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
