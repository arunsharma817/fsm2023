import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import enquiryContext from '../../context/enquiry/enquiryContext.js'

const AddEnquiry = (props) => {

    // Context Doing 
    const context = useContext(enquiryContext);
    const { setFormValues , formValues , addEnquiry , editEnquiry , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const enquiryId = props.enquiryId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = enquiryId ? "Update Enquiry" : "Add Enquiry";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.enquiry_name);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

       if (!formValues.enquiry_name) {
           //alert("checking First Name"+formValues.enquiry_name);
           newErrors.enquiry_name = "Enquiry First Name is required";
       }

       if (!formValues.enquiry_email) {
        newErrors.enquiry_email = "Enquiry Email is required";
       } else if (!regex.test(formValues.enquiry_email)) {
        newErrors.enquiry_email = "This is not a valid Email Format";
       }

       if (!formValues.enquiry_mobile) {
        newErrors.enquiry_mobile = "Enquiry Mobile is required";
       } else if (formValues.enquiry_mobile.length < 4) {
        newErrors.enquiry_mobile = "Enquiry must be more than 4 characters";
       } else if (formValues.enquiry_mobile.length > 20) {
        newErrors.enquiry_mobile = "Enquiry must  be less than 20 characters";
       }

       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
                enquiry_name: formValues.enquiry_name,
                enquiry_email: formValues.enquiry_email,
                enquiry_mobile: formValues.enquiry_mobile
            }
    
            if(enquiryId){
                console.log('I am here just before Edit'+enquiryId);
                setFormValues(text);
                const res =   editEnquiry(text , enquiryId);
                if(res){
                    navigate("/enquiry/enquiryboard");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                addEnquiry(text); 
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
        
     if(enquiryId){
            {props.enquiries.map((enquiry) => {
                if (enquiry._id === enquiryId) {
                    setFormValues(enquiry);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.enquiry_name) {
            //alert("checking First Name"+values.enquiry_name);
            errors.enquiry_name = "Enquiry First Name is required";
        }
        if (!values.enquiry_email) {
            errors.enquiry_email = "Enquiry Email is required";
        } else if (!regex.test(values.enquiry_email)) {
            errors.enquiry_email = "This is not a valid Email Format";
        }
        if (!values.enquiry_mobile) {
            errors.enquiry_mobile = "Enquiry Mobile is required";
        } else if (values.enquiry_mobile.length < 4) {
            errors.enquiry_mobile = "Enquiry must be more than 4 characters";
        } else if (values.enquiry_mobile.length > 20) {
            errors.enquiry_mobile = "Enquiry must  be less than 20 characters";
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
                                                            <label>Enter Enquiry Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="enquiry_name" id="enquiry_name" value={formValues.enquiry_name} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.enquiry_name}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Enquiry Email: </label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="enquiry_email" id="enquiry_email" value={formValues.enquiry_email} onChange={(e) => handleInputChange(e)} />
                                                           
                                                           <p className="error">{formErrors.enquiry_email}</p>

                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Enquiry Mobile:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="enquiry_mobile" id="enquiry_mobile" value={formValues.enquiry_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.enquiry_mobile}</p>
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

export default AddEnquiry
