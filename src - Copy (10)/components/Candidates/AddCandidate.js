import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import candidateContext from '../../context/candidates/candidatesContext.js'

const AddCandidate = (props) => {

    // Context Doing 
    const context = useContext(candidateContext);
    const { addCandidate , editCandidate  } = context;

    const navigate = useNavigate();
    const params = useParams();
    const candidateId = props.candidateId;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { candidate_name: "", candidate_email: "", candidate_password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = candidateId ? "Update Candidate" : "Add Candidate";
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            candidate_name: formValues.candidate_name,
            candidate_email: formValues.candidate_email,
            candidate_password: formValues.candidate_password
        }
        if(candidateId){
            console.log('I am here just before Edit'+candidateId);
            setFormValues(text);
            const res =   editCandidate(text , candidateId);
            if(res){
                navigate("/candidates");
            }
            
        }else{
            const res = addCandidate(text);
            if(res){
                navigate("/candidates");
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
      if(candidateId){
            {props.candidates.map((candidate) => {
                if (candidate._id === candidateId) {
                    setFormValues(candidate);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.candidate_name) {
            //alert(values.consultant_name);
            errors.candidate_name = "Consultant Name is required";
        }
        if (!values.candidate_email) {
            errors.candidate_email = "Consultant Email is required";
        } else if (!regex.test(values.candidate_email)) {
            errors.candidate_email = "This is not a valid Email Format";
        }
        if (!values.candidate_password) {
            errors.candidate_password = "Consultant Password is required";
        } else if (values.candidate_password.length < 4) {
            errors.candidate_password = "Password must be more than 4 characters";
        } else if (values.candidate_password.length > 20) {
            errors.candidate_password = "Password must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;
    };

    return (
        <div className="container my-3">
            <div>
                This is the Add Candidate Page ....
                <form onSubmit={handleSubmit}>
                    <label>Enter Consultant Name:
                        <input type="text" name="candidate_name" id="candidate_name" value={formValues.candidate_name} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.candidate_name}</p>
                    <label>Enter Consultant Email:
                        <input type="text" name="candidate_email" id="candidate_email" value={formValues.candidate_email} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.candidate_email}</p>
                    <label>Enter Consultant Password:
                        <input type="text" name="candidate_password" id="candidate_password" value={formValues.candidate_password} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.candidate_password}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )
}

export default AddCandidate
