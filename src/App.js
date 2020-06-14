import React, { useEffect, useState } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import axios, { setHeaders } from './api/axios-smartbooks';
import Error from './components/Error';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';
import Table from './pages/Table';
import UserContext from './utils/contexts/UserContext';
import Layout from './utils/hoc/Layout';
import ProtectedRoute from './utils/hoc/ProtectedRoute';
import GlobalStyle from './utils/styles/Global';
import Theme from './utils/styles/Theme';

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    auth: null,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('x-auth-token');

      if (token === null) {
        localStorage.setItem('x-auth-token', '');
        token = '';
      }

      const tokenRes = await axios.post('/users/token', null, {
        headers: { 'x-auth-token': token },
      });

      if (tokenRes.data) {
        const userRes = await axios.get('/users', {
          headers: { 'x-auth-token': token },
        });

        setHeaders(token);
        setUserData({
          token,
          user: userRes.data,
          auth: true,
        });
      } else {
        setUserData({ token: undefined, user: undefined, auth: false });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ userData, setUserData }}>
        <Theme>
          <GlobalStyle />
          <Layout>
            <Switch>
              <ProtectedRoute path="/" component={Dashboard} auth={userData.auth} exact />
              <Route path="/login" render={(props) => <Auth {...props} type="login" />} />
              <Route path="/register" render={(props) => <Auth {...props} type="register" />} />
              <ProtectedRoute path="/dashboard" component={Dashboard} auth={userData.auth} />
              <ProtectedRoute path="/table/:type" component={Table} auth={userData.auth} />
              <ProtectedRoute path="/form/:type" component={Form} auth={userData.auth} />
              <Route render={() => <Error>Ouch, nothing to see here...</Error>} />
            </Switch>
          </Layout>
        </Theme>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
