const bookFormSchema = {
  formSchema: {
    isbn: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'ISBN',
      },
      value: '',
      validation: {
        required: true,
        isNumeric: true,
      },
      valid: false,
      touched: false,
    },
    title: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Title',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    subtitle: {
      elementType: 'subtitle',
      elementConfig: {
        type: 'text',
        placeholder: 'Subtitle',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    author: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Author',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    published: {
      elementType: 'input',
      elementConfig: {
        type: 'date',
        placeholder: 'Published',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    publisher: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Publisher',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  },
  formIsValid: false,
};

const employeesFormSchema = {
  formSchema: {
    name: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Name',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    age: {
      elementType: 'input',
      elementConfig: {
        type: 'number',
        placeholder: 'Age',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    address: {
      elementType: 'address',
      elementConfig: {
        type: 'text',
        placeholder: 'Address',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    phone: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Phone',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
  },
  formIsValid: false,
};

const loginFormSchema = {
  formSchema: {
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
      },
      valid: false,
      touched: false,
    },
  },
  formIsValid: false,
};

const registrationFormSchema = {
  formSchema: {
    username: {
      elementType: 'input',
      elementConfig: {
        type: 'text',
        placeholder: 'Username',
      },
      value: '',
      validation: {
        required: true,
      },
      valid: false,
      touched: false,
    },
    email: {
      elementType: 'input',
      elementConfig: {
        type: 'email',
        placeholder: 'Email',
      },
      value: '',
      validation: {
        required: true,
        isEmail: true,
      },
      valid: false,
      touched: false,
    },
    password: {
      elementType: 'input',
      elementConfig: {
        type: 'password',
        placeholder: 'Password',
      },
      value: '',
      validation: {
        required: true,
        minLength: 5,
      },
      valid: false,
      touched: false,
    },
  },
  formIsValid: false,
};

export { bookFormSchema, employeesFormSchema, loginFormSchema, registrationFormSchema };
