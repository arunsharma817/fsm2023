import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import SecurityMembersContext from '../../context/securityMembers/SecurityMembersContext.js'

const AddSecurityMembers = (props) => {

    // Context Doing 
    const context = useContext(SecurityMembersContext);
    const { setFormValues , formValues , addSecurityMembers , editSecurityMembers , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const securityMemberId = props.securityMemberId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = securityMemberId ? "Update Security Member" : "Add Security Member";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.security_member_fname);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

       if (!formValues.security_member_fname) {
           //alert("checking "+formValues.security_member_fname);
           newErrors.security_member_fname = "Security Member Description is required";
       }

       if (!formValues.security_member_lname) {
        newErrors.security_member_lname = "Security Member Email is required";
       } else if (!regex.test(formValues.security_member_lname)) {
        newErrors.security_member_lname = "This is not a valid Email Format";
       }

       if (!formValues.security_member_mobile) {
        newErrors.security_member_mobile = "Security Member Mobile is required";
       } else if (formValues.security_member_mobile.length < 4) {
        newErrors.security_member_mobile = "Security Member must be more than 4 characters";
       } else if (formValues.security_member_mobile.length > 20) {
        newErrors.security_member_mobile = "Security Member must  be less than 20 characters";
       }

       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
                security_member_fname: formValues.security_member_fname,
                security_member_lname: formValues.security_member_lname,
                security_member_mobile: formValues.security_member_mobile
            }
    
            if(securityMemberId){
                console.log('I am here just before Edit'+securityMemberId);
                setFormValues(text);
                const res =   editSecurityMembers(text , securityMemberId);
                if(res){
                    navigate("/securitymembers/boardsecuritymembers");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                addSecurityMembers(text); 
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
        
     if(securityMemberId){
            {props.securityMembers.map((securityMember) => {
                if (securityMember._id === securityMemberId) {
                    setFormValues(securityMember);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.security_member_fname) {
            //alert("checking "+values.security_member_fname);
            errors.security_member_fname = "Security Member  is required";
        }
        if (!values.security_member_lname) {
            errors.security_member_lname = "Security Member Email is required";
        } else if (!regex.test(values.security_member_lname)) {
            errors.security_member_lname = "This is not a valid Email Format";
        }
        if (!values.security_member_mobile) {
            errors.security_member_mobile = "Security Member Mobile is required";
        } else if (values.security_member_mobile.length < 4) {
            errors.security_member_mobile = "Security Member must be more than 4 characters";
        } else if (values.security_member_mobile.length > 20) {
            errors.security_member_mobile = "Security Member must  be less than 20 characters";
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
                                      <h4 className="heading-h4">!! Add Security Member !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                        <div className="col-12 col-md-6 form-group">     
                                                            <label>Enter First Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="security_member_fname" id="security_member_fname" value={formValues.security_member_fname} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.security_member_fname}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Last Name: </label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="security_member_lname" id="security_member_lname" value={formValues.security_member_lname} onChange={(e) => handleInputChange(e)} />
                                                           
                                                           <p className="error">{formErrors.security_member_lname}</p>

                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Mobile Number:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="security_member_mobile" id="security_member_mobile" value={formValues.security_member_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.security_member_mobile}</p>
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

export default AddSecurityMembers
