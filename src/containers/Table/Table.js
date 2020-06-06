import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios-smartbooks';
import DeleteButton from '../../assets/delete.png';
import EditButton from '../../assets/edit.png';
import TableSkeleton from '../../components/TableSkeleton/TableSkeleton';
import Button from '../../components/UI/Button/Button';

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const ButtonsCont = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;

  @media ${({ theme: { mediaQueries } }) => mediaQueries.medium} {
    justify-content: flex-end;
  }
`;

const StyledButton = styled.img`
  cursor: pointer;
`;

const Table = () => {
  const [state, setState] = useState(null);

  const { type } = useParams();
  const history = useHistory();

  useEffect(() => {
    loadData(type);
  }, [type]);

  const loadData = (dataType) => {
    axios
      .get(`/${dataType}`)
      .then((response) => {
        setState(response.data);
      })
      .catch((_error) => {});
  };

  const handleEdit = (row) => {
    history.push(`/form/${type}?id=${row._id}`);
  };

  const handleDelete = (row) => {
    axios
      .delete(`/${type}/${row._id}`)
      .then((_response) => {
        loadData(type);
      })
      .catch((_error) => {});
  };

  const handleAdd = () => {
    history.push(`/form/${type}?id=new`);
  };

  let columns = [
    {
      id: 'buttons',
      Header: '',
      Cell: ({ row }) => (
        <ButtonsCont>
          <StyledButton src={EditButton} onClick={() => handleEdit(row.original)} />
          <StyledButton src={DeleteButton} onClick={() => handleDelete(row.original)} />
        </ButtonsCont>
      ),
    },
  ];

  if (type === 'books') {
    columns = [
      { Header: 'ISBN', accessor: 'isbn' },
      {
        Header: 'Title',
        accessor: 'title',
      },
      {
        Header: 'Author',
        accessor: 'author',
      },
      {
        Header: 'Published',
        accessor: 'published',
        Cell: ({ value }) => <>{moment(value).format('L')}</>,
      },
      ...columns,
    ];
  }

  if (type === 'employees') {
    columns = [
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
      ...columns,
    ];
  }

  let tableOutput = <p>Loading...</p>;

  if (state) {
    tableOutput = (
      <>
        <TableSkeleton columns={columns} data={state} />{' '}
        <ButtonCont>
          <Button type="button" clicked={handleAdd}>
            {type === 'books' && 'Add book'}
            {type === 'employees' && 'Add employee'}
          </Button>
        </ButtonCont>
      </>
    );
  }

  return <Wrap>{tableOutput}</Wrap>;
};

export default Table;
