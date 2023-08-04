import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import servicevendorContext from '../../context/servicevendor/servicevendorContext.js'

const AddServiceVendorForm = (props) => {
    // Context Doing 
    const context = useContext(servicevendorContext);
    const { addServiceVendor , editServiceVendor  } = context;

    const navigate = useNavigate();
    const params = useParams();
    const serviceVendorId = props.serviceVendorId;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { service_vendor_fname: "", service_vendor_lname: "", service_vendor_type: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = serviceVendorId ? "Update ServiceVendor" : "Add ServiceVendor";
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            service_vendor_fname: formValues.service_vendor_fname,
            service_vendor_lname: formValues.service_vendor_lname,
            service_vendor_type: formValues.service_vendor_type
        }
        if(serviceVendorId){
            console.log('I am here just before Edit'+serviceVendorId);
            setFormValues(text);
            const res =   editServiceVendor(text , serviceVendorId);
            if(res){
                navigate("/servicevendor");
            }            
        }else{
            console.log(text);
            const res = addServiceVendor(text);
            if(res){
                navigate("/servicevendor");
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
     if(serviceVendorId){
            {props.serviceVendors.map((serviceVendor) => {
                if (serviceVendor._id === serviceVendorId) {
                    setFormValues(serviceVendor);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.service_vendor_fname) {
            //alert(values.consultant_name);
            errors.service_vendor_fname = "Vendor Name is required";
        }
        if (!values.service_vendor_lname) {
            errors.service_vendor_lname = "Vendor Email is required";
        } else if (!regex.test(values.service_vendor_lname)) {
            errors.service_vendor_lname = "This is not a valid Email Format";
        }
        if (!values.service_vendor_type) {
            errors.service_vendor_type = "Vendor Password is required";
        } else if (values.service_vendor_type.length < 4) {
            errors.service_vendor_type = "Vendor must be more than 4 characters";
        } else if (values.service_vendor_type.length > 20) {
            errors.service_vendor_type = "Password must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;
    };

    return (
        <div className="container my-3">
            <div>
                This is the Add Service Vendor Page ....
                <form onSubmit={handleSubmit}>
                    <label>Enter Vendor  First Name:
                        <input type="text" name="service_vendor_fname" id="service_vendor_fname" value={formValues.service_vendor_fname} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.service_vendor_fname}</p>
                    <label>Enter Vendor Last Name:
                        <input type="text" name="service_vendor_lname" id="service_vendor_lname" value={formValues.service_vendor_lname} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.service_vendor_lname}</p>
                    <label>Enter Vendor Service Type
                        <input type="text" name="service_vendor_type" id="service_vendor_type" value={formValues.service_vendor_type} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.service_vendor_type}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )

}

export default AddServiceVendorForm