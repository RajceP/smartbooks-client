import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Error from './components/Error/Error';
import Form from './components/Form/Form';
import Dashboard from './containers/Dashboard/Dashboard';
import Table from './containers/Table/Table';
import Layout from './hoc/Layout/Layout';
import GlobalStyle from './styles/Global';
import Theme from './styles/Theme';

const App = () => {
  return (
    <BrowserRouter>
      <Theme>
        <GlobalStyle />
        <Layout>
          <Switch>
            <Route path="/" component={Dashboard} exact />
            <Route path="/table/:type" component={Table} />
            <Route path="/form/:type" component={Form} />
            <Route render={() => <Error>Ouch, nothing to see here...</Error>} />
          </Switch>
        </Layout>
      </Theme>
    </BrowserRouter>
  );
};

export default App;
