import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import ManufacturersContext from '../../context/Manufacturers/ManufacturersContext.js'

const AddManufacturers = (props) => {

    // Context Doing 
    const context = useContext(ManufacturersContext);
    const { setFormValues , formValues , addManufacturers , editManufacturers , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const manufacturerId = props.manufacturerId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = manufacturerId ? "Update Manufacturer" : "Add Manufacturer";

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    
   

    const handleSubmit = (e) => {
        e.preventDefault();
        //setFormErrors(validate(formValues));
       //alert(formErrors.samaj_member_fname);
       const newErrors = {};
       const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
alert(formValues.manufacturer_company_name.length);
       if (!formValues.manufacturer_company_name) {
           newErrors.manufacturer_company_name = "Manufacturer Company Name is required";
       }
	   if (!formValues.manufacturer_industry) {
           newErrors.manufacturer_industry = "Manufacturer Industry is required";
       }
	   if (!formValues.manufacturer_products) {
           newErrors.manufacturer_products = "Manufacturer Product is required";
       }

	   if (!formValues.manufacturer_mobile) {
        newErrors.manufacturer_mobile = "Manufacturer Mobile is required";
       } else if (formValues.manufacturer_mobile.length < 4) {
        newErrors.manufacturer_mobile = "Manufacturer must be more than 4 characters";
       } else if (formValues.manufacturer_mobile.length > 20) {
        newErrors.manufacturer_mobile = "Manufacturer must  be less than 20 characters";
       } 
	
       if (formValues.manufacturer_mobile_alternate.length < 4) {
        newErrors.manufacturer_mobile = "Manufacturer must be more than 4 characters";
       } else if (formValues.manufacturer_mobile.length > 20) {
        newErrors.manufacturer_mobile = "Manufacturer must  be less than 20 characters";
       }

	   if(!formValues.manufacturer_email) {
        newErrors.manufacturer_email = "Manufacturer Email is required";
       } else if (!regex.test(formValues.manufacturer_email)) {
        newErrors.manufacturer_email = "This is not a valid Email Format";
       }

	   if (formValues.manufacturer_website.length > 200) {
        newErrors.manufacturer_website = "Manufacturer Website must  be less than 200 characters";
       }
	   
	   if (formValues.manufacturer_registered_address.length > 200) {
        newErrors.manufacturer_registered_address = "Manufacturer Website must  be less than 200 characters";
       }
	  	   
	   if(formValues.manufacturer_zip_code.length > 20) {
        newErrors.manufacturer_zip_code = "Manufacturer Zipcode must  be less than 20 characters";
       }
	   
	   if(formValues.manufacturer_city.length > 20) {
        newErrors.manufacturer_city = "Manufacturer City must  be less than 20 characters";
       }

	   if(formValues.manufacturer_state.length > 20) {
        newErrors.manufacturer_state = "Manufacturer State must  be less than 20 characters";
       }
	   
	   if(formValues.manufacturer_country.length > 20) {
        newErrors.manufacturer_country = "Manufacturer Country must  be less than 20 characters";
       }
	   
	   if(formValues.manufacturer_country_code.length > 5) {
        newErrors.manufacturer_country_code = "Manufacturer Country Code must  be less than 5 characters";
       }
	   
	   if(formValues.manufacturer_continent.length > 20) {
        newErrors.manufacturer_continent = "Manufacturer Continent  must  be less than 20 characters";
       }
	   
	   if(formValues.manufacturer_customer_care.length > 20) {
        newErrors.manufacturer_customer_care = "Manufacturer Customer Care  must  be less than 20 characters";
       }
	   
	   if(formValues.manufacturer_qr_code.length > 20) {
        newErrors.manufacturer_qr_code = "Manufacturer QR Code  must  be less than 20 characters";
       }
	   
	   if(formValues.manufacturer_barcode_number.length > 20) {
        newErrors.manufacturer_barcode_number = "Manufacturer Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.manufacturer_foundation_date.length > 50) {
        newErrors.manufacturer_foundation_date = "Manufacturer Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.manufacturer_license_number.length > 50) {
        newErrors.manufacturer_license_number = "Manufacturer Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.manufacturer_pan_number.length > 50) {
        newErrors.manufacturer_pan_number = "Manufacturer Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.manufacturer_gst_number.length > 50) {
        newErrors.manufacturer_gst_number = "Manufacturer Bar Code  must  be less than 20 characters";
       }
	  	   
	   
	   if(!formValues.manufacturer_corporation_certificate) {
           newErrors.manufacturer_corporation_certificate = "Corporation Certificate is required";
       }
	   
	   if(!formValues.manufacturer_gumasta_certificate) {
           newErrors.manufacturer_gumasta_certificate = "Gumasta Certificate is required";
       }
	   if(!formValues.manufacturer_moa_certificate) {
           newErrors.manufacturer_moa_certificate = "MOA Certificate is required";
       }
	   if(!formValues.manufacturer_msme_certificate) {
           newErrors.manufacturer_msme_certificate = "MSME Certificate is required";
       }
	  
	   if(!formValues.manufacturer_cancelled_cheque) {
           newErrors.manufacturer_cancelled_cheque = "Cancelled Cheque is required";
       }
	   
	   if(!formValues.manufacturer_number_of_employees) {
           newErrors.manufacturer_cancelled_cheque = "Cancelled Cheque is required";
       }
	   if(!formValues.manufacturer_director_fname) {
           newErrors.manufacturer_director_fname = "Director First Name is required";
       }
	   
	   if(!formValues.manufacturer_director_lname) {
           newErrors.manufacturer_director_lname = "Director First Name is required";
       }
	   
	   if (!formValues.manufacturer_director_email) {
        newErrors.manufacturer_director_email = "Director Email is required";
       } else if (!regex.test(formValues.manufacturer_director_email)) {
        newErrors.manufacturer_director_email = "This is not a valid Email Format";
       }
	   	   
	   if(!formValues.manufacturer_director_mobile) {
           newErrors.manufacturer_director_mobile = "Director Mobile Name is required";
       }
	   
	  
    

	   
	   
       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
            manufacturer_company_name: formValues.manufacturer_company_name,
            manufacturer_industry: formValues.manufacturer_industry,
            manufacturer_products: formValues.manufacturer_products,
			manufacturer_mobile: formValues.manufacturer_mobile,
            manufacturer_mobile_alternate: formValues.manufacturer_mobile_alternate,
            manufacturer_email: formValues.manufacturer_email,
            manufacturer_website: formValues.manufacturer_website,
			manufacturer_registered_address: formValues.manufacturer_registered_address,
            manufacturer_zip_code: formValues.manufacturer_zip_code,
			manufacturer_city: formValues.manufacturer_city,
            manufacturer_state: formValues.manufacturer_state,
            manufacturer_country: formValues.manufacturer_country,	
			manufacturer_country_code: formValues.manufacturer_country_code,
			manufacturer_continent: formValues.manufacturer_continent,
            manufacturer_customer_care: formValues.manufacturer_customer_care,
            manufacturer_qr_code: formValues.manufacturer_qr_code,
			manufacturer_barcode_number: formValues.manufacturer_barcode_number,
			manufacturer_foundation_date: formValues.manufacturer_foundation_date,
            manufacturer_license_number: formValues.manufacturer_license_number,
            manufacturer_pan_number: formValues.manufacturer_pan_number,
			manufacturer_gst_number: formValues.manufacturer_gst_number,
			manufacturer_corporation_certificate: formValues.manufacturer_corporation_certificate,
            manufacturer_gumasta_certificate: formValues.manufacturer_gumasta_certificate,
            manufacturer_moa_certificate: formValues.manufacturer_moa_certificate,	
			manufacturer_msme_certificate: formValues.manufacturer_msme_certificate,
			manufacturer_account_details: formValues.manufacturer_account_details,
            manufacturer_cancelled_cheque: formValues.manufacturer_cancelled_cheque,
            manufacturer_number_of_employees: formValues.manufacturer_number_of_employees,
			manufacturer_director_fname: formValues.manufacturer_director_fname,
			manufacturer_director_lname: formValues.manufacturer_director_lname,
            manufacturer_director_email: formValues.manufacturer_director_email,
            manufacturer_director_mobile: formValues.manufacturer_director_mobile,
			manufacturer_director_linkedin: formValues.manufacturer_director_linkedin,
			manufacturer_customer_reviews: formValues.manufacturer_customer_reviews,
            manufacturer_customer_rating: formValues.manufacturer_customer_rating,
            manufacturer_facebook_url: formValues.manufacturer_facebook_url,
			manufacturer_instagram_url: formValues.manufacturer_instagram_url,
			manufacturer_linkedin_url: formValues.manufacturer_linkedin_url,
            manufacturer_youtube_url: formValues.manufacturer_youtube_url,
            manufacturer_made_in_countries: formValues.manufacturer_made_in_countries,
			manufacturer_attributes: formValues.manufacturer_attributes,
            manufacturer_brief_history: formValues.manufacturer_brief_history
        }
    
            if(manufacturerId){
                console.log('I am here just before Edit'+manufacturerId);
                setFormValues(text);
                const res =   editManufacturers(text , manufacturerId);
                if(res){
                    navigate("/manufacturers/boardmanufacturers");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                addManufacturers(text); 
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
        
     if(manufacturerId){
            {props.manufacturers.map((manufacturer) => {
                if (manufacturer._id === manufacturerId) {
                    setFormValues(manufacturer);
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
                                      <h4 className="heading-h4">!! Add Manufacturer !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                    <div className="col-12 col-md-6 form-group">     
                                                            <label>Manufacturer Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_company_name" id="manufacturer_company_name" value={formValues.manufacturer_company_name} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.manufacturer_company_name}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Industry: </label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_industry" id="manufacturer_industry" value={formValues.manufacturer_industry} onChange={(e) => handleInputChange(e)} />
                                                           
                                                           <p className="error">{formErrors.manufacturer_industry}</p>

                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Products:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_products" id="manufacturer_products" value={formValues.manufacturer_products} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_products}</p>
                                                        </div>
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Mobile:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_mobile" id="manufacturer_mobile" value={formValues.manufacturer_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_mobile}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Alternate Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_mobile_alternate" id="manufacturer_mobile_alternate" value={formValues.manufacturer_mobile_alternate} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_mobile_alternate}</p>
                                                        </div>
														
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Email :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_email" id="manufacturer_email" value={formValues.manufacturer_email} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_email}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Website :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_website" id="manufacturer_website" value={formValues.manufacturer_website} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_website}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Registered Address :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_registered_address" id="manufacturer_registered_address" value={formValues.manufacturer_registered_address} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_registered_address}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Zipcode :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_zip_code" id="manufacturer_zip_code" value={formValues.manufacturer_zip_code} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_zip_code}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>City :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_city" id="manufacturer_city" value={formValues.manufacturer_city} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_city}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>State :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_state" id="manufacturer_state" value={formValues.manufacturer_state} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_state}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Country :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_country" id="manufacturer_country" value={formValues.manufacturer_country} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_country}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Country Code :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_country_code" id="manufacturer_country_code" value={formValues.manufacturer_country_code} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_country_code}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Continent :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_continent" id="manufacturer_continent" value={formValues.manufacturer_continent} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_continent}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Customer Care :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_customer_care" id="manufacturer_customer_care" value={formValues.manufacturer_customer_care} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_customer_care}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>QR Code :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_qr_code" id="manufacturer_qr_code" value={formValues.manufacturer_qr_code} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_qr_code}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Barcode Number :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_barcode_number" id="manufacturer_barcode_number" value={formValues.manufacturer_barcode_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_barcode_number}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Foundation Date :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_foundation_date" id="manufacturer_foundation_date" value={formValues.manufacturer_foundation_date} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_foundation_date}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>License Number :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_license_number" id="manufacturer_license_number" value={formValues.manufacturer_license_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_license_number}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>PAN :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_pan_number" id="manufacturer_pan_number" value={formValues.manufacturer_pan_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_pan_number}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>GST :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_gst_number" id="manufacturer_gst_number" value={formValues.manufacturer_gst_number} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_gst_number}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Copr Certificate :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_corporation_certificate" id="manufacturer_corporation_certificate" value={formValues.manufacturer_corporation_certificate} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_corporation_certificate}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Gumasta :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_gumasta_certificate" id="manufacturer_gumasta_certificate" value={formValues.manufacturer_gumasta_certificate} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_gumasta_certificate}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>MOA Certificate :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_moa_certificate" id="manufacturer_moa_certificate" value={formValues.manufacturer_moa_certificate} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_moa_certificate}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>MSME :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_msme_certificate" id="manufacturer_msme_certificate" value={formValues.manufacturer_msme_certificate} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_msme_certificate}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Account Details :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_account_details" id="manufacturer_account_details" value={formValues.manufacturer_account_details} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_account_details}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Cancelled Cheque :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_cancelled_cheque" id="manufacturer_cancelled_cheque" value={formValues.manufacturer_cancelled_cheque} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_cancelled_cheque}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>No.of Employees :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_number_of_employees" id="manufacturer_number_of_employees" value={formValues.manufacturer_number_of_employees} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_number_of_employees}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director FName :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_director_fname" id="manufacturer_director_fname" value={formValues.manufacturer_director_fname} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_director_fname}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director LName :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_director_lname" id="manufacturer_director_lname" value={formValues.manufacturer_director_lname} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_director_lname}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director Email :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_director_email" id="manufacturer_director_email" value={formValues.manufacturer_director_email} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_director_email}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_director_mobile" id="manufacturer_director_mobile" value={formValues.manufacturer_director_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_director_mobile}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director LinkedIN :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_director_linkedin" id="manufacturer_director_linkedin" value={formValues.manufacturer_director_linkedin} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_director_linkedin}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Customer Reviews :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_customer_reviews" id="manufacturer_customer_reviews" value={formValues.manufacturer_customer_reviews} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_customer_reviews}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Customer Rating :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_customer_rating" id="manufacturer_customer_rating" value={formValues.manufacturer_customer_rating} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_customer_rating}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Facebook URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_facebook_url" id="manufacturer_facebook_url" value={formValues.manufacturer_facebook_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_facebook_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Instagram URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_instagram_url" id="manufacturer_instagram_url" value={formValues.manufacturer_instagram_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_instagram_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>LinkedIN URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_linkedin_url" id="manufacturer_linkedin_url" value={formValues.manufacturer_linkedin_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_linkedin_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Youtube URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_youtube_url" id="manufacturer_youtube_url" value={formValues.manufacturer_youtube_url} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_youtube_url}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>MadeIn Countries :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_made_in_countries" id="manufacturer_made_in_countries" value={formValues.manufacturer_made_in_countries} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_made_in_countries}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Attributes :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_attributes" id="manufacturer_attributes" value={formValues.manufacturer_attributes} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_attributes}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Brief History :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="manufacturer_brief_history" id="manufacturer_brief_history" value={formValues.manufacturer_brief_history} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.manufacturer_brief_history}</p>
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

export default AddManufacturers
