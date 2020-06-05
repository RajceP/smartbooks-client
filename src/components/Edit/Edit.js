import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios-smartbooks';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

const Wrap = styled.div`
  margin: 0 auto;
  width: 90%;
  padding: 16px;

  @media ${({ theme: { mediaQueries } }) => mediaQueries.medium} {
    width: 50%;
  }
`;

const ButtonCont = styled.div`
  display: flex;
  justify-content: space-evenly;

  @media ${({ theme: { mediaQueries } }) => mediaQueries.medium} {
    justify-content: flex-end;
  }
`;

const Edit = () => {
  const [book, setBook] = useState(null);
  const [bookForm, setBookForm] = useState(null);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    axios
      .get(`/books/${id}`)
      .then((response) => {
        setBook(response.data[0]);
      })
      .catch((_error) => {});
  }, [id]);

  const handleChange = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...bookForm.bookFormSchema,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = checkValidity(
      updatedFormElement.value,
      updatedFormElement.validation,
    );
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (const inputId in updatedOrderForm) {
      if ({}.hasOwnProperty.call(updatedOrderForm, inputId)) {
        formIsValid = updatedOrderForm[inputId].valid && formIsValid;
      }
    }

    setBookForm({ bookFormSchema: updatedOrderForm, formIsValid });
  };

  const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
      return true;
    }

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    if (rules.isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  const updateBook = (event) => {
    event.preventDefault();

    const formData = {};
    for (const formElementIdentifier in bookForm.bookFormSchema) {
      if ({}.hasOwnProperty.call(bookForm.bookFormSchema, formElementIdentifier)) {
        formData[formElementIdentifier] = bookForm.bookFormSchema[formElementIdentifier].value;
      }
    }

    axios.put(`/books/${book._id}`, formData).then((_response) => {
      history.goBack();
    });
  };

  let form = <p>Loading...</p>;

  if (book && !bookForm) {
    setBookForm({
      bookFormSchema: {
        isbn: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ISBN',
          },
          value: book.isbn,
          validation: {
            required: true,
            isNumeric: true,
          },
          valid: true,
          touched: false,
        },
        title: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Title',
          },
          value: book.title,
          validation: {
            required: true,
          },
          valid: true,
          touched: false,
        },
        subtitle: {
          elementType: 'subtitle',
          elementConfig: {
            type: 'text',
            placeholder: 'Subtitle',
          },
          value: book.subtitle,
          validation: {
            required: true,
          },
          valid: true,
          touched: false,
        },
        author: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Author',
          },
          value: book.author,
          validation: {
            required: true,
          },
          valid: true,
          touched: false,
        },
        published: {
          elementType: 'input',
          elementConfig: {
            type: 'date',
            placeholder: 'Published',
          },
          value: book.published.split('T')[0],
          validation: {
            required: true,
          },
          valid: true,
          touched: false,
        },
        publisher: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Publisher',
          },
          value: book.publisher,
          validation: {
            required: true,
          },
          valid: true,
          touched: false,
        },
      },
      formIsvalid: true,
      loading: false,
    });
  }

  if (book && bookForm) {
    const formElementsArray = [];

    for (const key in bookForm.bookFormSchema) {
      if ({}.hasOwnProperty.call(bookForm.bookFormSchema, key)) {
        formElementsArray.push({
          id: key,
          config: bookForm.bookFormSchema[key],
        });
      }
    }

    form = (
      <form onSubmit={updateBook}>
        {formElementsArray.map(({ id: elementId, config }) => (
          <Input
            key={elementId}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            invalid={!config.valid}
            shouldValidate={config.validation}
            touched={config.touched}
            changed={(event) => handleChange(event, elementId)}
          />
        ))}
        <ButtonCont>
          <Button
            buttonType="button"
            clicked={(event) => {
              event.preventDefault();
              history.goBack();
            }}
          >
            Back
          </Button>
          <Button buttonType="submit" buttonDisabled={!bookForm.formIsValid}>
            Save
          </Button>
        </ButtonCont>
      </form>
    );
  }

  return <Wrap>{form}</Wrap>;
};

export default Edit;
