import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import inspectionContext from '../../context/inspections/inspectionsContext.js'

const AddInspection = (props) => {

    // Context Doing 
    const context = useContext(inspectionContext);
    const { addInspection , editInspection  } = context;

    const navigate = useNavigate();
    const params = useParams();
    const inspectionId = props.inspectionId;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { client_id: "", product_id: "", inspector_id: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = inspectionId ? "Update Inspection" : "Add Inspection";
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            client_id: formValues.client_id,
            product_id: formValues.product_id,
            inspector_id: formValues.inspector_id
        }
        if(inspectionId){
            console.log('I am here just before Edit'+inspectionId);
            setFormValues(text);
            const res =   editInspection(text , inspectionId);
            if(res){
                navigate("/inspections");
            }            
        }else{
            console.log(text);
            const res = addInspection(text);
            if(res){
                navigate("/inspections");
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
      if(inspectionId){
            {props.inspections.map((inspection) => {
                if (inspection._id === inspectionId) {
                    setFormValues(inspection);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.client_id) {
            //alert(values.consultant_name);
            errors.client_id = "Consultant Name is required";
        }
        if (!values.product_id) {
            errors.product_id = "Consultant Email is required";
        } else if (!regex.test(values.product_id)) {
            errors.product_id = "This is not a valid Email Format";
        }
        if (!values.inspector_id) {
            errors.inspector_id = "Consultant Password is required";
        } else if (values.inspector_id.length < 4) {
            errors.inspector_id = "Password must be more than 4 characters";
        } else if (values.inspector_id.length > 20) {
            errors.inspector_id = "Password must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;
    };

    return (
        <div className="container my-3">
            <div>
                This is the Add Inspection Page ....
                <form onSubmit={handleSubmit}>
                    <label>Enter Client Name:
                        <input type="text" name="client_id" id="client_id" value={formValues.client_id} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.client_id}</p>
                    <label>Enter Client Email:
                        <input type="text" name="product_id" id="product_id" value={formValues.product_id} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.product_id}</p>
                    <label>Enter Client Password:
                        <input type="text" name="inspector_id" id="inspector_id" value={formValues.inspector_id} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.inspector_id}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )
}

export default AddInspection
