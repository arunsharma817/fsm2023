import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import CompanysContext from '../../context/Companys/CompanysContext.js'

const AddCompanys = (props) => {

    // Context Doing 
    const context = useContext(CompanysContext);
    const { setFormValues , formValues , addCompanys , editCompanys , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const companyId = props.companyId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = companyId ? "Update Company" : "Add Company";

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
alert(formValues.company_industry.length);
       if (!formValues.company_industry) {
           newErrors.company_industry = "Company Company Name is required";
       }
	   if (!formValues.company_name) {
           newErrors.company_name = "Company Industry is required";
       }
	   if (!formValues.company_services) {
           newErrors.company_services = "Company Product is required";
       }

	   if (!formValues.company_products) {
        newErrors.company_products = "Company Mobile is required";
       } else if (formValues.company_products.length < 4) {
        newErrors.company_products = "Company must be more than 4 characters";
       } else if (formValues.company_products.length > 20) {
        newErrors.company_products = "Company must  be less than 20 characters";
       } 
	
       if (formValues.company_cmm_level.length < 4) {
        newErrors.company_products = "Company must be more than 4 characters";
       } else if (formValues.company_products.length > 20) {
        newErrors.company_products = "Company must  be less than 20 characters";
       }

	   if(!formValues.company_website) {
        newErrors.company_website = "Company Email is required";
       } else if (!regex.test(formValues.company_website)) {
        newErrors.company_website = "This is not a valid Email Format";
       }

	   if (formValues.company_hr_mail.length > 200) {
        newErrors.company_hr_mail = "Company Website must  be less than 200 characters";
       }
	   
	   if (formValues.company_info_mail.length > 200) {
        newErrors.company_info_mail = "Company Website must  be less than 200 characters";
       }
	  	   
	   if(formValues.company_career_mail.length > 20) {
        newErrors.company_career_mail = "Company Zipcode must  be less than 20 characters";
       }
	   
	   if(formValues.company_phone_number.length > 20) {
        newErrors.company_phone_number = "Company City must  be less than 20 characters";
       }

	   if(formValues.company_mobile_number.length > 20) {
        newErrors.company_mobile_number = "Company State must  be less than 20 characters";
       }
	   
	   if(formValues.company_wtsap_number.length > 20) {
        newErrors.company_wtsap_number = "Company Country must  be less than 20 characters";
       }
	   
	   if(formValues.company_linkedin_url.length > 5) {
        newErrors.company_linkedin_url = "Company Country Code must  be less than 5 characters";
       }
	   
	   if(formValues.company_facebook_url.length > 20) {
        newErrors.company_facebook_url = "Company Continent  must  be less than 20 characters";
       }
	   
	   if(formValues.company_instgram_url.length > 20) {
        newErrors.company_instgram_url = "Company Company Care  must  be less than 20 characters";
       }
	   
	   if(formValues.company_twitter_url.length > 20) {
        newErrors.company_twitter_url = "Company QR Code  must  be less than 20 characters";
       }
	   
	   if(formValues.company_youtube_url.length > 20) {
        newErrors.company_youtube_url = "Company Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.company_start_date.length > 50) {
        newErrors.company_start_date = "Company Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.company_director_name.length > 50) {
        newErrors.company_director_name = "Company Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.company_director_email.length > 50) {
        newErrors.company_director_email = "Company Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.company_director_mobile.length > 50) {
        newErrors.company_director_mobile = "Company Bar Code  must  be less than 20 characters";
       }
	  	   
	   
	   if(!formValues.company_director_phone) {
           newErrors.company_director_phone = "Corporation Certificate is required";
       }
	   
	   if(!formValues.company_director_linkedin) {
           newErrors.company_director_linkedin = "Gumasta Certificate is required";
       }
	   if(!formValues.company_clients) {
           newErrors.company_clients = "MOA Certificate is required";
       }
	   if(!formValues.company_numberof_employees) {
           newErrors.company_numberof_employees = "MSME Certificate is required";
       }
	  
	   if(!formValues.company_branches_countries) {
           newErrors.company_branches_countries = "Cancelled Cheque is required";
       }
	   
	   if(!formValues.company_branches_cities) {
           newErrors.company_branches_countries = "Cancelled Cheque is required";
       }
	   if(!formValues.company_technologies) {
           newErrors.company_technologies = "Director First Name is required";
       }
	   
	   if(!formValues.company_investors) {
           newErrors.company_investors = "Director First Name is required";
       }
	   
	   if (!formValues.company_share_price) {
        newErrors.company_share_price = "Director Email is required";
       } else if (!regex.test(formValues.company_share_price)) {
        newErrors.company_share_price = "This is not a valid Email Format";
       }
	   	   
	   if(!formValues.company_google_ranking) {
           newErrors.company_google_ranking = "Director Mobile Name is required";
       }
	   
	  
    

	   
	   
       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
            company_industry: formValues.company_industry,
            company_name: formValues.company_name,
            company_services: formValues.company_services,
			company_products: formValues.company_products,
            company_cmm_level: formValues.company_cmm_level,
            company_website: formValues.company_website,
            company_hr_mail: formValues.company_hr_mail,
			company_info_mail: formValues.company_info_mail,
            company_career_mail: formValues.company_career_mail,
			company_phone_number: formValues.company_phone_number,
            company_mobile_number: formValues.company_mobile_number,
            company_wtsap_number: formValues.company_wtsap_number,	
			company_linkedin_url: formValues.company_linkedin_url,
			company_facebook_url: formValues.company_facebook_url,
            company_instgram_url: formValues.company_instgram_url,
            company_twitter_url: formValues.company_twitter_url,
			company_youtube_url: formValues.company_youtube_url,
			company_start_date: formValues.company_start_date,
            company_director_name: formValues.company_director_name,
            company_director_email: formValues.company_director_email,
			company_director_mobile: formValues.company_director_mobile,
			company_director_phone: formValues.company_director_phone,
            company_director_linkedin: formValues.company_director_linkedin,
            company_clients: formValues.company_clients,	
			company_numberof_employees: formValues.company_numberof_employees,
			company_office_address: formValues.company_office_address,
            company_branches_countries: formValues.company_branches_countries,
            company_branches_cities: formValues.company_branches_cities,
			company_technologies: formValues.company_technologies,
			company_investors: formValues.company_investors,
            company_share_price: formValues.company_share_price,
            company_google_ranking: formValues.company_google_ranking,
			company_google_reviews: formValues.company_google_reviews,
			company_scope: formValues.company_scope,
            company_future_projects: formValues.company_future_projects,
            company_third_parties: formValues.company_third_parties,
			company_founder: formValues.company_founder,
			company_ceo: formValues.company_ceo,
            company_ceo_linkedin: formValues.company_ceo_linkedin,
            company_ceo_mobile: formValues.company_ceo_mobile,
			company_business_model: formValues.company_business_model,
            company_history: formValues.company_history
        }
    
            if(companyId){
                console.log('I am here just before Edit'+companyId);
                setFormValues(text);
                const res =   editCompanys(text , companyId);
                if(res){
                    navigate("/companys/boardcompanys");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                alert(JSON.stringify(text, null, 2));
                console.log(JSON.stringify(text, null, 2));
                addCompanys(text); 
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
        
     if(companyId){
            {props.companys.map((company) => {
                if (company._id === companyId) {
                    setFormValues(company);
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
                                      <h4 className="heading-h4">!! Add Company !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                    <div className="col-12 col-md-6 form-group">     
                                                            <label>Company Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="company_industry" id="company_industry" value={formValues.company_industry} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.company_industry}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Industry:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_name" id="company_name" value={formValues.company_name} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_name}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Products:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_services" id="company_services" value={formValues.company_services} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_services}</p>
                                                        </div>
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Mobile:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_products" id="company_products" value={formValues.company_products} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_products}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Alternate Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_cmm_level" id="company_cmm_level" value={formValues.company_cmm_level} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_cmm_level}</p>
                                                        </div>
														
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Email :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_website" id="company_website" value={formValues.company_website} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_website}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Website :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_hr_mail" id="company_hr_mail" value={formValues.company_hr_mail} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_hr_mail}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Registered Address :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_info_mail" id="company_info_mail" value={formValues.company_info_mail} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_info_mail}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Zipcode :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_career_mail" id="company_career_mail" value={formValues.company_career_mail} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_career_mail}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>City :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_phone_number" id="company_phone_number" value={formValues.company_phone_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_phone_number}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>State :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_mobile_number" id="company_mobile_number" value={formValues.company_mobile_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_mobile_number}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Country :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_wtsap_number" id="company_wtsap_number" value={formValues.company_wtsap_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_wtsap_number}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Country Code :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_linkedin_url" id="company_linkedin_url" value={formValues.company_linkedin_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_linkedin_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Continent :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_facebook_url" id="company_facebook_url" value={formValues.company_facebook_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_facebook_url}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Company Care :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_instgram_url" id="company_instgram_url" value={formValues.company_instgram_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_instgram_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>QR Code :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_twitter_url" id="company_twitter_url" value={formValues.company_twitter_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_twitter_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Barcode Number :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_youtube_url" id="company_youtube_url" value={formValues.company_youtube_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_youtube_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Foundation Date :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_start_date" id="company_start_date" value={formValues.company_start_date} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_start_date}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>License Number :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_director_name" id="company_director_name" value={formValues.company_director_name} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_director_name}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>PAN :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_director_email" id="company_director_email" value={formValues.company_director_email} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_director_email}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>GST :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_director_mobile" id="company_director_mobile" value={formValues.company_director_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_director_mobile}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Corporate Certificate :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="company_director_phone" id="company_director_phone" value={formValues.company_director_phone} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_director_phone}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Gumasta :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_director_linkedin" id="company_director_linkedin" value={formValues.company_director_linkedin} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_director_linkedin}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>MOA Certificate :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_clients" id="company_clients" value={formValues.company_clients} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_clients}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>MSME :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="company_numberof_employees" id="company_numberof_employees" value={formValues.company_numberof_employees} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_numberof_employees}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Account Details :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_office_address" id="company_office_address" value={formValues.company_office_address} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_office_address}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Cancelled Cheque :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_branches_countries" id="company_branches_countries" value={formValues.company_branches_countries} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_branches_countries}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>No.of Employees :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_branches_cities" id="company_branches_cities" value={formValues.company_branches_cities} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_branches_cities}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director FName :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_technologies" id="company_technologies" value={formValues.company_technologies} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_technologies}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director LName :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_investors" id="company_investors" value={formValues.company_investors} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_investors}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director Email :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_share_price" id="company_share_price" value={formValues.company_share_price} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_share_price}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_google_ranking" id="company_google_ranking" value={formValues.company_google_ranking} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_google_ranking}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director LinkedIN :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_google_reviews" id="company_google_reviews" value={formValues.company_google_reviews} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_google_reviews}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Company Reviews :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_scope" id="company_scope" value={formValues.company_scope} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_scope}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Company Rating :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_future_projects" id="company_future_projects" value={formValues.company_future_projects} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_future_projects}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Facebook URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_third_parties" id="company_third_parties" value={formValues.company_third_parties} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_third_parties}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Instagram URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_founder" id="company_founder" value={formValues.company_founder} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_founder}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>LinkedIN URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_ceo" id="company_ceo" value={formValues.company_ceo} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_ceo}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Youtube URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_ceo_linkedin" id="company_ceo_linkedin" value={formValues.company_ceo_linkedin} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_ceo_linkedin}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>MadeIn Countries :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_ceo_mobile" id="company_ceo_mobile" value={formValues.company_ceo_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_ceo_mobile}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Attributes :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_business_model" id="company_business_model" value={formValues.company_business_model} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_business_model}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Brief History :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="company_history" id="company_history" value={formValues.company_history} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.company_history}</p>
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

export default AddCompanys
