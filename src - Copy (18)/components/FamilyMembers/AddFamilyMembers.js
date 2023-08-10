import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import FamilyMembersContext from '../../context/FamilyMembers/FamilyMembersContext.js'

const AddFamilyMembers = (props) => {

    // Context Doing 
    const context = useContext(FamilyMembersContext);
    const { setFormValues , formValues , addFamilyMembers , editFamilyMembers , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const familyMemberId = props.familyMemberId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = familyMemberId ? "Update Family Member" : "Add Family Member";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.family_member_fname);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

       if (!formValues.family_member_fname) {
           //alert("checking "+formValues.family_member_fname);
           newErrors.family_member_fname = "Family Member Description is required";
       }

       if (!formValues.family_member_lname) {
        newErrors.family_member_lname = "Family Member Email is required";
       } else if (!regex.test(formValues.family_member_lname)) {
        newErrors.family_member_lname = "This is not a valid Email Format";
       }

       if (!formValues.family_member_mobile) {
        newErrors.family_member_mobile = "Family Member Mobile is required";
       } else if (formValues.family_member_mobile.length < 4) {
        newErrors.family_member_mobile = "Family Member must be more than 4 characters";
       } else if (formValues.family_member_mobile.length > 20) {
        newErrors.family_member_mobile = "Family Member must  be less than 20 characters";
       }

       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
                family_member_fname: formValues.family_member_fname,
                family_member_lname: formValues.family_member_lname,
                family_member_mobile: formValues.family_member_mobile
            }
    
            if(familyMemberId){
                console.log('I am here just before Edit'+familyMemberId);
                setFormValues(text);
                const res =   editFamilyMembers(text , familyMemberId);
                if(res){
                    navigate("/familymembers/boardfamilymembers");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                addFamilyMembers(text); 
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
        
     if(familyMemberId){
            {props.familyMembers.map((familyMember) => {
                if (familyMember._id === familyMemberId) {
                    setFormValues(familyMember);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.family_member_fname) {
            //alert("checking "+values.family_member_fname);
            errors.family_member_fname = "Family Member  is required";
        }
        if (!values.family_member_lname) {
            errors.family_member_lname = "Family Member Email is required";
        } else if (!regex.test(values.family_member_lname)) {
            errors.family_member_lname = "This is not a valid Email Format";
        }
        if (!values.family_member_mobile) {
            errors.family_member_mobile = "Family Member Mobile is required";
        } else if (values.family_member_mobile.length < 4) {
            errors.family_member_mobile = "Family Member must be more than 4 characters";
        } else if (values.family_member_mobile.length > 20) {
            errors.family_member_mobile = "Family Member must  be less than 20 characters";
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
                                      <h4 className="heading-h4">!! Add Family Member !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                        <div className="col-12 col-md-6 form-group">     
                                                            <label>Enter First Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="family_member_fname" id="family_member_fname" value={formValues.family_member_fname} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.family_member_fname}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Last Name: </label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="family_member_lname" id="family_member_lname" value={formValues.family_member_lname} onChange={(e) => handleInputChange(e)} />
                                                           
                                                           <p className="error">{formErrors.family_member_lname}</p>

                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Mobile Number:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="family_member_mobile" id="family_member_mobile" value={formValues.family_member_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.family_member_mobile}</p>
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

export default AddFamilyMembers
