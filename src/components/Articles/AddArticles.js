import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ArticlesContext from '../../context/articles/ArticlesContext.js'

const AddArticles = (props) => {

    // Context Doing 
    const context = useContext(ArticlesContext);
    const { setFormValues , formValues , addArticle , editArticle , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const articleId = props.articleId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = articleId ? "Update Article" : "Add Article";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.article_title);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

       if (!formValues.article_title) {
           //alert("checkingTitle"+formValues.article_title);
           newErrors.article_title = "ArticleTitle is required";
       }

       if (!formValues.article_description) {
        newErrors.article_description = "Article Description is required";
       } else if (!regex.test(formValues.article_description)) {
        newErrors.article_description = "This is not a valid Description Format";
       }

       if (!formValues.article_author) {
        newErrors.article_author = "Article Author is required";
       } else if (formValues.article_author.length < 4) {
        newErrors.article_author = "Article must be more than 4 characters";
       } else if (formValues.article_author.length > 20) {
        newErrors.article_author = "Article must  be less than 20 characters";
       }

       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
                article_title: formValues.article_title,
                article_description: formValues.article_description,
                article_author: formValues.article_author
            }
    
            if(articleId){
                console.log('I am here just before Edit'+articleId);
                setFormValues(text);
                const res =   editArticle(text , articleId);
                if(res){
                    navigate("/articles/boardarticles");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                addArticle(text); 
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
        
     if(articleId){
            {props.articles.map((article) => {
                if (article._id === articleId) {
                    setFormValues(article);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.article_title) {
            //alert("checkingTitle"+values.article_title);
            errors.article_title = "ArticleTitle is required";
        }
        if (!values.article_description) {
            errors.article_description = "Article Description is required";
        } else if (!regex.test(values.article_description)) {
            errors.article_description = "This is not a valid Description Format";
        }
        if (!values.article_author) {
            errors.article_author = "Article Author is required";
        } else if (values.article_author.length < 4) {
            errors.article_author = "Article must be more than 4 characters";
        } else if (values.article_author.length > 20) {
            errors.article_author = "Article must  be less than 20 characters";
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
                                      <h4 className="heading-h4">!! Add Article !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                        <div className="col-12 col-md-6 form-group">     
                                                            <label>Enter Article Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="article_title" id="article_title" value={formValues.article_title} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.article_title}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Article Description: </label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="article_description" id="article_description" value={formValues.article_description} onChange={(e) => handleInputChange(e)} />
                                                           
                                                           <p className="error">{formErrors.article_description}</p>

                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Enter Article Author:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="article_author" id="article_author" value={formValues.article_author} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.article_author}</p>
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

export default AddArticles
