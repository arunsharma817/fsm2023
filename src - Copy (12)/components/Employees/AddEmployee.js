import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import employeeContext from '../../context/employees/employeesContext.js'

const AddEmployee = (props) => {

    // Context Doing 
    const context = useContext(employeeContext);
    const { addEmployee , editEmployee  } = context;

    const navigate = useNavigate();
    const params = useParams();
    const employeeId = props.employeeId;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { employee_name: "", employee_email: "", employee_password: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = employeeId ? "Update Employee" : "Add Employee";
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            employee_name: formValues.employee_name,
            employee_email: formValues.employee_email,
            employee_password: formValues.employee_password
        }
        if(employeeId){
            console.log('I am here just before Edit'+employeeId);
            setFormValues(text);
            const res =   editEmployee(text , employeeId);
            if(res){
                navigate("/employees");
            }
            
        }else{
            const res = addEmployee(text);
            if(res){
                navigate("/employees");
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
      if(employeeId){
            {props.employees.map((employee) => {
                if (employee._id === employeeId) {
                    setFormValues(employee);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.employee_name) {
            //alert(values.Employee_name);
            errors.employee_name = "Employee Name is required";
        }
        if (!values.employee_email) {
            errors.employee_email = "Employee Email is required";
        } else if (!regex.test(values.employee_email)) {
            errors.employee_email = "This is not a valid Email Format";
        }
        if (!values.employee_password) {
            errors.employee_password = "Employee Password is required";
        } else if (values.employee_password.length < 4) {
            errors.employee_password = "Password must be more than 4 characters";
        } else if (values.employee_password.length > 20) {
            errors.employee_password = "Password must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;
    };

    return (
        <div className="container my-3">
            <div>
                This is the Add Employee Page ....
                <form onSubmit={handleSubmit}>
                    <label>Enter Employee Name:
                        <input type="text" name="employee_name" id="employee_name" value={formValues.employee_name} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.employee_name}</p>
                    <label>Enter Employee Email:
                        <input type="text" name="employee_email" id="employee_email" value={formValues.employee_email} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.employee_email}</p>
                    <label>Enter Employee Password:
                        <input type="text" name="employee_password" id="employee_password" value={formValues.employee_password} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.employee_password}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )
}

export default AddEmployee
