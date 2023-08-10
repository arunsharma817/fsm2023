import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import SamajMembersContext from '../../context/SamajMembers/SamajMembersContext.js'

const AddSamajMembers = (props) => {

    // Context Doing 
    const context = useContext(SamajMembersContext);
    const { setFormValues , formValues , addSamajMembers , editSamajMembers , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const samajMemberId = props.samajMemberId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = samajMemberId ? "Update Samaj Member" : "Add Samaj Member";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.samaj_member_fname);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

       if (!formValues.samaj_member_fname) {
           //alert("checking "+formValues.samaj_member_fname);
           newErrors.samaj_member_fname = "Samaj Member Description is required";
       }

       if (!formValues.samaj_member_lname) {
        newErrors.samaj_member_lname = "Samaj Member Email is required";
       } else if (!regex.test(formValues.samaj_member_lname)) {
        newErrors.samaj_member_lname = "This is not a valid Email Format";
       }

       if (!formValues.samaj_member_mobile) {
        newErrors.samaj_member_mobile = "Samaj Member Mobile is required";
       } else if (formValues.samaj_member_mobile.length < 4) {
        newErrors.samaj_member_mobile = "Samaj Member must be more than 4 characters";
       } else if (formValues.samaj_member_mobile.length > 20) {
        newErrors.samaj_member_mobile = "Samaj Member must  be less than 20 characters";
       }

       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
                samaj_member_fname: formValues.samaj_member_fname,
                samaj_member_lname: formValues.samaj_member_lname,
                samaj_member_mobile: formValues.samaj_member_mobile
            }
    
            if(samajMemberId){
                console.log('I am here just before Edit'+samajMemberId);
                setFormValues(text);
                const res =   editSamajMembers(text , samajMemberId);
                if(res){
                    navigate("/samajmembers/boardsamajmembers");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                addSamajMembers(text); 
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
        
     if(samajMemberId){
            {props.samajMembers.map((samajMember) => {
                if (samajMember._id === samajMemberId) {
                    setFormValues(samajMember);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.samaj_member_fname) {
            //alert("checking "+values.samaj_member_fname);
            errors.samaj_member_fname = "Samaj Member  is required";
        }
        if (!values.samaj_member_lname) {
            errors.samaj_member_lname = "Samaj Member Email is required";
        } else if (!regex.test(values.samaj_member_lname)) {
            errors.samaj_member_lname = "This is not a valid Email Format";
        }
        if (!values.samaj_member_mobile) {
            errors.samaj_member_mobile = "Samaj Member Mobile is required";
        } else if (values.samaj_member_mobile.length < 4) {
            errors.samaj_member_mobile = "Samaj Member must be more than 4 characters";
        } else if (values.samaj_member_mobile.length > 20) {
            errors.samaj_member_mobile = "Samaj Member must  be less than 20 characters";
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
                                      <h4 className="heading-h4">!! Add Samaj Member !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                        <div className="col-12 col-md-6 form-group">     
                                                            <label>Enter First Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="samaj_member_fname" id="samaj_member_fname" value={formValues.samaj_member_fname} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.samaj_member_fname}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Last Name: </label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="samaj_member_lname" id="samaj_member_lname" value={formValues.samaj_member_lname} onChange={(e) => handleInputChange(e)} />
                                                           
                                                           <p className="error">{formErrors.samaj_member_lname}</p>

                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Mobile Number:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="samaj_member_mobile" id="samaj_member_mobile" value={formValues.samaj_member_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.samaj_member_mobile}</p>
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

export default AddSamajMembers
