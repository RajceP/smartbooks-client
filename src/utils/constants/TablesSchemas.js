import React from 'react';

import moment from 'moment';

const bookTableSchema = [
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
    Cell: ({ value }) => <>{moment(value).format('YYYY-MM-DD')}</>,
  },
];

const customerTableSchema = [
  {
    Header: 'Name',
    accessor: 'name',
  },
  {
    Header: 'Address',
    accessor: 'address',
  },
  {
    Header: 'Phone',
    accessor: 'phone',
  },
  {
    Header: 'Created at',
    accessor: 'createdAt',
    Cell: ({ value }) => <>{moment(value).format('YYYY-MM-DD')}</>,
  },
];

export { bookTableSchema, customerTableSchema };
