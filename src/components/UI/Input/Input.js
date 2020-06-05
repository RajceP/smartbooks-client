import React from 'react';

import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  outline: none;
  border: none;
  border-bottom: 1px solid #ccc;
  background-color: white;
  font: inherit;
  padding: 6px 10px;
  display: block;
  box-sizing: border-box;

  &.invalid {
    background-color: pink;
  }
`;

const StyledLabel = styled.label`
  font-weight: bold;
  display: block;
  margin: 8px;
`;

const Input = ({
  elementType,
  elementConfig,
  value,
  changed,
  invalid,
  shouldValidate,
  touched,
}) => {
  let inputElement = null;
  const inputClasses = [];

  if (invalid && shouldValidate && touched) {
    inputClasses.push('invalid');
  }

  switch (elementType) {
    case 'input':
      inputElement = (
        <StyledInput
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'textarea':
      inputElement = (
        <StyledInput
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
      break;
    case 'select':
      inputElement = (
        <StyledInput className={inputClasses.join(' ')} value={value} onChange={changed}>
          {elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </StyledInput>
      );
      break;
    default:
      inputElement = (
        <StyledInput
          className={inputClasses.join(' ')}
          {...elementConfig}
          value={value}
          onChange={changed}
        />
      );
  }
  return (
    <div>
      <StyledLabel>{elementConfig.placeholder}</StyledLabel>
      {inputElement}
    </div>
  );
};

export default Input;
