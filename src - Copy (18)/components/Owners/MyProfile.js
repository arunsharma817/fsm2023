import React, { useContext, useEffect , useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { confirm } from "react-confirm-box";


const MyProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState([]);
  const initialValues = { owner_name: "", owner_email: "", owner_password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const ownerToken = localStorage.getItem('token');

  useEffect(() =>{
    if(!localStorage.getItem('token'))
          navigate('/owners/login')

          const fetchOwner = async () => {
            const res = await axios.get('http://localhost:5000/api/owners/getowner', {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                "owner-token": localStorage.getItem('token')
              }
            });
            //console.log(res.data);
            setProfile(res.data);
          }
          fetchOwner();
          
          ///Form Errors Part

          console.log(formErrors);
          if (Object.keys(formErrors).length === 0 && isSubmit) {
            console.log(formValues);
          }
  }  , [formErrors]);


  const handleInputChange = (e) => { 
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
    const text = {
      owner_name: formValues.owner_name,
      owner_email: formValues.owner_email,
      owner_password: formValues.owner_password
    }
    const ownerId = profile._id;
    alert(ownerId)
    const result =  await confirm("Are you sure?");
    alert(result);
    if(ownerId && result) {
       axios.put('http://localhost:5000/api/owners/update/' + ownerId, text, {
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
        if (resp) {
          navigate("/owners/myprofile");
        }
      }).catch(error => {
        console.error('There was an error!', error);
      });
      //listProducts()
    }


  };

  const validate = (values) => {
    const errors = {};
    const regex  = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if(!values.owner_name) {
      errors.owner_name = "Owner Name is required";
    }

    if(!values.owner_email) {
      errors.owner_email = "Owner Email is required";
    } else if(!regex.test(values.owner_email)){
      errors.owner_email = "This is not a valid Email Format";
    }

    if(!values.owner_password){
      errors.owner_password = "Owner Password is required";
    }else if(values.owner_password.length < 4){
      errors.owner_password = "Password must be more than 4 characters";
    }else if(values.owner_password.length > 20){
      errors.owner_password = "Password must  be less than 20 characters";
    }
    return errors;
  };

  return (
    <div className="row g-0">
              <div className="col-12 inner-wrapper">
                <div className="row">
                    <div className="col-12 wrap-head"></div>
                    <div className="col-12 wrap-content">
                      <div className="row g-0">
                          <div className="col-12 card mb-4">
                              <div className="card-header">
                                            <h3 class="mb-0">!! My Profile - Fire Safety Management !!</h3>
                              </div>
                              <div className="card-body">
                                  <div className="tab-content">
                                      <div className="tab-pane fade active show" id="ntarget-2" role="tabpanel" aria-labelledby="ntab-2">
                                            <h4 className="heading-h4">!! Add Inspector !!</h4>
                                              <div className="pane-body">
                                                <form onSubmit={handleSubmit}> 
                                                  <div className="col-12">
                                                    <div className="row g-2">
                                                        <div className="col-12 col-md-6 form-group">                 
                                                            <label>Enter Name:</label> 
                                                              <input className="form-control" type="text" name="owner_name" id="owner_name" defaultValue={profile.owner_name} onChange={(e) => handleInputChange(e)} />
                                                                                                                   
                                                            <p className="error">{formErrors.owner_name}</p> 
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">                   
                                                            <label>Enter Email:</label>
                                                              <input className="form-control" type="text" name="owner_email" id="owner_email" defaultValue={profile.owner_email} onChange={(e) => handleInputChange(e)} />
                                                            
                                                            <p className="error">{formErrors.owner_email}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">        
                                                            <label>Enter Password</label>
                                                              <input className="form-control" type="text" name="owner_password" id="owner_password" defaultValue={profile.owner_password} onChange={(e) => handleInputChange(e)} />
                                                            
                                                            <p className="error">{formErrors.owner_password}</p>
                                                        </div>
                                                        <div className="col-12 form-action">
                                                            <input type="submit" className="button-submit" value="Update" />
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

export default MyProfile
