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
    Cell: ({ value }) => <>{moment(value).format('L')}</>,
  },
];

const employeesTableSchema = [
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

export { bookTableSchema, employeesTableSchema };
