import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios-smartbooks';
import useQuery from '../../hooks/useQuery';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';

// Styled Components
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

// Main functional component handling forms in application.
const Form = () => {
  const [state, setState] = useState(null);
  const [form, setForm] = useState(null);

  const history = useHistory();
  const query = useQuery();

  const { type } = useParams();
  const id = query.get('id');

  // Use effect hook fetching data from API.
  useEffect(() => {
    axios
      .get(`/${type}/${id}`)
      .then((response) => {
        setState(response.data[0]);
      })
      .catch((_error) => {});
  }, [id, type]);

  // Handler taking care of updating state according to form.
  const changeHandler = (event, inputIdentifier) => {
    const updatedOrderForm = {
      ...form.formSchema,
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = validityCheckHandler(
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

    setForm({ formSchema: updatedOrderForm, formIsValid });
  };

  // Function taking care of input validity check
  const validityCheckHandler = (value, rules) => {
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

  // Handler taking care of final PUT request updating actual database.
  const updateHandler = (event) => {
    event.preventDefault();
    const formData = {};

    for (const formElementIdentifier in form.formSchema) {
      if ({}.hasOwnProperty.call(form.formSchema, formElementIdentifier)) {
        formData[formElementIdentifier] = form.formSchema[formElementIdentifier].value;
      }
    }

    if (id === 'new') {
      axios.post(`/${type}`, formData).then((_response) => {
        history.push(`/table/${type}`);
      });
    } else {
      axios.put(`/${type}/${state._id}`, formData).then((_response) => {
        history.push(`/table/${type}`);
      });
    }
  };

  // TODO: Move these out of this component!
  if (state && !form && type === 'books') {
    setForm({
      formSchema: {
        isbn: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'ISBN',
          },
          value: id === 'new' ? '' : state.isbn,
          validation: {
            required: true,
            isNumeric: true,
          },
          valid: id !== 'new',
          touched: false,
        },
        title: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Title',
          },
          value: id === 'new' ? '' : state.title,
          validation: {
            required: true,
          },
          valid: id !== 'new',
          touched: false,
        },
        subtitle: {
          elementType: 'subtitle',
          elementConfig: {
            type: 'text',
            placeholder: 'Subtitle',
          },
          value: id === 'new' ? '' : state.subtitle,
          validation: {
            required: true,
          },
          valid: id !== 'new',
          touched: false,
        },
        author: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Author',
          },
          value: id === 'new' ? '' : state.author,
          validation: {
            required: true,
          },
          valid: id !== 'new',
          touched: false,
        },
        published: {
          elementType: 'input',
          elementConfig: {
            type: 'date',
            placeholder: 'Published',
          },
          value: id === 'new' ? '' : state.published.split('T')[0],
          validation: {
            required: true,
          },
          valid: id !== 'new',
          touched: false,
        },
        publisher: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Publisher',
          },
          value: id === 'new' ? '' : state.publisher,
          validation: {
            required: true,
          },
          valid: id !== 'new',
          touched: false,
        },
      },
      formIsvalid: id !== 'new',
    });
  }

  if (state && !form && type === 'employees') {
    setForm({
      formSchema: {
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Name',
          },
          value: id === 'new' ? '' : state.name,
          validation: {
            required: true,
          },
          valid: id !== 'new',
          touched: false,
        },
        age: {
          elementType: 'input',
          elementConfig: {
            type: 'number',
            placeholder: 'Age',
          },
          value: id === 'new' ? '' : state.age,
          validation: {
            required: true,
          },
          valid: id !== 'new',
          touched: false,
        },
        address: {
          elementType: 'address',
          elementConfig: {
            type: 'text',
            placeholder: 'Address',
          },
          value: id === 'new' ? '' : state.address,
          validation: {
            required: true,
          },
          valid: id !== 'new',
          touched: false,
        },
        phone: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Phone',
          },
          value: id === 'new' ? '' : state.phone,
          validation: {
            required: true,
          },
          valid: id !== 'new',
          touched: false,
        },
      },
      formIsvalid: id !== 'new',
    });
  }

  let formOutput = <p>Loading...</p>;

  // Prepare schema to output.
  if (state && form) {
    const formElementsArray = [];

    for (const key in form.formSchema) {
      if ({}.hasOwnProperty.call(form.formSchema, key)) {
        formElementsArray.push({
          id: key,
          config: form.formSchema[key],
        });
      }
    }

    formOutput = (
      <form onSubmit={updateHandler}>
        {formElementsArray.map(({ id: elementId, config }) => (
          <Input
            key={elementId}
            elementType={config.elementType}
            elementConfig={config.elementConfig}
            value={config.value}
            invalid={!config.valid}
            shouldValidate={config.validation}
            touched={config.touched}
            changed={(event) => changeHandler(event, elementId)}
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
          <Button buttonType="submit" buttonDisabled={!form.formIsValid}>
            Save
          </Button>
        </ButtonCont>
      </form>
    );
  }

  // Final render.
  return <Wrap>{formOutput}</Wrap>;
};

export default Form;
