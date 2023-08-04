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
    const { setFormValues , formValues , addUser , editUser , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const userId = props.userId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = userId ? "Update User" : "Add User";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.user_first_name);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

       if (!formValues.user_first_name) {
           //alert("checking First Name"+formValues.user_first_name);
           newErrors.user_first_name = "User First Name is required";
       }

       if (!formValues.user_email) {
        newErrors.user_email = "User Email is required";
       } else if (!regex.test(formValues.user_email)) {
        newErrors.user_email = "This is not a valid Email Format";
       }

       if (!formValues.user_password) {
        newErrors.user_password = "User Password is required";
       } else if (formValues.user_password.length < 4) {
        newErrors.user_password = "User must be more than 4 characters";
       } else if (formValues.user_password.length > 20) {
        newErrors.user_password = "User must  be less than 20 characters";
       }

       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
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
                    navigate("/users/usersboard");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                addUser(text); 
                {/*                 
                when redirection needed 

                console.log(text);
                const res = addUser(text);
                console.log("I am checking Response"+res);
                
                if(res){
                    navigate("/users");
                */}
                
            }
        }

       
    
    }
    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/owners/login')
        
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
            //alert("checking First Name"+values.user_first_name);
            errors.user_first_name = "User First Name is required";
        }
        if (!values.user_email) {
            errors.user_email = "User Email is required";
        } else if (!regex.test(values.user_email)) {
            errors.user_email = "This is not a valid Email Format";
        }
        if (!values.user_password) {
            errors.user_password = "User Password is required";
        } else if (values.user_password.length < 4) {
            errors.user_password = "User must be more than 4 characters";
        } else if (values.user_password.length > 20) {
            errors.user_password = "User must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;
    };

    return (
        <div className="row g-0">
        <div className="col-12 inner-wrapper">
          <div className="row">
              <div className="col-12 wrap-content">
                <div className="row g-0">
                    <div className="col-12 card mb-4">                        
                        <div className="card-body">
                            <div className="tab-content">
                                <div className="tab-pane fade active show" id="ntarget-2" role="tabpanel" aria-labelledby="ntab-2">
                                      <h4 className="heading-h4">!! Add Inspector !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                        <div className="col-12 col-md-6 form-group">     
                                                            <label>Enter User Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="user_first_name" id="user_first_name" value={formValues.user_first_name} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.user_first_name}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter User Email: </label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="user_email" id="user_email" value={formValues.user_email} onChange={(e) => handleInputChange(e)} />
                                                           
                                                           <p className="error">{formErrors.user_email}</p>

                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter User Password:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="user_password" id="user_password" value={formValues.user_password} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.user_password}</p>
                                                        </div>
                                                        <div className="col-12 form-action">  
                                                            <input type="submit" value={actionButton} />
                                                        </div>
                                                    </div>
                                            </div>
                                            </form>
            </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        </div>
        
    )
}

export default AddUser
