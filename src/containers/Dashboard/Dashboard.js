import React from 'react';

import moment from 'moment';
import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  padding: 16px;
`;

const StyledDate = styled.h1``;

const Dasboard = () => {
  const today = moment().format('LL');
  return (
    <Wrap>
      <StyledDate>Today is {today}.</StyledDate>
    </Wrap>
  );
};

export default Dasboard;
