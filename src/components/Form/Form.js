import React, { useEffect, useState } from 'react';

import { useHistory, useParams } from 'react-router-dom';
import styled from 'styled-components';

import axios from '../../api/axios-smartbooks';
import {
  bookSchema, employeesSchema, loginSchema, registrationSchema,
} from '../../consts/FormsSchemas/FormsSchemas';
import { cloneObject } from '../../helpers/Helpers';
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
const Form = ({ login, register, handleLogin, handleRegister, match }) => {
  const [state, setState] = useState(null);
  const [form, setForm] = useState(null);

  const history = useHistory();
  const query = useQuery();

  const { type } = useParams();
  const id = query.get('id');

  // Use effect hook fetching data from API.
  useEffect(() => {
    if (!login && !register && id !== 'new') {
      axios
        .get(`/${type}/${id}`)
        .then((response) => {
          setState(response.data[0]);
        })
        .catch((_error) => {});
    }

    return () => {
      setForm(null);
    };
  }, [id, type, login, register, match]);

  // Handler taking care of updating state according to form.
  const changeHandler = (event, inputIdentifier) => {
    const updatedForm = {
      ...form.formSchema,
    };
    const updatedFormElement = {
      ...updatedForm[inputIdentifier],
    };
    updatedFormElement.value = event.target.value;
    updatedFormElement.valid = validityCheckHandler(
      updatedFormElement.value,
      updatedFormElement.validation,
    );
    updatedFormElement.touched = true;
    updatedForm[inputIdentifier] = updatedFormElement;

    let formIsValid = true;
    for (const inputId in updatedForm) {
      if ({}.hasOwnProperty.call(updatedForm, inputId)) {
        formIsValid = updatedForm[inputId].valid && formIsValid;
      }
    }

    setForm({ formSchema: updatedForm, formIsValid });
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

  // Function taking care of input validity check
  const validityCheckHandler = (value, rules) => {
    let isValid = true;
    const { required, minLength, maxLength, isEmail, isNumeric } = rules;

    if (!rules) {
      return true;
    }

    if (required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (minLength) {
      isValid = value.length >= minLength && isValid;
    }

    if (maxLength) {
      isValid = value.length <= maxLength && isValid;
    }

    if (isEmail) {
      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      isValid = pattern.test(value) && isValid;
    }

    if (isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  };

  // Get schema and add values if editing existing record.
  if ((state || id === 'new' || login || register) && !form) {
    let schemaOutput = {};

    if (type === 'books') {
      schemaOutput = cloneObject(bookSchema);
    }

    if (type === 'employees') {
      schemaOutput = cloneObject(employeesSchema);
    }

    if (login) {
      schemaOutput = cloneObject(loginSchema);
    }

    if (register) {
      schemaOutput = cloneObject(registrationSchema);
    }

    if (id !== 'new' && !login && !register) {
      for (const key in schemaOutput.formSchema) {
        if ({}.hasOwnProperty.call(schemaOutput.formSchema, key)) {
          schemaOutput.formSchema[key].value = state[key];
          schemaOutput.formSchema[key].valid = true;
        }
      }
    }

    setForm(schemaOutput);
  }

  let formOutput = <p>Loading...</p>;
  let onSubmit = updateHandler;
  let buttonText = 'Save';

  if (login) {
    onSubmit = (event) =>
      handleLogin(event, form.formSchema.email.value, form.formSchema.password.value);
    buttonText = 'Login';
  }

  if (register) {
    onSubmit = (event) =>
      handleRegister(
        event,
        form.formSchema.email.value,
        form.formSchema.password.value,
        form.formSchema.username.value,
      );
    buttonText = 'Register';
  }

  // Prepare schema to output.
  if ((state || id === 'new' || login || register) && form) {
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
      <form onSubmit={onSubmit}>
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
          {!login && !register && (
            <Button
              buttonType="button"
              clicked={(event) => {
                event.preventDefault();
                history.goBack();
              }}
            >
              Back
            </Button>
          )}
          <Button buttonType="submit" buttonDisabled={!form.formIsValid}>
            {buttonText}
          </Button>
        </ButtonCont>
      </form>
    );
  }

  // Final render.
  return <Wrap>{formOutput}</Wrap>;
};

export default Form;
