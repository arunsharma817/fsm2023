import React, { useContext, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
//import '../../styles/css/login-component.css'; // Import the external CSS file
//import '../../App.css'; // Import the external CSS file
import logoImage from '../../styles/logo.png'; // Import the logo image file

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
      //console.log(text);
      await axios.post('http://localhost:5000/api/owners/login', text).then(res => {
        const token = res.data
        console.log("getting token"+token);
        localStorage.setItem('token', token);     
        if (res) {
          navigate("/");
        }
      }).catch(error => {
        console.error('There was an error!', error);
      });
    }
  }

  return (
    <div className="logo-signup">
    <div id="login" className="formContainer">
        <div class="formInner">
                <div class="formHead">
                    <div class="logo">
                        <a href="index.html">
                              <img src={logoImage} alt="Logo" />
                        </a>
                    </div>
                    <h1 class="hide">Login</h1>
                </div>
              <form className="login-form" onSubmit={handleSubmit}>
                <div class="form-group">
                    <label>Email:</label>
                      <input className="form-control" type="text" name="email" id="email" value={formValues.email} onChange={(e) => handleInputChange(e)} />
                    
                    <p>{formErrors.email}</p>
                </div>
                <div class="form-group">
                    <label>Password: </label>
                      <input className="form-control" type="password" name="password" id="password" value={formValues.password} onChange={(e) => handleInputChange(e)} />
                   
                    <p>{formErrors.password}</p>
                 </div>
                 <div className="forgetmenot"><input name="rememberme" type="checkbox" id="rememberme" value="forever"/> <label for="rememberme">Remember Me</label></div>

                 <div className="submit">
                    <input className="btn btn-primary btn-small" id="submit" type="submit" value="Login In" />
                 </div>   
              </form>
        </div>
        <div class="formNav">
                <a href="lostpassword.html">Lost your password?</a>
            </div>
    </div>
    </div>
    
  )
}

export default Login;