import React from 'react';

import moment from 'moment';
import styled from 'styled-components';

import Card from '../../components/Card/Card';

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 16px;
`;

const StyledDate = styled.h1``;

const Dashboard = () => {
  const today = moment().format('LL');
  return (
    <Wrap>
      <Card>
        <StyledDate>Today is {today}.</StyledDate>
      </Card>
    </Wrap>
  );
};

export default Dashboard;
