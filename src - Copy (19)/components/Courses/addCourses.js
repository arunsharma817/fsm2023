import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import contextCourses from '../../context/courses/contextCourses.js'

const AddCourses = (props) => {

    // Context Doing 
    const context = useContext(contextCourses);
    const { setFormValues , formValues , addCourse , editCourse , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const courseId = props.courseId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = courseId ? "Update Course" : "Add Course";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.course_title);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

       if (!formValues.course_title) {
           //alert("checkingTitle"+formValues.course_title);
           newErrors.course_title = "CourseTitle is required";
       }

       if (!formValues.course_description) {
        newErrors.course_description = "Course Description is required";
       } else if (!regex.test(formValues.course_description)) {
        newErrors.course_description = "This is not a valid Description Format";
       }

       if (!formValues.course_author) {
        newErrors.course_author = "Course Author is required";
       } else if (formValues.course_author.length < 4) {
        newErrors.course_author = "Course must be more than 4 characters";
       } else if (formValues.course_author.length > 20) {
        newErrors.course_author = "Course must  be less than 20 characters";
       }

       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
                course_title: formValues.course_title,
                course_description: formValues.course_description,
                course_author: formValues.course_author
            }
    
            if(courseId){
                console.log('I am here just before Edit'+courseId);
                setFormValues(text);
                const res =   editCourse(text , courseId);
                if(res){
                    navigate("/courses/boardcourses");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                addCourse(text); 
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
        
     if(courseId){
            {props.courses.map((course) => {
                if (course._id === courseId) {
                    setFormValues(course);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.course_title) {
            //alert("checkingTitle"+values.course_title);
            errors.course_title = "CourseTitle is required";
        }
        if (!values.course_description) {
            errors.course_description = "Course Description is required";
        } else if (!regex.test(values.course_description)) {
            errors.course_description = "This is not a valid Description Format";
        }
        if (!values.course_author) {
            errors.course_author = "Course Author is required";
        } else if (values.course_author.length < 4) {
            errors.course_author = "Course must be more than 4 characters";
        } else if (values.course_author.length > 20) {
            errors.course_author = "Course must  be less than 20 characters";
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
                                      <h4 className="heading-h4">!! Add Course !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                        <div className="col-12 col-md-6 form-group">     
                                                            <label>Enter Course Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="course_title" id="course_title" value={formValues.course_title} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.course_title}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Course Description: </label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="course_description" id="course_description" value={formValues.course_description} onChange={(e) => handleInputChange(e)} />
                                                           
                                                           <p className="error">{formErrors.course_description}</p>

                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Course Author:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="course_author" id="course_author" value={formValues.course_author} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.course_author}</p>
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

export default AddCourses
