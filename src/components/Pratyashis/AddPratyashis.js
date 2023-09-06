import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import PratyashisContext from '../../context/Pratyashis/PratyashisContext.js'

const AddPratyashis = (props) => {

    // Context Doing 
    const context = useContext(PratyashisContext);
    const { setFormValues , formValues , addPratyashis , editPratyashis , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const pratyashiId = props.pratyashiId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = pratyashiId ? "Update Pratyashi" : "Add Pratyashi";

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
alert(formValues.pratyashi_yuvak_yuvati.length);
       if (!formValues.pratyashi_yuvak_yuvati) {
           newErrors.pratyashi_yuvak_yuvati = "Pratyashi Company Name is required";
       }
	   if (!formValues.pratyashi_vishesh_parishisht) {
           newErrors.pratyashi_vishesh_parishisht = "Pratyashi Industry is required";
       }
	   if (!formValues.pratyashi_adhik_aayu) {
           newErrors.pratyashi_adhik_aayu = "Pratyashi Product is required";
       }

	   if (!formValues.pratyashi_talakshuda) {
        newErrors.pratyashi_talakshuda = "Pratyashi Mobile is required";
       } else if (formValues.pratyashi_talakshuda.length < 4) {
        newErrors.pratyashi_talakshuda = "Pratyashi must be more than 4 characters";
       } else if (formValues.pratyashi_talakshuda.length > 20) {
        newErrors.pratyashi_talakshuda = "Pratyashi must  be less than 20 characters";
       } 
	
       if (formValues.pratyashi_pura_name.length < 4) {
        newErrors.pratyashi_talakshuda = "Pratyashi must be more than 4 characters";
       } else if (formValues.pratyashi_talakshuda.length > 20) {
        newErrors.pratyashi_talakshuda = "Pratyashi must  be less than 20 characters";
       }

	   if(!formValues.pratyashi_janm_dinank) {
        newErrors.pratyashi_janm_dinank = "Pratyashi Email is required";
       } else if (!regex.test(formValues.pratyashi_janm_dinank)) {
        newErrors.pratyashi_janm_dinank = "This is not a valid Email Format";
       }

	   if (formValues.pratyashi_janm_ghanta.length > 200) {
        newErrors.pratyashi_janm_ghanta = "Pratyashi Website must  be less than 200 characters";
       }
	   
	   if (formValues.pratyashi_janm_minute.length > 200) {
        newErrors.pratyashi_janm_minute = "Pratyashi Website must  be less than 200 characters";
       }
	  	   
	   if(formValues.pratyashi_janm_ampm.length > 20) {
        newErrors.pratyashi_janm_ampm = "Pratyashi Zipcode must  be less than 20 characters";
       }
	   
	   if(formValues.pratyashi_sthan_rajya.length > 20) {
        newErrors.pratyashi_sthan_rajya = "Pratyashi City must  be less than 20 characters";
       }

	   if(formValues.pratyashi_sthan_zila.length > 20) {
        newErrors.pratyashi_sthan_zila = "Pratyashi State must  be less than 20 characters";
       }
	   
	   if(formValues.pratyashi_sthan_gaaon_shahar.length > 20) {
        newErrors.pratyashi_sthan_gaaon_shahar = "Pratyashi Country must  be less than 20 characters";
       }
	   
	   if(formValues.pratyashi_gautra_swyam.length > 5) {
        newErrors.pratyashi_gautra_swyam = "Pratyashi Country Code must  be less than 5 characters";
       }
	   
	   if(formValues.pratyashi_gautra_nanihal.length > 20) {
        newErrors.pratyashi_gautra_nanihal = "Pratyashi Continent  must  be less than 20 characters";
       }
	   
	   if(formValues.pratyashi_sharirik_uchai.length > 20) {
        newErrors.pratyashi_sharirik_uchai = "Pratyashi Pratyashi Care  must  be less than 20 characters";
       }
	   
	   if(formValues.pratyashi_sharirik_inch.length > 20) {
        newErrors.pratyashi_sharirik_inch = "Pratyashi QR Code  must  be less than 20 characters";
       }
	   
	   if(formValues.pratyashi_sharirik_vajan.length > 20) {
        newErrors.pratyashi_sharirik_vajan = "Pratyashi Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.pratyashi_sharirik_rang.length > 50) {
        newErrors.pratyashi_sharirik_rang = "Pratyashi Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.pratyashi_jankari_rashi.length > 50) {
        newErrors.pratyashi_jankari_rashi = "Pratyashi Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.pratyashi_jankari_nakshatr.length > 50) {
        newErrors.pratyashi_jankari_nakshatr = "Pratyashi Bar Code  must  be less than 20 characters";
       }
	   
	   if(formValues.pratyashi_jankari_naadi.length > 50) {
        newErrors.pratyashi_jankari_naadi = "Pratyashi Bar Code  must  be less than 20 characters";
       }
	  	   
	   
	   if(!formValues.pratyashi_jankari_charan) {
           newErrors.pratyashi_jankari_charan = "Corporation Certificate is required";
       }
	   
	   if(!formValues.pratyashi_manglik) {
           newErrors.pratyashi_manglik = "Gumasta Certificate is required";
       }
	   if(!formValues.pratyashi_shani) {
           newErrors.pratyashi_shani = "MOA Certificate is required";
       }
	   if(!formValues.pratyashi_patrika_milan) {
           newErrors.pratyashi_patrika_milan = "MSME Certificate is required";
       }
	  
	   if(!formValues.pratyashi_vyavsay) {
           newErrors.pratyashi_vyavsay = "Cancelled Cheque is required";
       }
	   
	   if(!formValues.pratyashi_masik_aay) {
           newErrors.pratyashi_vyavsay = "Cancelled Cheque is required";
       }
	   if(!formValues.pratyashi_pita_vyavsay) {
           newErrors.pratyashi_pita_vyavsay = "Director First Name is required";
       }
	   
	   if(!formValues.pratyashi_pita_masik_aay) {
           newErrors.pratyashi_pita_masik_aay = "Director First Name is required";
       }
	   
	   if (!formValues.pratyashi_pita_naam) {
        newErrors.pratyashi_pita_naam = "Director Email is required";
       } else if (!regex.test(formValues.pratyashi_pita_naam)) {
        newErrors.pratyashi_pita_naam = "This is not a valid Email Format";
       }
	   	   
	   if(!formValues.pratyashi_vartaman_pata) {
           newErrors.pratyashi_vartaman_pata = "Director Mobile Name is required";
       }
	   
	  
    

	   
	   
       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
            pratyashi_yuvak_yuvati: formValues.pratyashi_yuvak_yuvati,
            pratyashi_vishesh_parishisht: formValues.pratyashi_vishesh_parishisht,
            pratyashi_adhik_aayu: formValues.pratyashi_adhik_aayu,
			pratyashi_talakshuda: formValues.pratyashi_talakshuda,
            pratyashi_pura_name: formValues.pratyashi_pura_name,
            pratyashi_janm_dinank: formValues.pratyashi_janm_dinank,
            pratyashi_janm_ghanta: formValues.pratyashi_janm_ghanta,
			pratyashi_janm_minute: formValues.pratyashi_janm_minute,
            pratyashi_janm_ampm: formValues.pratyashi_janm_ampm,
			pratyashi_sthan_rajya: formValues.pratyashi_sthan_rajya,
            pratyashi_sthan_zila: formValues.pratyashi_sthan_zila,
            pratyashi_sthan_gaaon_shahar: formValues.pratyashi_sthan_gaaon_shahar,	
			pratyashi_gautra_swyam: formValues.pratyashi_gautra_swyam,
			pratyashi_gautra_nanihal: formValues.pratyashi_gautra_nanihal,
            pratyashi_sharirik_uchai: formValues.pratyashi_sharirik_uchai,
            pratyashi_sharirik_inch: formValues.pratyashi_sharirik_inch,
			pratyashi_sharirik_vajan: formValues.pratyashi_sharirik_vajan,
			pratyashi_sharirik_rang: formValues.pratyashi_sharirik_rang,
            pratyashi_jankari_rashi: formValues.pratyashi_jankari_rashi,
            pratyashi_jankari_nakshatr: formValues.pratyashi_jankari_nakshatr,
			pratyashi_jankari_naadi: formValues.pratyashi_jankari_naadi,
			pratyashi_jankari_charan: formValues.pratyashi_jankari_charan,
            pratyashi_manglik: formValues.pratyashi_manglik,
            pratyashi_shani: formValues.pratyashi_shani,	
			pratyashi_patrika_milan: formValues.pratyashi_patrika_milan,
			pratyashi_shekshanik_yogyata: formValues.pratyashi_shekshanik_yogyata,
            pratyashi_vyavsay: formValues.pratyashi_vyavsay,
            pratyashi_masik_aay: formValues.pratyashi_masik_aay,
			pratyashi_pita_vyavsay: formValues.pratyashi_pita_vyavsay,
			pratyashi_pita_masik_aay: formValues.pratyashi_pita_masik_aay,
            pratyashi_pita_naam: formValues.pratyashi_pita_naam,
            pratyashi_vartaman_pata: formValues.pratyashi_vartaman_pata,
			pratyashi_vartaman_rajya: formValues.pratyashi_vartaman_rajya,
			pratyashi_vartaman_zila: formValues.pratyashi_vartaman_zila,
            pratyashi_vartaman_gaaon_shahar: formValues.pratyashi_vartaman_gaaon_shahar,
            pratyashi_vartaman_pincode: formValues.pratyashi_vartaman_pincode,
			pratyashi_sthayi_pata: formValues.pratyashi_sthayi_pata,
			pratyashi_sthayi_rajya: formValues.pratyashi_sthayi_rajya,
            pratyashi_sthayi_zila: formValues.pratyashi_sthayi_zila,
            pratyashi_sthayi_gaaon_shahar: formValues.pratyashi_sthayi_gaaon_shahar,
			pratyashi_sthayi_pin_code: formValues.pratyashi_sthayi_pin_code,
            pratyashi_photo: formValues.pratyashi_photo
        }
    
            if(pratyashiId){
                console.log('I am here just before Edit'+pratyashiId);
                setFormValues(text);
                const res =   editPratyashis(text , pratyashiId);
                if(res){
                    navigate("/pratyashis/boardpratyashis");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                alert(JSON.stringify(text, null, 2));
                console.log(JSON.stringify(text, null, 2));
                addPratyashis(text); 
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
        
     if(pratyashiId){
            {props.pratyashis.map((pratyashi) => {
                if (pratyashi._id === pratyashiId) {
                    setFormValues(pratyashi);
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
                                      <h4 className="heading-h4">!! Add Pratyashi !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                    <div className="col-12 col-md-6 form-group">     
                                                            <label>Pratyashi Name:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_yuvak_yuvati" id="pratyashi_yuvak_yuvati" value={formValues.pratyashi_yuvak_yuvati} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.pratyashi_yuvak_yuvati}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Industry:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_vishesh_parishisht" id="pratyashi_vishesh_parishisht" value={formValues.pratyashi_vishesh_parishisht} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_vishesh_parishisht}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Products:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_adhik_aayu" id="pratyashi_adhik_aayu" value={formValues.pratyashi_adhik_aayu} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_adhik_aayu}</p>
                                                        </div>
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Mobile:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_talakshuda" id="pratyashi_talakshuda" value={formValues.pratyashi_talakshuda} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_talakshuda}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Alternate Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_pura_name" id="pratyashi_pura_name" value={formValues.pratyashi_pura_name} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_pura_name}</p>
                                                        </div>
														
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Email :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_janm_dinank" id="pratyashi_janm_dinank" value={formValues.pratyashi_janm_dinank} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_janm_dinank}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Website :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_janm_ghanta" id="pratyashi_janm_ghanta" value={formValues.pratyashi_janm_ghanta} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_janm_ghanta}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Registered Address :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_janm_minute" id="pratyashi_janm_minute" value={formValues.pratyashi_janm_minute} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_janm_minute}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Zipcode :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_janm_ampm" id="pratyashi_janm_ampm" value={formValues.pratyashi_janm_ampm} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_janm_ampm}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>City :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_sthan_rajya" id="pratyashi_sthan_rajya" value={formValues.pratyashi_sthan_rajya} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_sthan_rajya}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>State :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_sthan_zila" id="pratyashi_sthan_zila" value={formValues.pratyashi_sthan_zila} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_sthan_zila}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Country :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_sthan_gaaon_shahar" id="pratyashi_sthan_gaaon_shahar" value={formValues.pratyashi_sthan_gaaon_shahar} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_sthan_gaaon_shahar}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Country Code :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_gautra_swyam" id="pratyashi_gautra_swyam" value={formValues.pratyashi_gautra_swyam} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_gautra_swyam}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Continent :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_gautra_nanihal" id="pratyashi_gautra_nanihal" value={formValues.pratyashi_gautra_nanihal} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_gautra_nanihal}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Pratyashi Care :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_sharirik_uchai" id="pratyashi_sharirik_uchai" value={formValues.pratyashi_sharirik_uchai} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_sharirik_uchai}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>QR Code :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_sharirik_inch" id="pratyashi_sharirik_inch" value={formValues.pratyashi_sharirik_inch} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_sharirik_inch}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Barcode Number :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_sharirik_vajan" id="pratyashi_sharirik_vajan" value={formValues.pratyashi_sharirik_vajan} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_sharirik_vajan}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Foundation Date :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_sharirik_rang" id="pratyashi_sharirik_rang" value={formValues.pratyashi_sharirik_rang} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_sharirik_rang}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>License Number :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_jankari_rashi" id="pratyashi_jankari_rashi" value={formValues.pratyashi_jankari_rashi} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_jankari_rashi}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>PAN :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_jankari_nakshatr" id="pratyashi_jankari_nakshatr" value={formValues.pratyashi_jankari_nakshatr} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_jankari_nakshatr}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>GST :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_jankari_naadi" id="pratyashi_jankari_naadi" value={formValues.pratyashi_jankari_naadi} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_jankari_naadi}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Corporate Certificate :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="pratyashi_jankari_charan" id="pratyashi_jankari_charan" value={formValues.pratyashi_jankari_charan} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_jankari_charan}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Gumasta :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_manglik" id="pratyashi_manglik" value={formValues.pratyashi_manglik} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_manglik}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>MOA Certificate :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_shani" id="pratyashi_shani" value={formValues.pratyashi_shani} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_shani}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>MSME :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="pratyashi_patrika_milan" id="pratyashi_patrika_milan" value={formValues.pratyashi_patrika_milan} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_patrika_milan}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Account Details :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_shekshanik_yogyata" id="pratyashi_shekshanik_yogyata" value={formValues.pratyashi_shekshanik_yogyata} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_shekshanik_yogyata}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Cancelled Cheque :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_vyavsay" id="pratyashi_vyavsay" value={formValues.pratyashi_vyavsay} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_vyavsay}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>No.of Employees :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_masik_aay" id="pratyashi_masik_aay" value={formValues.pratyashi_masik_aay} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_masik_aay}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director FName :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_pita_vyavsay" id="pratyashi_pita_vyavsay" value={formValues.pratyashi_pita_vyavsay} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_pita_vyavsay}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director LName :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_pita_masik_aay" id="pratyashi_pita_masik_aay" value={formValues.pratyashi_pita_masik_aay} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_pita_masik_aay}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director Email :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_pita_naam" id="pratyashi_pita_naam" value={formValues.pratyashi_pita_naam} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_pita_naam}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_vartaman_pata" id="pratyashi_vartaman_pata" value={formValues.pratyashi_vartaman_pata} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_vartaman_pata}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Director LinkedIN :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_vartaman_rajya" id="pratyashi_vartaman_rajya" value={formValues.pratyashi_vartaman_rajya} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_vartaman_rajya}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Pratyashi Reviews :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_vartaman_zila" id="pratyashi_vartaman_zila" value={formValues.pratyashi_vartaman_zila} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_vartaman_zila}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Pratyashi Rating :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_vartaman_gaaon_shahar" id="pratyashi_vartaman_gaaon_shahar" value={formValues.pratyashi_vartaman_gaaon_shahar} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_vartaman_gaaon_shahar}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Facebook URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_vartaman_pincode" id="pratyashi_vartaman_pincode" value={formValues.pratyashi_vartaman_pincode} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_vartaman_pincode}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Instagram URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_sthayi_pata" id="pratyashi_sthayi_pata" value={formValues.pratyashi_sthayi_pata} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_sthayi_pata}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>LinkedIN URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_sthayi_rajya" id="pratyashi_sthayi_rajya" value={formValues.pratyashi_sthayi_rajya} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_sthayi_rajya}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Youtube URL :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_sthayi_zila" id="pratyashi_sthayi_zila" value={formValues.pratyashi_sthayi_zila} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_sthayi_zila}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>MadeIn Countries :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_sthayi_gaaon_shahar" id="pratyashi_sthayi_gaaon_shahar" value={formValues.pratyashi_sthayi_gaaon_shahar} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_sthayi_gaaon_shahar}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Attributes :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_sthayi_pin_code" id="pratyashi_sthayi_pin_code" value={formValues.pratyashi_sthayi_pin_code} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_sthayi_pin_code}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Brief History :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="pratyashi_photo" id="pratyashi_photo" value={formValues.pratyashi_photo} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.pratyashi_photo}</p>
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

export default AddPratyashis
