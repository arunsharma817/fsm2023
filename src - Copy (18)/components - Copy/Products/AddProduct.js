import React, { useContext, useEffect } from 'react'
import productsContext from '../../context/products/productsContext'
import { useForm } from 'react-hook-form';
import { useState } from 'react'
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const Addproduct =  () => {
  const navigate = useNavigate();
  const params = useParams();
  const context = useContext(productsContext);
  const productId = params.id;  
  const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb25zdWx0YW50cyI6eyJpZCI6IjY0OTQxYjJmNTMwZjY1Yzc0NzkwM2I4MyJ9LCJpYXQiOjE2ODc0Mjc5MTZ9._iF_uKOR8nN_qOWSEzFqNhBfUbq4kGlCC_XcYOGxT0o";
  const initialValues = { product_name: "", product_capacity: "", product_type: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  //const ProductValues = { product_name: "", product_capacity: "", product_type: "" };
  const [editValues, setEditValues] = useState(null);

  if(productId){
    console.log("I am here in If Condition of Addproduct");
    const ProductValues = {product_name: 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyy', product_capacity: 'yyyyyyyyyyyyyyyyyyyyyyyyyyyy', product_type: 'yyyyyyyyyyyyyyyyyyyyyyyy'}
   console.log(ProductValues);
    //setEditValues(ProductValues);
  }


  const handleInputChange = (e) => { 
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }

    if(productId){
      console.log("I am here in If Condition of Addproduct");
      const ProductValues = {product_name: 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyy', product_capacity: 'yyyyyyyyyyyyyyyyyyyyyyyyyyyy', product_type: 'yyyyyyyyyyyyyyyyyyyyyyyy'}
      console.log(ProductValues);
      setFormValues(ProductValues);
    }
    
  }, [formErrors])

  const validate = async (values) => {

    const errors = {};

    if (!values.product_name) {
      errors.product_name = "Product Name is required";
      console.log(errors.product_name);
    }
    if (!values.product_capacity) {
      errors.product_capacity = "Product Capacity is required";
      console.log(errors.product_capacity);
    }
    if (!values.product_type) {
      errors.product_type = "Product Type is required";
      console.log(errors.product_type);
    }
    //alert(errors.tag);
    if (values.product_name === "" || values.product_capacity === "" || values.product_type === "") {
      return errors;
    } {
      const text = {
        product_name: formValues.product_name,
        product_capacity: formValues.product_capacity,
        product_type: formValues.product_type
      }
      alert(authToken)
      await axios.post('http://localhost:5000/api/products/create', text, {
        headers: {
          'consultant-token': authToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
        if (resp) {
          navigate("/products/");
        }
      }).catch(error => {
        console.error('There was an error!', error);
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter Product Name:
          <input type="text" name="product_name" id="product_name" value={formValues.product_name} onChange={(e) => handleInputChange(e)} />
        </label>
        <p>{formErrors.product_name}</p>
        <label>Enter product capacity:
          <input type="text" name="product_capacity" id="product_capacity" value={formValues.product_capacity} onChange={(e) => handleInputChange(e)} />
        </label>
        <p>{formErrors.product_capacity}</p>
        <label>Enter product type:
          <input type="text" name="product_type" id="product_type" value={formValues.product_type} onChange={(e) => handleInputChange(e)} />
        </label>
        <p>{formErrors.product_type}</p>
        <input type="submit" value="Add Product" />
      </form>
    </div>
  )
}

export default Addproduct