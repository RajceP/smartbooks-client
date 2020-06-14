import React from 'react';

import { Redirect, Route } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, auth, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        if (auth === true) {
          return <Component {...rest} {...props} />;
        }

        if (auth === false) {
          return (
            <Redirect
              to={{
                pathname: '/login',
                state: {
                  from: props.location,
                },
              }}
            />
          );
        }

        return null;
      }}
    />
  );
};

export default ProtectedRoute;
