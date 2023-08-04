import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import clientContext from '../../context/clients/clientsContext.js'

const AddClient = (props) => {

    // Context Doing 
    const context = useContext(clientContext);
    const { addClient , editClient  } = context;

    const navigate = useNavigate();
    const params = useParams();
    const clientId = props.clientId;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { client_company_name: "", client_email: "", client_password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = clientId ? "Update Client" : "Add Client";
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            client_company_name: formValues.client_company_name,
            client_email: formValues.client_email,
            client_password: formValues.client_password
        }
        if(clientId){
            console.log('I am here just before Edit'+clientId);
            setFormValues(text);
            const res =   editClient(text , clientId);
            if(res){
                navigate("/clients");
            }            
        }else{
            console.log(text);
            const res = addClient(text);
            if(res){
                navigate("/clients");
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
      if(clientId){
            {props.clients.map((client) => {
                if (client._id === clientId) {
                    setFormValues(client);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.client_company_name) {
            //alert(values.consultant_name);
            errors.client_company_name = "Consultant Name is required";
        }
        if (!values.client_email) {
            errors.client_email = "Consultant Email is required";
        } else if (!regex.test(values.client_email)) {
            errors.client_email = "This is not a valid Email Format";
        }
        if (!values.client_password) {
            errors.client_password = "Consultant Password is required";
        } else if (values.client_password.length < 4) {
            errors.client_password = "Password must be more than 4 characters";
        } else if (values.client_password.length > 20) {
            errors.client_password = "Password must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;
    };

    return (
        <div className="container my-3">
            <div>
                This is the Add Client Page ....
                <form onSubmit={handleSubmit}>
                    <label>Enter Client Name:
                        <input type="text" name="client_company_name" id="client_company_name" value={formValues.client_company_name} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.client_company_name}</p>
                    <label>Enter Client Email:
                        <input type="text" name="client_email" id="client_email" value={formValues.client_email} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.client_email}</p>
                    <label>Enter Client Password:
                        <input type="text" name="client_password" id="client_password" value={formValues.client_password} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.client_password}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )
}

export default AddClient
