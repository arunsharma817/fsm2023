import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import SocietyMembersContext from '../../context/societyMembers/SocietyMembersContext.js'

const AddSocietyMembers = (props) => {

    // Context Doing 
    const context = useContext(SocietyMembersContext);
    const { setFormValues , formValues , addSocietyMembers , editSocietyMembers , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const societyMemberId = props.societyMemberId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = societyMemberId ? "Update Society Member" : "Add Society Member";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.society_member_fname);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

       if (!formValues.society_member_fname) {
           //alert("checking "+formValues.society_member_fname);
           newErrors.society_member_fname = "Society Member Description is required";
       }

       if (!formValues.society_member_lname) {
        newErrors.society_member_lname = "Society Member Email is required";
       } else if (!regex.test(formValues.society_member_lname)) {
        newErrors.society_member_lname = "This is not a valid Email Format";
       }

       if (!formValues.society_member_mobile) {
        newErrors.society_member_mobile = "Society Member Mobile is required";
       } else if (formValues.society_member_mobile.length < 4) {
        newErrors.society_member_mobile = "Society Member must be more than 4 characters";
       } else if (formValues.society_member_mobile.length > 20) {
        newErrors.society_member_mobile = "Society Member must  be less than 20 characters";
       }

       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
                society_member_fname: formValues.society_member_fname,
                society_member_lname: formValues.society_member_lname,
                society_member_mobile: formValues.society_member_mobile
            }
    
            if(societyMemberId){
                console.log('I am here just before Edit'+societyMemberId);
                setFormValues(text);
                const res =   editSocietyMembers(text , societyMemberId);
                if(res){
                    navigate("/societymembers/boardsocietymembers");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                addSocietyMembers(text); 
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
        
     if(societyMemberId){
            {props.societyMembers.map((societyMember) => {
                if (societyMember._id === societyMemberId) {
                    setFormValues(societyMember);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.society_member_fname) {
            //alert("checking "+values.society_member_fname);
            errors.society_member_fname = "Society Member  is required";
        }
        if (!values.society_member_lname) {
            errors.society_member_lname = "Society Member Email is required";
        } else if (!regex.test(values.society_member_lname)) {
            errors.society_member_lname = "This is not a valid Email Format";
        }
        if (!values.society_member_mobile) {
            errors.society_member_mobile = "Society Member Mobile is required";
        } else if (values.society_member_mobile.length < 4) {
            errors.society_member_mobile = "Society Member must be more than 4 characters";
        } else if (values.society_member_mobile.length > 20) {
            errors.society_member_mobile = "Society Member must  be less than 20 characters";
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
                                      <h4 className="heading-h4">!! Add Society Member !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                        <div className="col-12 col-md-6 form-group">     
                                                            <label>Enter First Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="society_member_fname" id="society_member_fname" value={formValues.society_member_fname} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.society_member_fname}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Last Name: </label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="society_member_lname" id="society_member_lname" value={formValues.society_member_lname} onChange={(e) => handleInputChange(e)} />
                                                           
                                                           <p className="error">{formErrors.society_member_lname}</p>

                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Mobile Number:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="society_member_mobile" id="society_member_mobile" value={formValues.society_member_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.society_member_mobile}</p>
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

export default AddSocietyMembers
