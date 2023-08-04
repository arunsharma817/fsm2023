import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import categoryContext from '../../context/categories/categoriesContext.js'

const AddCategory = (props) => {

    // Context Doing 
    const context = useContext(categoryContext);
    const { addCategory , editCategory  } = context;

    const navigate = useNavigate();
    const params = useParams();
    const categoryId = props.categoryId;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { category_name: "", category_code: "", category_description: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = categoryId ? "Update Category" : "Add Category";
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            category_name: formValues.category_name,
            category_code: formValues.category_code,
            category_description: formValues.category_description
        }
        if(categoryId){
            console.log('I am here just before Edit'+categoryId);
            setFormValues(text);
            const res =   editCategory(text , categoryId);
            if(res){
                navigate("/categories");
            }
            
        }else{
            const res = addCategory(text);
            if(res){
                navigate("/categories");
            }
            
        }
    {/*    if(inspectorId) {
            console.log('I am about to update condition');
            axios.put('http://localhost:5000/api/inspectors/update/' + inspectorId, text, {
                headers: {
                    'owner-token': ownerToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                if (resp) {
                    navigate("/inspectors");
                }
            }).catch(error => {
                console.error('There was an error!', error);
            });
        } else {

            axios.post('http://localhost:5000/api/inspectors/create/', text, {
                headers: {
                    'owner-token': ownerToken,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(resp => {
                if (resp) {
                    navigate("/inspectors");
                }
            }).catch(error => {
                console.error('There was an error!', error);
            });

        }   */}
    }
    useEffect(() => {
        if (!localStorage.getItem('token'))
            navigate('/owners/login')

        //console.log(formErrors);
        if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log("I am in useEffect" + formValues);
        }
      if(categoryId){
            {props.categories.map((category) => {
                if (category._id === categoryId) {
                    setFormValues(category);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.category_name) {
            //alert(values.category_name);
            errors.category_name = "Category Name is required";
        }
        if (!values.category_code) {
            errors.category_code = "Category Email is required";
        } else if (!regex.test(values.category_code)) {
            errors.category_code = "This is not a valid Email Format";
        }
        if (!values.category_description) {
            errors.category_description = "Category Password is required";
        } else if (values.category_description.length < 4) {
            errors.category_description = "Password must be more than 4 characters";
        } else if (values.category_description.length > 20) {
            errors.category_description = "Password must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;
    };

    return (
        <div className="container my-3">
            <div>
                This is the Add Category Page ....
                <form onSubmit={handleSubmit}>
                    <label>Enter Category Name:
                        <input type="text" name="category_name" id="category_name" value={formValues.category_name} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.category_name}</p>
                    <label>Enter Category Email:
                        <input type="text" name="category_code" id="category_code" value={formValues.category_code} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.category_code}</p>
                    <label>Enter Category Password:
                        <input type="text" name="category_description" id="category_description" value={formValues.category_description} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.category_description}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )
}

export default AddCategory
