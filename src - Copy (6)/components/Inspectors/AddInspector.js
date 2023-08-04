import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import inspectorContext from '../../context/inspectors/inspectorsContext.js'

const AddInspector = (props) => {

    // Context Doing 
    const context = useContext(inspectorContext);
    const { addInspector } = context;

    const navigate = useNavigate();
    const params = useParams();
    const inspectorId = params.id;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { inspector_name: "", inspector_email: "", inspector_password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = inspectorId ? "Update Inspector" : "Add Inspector";
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            inspector_name: formValues.inspector_name,
            inspector_email: formValues.inspector_email,
            inspector_password: formValues.inspector_password
        }
        addInspector(text);
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
    {/*    if(inspectorId){
            {props.listInspectors.map((inspector) => {
                if (inspector._id === inspectorId) {
                    setFormValues(inspector);
                }
            })}
        } */}

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.inspector_name) {
            //alert(values.consultant_name);
            errors.inspector_name = "Consultant Name is required";
        }
        if (!values.inspector_email) {
            errors.inspector_email = "Consultant Email is required";
        } else if (!regex.test(values.inspector_email)) {
            errors.inspector_email = "This is not a valid Email Format";
        }
        if (!values.inspector_password) {
            errors.inspector_password = "Consultant Password is required";
        } else if (values.inspector_password.length < 4) {
            errors.inspector_password = "Password must be more than 4 characters";
        } else if (values.inspector_password.length > 20) {
            errors.inspector_password = "Password must  be less than 20 characters";
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
                        <input type="text" name="inspector_name" id="inspector_name" value={formValues.inspector_name} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.inspector_name}</p>
                    <label>Enter Consultant Email:
                        <input type="text" name="inspector_email" id="inspector_email" value={formValues.inspector_email} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.inspector_email}</p>
                    <label>Enter Consultant Password:
                        <input type="text" name="inspector_password" id="inspector_password" value={formValues.inspector_password} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.inspector_password}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )
}

export default AddInspector
