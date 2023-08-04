import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";

const AddConsultant = (props) => {
    const navigate = useNavigate();
    const params = useParams();
    const consultantId = params.id;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { consultant_name: "", consultant_email: "", consultant_password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = consultantId ? "Update Consultant" : "Add Consultant";
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            consultant_name: formValues.consultant_name,
            consultant_email: formValues.consultant_email,
            consultant_password: formValues.consultant_password
        }
        if(consultantId) {
            console.log('I am about to update condition');
            axios.put('http://localhost:5000/api/consultants/update/' + consultantId, text, {
                headers: {
                    'owner-token': ownerToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                if (resp) {
                    navigate("/consultants");
                }
            }).catch(error => {
                console.error('There was an error!', error);
            });
        } else {

            axios.post('http://localhost:5000/api/consultants/create/', text, {
                headers: {
                    'owner-token': ownerToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                if (resp) {
                    navigate("/consultants");
                }
            }).catch(error => {
                console.error('There was an error!', error);
            });

        }
    }
    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/owners/login')

        //console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("I am in useEffect" + formValues);
        }
        if(consultantId){
            {props.listConsultants.map((consultant) => {
                if (consultant._id === consultantId) {
                    setFormValues(consultant);
                }
            })}
        }

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.consultant_name) {
            //alert(values.consultant_name);
            errors.consultant_name = "Consultant Name is required";
        }

        if (!values.consultant_email) {
            errors.consultant_email = "Consultant Email is required";
        } else if (!regex.test(values.consultant_email)) {
            errors.consultant_email = "This is not a valid Email Format";
        }

        if (!values.consultant_password) {
            errors.consultant_password = "Consultant Password is required";
        } else if (values.consultant_password.length < 4) {
            errors.consultant_password = "Password must be more than 4 characters";
        } else if (values.consultant_password.length > 20) {
            errors.consultant_password = "Password must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;

    };

    return (
        <div className="container my-3">
            <div>
                This is the Add Consultant Page ....
                <form onSubmit={handleSubmit}>
                    <label>Enter Consultant Name:
                        <input type="text" name="consultant_name" id="consultant_name" value={formValues.consultant_name} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.consultant_name}</p>
                    <label>Enter Consultant Email:
                        <input type="text" name="consultant_email" id="consultant_email" value={formValues.consultant_email} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.consultant_email}</p>
                    <label>Enter Consultant Password:
                        <input type="text" name="consultant_password" id="consultant_password" value={formValues.consultant_password} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.consultant_password}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )
}

export default AddConsultant
