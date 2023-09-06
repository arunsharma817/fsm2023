import React, { useEffect, useState , useContext} from 'react'
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import EventsContext from '../../context/Events/EventsContext.js'

const AddEvents = (props) => {

    // Context Doing 
    const context = useContext(EventsContext);
    const { setFormValues , formValues , addEvents , editEvents , apiResponseMessages } = context;

    const navigate = useNavigate();
    const params = useParams();
    const eventId = props.eventId;
    const ownerToken = localStorage.getItem('token');
 
    const [formErrors, setFormErrors] = useState({});    
    const [isSubmit, setIsSubmit] = useState(false);
    const actionButton = eventId ? "Update Event" : "Add Event";

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
alert(formValues.event_title.length);
       if (!formValues.event_title) {
           newErrors.event_title = "Event Title  is required";
       }
	   if (!formValues.event_date) {
           newErrors.event_date = "Event Date is required";
       }
	   if (!formValues.event_venue) {
           newErrors.event_venue = "Event Venue is required";
       }

	   if (!formValues.event_city) {
        newErrors.event_city = "Event City is required";
       } 

       

	   if(!formValues.event_organizer_address) {
        newErrors.event_organizer_address = "Event Organzier Address is required";
       } 

	   if (formValues.event_organizer_phone.length > 200) {
        newErrors.event_organizer_phone = "Event Organizer Phone  must  be less than 12 characters";
       }
	   
	   if (formValues.event_organizer_email.length > 300) {
        newErrors.event_organizer_email = "Event Organizer Mail  must  be less than 300 characters";
       }else if (!regex.test(formValues.event_organizer_email)) {
        newErrors.event_organizer_email = "This is not a valid Email Format";
       }
	  	   
	   if(formValues.event_organizer_contact_person.length > 200) {
        newErrors.event_organizer_contact_person = "Event Contact Person must be less than 200 characters";
       }
	   
	   if(formValues.event_chief_guest.length > 300) {
        newErrors.event_chief_guest = "Event Chief Guest Name  be less than 300 characters";
       }

	   if(formValues.event_awards_latest.length > 200) {
        newErrors.event_awards_latest = "Event Latest Awards must  be less than 200 characters";
       }
	   
	   if(formValues.event_awards_nominee.length > 200) {
        newErrors.event_awards_nominee = "Event Awards Nominee must  be less than 200 characters";
       }
	   
	   if(formValues.event_organizer_team_size.length > 10) {
        newErrors.event_organizer_team_size = "Event Team Size Length must  be less than 10 characters";
       }
	   
	   if(formValues.event_photographer.length > 200) {
        newErrors.event_photographer = "Event Photographer  must  be less than 200 characters";
       }
	   
	   if(formValues.event_security_agency.length > 200) {
        newErrors.event_security_agency = "Event Security Agency  must  be less than 200 characters";
       }
	   
	   if(formValues.event_near_police_station.length > 200) {
        newErrors.event_near_police_station = " Police Station Address  must  be less than 200 characters";
       }
	   
	   if(formValues.event_near_police_station_contact.length > 12) {
        newErrors.event_near_police_station_contact = "Police Contact  must  be less than 12 characters";
       }
	   
	   if(formValues.event_start_date.length > 50) {
        newErrors.event_start_date = "Event Start Date  must  be less than 50 characters";
       }
	   
	   if(formValues.event_end_date.length > 50) {
        newErrors.event_end_date = "Event End Date  must  be less than 50 characters";
       }
	   
	   if(formValues.event_caterer.length > 200) {
        newErrors.event_caterer = "Event Caterer Name  must  be less than 200 characters";
       }
	   
	   if(formValues.event_caterer_mobile.length > 200) {
        newErrors.event_caterer_mobile = "Event Caterer Mobile  must  be less than 200 characters";
       }
	  	   
	   
	   if(!formValues.event_caterer_address) {
           newErrors.event_caterer_address = "Caterer Certificate is required";
       }
	   
	   if(!formValues.event_electrician) {
           newErrors.event_electrician = "Electrician Name is required";
       }
	   if(!formValues.event_flower_decorater) {
           newErrors.event_flower_decorater = "Flower Decorator is required";
       }
	   if(!formValues.event_nursery_contractor) {
           newErrors.event_nursery_contractor = "Nursery Contractor is required";
       }
	  
	   if(!formValues.event_mentor_name) {
           newErrors.event_mentor_name = "Mentor Name is required";
       }
	   
	   if(!formValues.event_marketing_agency) {
           newErrors.event_mentor_name = "Marketing Agency is required";
       }
	   if(!formValues.event_marketing_coordinater) {
           newErrors.event_marketing_coordinater = "Marketing Coordinator is required";
       }
	   
	   if(!formValues.event_sponsor_companies) {
           newErrors.event_sponsor_companies = "Sponsor Companies is required";
       }
	   
	   if (!formValues.event_media_agencies) {
        newErrors.event_media_agencies = "Media Agency is required";
       } 
	   	   
	   if(!formValues.event_transporation_agencies) {
           newErrors.event_transporation_agencies = "Transportation Agencies are required";
       }
	   
	  
    

	   
	   
       setFormErrors(newErrors);

        if(Object.keys(newErrors).length === 0) {
            // Form submission logic here
            setIsSubmit(true);
            const text = {
            event_title: formValues.event_title,
            event_date: formValues.event_date,
            event_venue: formValues.event_venue,
			event_city: formValues.event_city,
            event_organizer: formValues.event_organizer,
            event_organizer_address: formValues.event_organizer_address,
            event_organizer_phone: formValues.event_organizer_phone,
			event_organizer_email: formValues.event_organizer_email,
            event_organizer_contact_person: formValues.event_organizer_contact_person,
			event_chief_guest: formValues.event_chief_guest,
            event_awards_latest: formValues.event_awards_latest,
            event_awards_nominee: formValues.event_awards_nominee,	
			event_organizer_team_size: formValues.event_organizer_team_size,
			event_photographer: formValues.event_photographer,
            event_security_agency: formValues.event_security_agency,
            event_near_police_station: formValues.event_near_police_station,
			event_near_police_station_contact: formValues.event_near_police_station_contact,
			event_start_date: formValues.event_start_date,
            event_end_date: formValues.event_end_date,
            event_caterer: formValues.event_caterer,
			event_caterer_mobile: formValues.event_caterer_mobile,
			event_caterer_address: formValues.event_caterer_address,
            event_electrician: formValues.event_electrician,
            event_flower_decorater: formValues.event_flower_decorater,	
			event_nursery_contractor: formValues.event_nursery_contractor,
			event_music_system: formValues.event_music_system,
            event_mentor_name: formValues.event_mentor_name,
            event_marketing_agency: formValues.event_marketing_agency,
			event_marketing_coordinater: formValues.event_marketing_coordinater,
			event_sponsor_companies: formValues.event_sponsor_companies,
            event_media_agencies: formValues.event_media_agencies,
            event_transporation_agencies: formValues.event_transporation_agencies,
			event_travel_agencies: formValues.event_travel_agencies,
			event_benificieries: formValues.event_benificieries,
            event_artists: formValues.event_artists,
            event_celebrities: formValues.event_celebrities,
			event_agency_founder: formValues.event_agency_founder,
			event_agency_ceo: formValues.event_agency_ceo,
            event_agency_ceo_linkedin: formValues.event_agency_ceo_linkedin,
            event_agency_ceo_mobile: formValues.event_agency_ceo_mobile,
			event_business_model: formValues.event_business_model,
            event_agency_history: formValues.event_agency_history
        }
    
            if(eventId){
                console.log('I am here just before Edit'+eventId);
                setFormValues(text);
                const res =   editEvents(text , eventId);
                if(res){
                    navigate("/events/boardevents");
                }            
            }else{
                //setApiResponseMessages(addUser(text));
                alert(JSON.stringify(text, null, 2));
                console.log(JSON.stringify(text, null, 2));
                addEvents(text); 
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
        
     if(eventId){
            {props.events.map((event) => {
                if (event._id === eventId) {
                    setFormValues(event);
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
                                      <h4 className="heading-h4">!! Add Event !!</h4>
                                      {apiResponseMessages}
                                        <div className="pane-body">
                                            <form onSubmit={handleSubmit}>
                                            <div className="col-12">
                                                    <div className="row g-2">
                                                    <div className="col-12 col-md-6 form-group">     
                                                            <label>Event Title:</label>
                                                            <input className="col-12 col-md-6 form-group" type="text" name="event_title" id="event_title" value={formValues.event_title} onChange={(e) => handleInputChange(e)} />
                                                            <p className="error">{formErrors.event_title}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Event Date:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_date" id="event_date" value={formValues.event_date} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_date}</p>
                                                        </div>
                                                        <div className="col-12 col-md-6 form-group">
                                                            <label>Event Venue:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_venue" id="event_venue" value={formValues.event_venue} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_venue}</p>
                                                        </div>
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Event City:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_city" id="event_city" value={formValues.event_city} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_city}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Event Organizer :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_organizer" id="event_organizer" value={formValues.event_organizer} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_organizer}</p>
                                                        </div>
														
														 <div className="col-12 col-md-6 form-group">
                                                            <label>Organizer Address :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_organizer_address" id="event_organizer_address" value={formValues.event_organizer_address} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_organizer_address}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Organizer Phone :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_organizer_phone" id="event_organizer_phone" value={formValues.event_organizer_phone} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_organizer_phone}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Organizer Mail :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_organizer_email" id="event_organizer_email" value={formValues.event_organizer_email} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_organizer_email}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Organizer Contact Person Name:</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_organizer_contact_person" id="event_organizer_contact_person" value={formValues.event_organizer_contact_person} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_organizer_contact_person}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Chief Guest :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_chief_guest" id="event_chief_guest" value={formValues.event_chief_guest} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_chief_guest}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Event Awars Latest :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_awards_latest" id="event_awards_latest" value={formValues.event_awards_latest} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_awards_latest}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Awards Nominee :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_awards_nominee" id="event_awards_nominee" value={formValues.event_awards_nominee} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_awards_nominee}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Organzier Team Size :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_organizer_team_size" id="event_organizer_team_size" value={formValues.event_organizer_team_size} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_organizer_team_size}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Event Photographer :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_photographer" id="event_photographer" value={formValues.event_photographer} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_photographer}</p>
                                                        </div>
														<div className="col-12 col-md-6 form-group">
                                                            <label>Event Security Agency :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_security_agency" id="event_security_agency" value={formValues.event_security_agency} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_security_agency}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Near Police Station  :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_near_police_station" id="event_near_police_station" value={formValues.event_near_police_station} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_near_police_station}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Police Station Contact :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_near_police_station_contact" id="event_near_police_station_contact" value={formValues.event_near_police_station_contact} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_near_police_station_contact}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Event Start Date :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_start_date" id="event_start_date" value={formValues.event_start_date} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_start_date}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Event End Date :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_end_date" id="event_end_date" value={formValues.event_end_date} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_end_date}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Event Career :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_caterer" id="event_caterer" value={formValues.event_caterer} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_caterer}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Caterer Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_caterer_mobile" id="event_caterer_mobile" value={formValues.event_caterer_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_caterer_mobile}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Caterer Address :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="event_caterer_address" id="event_caterer_address" value={formValues.event_caterer_address} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_caterer_address}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Electrician :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_electrician" id="event_electrician" value={formValues.event_electrician} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_electrician}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Flower Decorator :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_flower_decorater" id="event_flower_decorater" value={formValues.event_flower_decorater} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_flower_decorater}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Nursery Contractor :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text"   name="event_nursery_contractor" id="event_nursery_contractor" value={formValues.event_nursery_contractor} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_nursery_contractor}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Event Music System :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_music_system" id="event_music_system" value={formValues.event_music_system} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_music_system}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Event Mentor Name :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_mentor_name" id="event_mentor_name" value={formValues.event_mentor_name} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_mentor_name}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Marketing Agencies :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_marketing_agency" id="event_marketing_agency" value={formValues.event_marketing_agency} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_marketing_agency}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Marketing Coordinater :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_marketing_coordinater" id="event_marketing_coordinater" value={formValues.event_marketing_coordinater} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_marketing_coordinater}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Sponsor Companies :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_sponsor_companies" id="event_sponsor_companies" value={formValues.event_sponsor_companies} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_sponsor_companies}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Media Agencies :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_media_agencies" id="event_media_agencies" value={formValues.event_media_agencies} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_media_agencies}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Transportation Agencies :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_transporation_agencies" id="event_transporation_agencies" value={formValues.event_transporation_agencies} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_transporation_agencies}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Travel Agencies :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_travel_agencies" id="event_travel_agencies" value={formValues.event_travel_agencies} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_travel_agencies}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Event Benificieries :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_benificieries" id="event_benificieries" value={formValues.event_benificieries} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_benificieries}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Event Artists :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_artists" id="event_artists" value={formValues.event_artists} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_artists}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Event Celebrities :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_celebrities" id="event_celebrities" value={formValues.event_celebrities} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_celebrities}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Agency Founder :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_agency_founder" id="event_agency_founder" value={formValues.event_agency_founder} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_agency_founder}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Agency CEO :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_agency_ceo" id="event_agency_ceo" value={formValues.event_agency_ceo} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_agency_ceo}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>CEO Linkedin :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_agency_ceo_linkedin" id="event_agency_ceo_linkedin" value={formValues.event_agency_ceo_linkedin} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_agency_ceo_linkedin}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>CEO Mobile :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_agency_ceo_mobile" id="event_agency_ceo_mobile" value={formValues.event_agency_ceo_mobile} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_agency_ceo_mobile}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Agency Business Model :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_business_model" id="event_business_model" value={formValues.event_business_model} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_business_model}</p>
                                                        </div>
														
														<div className="col-12 col-md-6 form-group">
                                                            <label>Agency History :</label>
                                                                <input className="col-12 col-md-6 form-group" type="text" name="event_agency_history" id="event_agency_history" value={formValues.event_agency_history} onChange={(e) => handleInputChange(e)} />
                                                                <p className="error">{formErrors.event_agency_history}</p>
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

export default AddEvents
