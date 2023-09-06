import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import TailorsContext from '../../context/Tailors/TailorsContext.js'

const AddTailors = (props) => {

    // Context Doing 
    const context = useContext(TailorsContext);
    const { setFormValues , formValues , addTailors , editTailors , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const tailorId = props.tailorId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = tailorId ? "Update Tailor" : "Add Tailor";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   //// Creating Industry Dropdown 

   const industriesList = [
    "Information Technology",
    "Healthcare",
    "Finance",
    "Education",
    "Manufacturing",
    "Retail",
    "Marketing and Advertising",
    "Real Estate",
    "Entertainment",
    "Transportation and Logistics",
    "Energy and Utilities",
    "Agriculture",
    "Hospitality and Tourism",
    "Nonprofit and Charity",
    "Construction",
    "Telecommunications",
    "Automotive",
    "Pharmaceuticals",
    "Aerospace and Defense",
    "Media and Publishing",
  ];

  ////
  

///// Countries List 

const countriesList = [
    { value: 'in', label: 'India' },
    { value: 'np', label: 'Nepal' },
    { value: 'bh', label: 'Bhutan' }
    // ...other countries
  ];


    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.samaj_member_fname);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
alert(formValues.tailor_name.length);
       if (!formValues.tailor_name) {
           newErrors.tailor_name = "Tailor First Name is required";
       }
	   if (!formValues.tailor_lname) {
           newErrors.tailor_lname = "Tailor Last Name is required";
       }
	   if (!formValues.tailor_father_name) {
           newErrors.tailor_father_name = "Tailor Father Name is required";
       }

	   if (!formValues.tailor_mother_name) {
        newErrors.tailor_mother_name = "Tailor Mother Name is required";
       } 

       

	   if(!formValues.tailor_grade) {
        newErrors.tailor_grade = "Tailor Grade is required";
       } 

	   if (formValues.tailor_section.length > 200) {
        newErrors.tailor_section = "Tailor Section must  be less than 200 characters";
       }
	   
	   if (formValues.tailor_official_email.length > 200) {
        newErrors.tailor_official_email = "Tailor Official Email must  be less than 200 characters";
       }
	  	   
	   if(formValues.tailor_official_mobile.length > 90) {
        newErrors.tailor_official_mobile = "Tailor Official Mobile must  be less than 90 characters";
       }
	   
	   if(formValues.tailor_personal_mobile.length > 20) {
        newErrors.tailor_personal_mobile = "Tailor Personal Mobile must  be less than 20 characters";
       }

	   if(formValues.tailor_blood_group.length > 20) {
        newErrors.tailor_blood_group = "Tailor Blood Group must  be less than 20 characters";
       }
	   
	   if(formValues.tailor_dob.length > 20) {
        newErrors.tailor_dob = "Tailor DOB must  be less than 20 characters";
       }
	   
	   if(formValues.tailor_address.length > 300) {
        newErrors.tailor_address = "Tailer Address must  be less than 300 characters";
       }
	   
	   if(formValues.tailor_city.length > 20) {
        newErrors.tailor_city = "Tailor City  must  be less than 20 characters";
       }
	   
	   if(formValues.tailor_state.length > 20) {
        newErrors.tailor_state = "Tailor Stat  must  be less than 20 characters";
       }
	   
	   if(formValues.tailor_country.length > 20) {
        newErrors.tailor_country = "Tailor Country  must  be less than 20 characters";
       }
	   
	   if(formValues.tailor_continent.length > 20) {
        newErrors.tailor_continent = "Tailor Continent  must  be less than 20 characters";
       }
	   
	   if(formValues.tailor_experience.length > 50) {
        newErrors.tailor_experience = "Tailor Experience  must  be less than 20 characters";
       }
	   
	   if(formValues.tailor_rating.length > 50) {
        newErrors.tailor_rating = "Tailor Rating  must  be less than 20 characters";
       }
	   
	   if(formValues.tailor_reviews.length > 50) {
        newErrors.tailor_reviews = "Tailor Reviews  must  be less than 20 characters";
       }
	   
	   if(formValues.tailor_income.length > 50) {
        newErrors.tailor_income = "Tailor Income  must  be less than 20 characters";
       }
	  	   
	   
	   if(!formValues.tailor_investment) {
           newErrors.tailor_investment = "Tailor Investment is required";
       }
	   
	   if(!formValues.tailor_shop) {
           newErrors.tailor_shop = "Tailor Shop is required";
       }
	   if(!formValues.tailor_services) {
           newErrors.tailor_services = "Tailor Servies is required";
       }
	   if(!formValues.tailor_male_female) {
           newErrors.tailor_male_female = "Tailor Gender is required";
       }
	  
	   if(!formValues.tailor_course) {
           newErrors.tailor_course = "Tailor Course is required";
       }
	   
	   if(!formValues.tailor_branches) {
           newErrors.tailor_course = "Tailor Branches is required";
       }
	   if(!formValues.tailor_material) {
           newErrors.tailor_material = "Tailor Material is required";
       }
	   
	   if(!formValues.tailor_readymade) {
           newErrors.tailor_readymade = "Tailor readymade is required";
       }
	   
	   if (!formValues.tailor_contract) {
        newErrors.tailor_contract = "Tailor Contract is required";
       } 
	   	   
	   if(!formValues.tailor_fee) {
           newErrors.tailor_fee = "Tailor Fee is required";
       }
	   
	  
    

	   
	   
       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
            tailor_name: formValues.tailor_name,
            tailor_lname: formValues.tailor_lname,
            tailor_father_name: formValues.tailor_father_name,
			tailor_mother_name: formValues.tailor_mother_name,
            tailor_age: formValues.tailor_age,
            tailor_grade: formValues.tailor_grade,
            tailor_section: formValues.tailor_section,
			tailor_official_email: formValues.tailor_official_email,
            tailor_official_mobile: formValues.tailor_official_mobile,
			tailor_personal_mobile: formValues.tailor_personal_mobile,
            tailor_blood_group: formValues.tailor_blood_group,
            tailor_dob: formValues.tailor_dob,	
			tailor_address: formValues.tailor_address,
			tailor_city: formValues.tailor_city,
            tailor_state: formValues.tailor_state,
            tailor_country: formValues.tailor_country,
			tailor_continent: formValues.tailor_continent,
			tailor_experience: formValues.tailor_experience,
            tailor_rating: formValues.tailor_rating,
            tailor_reviews: formValues.tailor_reviews,
			tailor_income: formValues.tailor_income,
			tailor_investment: formValues.tailor_investment,
            tailor_shop: formValues.tailor_shop,
            tailor_services: formValues.tailor_services,	
			tailor_male_female: formValues.tailor_male_female,
			tailor_gst: formValues.tailor_gst,
            tailor_course: formValues.tailor_course,
            tailor_branches: formValues.tailor_branches,
			tailor_material: formValues.tailor_material,
			tailor_readymade: formValues.tailor_readymade,
            tailor_contract: formValues.tailor_contract,
            tailor_fee: formValues.tailor_fee,
			tailor_mentor: formValues.tailor_mentor,
			tailor_delivery: formValues.tailor_delivery,
            tailor_overseas: formValues.tailor_overseas,
            tailor_domestic: formValues.tailor_domestic,
			tailor_expenses: formValues.tailor_expenses,
			tailor_vehicle: formValues.tailor_vehicle,
            tailor_shop_time: formValues.tailor_shop_time,
            tailor_shop_days: formValues.tailor_shop_days,
			tailor_awards: formValues.tailor_awards,
            tailor_designing_skills: formValues.tailor_designing_skills
        }
    
            if(tailorId){
                console.log('I am here just before Edit'+tailorId);
                setFormValues(text);
                const res =   editTailors(text , tailorId);
                if(res){
                    navigate("/tailors/boardtailors");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                alert(JSON.stringify(text, null, 2));
                console.log(JSON.stringify(text, null, 2));
                addTailors(text); 
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
        
     if(tailorId){
            {props.tailors.map((tailor) => {
                if (tailor._id === tailorId) {
                    setFormValues(tailor);
                }
            })}
        } 

    }, [formErrors])


    

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
                                      <h4 className="heading-h4">!! Add Tailor !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                    <div className="col-12 col-md-6 form-group">     
                                                            <label>Tailor First Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="tailor_name" id="tailor_name" value={formValues.tailor_name} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.tailor_name}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Last Name:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_lname" id="tailor_lname" value={formValues.tailor_lname} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_lname}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Father Name:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_father_name" id="tailor_father_name" value={formValues.tailor_father_name} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_father_name}</p>
                                                        </div>
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Mother Name:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_mother_name" id="tailor_mother_name" value={formValues.tailor_mother_name} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_mother_name}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Age :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_age" id="tailor_age" value={formValues.tailor_age} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_age}</p>
                                                        </div>
														
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Grade :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_grade" id="tailor_grade" value={formValues.tailor_grade} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_grade}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Tailor Section :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_section" id="tailor_section" value={formValues.tailor_section} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_section}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Official Mail :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_official_email" id="tailor_official_email" value={formValues.tailor_official_email} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_official_email}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Official Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_official_mobile" id="tailor_official_mobile" value={formValues.tailor_official_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_official_mobile}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Personal Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_personal_mobile" id="tailor_personal_mobile" value={formValues.tailor_personal_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_personal_mobile}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Blood Group :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_blood_group" id="tailor_blood_group" value={formValues.tailor_blood_group} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_blood_group}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Tailor DOB :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_dob" id="tailor_dob" value={formValues.tailor_dob} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_dob}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Address :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_address" id="tailor_address" value={formValues.tailor_address} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_address}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>City :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_city" id="tailor_city" value={formValues.tailor_city} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_city}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>State :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_state" id="tailor_state" value={formValues.tailor_state} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_state}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Country  :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_country" id="tailor_country" value={formValues.tailor_country} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_country}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Continent :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_continent" id="tailor_continent" value={formValues.tailor_continent} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_continent}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Tailor Experience :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_experience" id="tailor_experience" value={formValues.tailor_experience} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_experience}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Tailor Rating :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_rating" id="tailor_rating" value={formValues.tailor_rating} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_rating}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Tailor Reviews :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_reviews" id="tailor_reviews" value={formValues.tailor_reviews} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_reviews}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Tailor Income :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_income" id="tailor_income" value={formValues.tailor_income} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_income}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Tailor Investment :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="tailor_investment" id="tailor_investment" value={formValues.tailor_investment} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_investment}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Tailor Shop :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_shop" id="tailor_shop" value={formValues.tailor_shop} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_shop}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Services :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_services" id="tailor_services" value={formValues.tailor_services} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_services}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Gender :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="tailor_male_female" id="tailor_male_female" value={formValues.tailor_male_female} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_male_female}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label> GST :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_gst" id="tailor_gst" value={formValues.tailor_gst} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_gst}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Courses :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_course" id="tailor_course" value={formValues.tailor_course} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_course}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Branch Cities :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_branches" id="tailor_branches" value={formValues.tailor_branches} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_branches}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Material :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_material" id="tailor_material" value={formValues.tailor_material} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_material}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Readymade :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_readymade" id="tailor_readymade" value={formValues.tailor_readymade} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_readymade}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Contract :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_contract" id="tailor_contract" value={formValues.tailor_contract} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_contract}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Tailor Fee :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_fee" id="tailor_fee" value={formValues.tailor_fee} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_fee}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Mentor :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_mentor" id="tailor_mentor" value={formValues.tailor_mentor} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_mentor}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Shipping/Delivery :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_delivery" id="tailor_delivery" value={formValues.tailor_delivery} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_delivery}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Overseas :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_overseas" id="tailor_overseas" value={formValues.tailor_overseas} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_overseas}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Domestic :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_domestic" id="tailor_domestic" value={formValues.tailor_domestic} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_domestic}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Expenses(Monthly) :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_expenses" id="tailor_expenses" value={formValues.tailor_expenses} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_expenses}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Vehicle :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_vehicle" id="tailor_vehicle" value={formValues.tailor_vehicle} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_vehicle}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Work Time :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_shop_time" id="tailor_shop_time" value={formValues.tailor_shop_time} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_shop_time}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Working Days :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_shop_days" id="tailor_shop_days" value={formValues.tailor_shop_days} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_shop_days}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Awards/Certificates :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_awards" id="tailor_awards" value={formValues.tailor_awards} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_awards}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Skills :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="tailor_designing_skills" id="tailor_designing_skills" value={formValues.tailor_designing_skills} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.tailor_designing_skills}</p>
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

export default AddTailors
