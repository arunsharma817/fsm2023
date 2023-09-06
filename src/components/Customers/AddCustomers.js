import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import CustomersContext from '../../context/Customers/CustomersContext.js'

const AddCustomers = (props) => {

    // Context Doing 
    const context = useContext(CustomersContext);
    const { setFormValues , formValues , addCustomers , editCustomers , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const customerId = props.customerId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = customerId ? "Update Customer" : "Add Customer";

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
alert(formValues.customer_company_name.length);
       if (!formValues.customer_company_name) {
           newErrors.customer_company_name = "Customer Company Name is required";
       }
	   if (!formValues.customer_industry) {
           newErrors.customer_industry = "Customer Industry is required";
       }
	   if (!formValues.customer_products) {
           newErrors.customer_products = "Customer Product is required";
       }

	   if (!formValues.customer_mobile) {
        newErrors.customer_mobile = "Customer Mobile is required";
       } else if (formValues.customer_mobile.length < 4) {
        newErrors.customer_mobile = "Customer must be more than 4 characters";
       } else if (formValues.customer_mobile.length > 20) {
        newErrors.customer_mobile = "Customer must  be less than 20 characters";
       } 
	
       if (formValues.customer_mobile_alternate.length < 4) {
        newErrors.customer_mobile = "Customer must be more than 4 characters";
       } else if (formValues.customer_mobile.length > 20) {
        newErrors.customer_mobile = "Customer must  be less than 20 characters";
       }

	   if(!formValues.customer_email) {
        newErrors.customer_email = "Customer Email is required";
       } else if (!regex.test(formValues.customer_email)) {
        newErrors.customer_email = "This is not a valid Email Format";
       }

	   if (formValues.customer_website.length > 200) {
        newErrors.customer_website = "Customer Website must  be less than 200 characters";
       }
	   
	   if (formValues.customer_registered_address.length > 200) {
        newErrors.customer_registered_address = "Customer Website must  be less than 200 characters";
       }
	  	   
	   if(formValues.customer_zip_code.length > 20) {
        newErrors.customer_zip_code = "Customer Zipcode must  be less than 20 characters";
       }
	   
	   if(formValues.customer_city.length > 20) {
        newErrors.customer_city = "Customer City must  be less than 20 characters";
       }

	   if(formValues.customer_state.length > 20) {
        newErrors.customer_state = "Customer State must  be less than 20 characters";
       }
	   
	   if(formValues.customer_country.length > 20) {
        newErrors.customer_country = "Customer Country must  be less than 20 characters";
       }
	   
	   if(formValues.customer_country_code.length > 5) {
        newErrors.customer_country_code = "Customer Country Code must  be less than 5 characters";
       }
	   
	   if(formValues.customer_continent.length > 20) {
        newErrors.customer_continent = "Customer Continent  must  be less than 20 characters";
       }
	   
	   if(formValues.customer_customer_care.length > 20) {
        newErrors.customer_customer_care = "Customer Customer Care  must  be less than 20 characters";
       }
	   
	   if(formValues.customer_qr_code.length > 20) {
        newErrors.customer_qr_code = "Customer QR Code  must  be less than 20 characters";
       }
	   
	   if(formValues.customer_barcode_number.length > 20) {
        newErrors.customer_barcode_number = "Customer Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.customer_foundation_date.length > 50) {
        newErrors.customer_foundation_date = "Customer Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.customer_license_number.length > 50) {
        newErrors.customer_license_number = "Customer Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.customer_pan_number.length > 50) {
        newErrors.customer_pan_number = "Customer Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.customer_gst_number.length > 50) {
        newErrors.customer_gst_number = "Customer Bar Code  must  be less than 20 characters";
       }
	  	   
	   
	   if(!formValues.customer_corporation_certificate) {
           newErrors.customer_corporation_certificate = "Corporation Certificate is required";
       }
	   
	   if(!formValues.customer_gumasta_certificate) {
           newErrors.customer_gumasta_certificate = "Gumasta Certificate is required";
       }
	   if(!formValues.customer_moa_certificate) {
           newErrors.customer_moa_certificate = "MOA Certificate is required";
       }
	   if(!formValues.customer_msme_certificate) {
           newErrors.customer_msme_certificate = "MSME Certificate is required";
       }
	  
	   if(!formValues.customer_cancelled_cheque) {
           newErrors.customer_cancelled_cheque = "Cancelled Cheque is required";
       }
	   
	   if(!formValues.customer_number_of_employees) {
           newErrors.customer_cancelled_cheque = "Cancelled Cheque is required";
       }
	   if(!formValues.customer_director_fname) {
           newErrors.customer_director_fname = "Director First Name is required";
       }
	   
	   if(!formValues.customer_director_lname) {
           newErrors.customer_director_lname = "Director First Name is required";
       }
	   
	   if (!formValues.customer_director_email) {
        newErrors.customer_director_email = "Director Email is required";
       } else if (!regex.test(formValues.customer_director_email)) {
        newErrors.customer_director_email = "This is not a valid Email Format";
       }
	   	   
	   if(!formValues.customer_director_mobile) {
           newErrors.customer_director_mobile = "Director Mobile Name is required";
       }
	   
	  
    

	   
	   
       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
            customer_company_name: formValues.customer_company_name,
            customer_industry: formValues.customer_industry,
            customer_products: formValues.customer_products,
			customer_mobile: formValues.customer_mobile,
            customer_mobile_alternate: formValues.customer_mobile_alternate,
            customer_email: formValues.customer_email,
            customer_website: formValues.customer_website,
			customer_registered_address: formValues.customer_registered_address,
            customer_zip_code: formValues.customer_zip_code,
			customer_city: formValues.customer_city,
            customer_state: formValues.customer_state,
            customer_country: formValues.customer_country,	
			customer_country_code: formValues.customer_country_code,
			customer_continent: formValues.customer_continent,
            customer_customer_care: formValues.customer_customer_care,
            customer_qr_code: formValues.customer_qr_code,
			customer_barcode_number: formValues.customer_barcode_number,
			customer_foundation_date: formValues.customer_foundation_date,
            customer_license_number: formValues.customer_license_number,
            customer_pan_number: formValues.customer_pan_number,
			customer_gst_number: formValues.customer_gst_number,
			customer_corporation_certificate: formValues.customer_corporation_certificate,
            customer_gumasta_certificate: formValues.customer_gumasta_certificate,
            customer_moa_certificate: formValues.customer_moa_certificate,	
			customer_msme_certificate: formValues.customer_msme_certificate,
			customer_account_details: formValues.customer_account_details,
            customer_cancelled_cheque: formValues.customer_cancelled_cheque,
            customer_number_of_employees: formValues.customer_number_of_employees,
			customer_director_fname: formValues.customer_director_fname,
			customer_director_lname: formValues.customer_director_lname,
            customer_director_email: formValues.customer_director_email,
            customer_director_mobile: formValues.customer_director_mobile,
			customer_director_linkedin: formValues.customer_director_linkedin,
			customer_customer_reviews: formValues.customer_customer_reviews,
            customer_customer_rating: formValues.customer_customer_rating,
            customer_facebook_url: formValues.customer_facebook_url,
			customer_instagram_url: formValues.customer_instagram_url,
			customer_linkedin_url: formValues.customer_linkedin_url,
            customer_youtube_url: formValues.customer_youtube_url,
            customer_made_in_countries: formValues.customer_made_in_countries,
			customer_attributes: formValues.customer_attributes,
            customer_brief_history: formValues.customer_brief_history
        }
    
            if(customerId){
                console.log('I am here just before Edit'+customerId);
                setFormValues(text);
                const res =   editCustomers(text , customerId);
                if(res){
                    navigate("/customers/boardcustomers");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                alert(JSON.stringify(text, null, 2));
                console.log(JSON.stringify(text, null, 2));
                addCustomers(text); 
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
        
     if(customerId){
            {props.customers.map((customer) => {
                if (customer._id === customerId) {
                    setFormValues(customer);
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
                                      <h4 className="heading-h4">!! Add Customer !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                    <div className="col-12 col-md-6 form-group">     
                                                            <label>Customer Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="customer_company_name" id="customer_company_name" value={formValues.customer_company_name} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.customer_company_name}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Industry:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_industry" id="customer_industry" value={formValues.customer_industry} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_industry}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Products:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_products" id="customer_products" value={formValues.customer_products} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_products}</p>
                                                        </div>
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Mobile:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_mobile" id="customer_mobile" value={formValues.customer_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_mobile}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Alternate Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_mobile_alternate" id="customer_mobile_alternate" value={formValues.customer_mobile_alternate} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_mobile_alternate}</p>
                                                        </div>
														
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Email :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_email" id="customer_email" value={formValues.customer_email} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_email}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Website :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_website" id="customer_website" value={formValues.customer_website} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_website}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Registered Address :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_registered_address" id="customer_registered_address" value={formValues.customer_registered_address} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_registered_address}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Zipcode :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_zip_code" id="customer_zip_code" value={formValues.customer_zip_code} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_zip_code}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>City :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_city" id="customer_city" value={formValues.customer_city} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_city}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>State :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_state" id="customer_state" value={formValues.customer_state} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_state}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Country :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_country" id="customer_country" value={formValues.customer_country} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_country}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Country Code :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_country_code" id="customer_country_code" value={formValues.customer_country_code} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_country_code}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Continent :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_continent" id="customer_continent" value={formValues.customer_continent} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_continent}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Customer Care :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_customer_care" id="customer_customer_care" value={formValues.customer_customer_care} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_customer_care}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>QR Code :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_qr_code" id="customer_qr_code" value={formValues.customer_qr_code} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_qr_code}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Barcode Number :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_barcode_number" id="customer_barcode_number" value={formValues.customer_barcode_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_barcode_number}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Foundation Date :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_foundation_date" id="customer_foundation_date" value={formValues.customer_foundation_date} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_foundation_date}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>License Number :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_license_number" id="customer_license_number" value={formValues.customer_license_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_license_number}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>PAN :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_pan_number" id="customer_pan_number" value={formValues.customer_pan_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_pan_number}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>GST :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_gst_number" id="customer_gst_number" value={formValues.customer_gst_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_gst_number}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Corporate Certificate :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="customer_corporation_certificate" id="customer_corporation_certificate" value={formValues.customer_corporation_certificate} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_corporation_certificate}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Gumasta :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_gumasta_certificate" id="customer_gumasta_certificate" value={formValues.customer_gumasta_certificate} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_gumasta_certificate}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>MOA Certificate :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_moa_certificate" id="customer_moa_certificate" value={formValues.customer_moa_certificate} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_moa_certificate}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>MSME :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="customer_msme_certificate" id="customer_msme_certificate" value={formValues.customer_msme_certificate} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_msme_certificate}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Account Details :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_account_details" id="customer_account_details" value={formValues.customer_account_details} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_account_details}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Cancelled Cheque :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_cancelled_cheque" id="customer_cancelled_cheque" value={formValues.customer_cancelled_cheque} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_cancelled_cheque}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>No.of Employees :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_number_of_employees" id="customer_number_of_employees" value={formValues.customer_number_of_employees} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_number_of_employees}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director FName :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_director_fname" id="customer_director_fname" value={formValues.customer_director_fname} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_director_fname}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director LName :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_director_lname" id="customer_director_lname" value={formValues.customer_director_lname} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_director_lname}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director Email :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_director_email" id="customer_director_email" value={formValues.customer_director_email} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_director_email}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_director_mobile" id="customer_director_mobile" value={formValues.customer_director_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_director_mobile}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director LinkedIN :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_director_linkedin" id="customer_director_linkedin" value={formValues.customer_director_linkedin} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_director_linkedin}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Customer Reviews :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_customer_reviews" id="customer_customer_reviews" value={formValues.customer_customer_reviews} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_customer_reviews}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Customer Rating :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_customer_rating" id="customer_customer_rating" value={formValues.customer_customer_rating} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_customer_rating}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Facebook URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_facebook_url" id="customer_facebook_url" value={formValues.customer_facebook_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_facebook_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Instagram URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_instagram_url" id="customer_instagram_url" value={formValues.customer_instagram_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_instagram_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>LinkedIN URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_linkedin_url" id="customer_linkedin_url" value={formValues.customer_linkedin_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_linkedin_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Youtube URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_youtube_url" id="customer_youtube_url" value={formValues.customer_youtube_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_youtube_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>MadeIn Countries :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_made_in_countries" id="customer_made_in_countries" value={formValues.customer_made_in_countries} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_made_in_countries}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Attributes :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_attributes" id="customer_attributes" value={formValues.customer_attributes} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_attributes}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Brief History :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="customer_brief_history" id="customer_brief_history" value={formValues.customer_brief_history} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.customer_brief_history}</p>
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

export default AddCustomers
