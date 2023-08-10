import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import helpdeskContext from '../../context/helpdesk/helpdeskContext.js'

const AddHelpdesk = (props) => {

    // Context Doing 
    const context = useContext(helpdeskContext);
    const { addHelpdesk , editHelpdesk  } = context;

    const navigate = useNavigate();
    const params = useParams();
    const helpdeskId = props.helpdeskId;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { request_subject: "", request_description: "", request_priority: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = helpdeskId ? "Update Helpdesk" : "Add Helpdesk";
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            request_subject: formValues.request_subject,
            request_description: formValues.request_description,
            request_priority: formValues.request_priority
        }
        if(helpdeskId){
            console.log('I am here just before Edit'+helpdeskId);
            setFormValues(text);
            const res =   editHelpdesk(text , helpdeskId);
            if(res){
                navigate("/helpdesk");
            }
            
        }else{
            const res = addHelpdesk(text);
            if(res){
                navigate("/helpdesk");
            }
            
        }
    {/*    if(inspectorId) {
            console.log('I am about to update condition');
            axios.put('http://localhost:5000/api/inspectors/update/' + inspectorId, text, {
                headers: {
                    'owner-token': ownerToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                if (resp) {
                    navigate("/inspectors");
                }
            }).catch(error => {
                console.error('There was an error!', error);
            });
        } else {

            axios.post('http://localhost:5000/api/inspectors/create/', text, {
                headers: {
                    'owner-token': ownerToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                if (resp) {
                    navigate("/inspectors");
                }
            }).catch(error => {
                console.error('There was an error!', error);
            });

        }   */}
    }
    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/owners/login')

        //console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("I am in useEffect" + formValues);
        }
      if(helpdeskId){
            {props.helpdesks.map((helpdesk) => {
                if (helpdesk._id === helpdeskId) {
                    setFormValues(helpdesk);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.request_subject) {
            //alert(values.request_subject);
            errors.request_subject = "Helpdesk Name is required";
        }
        if (!values.request_description) {
            errors.request_description = "Helpdesk Email is required";
        } else if (!regex.test(values.request_description)) {
            errors.request_description = "This is not a valid Email Format";
        }
        if (!values.request_priority) {
            errors.request_priority = "Helpdesk Password is required";
        } else if (values.request_priority.length < 4) {
            errors.request_priority = "Password must be more than 4 characters";
        } else if (values.request_priority.length > 20) {
            errors.request_priority = "Password must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;
    };

    return (
        <div className="container my-3">
            <div>
                This is the Add Helpdesk Page ....
                <form onSubmit={handleSubmit}>
                    <label>Enter Helpdesk Name:
                        <input type="text" name="request_subject" id="request_subject" value={formValues.request_subject} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.request_subject}</p>
                    <label>Enter Helpdesk Email:
                        <input type="text" name="request_description" id="request_description" value={formValues.request_description} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.request_description}</p>
                    <label>Enter Helpdesk Password:
                        <input type="text" name="request_priority" id="request_priority" value={formValues.request_priority} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.request_priority}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )
}

export default AddHelpdesk
