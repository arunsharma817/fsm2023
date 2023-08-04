import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import usertypeContext from '../../context/usertype/usertypeContext.js'

const AddUserTypeForm = (props) => {
    // Context Doing 
    const context = useContext(usertypeContext);
    const { addUserType , editUserType  } = context;

    const navigate = useNavigate();
    const params = useParams();
    const userTypeId = props.userTypeId;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { user_type_title: "", user_type_description: "", user_type_module_permission: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = userTypeId ? "Update UserType" : "Add UserType";
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            user_type_title: formValues.user_type_title,
            user_type_description: formValues.user_type_description,
            user_type_module_permission: formValues.user_type_module_permission
        }
        if(userTypeId){
            console.log('I am here just before Edit'+userTypeId);
            setFormValues(text);
            const res =   editUserType(text , userTypeId);
            if(res){
                navigate("/usertype");
            }            
        }else{
            console.log(text);
            const res = addUserType(text);
            if(res){
                navigate("/usertype");
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
     if(userTypeId){
            {props.userTypes.map((userType) => {
                if (userType._id === userTypeId) {
                    setFormValues(userType);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.user_type_title) {
            //alert(values.consultant_name);
            errors.user_type_title = "Consultant Name is required";
        }
        if (!values.user_type_description) {
            errors.user_type_description = "Consultant Email is required";
        } else if (!regex.test(values.user_type_description)) {
            errors.user_type_description = "This is not a valid Email Format";
        }
        if (!values.user_type_module_permission) {
            errors.user_type_module_permission = "Consultant Password is required";
        } else if (values.user_type_module_permission.length < 4) {
            errors.user_type_module_permission = "Password must be more than 4 characters";
        } else if (values.user_type_module_permission.length > 20) {
            errors.user_type_module_permission = "Password must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;
    };

    return (
        <div className="container my-3">
            <div>
                This is the Add User Type Page ....
                <form onSubmit={handleSubmit}>
                    <label>Enter User Name:
                        <input type="text" name="user_type_title" id="user_type_title" value={formValues.user_type_title} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.user_type_title}</p>
                    <label>Enter User Email:
                        <input type="text" name="user_type_description" id="user_type_description" value={formValues.user_type_description} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.user_type_description}</p>
                    <label>Enter User Password:
                        <input type="text" name="user_type_module_permission" id="user_type_module_permission" value={formValues.user_type_module_permission} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.user_type_module_permission}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )

}

export default AddUserTypeForm