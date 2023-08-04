import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Login = ({ FormData }) => {
  const navigate = useNavigate();

  const initialValues = { email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };


  const validate = async (values) => {
    const errors = {};

    if (!values.email) {
      errors.email = "Email is required";
    }
    if (!values.password) {
      errors.password = "Password is required";
    }
    if (values.email === "" || values.password === "") {
      return errors;
    } else {
      const text = {
        owner_email: formValues.email,
        owner_password: formValues.password
      }
      console.log(text);
      await axios.post('http://localhost:5000/api/owners/login', text).then(res => {
        const token = res.data
        console.log(token);
        localStorage.setItem('token', token);     
        if (res) {
          navigate("/products/addproduct/");
        }
      }).catch(error => {
        console.error('There was an error!', error);
      });
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your email:
          <input type="text" name="email" id="email" value={formValues.email} onChange={(e) => handleInputChange(e)} />
        </label>
        <p>{formErrors.email}</p>
        <label>Enter your Password:
          <input type="password" name="password" id="password" value={formValues.password} onChange={(e) => handleInputChange(e)} />
        </label>
        <p>{formErrors.password}</p>
        <input type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Login;