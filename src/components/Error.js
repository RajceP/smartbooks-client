import React from 'react';

import styled from 'styled-components';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const Error = ({ children }) => {
  return <Wrap>{children}</Wrap>;
};

export default Error;
