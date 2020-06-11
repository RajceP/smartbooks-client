[1mdiff --git a/.vscode/launch.json b/.vscode/launch.json[m
[1mindex 081ad74..fcafeb6 100644[m
[1m--- a/.vscode/launch.json[m
[1m+++ b/.vscode/launch.json[m
[36m@@ -3,20 +3,15 @@[m
   "configurations": [[m
     {[m
       "name": "Chrome",[m
[31m-      "type": "chrome",[m
[32m+[m[32m      "type": "pwa-chrome",[m
       "preLaunchTask": "npm: start",[m
       "postDebugTask": "npm stop",[m
       "request": "launch",[m
[31m-      "userDataDir": true,[m
       "url": "http://localhost:3000",[m
       "webRoot": "${workspaceFolder}/src",[m
       "sourceMapPathOverrides": {[m
[31m-        "/home/petr/dev/*": "/__vscode-remote-uri__/home/petr/dev/*"[m
[32m+[m[32m        "webpack:///src/*": "${webRoot}/*"[m
       }[m
[31m-      // For Windows use:[m
[31m-      // "sourceMapPathOverrides": {[m
[31m-      //   "webpack:///src/*": "${webRoot}/*"[m
[31m-      // }[m
     }[m
   ][m
 }[m
[1mdiff --git a/.vscode/settings.json b/.vscode/settings.json[m
[1mindex 05e4139..fc75321 100644[m
[1m--- a/.vscode/settings.json[m
[1m+++ b/.vscode/settings.json[m
[36m@@ -15,21 +15,5 @@[m
     "titleBar.inactiveBackground": "#0f9b8e99",[m
     "titleBar.inactiveForeground": "#e7e7e799"[m
   },[m
[31m-  "peacock.remoteColor": "#0F9B8E",[m
[31m-  "sqltools.connections": [[m
[31m-    {[m
[31m-      "askForPassword": false,[m
[31m-      "database": "cati2",[m
[31m-      "driver": "MySQL",[m
[31m-      "mysqlOptions": {[m
[31m-        "authProtocol": "default"[m
[31m-      },[m
[31m-      "name": "cati2",[m
[31m-      "password": "heslo",[m
[31m-      "port": 3306,[m
[31m-      "previewLimit": 50,[m
[31m-      "server": "localhost",[m
[31m-      "username": "root"[m
[31m-    }[m
[31m-  ][m
[32m+[m[32m  "peacock.remoteColor": "#0F9B8E"[m
 }[m
[1mdiff --git a/src/App.js b/src/App.js[m
[1mindex 55d72d8..f45d2bb 100644[m
[1m--- a/src/App.js[m
[1m+++ b/src/App.js[m
[36m@@ -4,9 +4,9 @@[m [mimport { BrowserRouter, Route, Switch } from 'react-router-dom';[m
 [m
 import axios, { setHeaders } from './api/axios-smartbooks';[m
 import Error from './components/Error/Error';[m
[31m-import Form from './components/Form/Form';[m
 import Auth from './containers/Auth/Auth';[m
 import Dashboard from './containers/Dashboard/Dashboard';[m
[32m+[m[32mimport Form from './containers/Form/Form';[m
 import Table from './containers/Table/Table';[m
 import UserContext from './contexts/UserContext/UserContext';[m
 import Layout from './hoc/Layout/Layout';[m
[1mdiff --git a/src/components/Form/Form.js b/src/components/Form/Form.js[m
[1mdeleted file mode 100644[m
[1mindex 374a8f9..0000000[m
[1m--- a/src/components/Form/Form.js[m
[1m+++ /dev/null[m
[36m@@ -1,248 +0,0 @@[m
[31m-import React, { useEffect, useState } from 'react';[m
[31m-[m
[31m-import { useHistory, useParams } from 'react-router-dom';[m
[31m-import styled from 'styled-components';[m
[31m-[m
[31m-import axios from '../../api/axios-smartbooks';[m
[31m-import {[m
[31m-  bookSchema, employeesSchema, loginSchema, registrationSchema,[m
[31m-} from '../../consts/FormsSchemas/FormsSchemas';[m
[31m-import { cloneObject } from '../../helpers/Helpers';[m
[31m-import useQuery from '../../hooks/useQuery';[m
[31m-import Button from '../UI/Button/Button';[m
[31m-import Input from '../UI/Input/Input';[m
[31m-[m
[31m-// Styled Components[m
[31m-const Wrap = styled.div`[m
[31m-  margin: 0 auto;[m
[31m-  width: 90%;[m
[31m-  padding: 16px;[m
[31m-[m
[31m-  @media ${({ theme: { mediaQueries } }) => mediaQueries.medium} {[m
[31m-    width: 50%;[m
[31m-  }[m
[31m-`;[m
[31m-[m
[31m-const ButtonCont = styled.div`[m
[31m-  display: flex;[m
[31m-  justify-content: space-evenly;[m
[31m-[m
[31m-  @media ${({ theme: { mediaQueries } }) => mediaQueries.medium} {[m
[31m-    justify-content: flex-end;[m
[31m-  }[m
[31m-`;[m
[31m-[m
[31m-// Main functional component handling forms in application.[m
[31m-const Form = ({ login, register, handleLogin, handleRegister, match }) => {[m
[31m-  const [state, setState] = useState(null);[m
[31m-  const [form, setForm] = useState(null);[m
[31m-[m
[31m-  const history = useHistory();[m
[31m-  const query = useQuery();[m
[31m-[m
[31m-  const { type } = useParams();[m
[31m-  const id = query.get('id');[m
[31m-[m
[31m-  // Use effect hook fetching data from API.[m
[31m-  useEffect(() => {[m
[31m-    if (!login && !register && id !== 'new') {[m
[31m-      axios[m
[31m-        .get(`/${type}/${id}`)[m
[31m-        .then((response) => {[m
[31m-          setState(response.data[0]);[m
[31m-        })[m
[31m-        .catch((_error) => {});[m
[31m-    }[m
[31m-[m
[31m-    return () => {[m
[31m-      setForm(null);[m
[31m-    };[m
[31m-  }, [id, type, login, register, match]);[m
[31m-[m
[31m-  // Handler taking care of updating state according to form.[m
[31m-  const changeHandler = (event, inputIdentifier) => {[m
[31m-    const updatedForm = {[m
[31m-      ...form.formSchema,[m
[31m-    };[m
[31m-    const updatedFormElement = {[m
[31m-      ...updatedForm[inputIdentifier],[m
[31m-    };[m
[31m-    updatedFormElement.value = event.target.value;[m
[31m-    updatedFormElement.valid = validityCheckHandler([m
[31m-      updatedFormElement.value,[m
[31m-      updatedFormElement.validation,[m
[31m-    );[m
[31m-    updatedFormElement.touched = true;[m
[31m-    updatedForm[inputIdentifier] = updatedFormElement;[m
[31m-[m
[31m-    let formIsValid = true;[m
[31m-    for (const inputId in updatedForm) {[m
[31m-      if ({}.hasOwnProperty.call(updatedForm, inputId)) {[m
[31m-        formIsValid = updatedForm[inputId].valid && formIsValid;[m
[31m-      }[m
[31m-    }[m
[31m-[m
[31m-    setForm({ formSchema: updatedForm, formIsValid });[m
[31m-  };[m
[31m-[m
[31m-  // Handler taking care of final PUT request updating actual database.[m
[31m-  const updateHandler = (event) => {[m
[31m-    event.preventDefault();[m
[31m-    const formData = {};[m
[31m-[m
[31m-    for (const formElementIdentifier in form.formSchema) {[m
[31m-      if ({}.hasOwnProperty.call(form.formSchema, formElementIdentifier)) {[m
[31m-        formData[formElementIdentifier] = form.formSchema[formElementIdentifier].value;[m
[31m-      }[m
[31m-    }[m
[31m-[m
[31m-    if (id === 'new') {[m
[31m-      axios.post(`/${type}`, formData).then((_response) => {[m
[31m-        history.push(`/table/${type}`);[m
[31m-      });[m
[31m-    } else {[m
[31m-      axios.put(`/${type}/${state._id}`, formData).then((_response) => {[m
[31m-        history.push(`/table/${type}`);[m
[31m-      });[m
[31m-    }[m
[31m-  };[m
[31m-[m
[31m-  // Function taking care of input validity check[m
[31m-  const validityCheckHandler = (value, rules) => {[m
[31m-    let isValid = true;[m
[31m-    const { required, minLength, maxLength, isEmail, isNumeric } = rules;[m
[31m-[m
[31m-    if (!rules) {[m
[31m-      return true;[m
[31m-    }[m
[31m-[m
[31m-    if (required) {[m
[31m-      isValid = value.trim() !== '' && isValid;[m
[31m-    }[m
[31m-[m
[31m-    if (minLength) {[m
[31m-      isValid = value.length >= minLength && isValid;[m
[31m-    }[m
[31m-[m
[31m-    if (maxLength) {[m
[31m-      isValid = value.length <= maxLength && isValid;[m
[31m-    }[m
[31m-[m
[31m-    if (isEmail) {[m
[31m-      const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;[m
[31m-      isValid = pattern.test(value) && isValid;[m
[31m-    }[m
[31m-[m
[31m-    if (isNumeric) {[m
[31m-      const pattern = /^\d+$/;[m
[31m-      isValid = pattern.test(value) && isValid;[m
[31m-    }[m
[31m-[m
[31m-    return isValid;[m
[31m-  };[m
[31m-[m
[31m-  // Get schema and add values if editing existing record.[m
[31m-  if ((state || id === 'new' || login || register) && !form) {[m
[31m-    let schemaOutput = {};[m
[31m-[m
[31m-    if (type === 'books') {[m
[31m-      schemaOutput = cloneObject(bookSchema);[m
[31m-    }[m
[31m-[m
[31m-    if (type === 'employees') {[m
[31m-      schemaOutput = cloneObject(employeesSchema);[m
[31m-    }[m
[31m-[m
[31m-    if (login) {[m
[31m-      schemaOutput = cloneObject(loginSchema);[m
[31m-    }[m
[31m-[m
[31m-    if (register) {[m
[31m-      schemaOutput = cloneObject(registrationSchema);[m
[31m-    }[m
[31m-[m
[31m-    if (id !== 'new' && !login && !register) {[m
[31m-      for (const key in schemaOutput.formSchema) {[m
[31m-        if ({}.hasOwnProperty.call(schemaOutput.formSchema, key)) {[m
[31m-          schemaOutput.formSchema[key].value = state[key];[m
[31m-          schemaOutput.formSchema[key].valid = true;[m
[31m-        }[m
[31m-      }[m
[31m-    }[m
[31m-[m
[31m-    setForm(schemaOutput);[m
[31m-  }[m
[31m-[m
[31m-  let formOutput = <p>Loading...</p>;[m
[31m-  let onSubmit = updateHandler;[m
[31m-  let buttonText = 'Save';[m
[31m-[m
[31m-  if (login) {[m
[31m-    onSubmit = (event) =>[m
[31m-      handleLogin(event, form.formSchema.email.value, form.formSchema.password.value);[m
[31m-    buttonText = 'Login';[m
[31m-  }[m
[31m-[m
[31m-  if (register) {[m
[31m-    onSubmit = (event) =>[m
[31m-      handleRegister([m
[31m-        event,[m
[31m-        form.formSchema.email.value,[m
[31m-        form.formSchema.password.value,[m
[31m-        form.formSchema.username.value,[m
[31m-      );[m
[31m-    buttonText = 'Register';[m
[31m-  }[m
[31m-[m
[31m-  // Prepare schema to output.[m
[31m-  if ((state || id === 'new' || login || register) && form) {[m
[31m-    const formElementsArray = [];[m
[31m-[m
[31m-    for (const key in form.formSchema) {[m
[31m-      if ({}.hasOwnProperty.call(form.formSchema, key)) {[m
[31m-        formElementsArray.push({[m
[31m-          id: key,[m
[31m-          config: form.formSchema[key],[m
[31m-        });[m
[31m-      }[m
[31m-    }[m
[31m-[m
[31m-    formOutput = ([m
[31m-      <form onSubmit={onSubmit}>[m
[31m-        {formElementsArray.map(({ id: elementId, config }) => ([m
[31m-          <Input[m
[31m-            key={elementId}[m
[31m-            elementType={config.elementType}[m
[31m-            elementConfig={config.elementConfig}[m
[31m-            value={config.value}[m
[31m-            invalid={!config.valid}[m
[31m-            shouldValidate={config.validation}[m
[31m-            touched={config.touched}[m
[31m-            changed={(event) => changeHandler(event, elementId)}[m
[31m-          />[m
[31m-        ))}[m
[31m-        <ButtonCont>[m
[31m-          {!login && !register && ([m
[31m-            <Button[m
[31m-              buttonType="button"[m
[31m-              clicked={(event) => {[m
[31m-                event.preventDefault();[m
[31m-                history.goBack();[m
[31m-              }}[m
[31m-            >[m
[31m-              Back[m
[31m-            </Button>[m
[31m-          )}[m
[31m-          <Button buttonType="submit" buttonDisabled={!form.formIsValid}>[m
[31m-            {buttonText}[m
[31m-          </Button>[m
[31m-        </ButtonCont>[m
[31m-      </form>[m
[31m-    );[m
[31m-  }[m
[31m-[m
[31m-  // Final render.[m
[31m-  return <Wrap>{formOutput}</Wrap>;[m
[31m-};[m
[31m-[m
[31m-export default Form;[m
[1mdiff --git a/src/containers/Auth/Auth.js b/src/containers/Auth/Auth.js[m
[1mindex 2a8c7af..4977790 100644[m
[1m--- a/src/containers/Auth/Auth.js[m
[1m+++ b/src/containers/Auth/Auth.js[m
[36m@@ -4,8 +4,8 @@[m [mimport { useHistory } from 'react-router-dom';[m
 import styled from 'styled-components';[m
 [m
 import axios, { setHeaders } from '../../api/axios-smartbooks';[m
[31m-import Form from '../../components/Form/Form';[m
 import UserContext from '../../contexts/UserContext/UserContext';[m
[32m+[m[32mimport Form from '../Form/Form';[m
 [m
 const ErrorMessage = styled.p`[m
   text-align: center;[m
