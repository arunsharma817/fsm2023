import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import mainProductsContext from '../../context/MainProducts/mainProductsContext.js'

const AddMainProductsForm = (props) => {

    // Context Doing 
    const context = useContext(mainProductsContext);
    const { addMainProducts , editMainProducts  } = context;
    const navigate = useNavigate();
    const params = useParams();
    const mainProductId = props.mainProductId;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { main_products_name: "", main_products_description: "", main_products_capacity: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = mainProductId ? "Update Product" : "Add Product";

    
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            main_products_name: formValues.main_products_name,
            main_products_description: formValues.main_products_description,
            main_products_capacity: formValues.main_products_capacity
        }
        if(mainProductId){
            console.log('I am here just before Edit'+mainProductId);
            setFormValues(text);
            const res =   editMainProducts(text , mainProductId);
            if(res){
                navigate("/mainproducts");
            }            
        }else{
            console.log(text);
            const res = addMainProducts(text);
            if(res){
                navigate("/mainproducts");
            }
            
        }
    
    }
    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/owners/login')

        //console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("I am in useEffect" + formValues);
        }
     if(mainProductId){
            {props.mainProducts.map((mainProduct) => {
                if (mainProduct._id === mainProductId) {
                    setFormValues(mainProduct);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.main_products_name) {
            //alert(values.consultant_name);
            errors.main_products_name = "Consultant Name is required";
        }
        if (!values.main_products_description) {
            errors.main_products_description = "Consultant Email is required";
        } else if (!regex.test(values.main_products_description)) {
            errors.main_products_description = "This is not a valid Email Format";
        }
        if (!values.main_products_capacity) {
            errors.main_products_capacity = "Consultant Password is required";
        } else if (values.main_products_capacity.length < 4) {
            errors.main_products_capacity = "Password must be more than 4 characters";
        } else if (values.main_products_capacity.length > 20) {
            errors.main_products_capacity = "Password must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;
    };

    return (
        <div className="container my-3">
            <div>
                This is the Add Product Page ....
                <form onSubmit={handleSubmit}>
                    <label>Enter Product Name:
                        <input type="text" name="main_products_name" id="main_products_name" value={formValues.main_products_name} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.main_products_name}</p>
                    <label>Enter Product Desc:
                        <input type="text" name="main_products_description" id="main_products_description" value={formValues.main_products_description} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.main_products_description}</p>
                    <label>Enter Product Capacity:
                        <input type="text" name="main_products_capacity" id="main_products_capacity" value={formValues.main_products_capacity} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.main_products_capacity}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )
}

export default AddMainProductsForm