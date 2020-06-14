import React, { useEffect, useState } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import axios, { setHeaders } from './api/axios-smartbooks';
import Error from './components/Error';
import Auth from './pages/Auth';
import Dashboard from './pages/Dashboard';
import Form from './pages/Form';
import Table from './pages/Table';
import UserContext from './utils/contexts/UserContext';
import WithLayout from './utils/hoc/withLayout';
import WidthProtectedRoute from './utils/hoc/withProtectedRoute';
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
          <WithLayout>
            <Switch>
              <WidthProtectedRoute path="/" component={Dashboard} auth={userData.auth} exact />
              <Route path="/login" render={(props) => <Auth {...props} type="login" />} />
              <Route path="/register" render={(props) => <Auth {...props} type="register" />} />
              <WidthProtectedRoute path="/dashboard" component={Dashboard} auth={userData.auth} />
              <WidthProtectedRoute path="/table/:type" component={Table} auth={userData.auth} />
              <WidthProtectedRoute path="/form/:type" component={Form} auth={userData.auth} />
              <Route render={() => <Error>Ouch, nothing to see here...</Error>} />
            </Switch>
          </WithLayout>
        </Theme>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
