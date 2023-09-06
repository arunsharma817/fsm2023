import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ContractorsContext from '../../context/Contractors/ContractorsContext.js'

const AddContractors = (props) => {

    // Context Doing 
    const context = useContext(ContractorsContext);
    const { setFormValues , formValues , addContractors , editContractors , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const contractorId = props.contractorId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = contractorId ? "Update Contractor" : "Add Contractor";
    let technologies = '';
    let scopes = '';
    if(contractorId){
        technologies = formValues.contractor_technologies.split(',');
        scopes = formValues.contractor_scope;
        console.log(technologies);
        // Convert the string into an array by splitting it at commas       
    }

    // State to manage the checked languages
    const [checkedLanguages, setCheckedLanguages] = useState(technologies);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
     
        setFormValues({ ...formValues, [name]: value });
       
    };
    
    const handleLanguageChange = (event) => {
        const { value, checked } = event.target;
      
        // Clone the current state and modify the programmingLanguages array
        const updatedLanguages = [...checkedLanguages];
        
        if (checked) {
          // Add the selected language to the array
          updatedLanguages.push(value);
        } else {
            alert(value);
          // Remove the deselected language from the array
          const index = updatedLanguages.indexOf(value);
          if (index !== -1) {
            updatedLanguages.splice(index, 1);
          }
        }
      
        // Update the checkedLanguages state with the modified array
        setCheckedLanguages(updatedLanguages);
      };
      
    // State to manage the selected scope
    const [selectedScope, setSelectedScope] = useState(scopes);

    // Handle radio button change
    const handleScopeChange = (event) => {
        setSelectedScope(event.target.value);
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
  
  // Define the list of programming languages
  const programmingLanguages = [
    'JavaScript',
    'Python',
    'Java',
    'C++',
    'Ruby',
    'Swift',
    'Go',
    // Add more languages as needed
  ];


   
    

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
alert(formValues.contractor_industry.length);
       if (!formValues.contractor_industry) {
           newErrors.contractor_industry = "Contractor Company Name is required";
       }
	   if (!formValues.contractor_fname) {
           newErrors.contractor_fname = "Contractor Industry is required";
       }
	   if (!formValues.contractor_lname) {
           newErrors.contractor_lname = "Contractor Product is required";
       }

	   if (!formValues.contractor_products) {
        newErrors.contractor_products = "Contractor Products is required";
       } 

       

	   if(!formValues.contractor_website) {
        newErrors.contractor_website = "Contractor Email is required";
       } 

	   if (formValues.contractor_hr_mail.length > 200) {
        newErrors.contractor_hr_mail = "Contractor Website must  be less than 200 characters";
       }
	   
	   if (formValues.contractor_info_mail.length > 200) {
        newErrors.contractor_info_mail = "Contractor Website must  be less than 200 characters";
       }
	  	   
	   if(formValues.contractor_career_mail.length > 90) {
        newErrors.contractor_career_mail = "Career Mail must  be less than 90 characters";
       }
	   
	   if(formValues.contractor_phone_number.length > 20) {
        newErrors.contractor_phone_number = "Contractor City must  be less than 20 characters";
       }

	   if(formValues.contractor_mobile_number.length > 20) {
        newErrors.contractor_mobile_number = "Contractor State must  be less than 20 characters";
       }
	   
	   if(formValues.contractor_wtsap_number.length > 20) {
        newErrors.contractor_wtsap_number = "Contractor Country must  be less than 20 characters";
       }
	   
	   if(formValues.contractor_linkedin_url.length > 300) {
        newErrors.contractor_linkedin_url = "Linkedin must  be less than 300 characters";
       }
	   
	   if(formValues.contractor_facebook_url.length > 20) {
        newErrors.contractor_facebook_url = "Contractor Continent  must  be less than 20 characters";
       }
	   
	   if(formValues.contractor_instgram_url.length > 20) {
        newErrors.contractor_instgram_url = "Contractor Contractor Care  must  be less than 20 characters";
       }
	   
	   if(formValues.contractor_twitter_url.length > 20) {
        newErrors.contractor_twitter_url = "Contractor QR Code  must  be less than 20 characters";
       }
	   
	   if(formValues.contractor_youtube_url.length > 20) {
        newErrors.contractor_youtube_url = "Contractor Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.contractor_start_date.length > 50) {
        newErrors.contractor_start_date = "Contractor Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.contractor_mentor_name.length > 50) {
        newErrors.contractor_mentor_name = "Contractor Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.contractor_mentor_email.length > 50) {
        newErrors.contractor_mentor_email = "Contractor Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.contractor_mentor_mobile.length > 50) {
        newErrors.contractor_mentor_mobile = "Contractor Bar Code  must  be less than 20 characters";
       }
	  	   
	   
	   if(!formValues.contractor_mentor_phone) {
           newErrors.contractor_mentor_phone = "Corporation Certificate is required";
       }
	   
	   if(!formValues.contractor_mentor_linkedin) {
           newErrors.contractor_mentor_linkedin = "Gumasta Certificate is required";
       }
	   if(!formValues.contractor_clients) {
           newErrors.contractor_clients = "MOA Certificate is required";
       }
	   if(!formValues.contractor_team_size) {
           newErrors.contractor_team_size = "MSME Certificate is required";
       }
	  
	   if(!formValues.contractor_branches_countries) {
           newErrors.contractor_branches_countries = "Cancelled Cheque is required";
       }
	   
	   if(!formValues.contractor_branches_cities) {
           newErrors.contractor_branches_countries = "Cancelled Cheque is required";
       }
	   if(!checkedLanguages) {
           newErrors.contractor_technologies = "mentor First Name is required";
       }
	   
	   if(!formValues.contractor_investors) {
           newErrors.contractor_investors = "mentor First Name is required";
       }
	   
	   if (!formValues.contractor_share_price) {
        newErrors.contractor_share_price = "Share price is required";
       } 
	   	   
	   if(!formValues.contractor_google_ranking) {
           newErrors.contractor_google_ranking = "mentor Mobile Name is required";
       }
	   
	  
    

	   // Convert the array to a string, separated by commas
const checkedLanguagesString = checkedLanguages.join(', ');
	   
       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
            contractor_industry: formValues.contractor_industry,
            contractor_fname: formValues.contractor_fname,
            contractor_lname: formValues.contractor_lname,
			contractor_products: formValues.contractor_products,
            contractor_experience: formValues.contractor_experience,
            contractor_website: formValues.contractor_website,
            contractor_hr_mail: formValues.contractor_hr_mail,
			contractor_info_mail: formValues.contractor_info_mail,
            contractor_career_mail: formValues.contractor_career_mail,
			contractor_phone_number: formValues.contractor_phone_number,
            contractor_mobile_number: formValues.contractor_mobile_number,
            contractor_wtsap_number: formValues.contractor_wtsap_number,	
			contractor_linkedin_url: formValues.contractor_linkedin_url,
			contractor_facebook_url: formValues.contractor_facebook_url,
            contractor_instgram_url: formValues.contractor_instgram_url,
            contractor_twitter_url: formValues.contractor_twitter_url,
			contractor_youtube_url: formValues.contractor_youtube_url,
			contractor_start_date: formValues.contractor_start_date,
            contractor_mentor_name: formValues.contractor_mentor_name,
            contractor_mentor_email: formValues.contractor_mentor_email,
			contractor_mentor_mobile: formValues.contractor_mentor_mobile,
			contractor_mentor_phone: formValues.contractor_mentor_phone,
            contractor_mentor_linkedin: formValues.contractor_mentor_linkedin,
            contractor_clients: formValues.contractor_clients,	
			contractor_team_size: formValues.contractor_team_size,
			contractor_office_address: formValues.contractor_office_address,
            contractor_branches_countries: formValues.contractor_branches_countries,
            contractor_branches_cities: formValues.contractor_branches_cities,
			contractor_technologies: checkedLanguagesString,
			contractor_investors: formValues.contractor_investors,
            contractor_share_price: formValues.contractor_share_price,
            contractor_google_ranking: formValues.contractor_google_ranking,
			contractor_google_reviews: formValues.contractor_google_reviews,
			contractor_scope: selectedScope,
            contractor_future_projects: formValues.contractor_future_projects,
            contractor_third_parties: formValues.contractor_third_parties,
			contractor_founder: formValues.contractor_founder,
			contractor_ceo: formValues.contractor_ceo,
            contractor_ceo_linkedin: formValues.contractor_ceo_linkedin,
            contractor_ceo_mobile: formValues.contractor_ceo_mobile,
			contractor_business_model: formValues.contractor_business_model,
            contractor_history: formValues.contractor_history
        }
    
            if(contractorId){
                console.log('I am here just before Edit'+contractorId);
                setFormValues(text);
                const res =   editContractors(text , contractorId);
                if(res){
                    navigate("/contractors/boardcontractors");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                alert(JSON.stringify(text, null, 2));
                console.log(JSON.stringify(text, null, 2));
                addContractors(text); 
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
        
     if(contractorId){
            {props.contractors.map((contractor) => {
                if (contractor._id === contractorId) {
                    setFormValues(contractor);
                }
            })}
        } 
         
    }, [formErrors,checkedLanguages,selectedScope])


    

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
                                      <h4 className="heading-h4">!! Add Contractor !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                        
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Contractor Industry: </label>
                                                            <select className="col-12 col-md-6 form-group" name="contractor_industry" id="contractor_industry" value={formValues.contractor_industry} onChange={(e) => handleInputChange(e)}>
                                                                <option value="">Select an industry</option>
                                                                {industriesList.map((industry, index) => (
                                                                <option key={index} value={industry}>
                                                                    {industry}
                                                                </option>
                                                                ))}
                                                            </select>                                                           
                                                           <p className="error">{formErrors.contractor_industry}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>First Name:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_fname" id="contractor_fname" value={formValues.contractor_fname} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_fname}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Last Name:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_lname" id="contractor_lname" value={formValues.contractor_lname} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_lname}</p>
                                                        </div>
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Products:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_products" id="contractor_products" value={formValues.contractor_products} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_products}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Experience :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_experience" id="contractor_experience" value={formValues.contractor_experience} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_experience}</p>
                                                        </div>
														
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Website :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_website" id="contractor_website" value={formValues.contractor_website} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_website}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>HR Mail :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_hr_mail" id="contractor_hr_mail" value={formValues.contractor_hr_mail} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_hr_mail}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Info Mail :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_info_mail" id="contractor_info_mail" value={formValues.contractor_info_mail} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_info_mail}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Career Mail :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_career_mail" id="contractor_career_mail" value={formValues.contractor_career_mail} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_career_mail}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Phone :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_phone_number" id="contractor_phone_number" value={formValues.contractor_phone_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_phone_number}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Mobile Number :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_mobile_number" id="contractor_mobile_number" value={formValues.contractor_mobile_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_mobile_number}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Wtsap Number :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_wtsap_number" id="contractor_wtsap_number" value={formValues.contractor_wtsap_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_wtsap_number}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Linkedin :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_linkedin_url" id="contractor_linkedin_url" value={formValues.contractor_linkedin_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_linkedin_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Facebook :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_facebook_url" id="contractor_facebook_url" value={formValues.contractor_facebook_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_facebook_url}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Instagram :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_instgram_url" id="contractor_instgram_url" value={formValues.contractor_instgram_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_instgram_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Twitter  :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_twitter_url" id="contractor_twitter_url" value={formValues.contractor_twitter_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_twitter_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Youtube :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_youtube_url" id="contractor_youtube_url" value={formValues.contractor_youtube_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_youtube_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Foundation Date :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_start_date" id="contractor_start_date" value={formValues.contractor_start_date} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_start_date}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Mentor Name :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_mentor_name" id="contractor_mentor_name" value={formValues.contractor_mentor_name} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_mentor_name}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Mentor Email :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_mentor_email" id="contractor_mentor_email" value={formValues.contractor_mentor_email} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_mentor_email}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Mentor Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_mentor_mobile" id="contractor_mentor_mobile" value={formValues.contractor_mentor_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_mentor_mobile}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Mentor Phone :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="contractor_mentor_phone" id="contractor_mentor_phone" value={formValues.contractor_mentor_phone} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_mentor_phone}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Mentor Linkedin :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_mentor_linkedin" id="contractor_mentor_linkedin" value={formValues.contractor_mentor_linkedin} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_mentor_linkedin}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Clients :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_clients" id="contractor_clients" value={formValues.contractor_clients} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_clients}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Team Size :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="contractor_team_size" id="contractor_team_size" value={formValues.contractor_team_size} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_team_size}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Office Address :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_office_address" id="contractor_office_address" value={formValues.contractor_office_address} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_office_address}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Branch Countries :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_branches_countries" id="contractor_branches_countries" value={formValues.contractor_branches_countries} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_branches_countries}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Branch Cities :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_branches_cities" id="contractor_branches_cities" value={formValues.contractor_branches_cities} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_branches_cities}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Technologies :</label>
                                                               {/* <input className="col-12 col-md-6 form-group" type="text" name="contractor_technologies" id="contractor_technologies" value={formValues.contractor_technologies} onChange={(e) => handleInputChange(e)} />*/}
                                                                {programmingLanguages.map((contractor_technologies, index) => (
                                                                            <div key={index}>
                                                                            <input
                                                                                type="checkbox"
                                                                                id={contractor_technologies}
                                                                                value={contractor_technologies}
                                                                                checked={checkedLanguages.includes(contractor_technologies) || formValues.contractor_technologies.includes(contractor_technologies)}
                                                                                onChange={handleLanguageChange}
                                                                            />
                                                                            <label htmlFor={contractor_technologies}>{contractor_technologies}</label>
                                                                            </div>
                                                                ))}
                                                                <p className="error">{formErrors.contractor_technologies}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Investors :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_investors" id="contractor_investors" value={formValues.contractor_investors} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_investors}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Share Price :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_share_price" id="contractor_share_price" value={formValues.contractor_share_price} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_share_price}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Google Ranking :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_google_ranking" id="contractor_google_ranking" value={formValues.contractor_google_ranking} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_google_ranking}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Google Reviews :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_google_reviews" id="contractor_google_reviews" value={formValues.contractor_google_reviews} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_google_reviews}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Contractor Scope :</label>
                                                                <label>  
        <input type="radio" value="Yes" checked={selectedScope === 'Yes' || formValues.contractor_scope ==='Yes'} onChange={handleScopeChange} /> Yes 
    </label>
    <label>
        <input type="radio" value="No" checked={selectedScope === 'No' || formValues.contractor_scope ==='No'} onChange={handleScopeChange} />    No
    </label>
                                                                <p className="error">{formErrors.contractor_scope}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Contractor Projects :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_future_projects" id="contractor_future_projects" value={formValues.contractor_future_projects} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_future_projects}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Contractor Parties :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_third_parties" id="contractor_third_parties" value={formValues.contractor_third_parties} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_third_parties}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Founder :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_founder" id="contractor_founder" value={formValues.contractor_founder} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_founder}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>CEO :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_ceo" id="contractor_ceo" value={formValues.contractor_ceo} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_ceo}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>CEO Linkedin :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_ceo_linkedin" id="contractor_ceo_linkedin" value={formValues.contractor_ceo_linkedin} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_ceo_linkedin}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>CEO Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_ceo_mobile" id="contractor_ceo_mobile" value={formValues.contractor_ceo_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_ceo_mobile}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Business Model :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_business_model" id="contractor_business_model" value={formValues.contractor_business_model} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_business_model}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Contractor History :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="contractor_history" id="contractor_history" value={formValues.contractor_history} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.contractor_history}</p>
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

export default AddContractors
