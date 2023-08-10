import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import GautraMembersContext from '../../context/gautraMembers/GautraMembersContext.js'

const AddGautraMembers = (props) => {

    // Context Doing 
    const context = useContext(GautraMembersContext);
    const { setFormValues , formValues , addGautraMembers , editGautraMembers , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const gautraMemberId = props.gautraMemberId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = gautraMemberId ? "Update Gautra Member" : "Add Gautra Member";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.gautra_member_fname);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

       if (!formValues.gautra_member_fname) {
           //alert("checking "+formValues.gautra_member_fname);
           newErrors.gautra_member_fname = "Gautra Member Description is required";
       }

       if (!formValues.gautra_member_lname) {
        newErrors.gautra_member_lname = "Gautra Member Email is required";
       } else if (!regex.test(formValues.gautra_member_lname)) {
        newErrors.gautra_member_lname = "This is not a valid Email Format";
       }

       if (!formValues.gautra_member_mobile) {
        newErrors.gautra_member_mobile = "Gautra Member Mobile is required";
       } else if (formValues.gautra_member_mobile.length < 4) {
        newErrors.gautra_member_mobile = "Gautra Member must be more than 4 characters";
       } else if (formValues.gautra_member_mobile.length > 20) {
        newErrors.gautra_member_mobile = "Gautra Member must  be less than 20 characters";
       }

       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
                gautra_member_fname: formValues.gautra_member_fname,
                gautra_member_lname: formValues.gautra_member_lname,
                gautra_member_mobile: formValues.gautra_member_mobile
            }
    
            if(gautraMemberId){
                console.log('I am here just before Edit'+gautraMemberId);
                setFormValues(text);
                const res =   editGautraMembers(text , gautraMemberId);
                if(res){
                    navigate("/gautramembers/boardgautramembers");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                addGautraMembers(text); 
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
        
     if(gautraMemberId){
            {props.gautraMembers.map((gautraMember) => {
                if (gautraMember._id === gautraMemberId) {
                    setFormValues(gautraMember);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.gautra_member_fname) {
            //alert("checking "+values.gautra_member_fname);
            errors.gautra_member_fname = "Gautra Member  is required";
        }
        if (!values.gautra_member_lname) {
            errors.gautra_member_lname = "Gautra Member Email is required";
        } else if (!regex.test(values.gautra_member_lname)) {
            errors.gautra_member_lname = "This is not a valid Email Format";
        }
        if (!values.gautra_member_mobile) {
            errors.gautra_member_mobile = "Gautra Member Mobile is required";
        } else if (values.gautra_member_mobile.length < 4) {
            errors.gautra_member_mobile = "Gautra Member must be more than 4 characters";
        } else if (values.gautra_member_mobile.length > 20) {
            errors.gautra_member_mobile = "Gautra Member must  be less than 20 characters";
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
                                      <h4 className="heading-h4">!! Add Gautra Member !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                        <div className="col-12 col-md-6 form-group">     
                                                            <label>Enter First Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="gautra_member_fname" id="gautra_member_fname" value={formValues.gautra_member_fname} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.gautra_member_fname}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Last Name: </label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="gautra_member_lname" id="gautra_member_lname" value={formValues.gautra_member_lname} onChange={(e) => handleInputChange(e)} />
                                                           
                                                           <p className="error">{formErrors.gautra_member_lname}</p>

                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Mobile Number:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="gautra_member_mobile" id="gautra_member_mobile" value={formValues.gautra_member_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.gautra_member_mobile}</p>
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

export default AddGautraMembers
