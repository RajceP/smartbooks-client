import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import axios from '../../api/axios-smartbooks';
import Table from '../../components/Table/Table';

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 16px;
`;

const Employees = () => {
  const [employees, setEmployees] = useState(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .get('/employees')
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((_error) => {});
  };

  const columns = [
    {
      Header: 'Name',
      accessor: 'name',
    },
    {
      Header: 'Age',
      accessor: 'age',
    },
    {
      Header: 'Address',
      accessor: 'address',
    },
    {
      Header: 'Phone',
      accessor: 'phone',
    },
  ];

  let tableOutput = <p>Loading...</p>;

  if (employees) {
    tableOutput = <Table columns={columns} data={employees} />;
  }

  return <Wrap>{tableOutput}</Wrap>;
};

export default Employees;
