import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import StudentsContext from '../../context/Students/StudentsContext.js'

const AddStudents = (props) => {

    // Context Doing 
    const context = useContext(StudentsContext);
    const { setFormValues , formValues , addStudents , editStudents , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const studentId = props.studentId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = studentId ? "Update Student" : "Add Student";

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
alert(formValues.student_fname.length);
       if (!formValues.student_fname) {
           newErrors.student_fname = "Student First Name is required";
       }
	   if (!formValues.student_lname) {
           newErrors.student_lname = "Student Last Name is required";
       }
	   if (!formValues.student_father_name) {
           newErrors.student_father_name = "Student Father Name is required";
       }

	   if (!formValues.student_mother_name) {
        newErrors.student_mother_name = "Student Mother Name is required";
       } 

       

	   if(!formValues.student_grade) {
        newErrors.student_grade = "Student Grade is required";
       } 

	   if (formValues.student_section.length > 200) {
        newErrors.student_section = "Student Section must  be less than 200 characters";
       }
	   
	   if (formValues.student_parrent_email.length > 200) {
        newErrors.student_parrent_email = "Student Email must  be less than 200 characters";
       }else if (!regex.test(formValues.student_parrent_email)) {
        newErrors.student_parrent_email = "This is not a valid Email Format";
       }
	  	   
	   if(formValues.student_parrent_mobile.length > 90) {
        newErrors.student_parrent_mobile = "Student Parrent Mobile must  be less than 90 characters";
       }
	   
	   if(formValues.student_gaurdian_mobile.length > 20) {
        newErrors.student_gaurdian_mobile = "Student Gaurdian Mobile must  be less than 20 characters";
       }

	   if(formValues.student_blood_group.length > 20) {
        newErrors.student_blood_group = "Student Blood Group must  be less than 20 characters";
       }
	   
	   if(formValues.student_dob.length > 20) {
        newErrors.student_dob = "Student DOB must  be less than 20 characters";
       }
	   
	   if(formValues.student_address.length > 300) {
        newErrors.student_address = "Student address must  be less than 300 characters";
       }
	   
	   if(formValues.student_city.length > 20) {
        newErrors.student_city = "Student Continent  must  be less than 20 characters";
       }
	   
	   if(formValues.student_state.length > 20) {
        newErrors.student_state = "Student State  must  be less than 20 characters";
       }
	   
	   if(formValues.student_country.length > 20) {
        newErrors.student_country = "Student QR Code  must  be less than 20 characters";
       }
	   
	   if(formValues.student_continent.length > 20) {
        newErrors.student_continent = "Student Continent  must  be less than 20 characters";
       }
	   
	   if(formValues.student_admission_date.length > 50) {
        newErrors.student_admission_date = "Student Admission Date  must  be less than 20 characters";
       }
	   
	   if(formValues.student_father_occupation.length > 50) {
        newErrors.student_father_occupation = "Student Father Occupation  must  be less than 20 characters";
       }
	   
	   if(formValues.student_mother_occupation.length > 50) {
        newErrors.student_mother_occupation = "Student Mother Occupation  must  be less than 20 characters";
       }
	   
	   if(formValues.student_mother_income.length > 50) {
        newErrors.student_mother_income = "Student Mother Income  must  be less than 20 characters";
       }
	  	   
	   
	   if(!formValues.student_father_income) {
           newErrors.student_father_income = "Student Father Income is required";
       }
	   
	   if(!formValues.student_photo) {
           newErrors.student_photo = "Student Photo is required";
       }
	   if(!formValues.student_interests) {
           newErrors.student_interests = "Student Interests is required";
       }
	   if(!formValues.student_male_female) {
           newErrors.student_male_female = "Student Male/Female is required";
       }
	  
	   if(!formValues.student_stream) {
           newErrors.student_stream = "Student Stream is required";
       }
	   
	   if(!formValues.student_medium) {
           newErrors.student_stream = "Student Medium is required";
       }
	   if(!formValues.student_board) {
           newErrors.student_board = "Student Board is required";
       }
	   
	   if(!formValues.student_uniform) {
           newErrors.student_uniform = "Student Uniform is required";
       }
	   
	   if (!formValues.student_books) {
        newErrors.student_books = "Student Book is required";
       } 
	   	   
	   if(!formValues.student_bag) {
           newErrors.student_bag = "Student Bag Name is required";
       }
	   
	  
    

	   
	   
       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
            student_fname: formValues.student_fname,
            student_lname: formValues.student_lname,
            student_father_name: formValues.student_father_name,
			student_mother_name: formValues.student_mother_name,
            student_age: formValues.student_age,
            student_grade: formValues.student_grade,
            student_section: formValues.student_section,
			student_parrent_email: formValues.student_parrent_email,
            student_parrent_mobile: formValues.student_parrent_mobile,
			student_gaurdian_mobile: formValues.student_gaurdian_mobile,
            student_blood_group: formValues.student_blood_group,
            student_dob: formValues.student_dob,	
			student_address: formValues.student_address,
			student_city: formValues.student_city,
            student_state: formValues.student_state,
            student_country: formValues.student_country,
			student_continent: formValues.student_continent,
			student_admission_date: formValues.student_admission_date,
            student_father_occupation: formValues.student_father_occupation,
            student_mother_occupation: formValues.student_mother_occupation,
			student_mother_income: formValues.student_mother_income,
			student_father_income: formValues.student_father_income,
            student_photo: formValues.student_photo,
            student_interests: formValues.student_interests,	
			student_male_female: formValues.student_male_female,
			student_class_teacher: formValues.student_class_teacher,
            student_stream: formValues.student_stream,
            student_medium: formValues.student_medium,
			student_board: formValues.student_board,
			student_uniform: formValues.student_uniform,
            student_books: formValues.student_books,
            student_bag: formValues.student_bag,
			student_mess: formValues.student_mess,
			student_transportation: formValues.student_transportation,
            student_foreign_tour: formValues.student_foreign_tour,
            student_domestic_tour: formValues.student_domestic_tour,
			student_annual_function: formValues.student_annual_function,
			student_hod: formValues.student_hod,
            student_attendance: formValues.student_attendance,
            student_health: formValues.student_health,
			student_achievements: formValues.student_achievements,
            student_technical_skills: formValues.student_technical_skills
        }
    
            if(studentId){
                console.log('I am here just before Edit'+studentId);
                setFormValues(text);
                const res =   editStudents(text , studentId);
                if(res){
                    navigate("/students/boardstudents");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                alert(JSON.stringify(text, null, 2));
                console.log(JSON.stringify(text, null, 2));
                addStudents(text); 
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
        
     if(studentId){
            {props.students.map((student) => {
                if (student._id === studentId) {
                    setFormValues(student);
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
                                      <h4 className="heading-h4">!! Add Student !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                    <div className="col-12 col-md-6 form-group">     
                                                            <label>Student First Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="student_fname" id="student_fname" value={formValues.student_fname} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.student_fname}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Student Last Name:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_lname" id="student_lname" value={formValues.student_lname} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_lname}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Student Father Name :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_father_name" id="student_father_name" value={formValues.student_father_name} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_father_name}</p>
                                                        </div>
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Student Mother Name :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_mother_name" id="student_mother_name" value={formValues.student_mother_name} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_mother_name}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Age :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_age" id="student_age" value={formValues.student_age} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_age}</p>
                                                        </div>
														
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Student Grade :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_grade" id="student_grade" value={formValues.student_grade} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_grade}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Section :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_section" id="student_section" value={formValues.student_section} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_section}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Studnet Parrent Email :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_parrent_email" id="student_parrent_email" value={formValues.student_parrent_email} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_parrent_email}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Parrent Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_parrent_mobile" id="student_parrent_mobile" value={formValues.student_parrent_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_parrent_mobile}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Gaurdian Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_gaurdian_mobile" id="student_gaurdian_mobile" value={formValues.student_gaurdian_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_gaurdian_mobile}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Blood Group :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_blood_group" id="student_blood_group" value={formValues.student_blood_group} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_blood_group}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student DOB : (date format: 2023-07-20)</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_dob" id="student_dob" value={formValues.student_dob} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_dob}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Address :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_address" id="student_address" value={formValues.student_address} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_address}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student City :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_city" id="student_city" value={formValues.student_city} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_city}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student State :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_state" id="student_state" value={formValues.student_state} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_state}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Country  :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_country" id="student_country" value={formValues.student_country} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_country}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Continent :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_continent" id="student_continent" value={formValues.student_continent} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_continent}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Admission Date : (date format: 2023-07-20)</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_admission_date" id="student_admission_date" value={formValues.student_admission_date} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_admission_date}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Father Occupation :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_father_occupation" id="student_father_occupation" value={formValues.student_father_occupation} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_father_occupation}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Mother Occupation :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_mother_occupation" id="student_mother_occupation" value={formValues.student_mother_occupation} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_mother_occupation}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Mother Income :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_mother_income" id="student_mother_income" value={formValues.student_mother_income} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_mother_income}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Father Income :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="student_father_income" id="student_father_income" value={formValues.student_father_income} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_father_income}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Photo :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_photo" id="student_photo" value={formValues.student_photo} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_photo}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Interests :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_interests" id="student_interests" value={formValues.student_interests} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_interests}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Male/Female :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="student_male_female" id="student_male_female" value={formValues.student_male_female} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_male_female}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Class Teacher :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_class_teacher" id="student_class_teacher" value={formValues.student_class_teacher} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_class_teacher}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Stream :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_stream" id="student_stream" value={formValues.student_stream} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_stream}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Medium :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_medium" id="student_medium" value={formValues.student_medium} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_medium}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Board :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_board" id="student_board" value={formValues.student_board} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_board}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Uniform :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_uniform" id="student_uniform" value={formValues.student_uniform} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_uniform}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Books :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_books" id="student_books" value={formValues.student_books} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_books}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Bag :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_bag" id="student_bag" value={formValues.student_bag} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_bag}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Studnet Mess :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_mess" id="student_mess" value={formValues.student_mess} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_mess}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Transporation :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_transportation" id="student_transportation" value={formValues.student_transportation} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_transportation}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Foreign Tour :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_foreign_tour" id="student_foreign_tour" value={formValues.student_foreign_tour} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_foreign_tour}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Domestic Tour :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_domestic_tour" id="student_domestic_tour" value={formValues.student_domestic_tour} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_domestic_tour}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Annual Function :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_annual_function" id="student_annual_function" value={formValues.student_annual_function} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_annual_function}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>HOD :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_hod" id="student_hod" value={formValues.student_hod} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_hod}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Attendance :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_attendance" id="student_attendance" value={formValues.student_attendance} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_attendance}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Health :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_health" id="student_health" value={formValues.student_health} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_health}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Achievements :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_achievements" id="student_achievements" value={formValues.student_achievements} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_achievements}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Student Technical Skills :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="student_technical_skills" id="student_technical_skills" value={formValues.student_technical_skills} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.student_technical_skills}</p>
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

export default AddStudents
