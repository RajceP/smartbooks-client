import React, { useEffect, useState } from 'react';

import moment from 'moment';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios-smartbooks';
import DeleteButton from '../../assets/delete.png';
import EditButton from '../../assets/edit.png';
import Table from '../../components/Table/Table';

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled.img`
  cursor: pointer;
`;

const Books = () => {
  const [books, setBooks] = useState(null);
  const history = useHistory();

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    await axios
      .get('/books')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((_error) => {});
  };

  const handleEdit = (row) => {
    history.push(`/form/books/${row._id}`);
  };

  const handleDelete = (row) => {
    axios
      .delete(`/books/${row._id}`)
      .then((_response) => {
        loadData();
      })
      .catch((_error) => {});
  };

  const columns = [
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
    {
      id: 'buttons',
      Header: '',
      Cell: ({ row }) => (
        <ButtonsContainer>
          <StyledButton src={EditButton} onClick={() => handleEdit(row.original)} />
          <StyledButton src={DeleteButton} onClick={() => handleDelete(row.original)} />
        </ButtonsContainer>
      ),
    },
  ];

  let tableOutput = <p>Loading...</p>;

  if (books) {
    tableOutput = <Table columns={columns} data={books} />;
  }

  return <Wrap>{tableOutput}</Wrap>;
};

export default Books;
