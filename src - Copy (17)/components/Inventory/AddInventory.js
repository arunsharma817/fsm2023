import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import inventoryContext from '../../context/inventory/inventoryContext.js'

const AddInventory = (props) => {

    // Context Doing 
    const context = useContext(inventoryContext);
    const { addInventory , editInventory  } = context;

    const navigate = useNavigate();
    const params = useParams();
    const inventoryId = props.inventoryId;
    const ownerToken = localStorage.getItem('token');
    const initialValues = { inventory_type: "", inventory_details: "", inventory_quantity: "" };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = inventoryId ? "Update Inventory" : "Add Inventory";
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues));
        setIsSubmit(true);
        const text = {
            inventory_type: formValues.inventory_type,
            inventory_details: formValues.inventory_details,
            inventory_quantity: formValues.inventory_quantity
        }
        if(inventoryId){
            console.log('I am here just before Edit'+inventoryId);
            setFormValues(text);
            const res =   editInventory(text , inventoryId);
            if(res){
                navigate("/inventory");
            }
            
        }else{
            const res = addInventory(text);
            if(res){
                navigate("/inventory");
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
      if(inventoryId){
            {props.inventorys.map((inventory) => {
                if (inventory._id === inventoryId) {
                    setFormValues(inventory);
                }
            })}
        } 

    }, [formErrors])


    const validate = async (values) => {

        const errors = {};
        const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

        if (!values.inventory_type) {
            //alert(values.inventory_type);
            errors.inventory_type = "Inventory Name is required";
        }
        if (!values.inventory_details) {
            errors.inventory_details = "Inventory Email is required";
        } else if (!regex.test(values.inventory_details)) {
            errors.inventory_details = "This is not a valid Email Format";
        }
        if (!values.inventory_quantity) {
            errors.inventory_quantity = "Inventory Password is required";
        } else if (values.inventory_quantity.length < 4) {
            errors.inventory_quantity = "Password must be more than 4 characters";
        } else if (values.inventory_quantity.length > 20) {
            errors.inventory_quantity = "Password must  be less than 20 characters";
        }
        //alert("I am in Errors COndition"+errors);
        return errors;
    };

    return (
        <div className="container my-3">
            <div>
                This is the Add Inventory Page ....
                <form onSubmit={handleSubmit}>
                    <label>Enter Inventory Type:
                        <input type="text" name="inventory_type" id="inventory_type" value={formValues.inventory_type} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.inventory_type}</p>
                    <label>Enter Inventory Details:
                        <input type="text" name="inventory_details" id="inventory_details" value={formValues.inventory_details} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.inventory_details}</p>
                    <label>Enter Inventory Quantity:
                        <input type="text" name="inventory_quantity" id="inventory_quantity" value={formValues.inventory_quantity} onChange={(e) => handleInputChange(e)} />
                    </label>
                    <p>{formErrors.inventory_quantity}</p>
                    <input type="submit" value={actionButton} />
                </form>
            </div>
        </div>
    )
}

export default AddInventory
