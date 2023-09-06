import React, { useEffect, useState } from "react";
import EventsContext from "./EventsContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const EventsState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [events, setEvents] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);

  const initialValues = {
    "event_title": "",
    "event_date": "",
    "event_venue": "",
    "event_city": "",
    "event_organizer": "",
    "event_organizer_address": "",
    "event_organizer_phone": "",
    "event_organizer_email":"",
    "event_organizer_contact_person": "",
    "event_chief_guest": "",
    "event_awards_latest": "",
    "event_awards_nominee": "",
    "event_organizer_team_size": "",
    "event_photographer": "",
    "event_security_agency": "",
    "event_near_police_station": "",
    "event_near_police_station_contact": "",
    "event_start_date": "",
    "event_end_date": "",
    "event_caterer": "",
    "event_caterer_mobile": "",
"event_caterer_address": "",
    "event_electrician": "",
    "event_flower_decorater": "",
    "event_nursery_contractor": "",
    "event_music_system": "",
    "event_mentor_name": "",
    "event_marketing_agency": "",
    "event_marketing_coordinater": "",
    "event_sponsor_companies": "",
    "event_media_agencies": "",
    "event_transporation_agencies": "",
    "event_travel_agencies": "",
    "event_benificieries": "",
    "event_artists": "",
    "event_celebrities": "",
    "event_agency_founder": "",
    "event_agency_ceo": "",
    "event_agency_ceo_linkedin": "",
    "event_agency_ceo_mobile": "",
    "event_business_model": "",
    "event_agency_history": ""
 };
   const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchEvents = async () => {
      const getEvents = await axios.get(`http://localhost:5000/api/events/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getEvents.data);
      return setEvents(getEvents.data);
    }
    fetchEvents();
  }, []);

  // Add Client State 

  const addEvents = (text) => {
     const newManufacturer = {     
      event_title: text.event_title,
            event_date: text.event_date,
            event_venue: text.event_venue,
			event_city: text.event_city,
            event_organizer: text.event_organizer,
            event_organizer_address: text.event_organizer_address,
            event_organizer_phone: text.event_organizer_phone,
			event_organizer_email: text.event_organizer_email,
            event_organizer_contact_person: text.event_organizer_contact_person,
			event_chief_guest: text.event_chief_guest,
            event_awards_latest: text.event_awards_latest,
            event_awards_nominee: text.event_awards_nominee,	
			event_organizer_team_size: text.event_organizer_team_size,
			event_photographer: text.event_photographer,
            event_security_agency: text.event_security_agency,
            event_near_police_station: text.event_near_police_station,
			event_near_police_station_contact: text.event_near_police_station_contact,
			event_start_date: text.event_start_date,
            event_end_date: text.event_end_date,
            event_caterer: text.event_caterer,
			event_caterer_mobile: text.event_caterer_mobile,
			event_caterer_address: text.event_caterer_address,
            event_electrician: text.event_electrician,
            event_flower_decorater: text.event_flower_decorater,	
			event_nursery_contractor: text.event_nursery_contractor,
			event_music_system: text.event_music_system,
            event_mentor_name: text.event_mentor_name,
            event_marketing_agency: text.event_marketing_agency,
			event_marketing_coordinater: text.event_marketing_coordinater,
			event_sponsor_companies: text.event_sponsor_companies,
            event_media_agencies: text.event_media_agencies,
            event_transporation_agencies: text.event_transporation_agencies,
			event_travel_agencies: text.event_travel_agencies,
			event_benificieries: text.event_benificieries,
            event_artists: text.event_artists,
            event_celebrities: text.event_celebrities,
			event_agency_founder: text.event_agency_founder,
			event_agency_ceo: text.event_agency_ceo,
            event_agency_ceo_linkedin: text.event_agency_ceo_linkedin,
            event_agency_ceo_mobile: text.event_agency_ceo_mobile,
			event_business_model: text.event_business_model,
            event_agency_history: text.event_agency_history
    }
    axios.post('http://localhost:5000/api/events/create', newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newManufacturers = {
        _id: resp.data._id,
        event_title: text.event_title,
            event_date: text.event_date,
            event_venue: text.event_venue,
			      event_city: text.event_city,
            event_organizer: text.event_organizer,
            event_organizer_address: text.event_organizer_address,
            event_organizer_phone: text.event_organizer_phone,
			event_organizer_email: text.event_organizer_email,
            event_organizer_contact_person: text.event_organizer_contact_person,
			event_chief_guest: text.event_chief_guest,
            event_awards_latest: text.event_awards_latest,
            event_awards_nominee: text.event_awards_nominee,	
			event_organizer_team_size: text.event_organizer_team_size,
			event_photographer: text.event_photographer,
            event_security_agency: text.event_security_agency,
            event_near_police_station: text.event_near_police_station,
			event_near_police_station_contact: text.event_near_police_station_contact,
			event_start_date: text.event_start_date,
            event_end_date: text.event_end_date,
            event_caterer: text.event_caterer,
			event_caterer_mobile: text.event_caterer_mobile,
			event_caterer_address: text.event_caterer_address,
            event_electrician: text.event_electrician,
            event_flower_decorater: text.event_flower_decorater,	
			event_nursery_contractor: text.event_nursery_contractor,
			event_music_system: text.event_music_system,
            event_mentor_name: text.event_mentor_name,
            event_marketing_agency: text.event_marketing_agency,
			event_marketing_coordinater: text.event_marketing_coordinater,
			event_sponsor_companies: text.event_sponsor_companies,
            event_media_agencies: text.event_media_agencies,
            event_transporation_agencies: text.event_transporation_agencies,
			event_travel_agencies: text.event_travel_agencies,
			event_benificieries: text.event_benificieries,
            event_artists: text.event_artists,
            event_celebrities: text.event_celebrities,
			event_agency_founder: text.event_agency_founder,
			event_agency_ceo: text.event_agency_ceo,
            event_agency_ceo_linkedin: text.event_agency_ceo_linkedin,
            event_agency_ceo_mobile: text.event_agency_ceo_mobile,
			event_business_model: text.event_business_model,
            event_agency_history: text.event_agency_history       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setEvents((oldEvents) => {
        return [...oldEvents, newManufacturers];
      })      
      ///return { message : text.event_date+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong> <pre>{JSON.stringify(newManufacturers, null, 2)}</pre>Success! {text.event_title} </strong> The New Manufacturer has been successfully Added!!
      </div>);
      setFormValues(initialValues);
    }).catch(error => {
      console.error('There was an error!', "Error Name:"+error.name +" , Error Code :"+error.message );
      
      setApiResponseMessages(<div className="alert error">     
      <strong>Error!</strong>Error Name:{error.name} Error Code :{error.message}
    </div>);
      //return { message : 'There was an error!' };      
    });
   return 1;
  }

  // Delete Client State 

  const deleteEvents = (getManufacturerId) => {
    const eventId = getManufacturerId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/events/delete/" + eventId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + eventId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setEvents" from my end to add immediate when successfully added into the database */ }
        setEvents((events) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return events.filter((res) => res._id !== eventId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editEvents = (text, eventId) => {

    console.log("I am in edit Text"+text.event_date);
    console.log("I am in edit client Id"+eventId);
    console.log("I am checking ownerToken"+ownerToken);

    const newManufacturer = {
      _id: eventId,
      event_title: text.event_title,
            event_date: text.event_date,
            event_venue: text.event_venue,
			event_city: text.event_city,
            event_organizer: text.event_organizer,
            event_organizer_address: text.event_organizer_address,
            event_organizer_phone: text.event_organizer_phone,
			event_organizer_email: text.event_organizer_email,
            event_organizer_contact_person: text.event_organizer_contact_person,
			event_chief_guest: text.event_chief_guest,
            event_awards_latest: text.event_awards_latest,
            event_awards_nominee: text.event_awards_nominee,	
			event_organizer_team_size: text.event_organizer_team_size,
			event_photographer: text.event_photographer,
            event_security_agency: text.event_security_agency,
            event_near_police_station: text.event_near_police_station,
			event_near_police_station_contact: text.event_near_police_station_contact,
			event_start_date: text.event_start_date,
            event_end_date: text.event_end_date,
            event_caterer: text.event_caterer,
			event_caterer_mobile: text.event_caterer_mobile,
			event_caterer_address: text.event_caterer_address,
            event_electrician: text.event_electrician,
            event_flower_decorater: text.event_flower_decorater,	
			event_nursery_contractor: text.event_nursery_contractor,
			event_music_system: text.event_music_system,
            event_mentor_name: text.event_mentor_name,
            event_marketing_agency: text.event_marketing_agency,
			event_marketing_coordinater: text.event_marketing_coordinater,
			event_sponsor_companies: text.event_sponsor_companies,
            event_media_agencies: text.event_media_agencies,
            event_transporation_agencies: text.event_transporation_agencies,
			event_travel_agencies: text.event_travel_agencies,
			event_benificieries: text.event_benificieries,
            event_artists: text.event_artists,
            event_celebrities: text.event_celebrities,
			event_agency_founder: text.event_agency_founder,
			event_agency_ceo: text.event_agency_ceo,
            event_agency_ceo_linkedin: text.event_agency_ceo_linkedin,
            event_agency_ceo_mobile: text.event_agency_ceo_mobile,
			event_business_model: text.event_business_model,
            event_agency_history: text.event_agency_history
    }

    alert("From State"+newManufacturer);
    console.log("From State"+newManufacturer);

    axios.put('http://localhost:5000/api/events/update/' + eventId, newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateEvents = events.map((event, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (event._id === eventId) {
            // Increment the clicked counter
            return newManufacturer;
          } else {
            // The rest haven't changed
            return event;
          }
        })
        console.log(updateEvents);
        setEvents(updateEvents);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleEvents = async (eventIds) => {

    let eventIdsr = { 'ids': eventIds };
    let eventsForRemove = JSON.stringify(eventIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/events/deletemultipleevents", {
          method: 'DELETE',
          body: eventsForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateEvents = events.filter((event) => !eventIds.includes(event._id));
            setEvents(updateEvents);
        }).catch(error => {
          console.error('Error while deleting Multiple Events', error);
        });
    }
  }

  return (
    <EventsContext.Provider value={{ setFormValues , formValues , events, setEvents, addEvents, deleteEvents, editEvents, deleteMultipleEvents, apiResponseMessages }}>
      {props.children}
    </EventsContext.Provider>

  )
}

export default EventsState;