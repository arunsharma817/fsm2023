import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ReviewsContext from '../../context/reviews/ReviewsContext.js'

const AddReview = (props) => {

    // Context Doing 
    const context = useContext(ReviewsContext);
    const { setFormValues , formValues , addReview , editReview , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const reviewId = props.reviewId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = reviewId ? "Update Review" : "Add Review";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.review_description);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

       if (!formValues.review_description) {
           //alert("checking "+formValues.review_description);
           newErrors.review_description = "Review Description is required";
       }

       if (!formValues.review_owner) {
        newErrors.review_owner = "Review Email is required";
       } else if (!regex.test(formValues.review_owner)) {
        newErrors.review_owner = "This is not a valid Email Format";
       }

       if (!formValues.review_rating) {
        newErrors.review_rating = "Review Mobile is required";
       } else if (formValues.review_rating.length < 4) {
        newErrors.review_rating = "Review must be more than 4 characters";
       } else if (formValues.review_rating.length > 20) {
        newErrors.review_rating = "Review must  be less than 20 characters";
       }

       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
                review_description: formValues.review_description,
                review_owner: formValues.review_owner,
                review_rating: formValues.review_rating
            }
    
            if(reviewId){
                console.log('I am here just before Edit'+reviewId);
                setFormValues(text);
                const res =   editReview(text , reviewId);
                if(res){
                    navigate("/reviews/boardreviews");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                addReview(text); 
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
        
     if(reviewId){
            {props.reviews.map((review) => {
                if (review._id === reviewId) {
                    setFormValues(review);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.review_description) {
            //alert("checking "+values.review_description);
            errors.review_description = "Review  is required";
        }
        if (!values.review_owner) {
            errors.review_owner = "Review Email is required";
        } else if (!regex.test(values.review_owner)) {
            errors.review_owner = "This is not a valid Email Format";
        }
        if (!values.review_rating) {
            errors.review_rating = "Review Mobile is required";
        } else if (values.review_rating.length < 4) {
            errors.review_rating = "Review must be more than 4 characters";
        } else if (values.review_rating.length > 20) {
            errors.review_rating = "Review must  be less than 20 characters";
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
                                      <h4 className="heading-h4">!! Add Review !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                        <div className="col-12 col-md-6 form-group">     
                                                            <label>Enter Review Desc:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="review_description" id="review_description" value={formValues.review_description} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.review_description}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Review Owner: </label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="review_owner" id="review_owner" value={formValues.review_owner} onChange={(e) => handleInputChange(e)} />
                                                           
                                                           <p className="error">{formErrors.review_owner}</p>

                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Review Rating:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="review_rating" id="review_rating" value={formValues.review_rating} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.review_rating}</p>
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

export default AddReview
