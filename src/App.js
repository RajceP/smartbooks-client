import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Edit from './components/Edit/Edit';
import Books from './containers/Books/Books';
import Dashboard from './containers/Dashboard/Dashboard';
import Employees from './containers/Employees/Employees';
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
            <Route path="/books" component={Books} />
            <Route path="/employees" component={Employees} />
            <Route path="/edit/:id" component={Edit} />
          </Switch>
        </Layout>
      </Theme>
    </BrowserRouter>
  );
};

export default App;
