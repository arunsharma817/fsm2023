import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import userContext from '../../context/users/usersfsmContext.js'

const AddUser = (props) => {

    // Context Doing 
    const context = useContext(userContext);
    const { addUser , editUser  } = context;

    const navigate = useNavigate();
    const params = useParams();
    const userId = props.userId;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { user_first_name: "", user_email: "", user_password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = userId ? "Update User" : "Add User";
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            user_first_name: formValues.user_first_name,
            user_email: formValues.user_email,
            user_password: formValues.user_password
        }
        if(userId){
            console.log('I am here just before Edit'+userId);
            setFormValues(text);
            const res =   editUser(text , userId);
            if(res){
                navigate("/users");
            }            
        }else{
            console.log(text);
            const res = addUser(text);
            if(res){
                navigate("/users");
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
     if(userId){
            {props.users.map((user) => {
                if (user._id === userId) {
                    setFormValues(user);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.user_first_name) {
            //alert(values.consultant_name);
            errors.user_first_name = "Consultant Name is required";
        }
        if (!values.user_email) {
            errors.user_email = "Consultant Email is required";
        } else if (!regex.test(values.user_email)) {
            errors.user_email = "This is not a valid Email Format";
        }
        if (!values.user_password) {
            errors.user_password = "Consultant Password is required";
        } else if (values.user_password.length < 4) {
            errors.user_password = "Password must be more than 4 characters";
        } else if (values.user_password.length > 20) {
            errors.user_password = "Password must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;
    };

    return (
        <div className="container my-3">
            <div>
                This is the Add User Page ....
                <form onSubmit={handleSubmit}>
                    <label>Enter User Name:
                        <input type="text" name="user_first_name" id="user_first_name" value={formValues.user_first_name} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.user_first_name}</p>
                    <label>Enter User Email:
                        <input type="text" name="user_email" id="user_email" value={formValues.user_email} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.user_email}</p>
                    <label>Enter User Password:
                        <input type="text" name="user_password" id="user_password" value={formValues.user_password} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.user_password}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )
}

export default AddUser
