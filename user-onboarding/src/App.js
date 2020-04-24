import React, {useState, useEffect} from 'react';

import axios from 'axios';
import * as yup from 'yup';

import './App.css';
import Form from './components/Form.js';

const url = "https://reqres.in/api/users"

const initialFormValues = {
  name: "",
  email: "",
  password: "",
  term: false
}

const initialFormErrors = {
  name: "",
  email: "",
  password: "",
  term: ""
}

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must have at least 3 characters!'),
  email: yup
    .string()
    .required('Email is required')
    .email('a VALID email is required'),
  password: yup
    .string()
    .required('Password is required')
    .min(8, 'Password must have at least 8 characters!'),
  term: yup
    .boolean()
    .required('Please read and accept the terms of service and privacy policy')
    .oneOf([true], "Please read and accept the terms of service and privacy policy"),
})

function App() {

  const [users, setUsers] = useState([])
  const [formValues, setFormValues] = useState(initialFormValues)
  const [formErrors, setFormErrors] = useState(initialFormErrors)
  const [formDisabled, setFormDisabled] = useState(true)

  const getUser = () =>{
    axios.get(url)
      .then(res => {
        setUsers(res.data.data)
      })
      .catch(err =>{
        console.log(err)
      })
  }

  useEffect(()=>{
    getUser()
  }, [])

  const postUser = user =>{
    axios.post(url, user)
      .then(res =>{
        setUsers([...users, res.data])
      })
      .catch(err =>{
        console.log(err)
      })
  }

  useEffect(() => {
    formSchema.isValid(formValues)
      .then(valid => {
        setFormDisabled(!valid)
      })
  }, [formValues])


  const onInputChange = event =>{
    const name = event.target.name
    const value = event.target.value
    const checked = event.target.checked

    //Form Validation
    yup
      .reach(formSchema, name)
      .validate(value)
      .then(valid =>{
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(invalid =>{
        console.log(invalid)
        setFormErrors({
          ...formErrors,
          [name]: invalid.message
        })
      })

    setFormValues({
      ...formValues,
      [name]: value
    })
  }
  
  const onCheckboxChange = event =>{
    const name = event.target.name
    const isChecked = event.target.checked

    yup
      .reach(formSchema, name)
      .validate(isChecked)
      .then(valid =>{
        setFormErrors({
          ...formErrors,
          [name]: "",
        })
      })
      .catch(invalid =>{
        console.log(invalid)
        setFormErrors({
          ...formErrors,
          [name]: invalid.message
        })
      })

    setFormValues({
      ...formValues,
      [name]: isChecked
    })
  }

  const onSubmit = event =>{
    event.preventDefault()
    const newUser = {
      name : formValues.name,
      email : formValues.email,
      password: formValues.password
      // term: formValues.term
    }
    postUser(newUser)
    setFormValues(initialFormValues)
  }

  return (
    <div className="App">
      
      <Form values={formValues} onInputChange={onInputChange} onCheckboxChange={onCheckboxChange} onSubmit={onSubmit} disabled={formDisabled} errors={formErrors}/>

      {
        users.map((user,index) =>{
          return (
            <pre key={index}>{JSON.stringify(user)}</pre>
          )
        })
      }
    </div>
  );
}

export default App;
