import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import SocialLinksContext from '../../context/SocialLinks/SocialLinksContext.js'

const AddSocialLinks = (props) => {

    // Context Doing 
    const context = useContext(SocialLinksContext);
    const { setFormValues , formValues , addSocialLinks , editSocialLinks , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const socialLinkId = props.socialLinkId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = socialLinkId ? "Update Social Link" : "Add Social Link";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.social_link_title);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

       if (!formValues.social_link_title) {
           //alert("checking "+formValues.social_link_title);
           newErrors.social_link_title = "Social Link Description is required";
       }

       if (!formValues.social_link_icon) {
        newErrors.social_link_icon = "Social Link Email is required";
       } else if (!regex.test(formValues.social_link_icon)) {
        newErrors.social_link_icon = "This is not a valid Email Format";
       }

       if (!formValues.social_link_source_url) {
        newErrors.social_link_source_url = "Social Link Mobile is required";
       } else if (formValues.social_link_source_url.length < 4) {
        newErrors.social_link_source_url = "Social Link must be more than 4 characters";
       } else if (formValues.social_link_source_url.length > 20) {
        newErrors.social_link_source_url = "Social Link must  be less than 20 characters";
       }

       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
                social_link_title: formValues.social_link_title,
                social_link_icon: formValues.social_link_icon,
                social_link_source_url: formValues.social_link_source_url
            }
    
            if(socialLinkId){
                console.log('I am here just before Edit'+socialLinkId);
                setFormValues(text);
                const res =   editSocialLinks(text , socialLinkId);
                if(res){
                    navigate("/sociallinks/boardsociallinks");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                console.log("I am before addin"+text.social_link_title);
                addSocialLinks(text); 
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
        
     if(socialLinkId){
            {props.socialLinks.map((socialLink) => {
                if (socialLink._id === socialLinkId) {
                    setFormValues(socialLink);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.social_link_title) {
            //alert("checking "+values.social_link_title);
            errors.social_link_title = "Social Link  is required";
        }
        if (!values.social_link_icon) {
            errors.social_link_icon = "Social Link Email is required";
        } else if (!regex.test(values.social_link_icon)) {
            errors.social_link_icon = "This is not a valid Email Format";
        }
        if (!values.social_link_source_url) {
            errors.social_link_source_url = "Social Link Mobile is required";
        } else if (values.social_link_source_url.length < 4) {
            errors.social_link_source_url = "Social Link must be more than 4 characters";
        } else if (values.social_link_source_url.length > 20) {
            errors.social_link_source_url = "Social Link must  be less than 20 characters";
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
                                      <h4 className="heading-h4">!! Add Social Link !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                        <div className="col-12 col-md-6 form-group">     
                                                            <label>Enter Link Title:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="social_link_title" id="social_link_title" value={formValues.social_link_title} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.social_link_title}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Link Icon: </label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="social_link_icon" id="social_link_icon" value={formValues.social_link_icon} onChange={(e) => handleInputChange(e)} />
                                                           
                                                           <p className="error">{formErrors.social_link_icon}</p>

                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Link URL:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="social_link_source_url" id="social_link_source_url" value={formValues.social_link_source_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.social_link_source_url}</p>
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

export default AddSocialLinks
