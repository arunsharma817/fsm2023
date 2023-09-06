import React, { useEffect, useState } from "react";
import ManufacturersContext from "./ManufacturersContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const ManufacturersState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [manufacturers, setManufacturers] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);

  const initialValues = {
    "manufacturer_company_name": "",
    "manufacturer_industry": "",
    "manufacturer_products": "",
    "manufacturer_mobile": "",
    "manufacturer_mobile_alternate": "",
    "manufacturer_email": "",
    "manufacturer_website": "",
    "manufacturer_registered_address":"",
    "manufacturer_zip_code": "",
    "manufacturer_city": "",
    "manufacturer_state": "",
    "manufacturer_country": "",
    "manufacturer_country_code": "",
    "manufacturer_continent": "",
    "manufacturer_manufacturer_care": "",
    "manufacturer_qr_code": "",
    "manufacturer_barcode_number": "",
    "manufacturer_foundation_date": "",
    "manufacturer_license_number": "",
    "manufacturer_pan_number": "",
    "manufacturer_gst_number": "",
"manufacturer_corporation_certificate": "",
    "manufacturer_gumasta_certificate": "",
    "manufacturer_moa_certificate": "",
    "manufacturer_msme_certificate": "",
    "manufacturer_account_details": "",
    "manufacturer_cancelled_cheque": "",
    "manufacturer_number_of_employees": "",
    "manufacturer_director_fname": "",
    "manufacturer_director_lname": "",
    "manufacturer_director_email": "",
    "manufacturer_director_mobile": "",
    "manufacturer_director_linkedin": "",
    "manufacturer_manufacturer_reviews": "",
    "manufacturer_manufacturer_rating": "",
    "manufacturer_facebook_url": "",
    "manufacturer_instagram_url": "",
    "manufacturer_linkedin_url": "",
    "manufacturer_youtube_url": "",
    "manufacturer_made_in_countries": "",
    "manufacturer_attributes": "",
    "manufacturer_brief_history": ""
 };
   const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchManufacturers = async () => {
      const getManufacturers = await axios.get(`http://localhost:5000/api/manufacturers/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getManufacturers.data);
      return setManufacturers(getManufacturers.data);
    }
    fetchManufacturers();
  }, []);

  // Add Client State 

  const addManufacturers = (text) => {
     const newManufacturer = {     
      manufacturer_company_name: text.manufacturer_company_name,
            manufacturer_industry: text.manufacturer_industry,
            manufacturer_products: text.manufacturer_products,
			manufacturer_mobile: text.manufacturer_mobile,
            manufacturer_mobile_alternate: text.manufacturer_mobile_alternate,
            manufacturer_email: text.manufacturer_email,
            manufacturer_website: text.manufacturer_website,
			manufacturer_registered_address: text.manufacturer_registered_address,
            manufacturer_zip_code: text.manufacturer_zip_code,
			manufacturer_city: text.manufacturer_city,
            manufacturer_state: text.manufacturer_state,
            manufacturer_country: text.manufacturer_country,	
			manufacturer_country_code: text.manufacturer_country_code,
			manufacturer_continent: text.manufacturer_continent,
            manufacturer_manufacturer_care: text.manufacturer_manufacturer_care,
            manufacturer_qr_code: text.manufacturer_qr_code,
			manufacturer_barcode_number: text.manufacturer_barcode_number,
			manufacturer_foundation_date: text.manufacturer_foundation_date,
            manufacturer_license_number: text.manufacturer_license_number,
            manufacturer_pan_number: text.manufacturer_pan_number,
			manufacturer_gst_number: text.manufacturer_gst_number,
			manufacturer_corporation_certificate: text.manufacturer_corporation_certificate,
            manufacturer_gumasta_certificate: text.manufacturer_gumasta_certificate,
            manufacturer_moa_certificate: text.manufacturer_moa_certificate,	
			manufacturer_msme_certificate: text.manufacturer_msme_certificate,
			manufacturer_account_details: text.manufacturer_account_details,
            manufacturer_cancelled_cheque: text.manufacturer_cancelled_cheque,
            manufacturer_number_of_employees: text.manufacturer_number_of_employees,
			manufacturer_director_fname: text.manufacturer_director_fname,
			manufacturer_director_lname: text.manufacturer_director_lname,
            manufacturer_director_email: text.manufacturer_director_email,
            manufacturer_director_mobile: text.manufacturer_director_mobile,
			manufacturer_director_linkedin: text.manufacturer_director_linkedin,
			manufacturer_manufacturer_reviews: text.manufacturer_manufacturer_reviews,
            manufacturer_manufacturer_rating: text.manufacturer_manufacturer_rating,
            manufacturer_facebook_url: text.manufacturer_facebook_url,
			manufacturer_instagram_url: text.manufacturer_instagram_url,
			manufacturer_linkedin_url: text.manufacturer_linkedin_url,
            manufacturer_youtube_url: text.manufacturer_youtube_url,
            manufacturer_made_in_countries: text.manufacturer_made_in_countries,
			manufacturer_attributes: text.manufacturer_attributes,
            manufacturer_brief_history: text.manufacturer_brief_history
    }
    axios.post('http://localhost:5000/api/manufacturers/create', newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newManufacturers = {
        _id: resp.data._id,
        manufacturer_company_name: text.manufacturer_company_name,
            manufacturer_industry: text.manufacturer_industry,
            manufacturer_products: text.manufacturer_products,
			      manufacturer_mobile: text.manufacturer_mobile,
            manufacturer_mobile_alternate: text.manufacturer_mobile_alternate,
            manufacturer_email: text.manufacturer_email,
            manufacturer_website: text.manufacturer_website,
			manufacturer_registered_address: text.manufacturer_registered_address,
            manufacturer_zip_code: text.manufacturer_zip_code,
			manufacturer_city: text.manufacturer_city,
            manufacturer_state: text.manufacturer_state,
            manufacturer_country: text.manufacturer_country,	
			manufacturer_country_code: text.manufacturer_country_code,
			manufacturer_continent: text.manufacturer_continent,
            manufacturer_manufacturer_care: text.manufacturer_manufacturer_care,
            manufacturer_qr_code: text.manufacturer_qr_code,
			manufacturer_barcode_number: text.manufacturer_barcode_number,
			manufacturer_foundation_date: text.manufacturer_foundation_date,
            manufacturer_license_number: text.manufacturer_license_number,
            manufacturer_pan_number: text.manufacturer_pan_number,
			manufacturer_gst_number: text.manufacturer_gst_number,
			manufacturer_corporation_certificate: text.manufacturer_corporation_certificate,
            manufacturer_gumasta_certificate: text.manufacturer_gumasta_certificate,
            manufacturer_moa_certificate: text.manufacturer_moa_certificate,	
			manufacturer_msme_certificate: text.manufacturer_msme_certificate,
			manufacturer_account_details: text.manufacturer_account_details,
            manufacturer_cancelled_cheque: text.manufacturer_cancelled_cheque,
            manufacturer_number_of_employees: text.manufacturer_number_of_employees,
			manufacturer_director_fname: text.manufacturer_director_fname,
			manufacturer_director_lname: text.manufacturer_director_lname,
            manufacturer_director_email: text.manufacturer_director_email,
            manufacturer_director_mobile: text.manufacturer_director_mobile,
			manufacturer_director_linkedin: text.manufacturer_director_linkedin,
			manufacturer_manufacturer_reviews: text.manufacturer_manufacturer_reviews,
            manufacturer_manufacturer_rating: text.manufacturer_manufacturer_rating,
            manufacturer_facebook_url: text.manufacturer_facebook_url,
			manufacturer_instagram_url: text.manufacturer_instagram_url,
			manufacturer_linkedin_url: text.manufacturer_linkedin_url,
            manufacturer_youtube_url: text.manufacturer_youtube_url,
            manufacturer_made_in_countries: text.manufacturer_made_in_countries,
			manufacturer_attributes: text.manufacturer_attributes,
            manufacturer_brief_history: text.manufacturer_brief_history       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setManufacturers((oldManufacturers) => {
        return [...oldManufacturers, newManufacturers];
      })      
      ///return { message : text.manufacturer_fname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong> <pre>{JSON.stringify(newManufacturers, null, 2)}</pre>Success! {text.manufacturer_company_name} </strong> The New Manufacturer has been successfully Added!!
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

  const deleteManufacturers = (getManufacturerId) => {
    const manufacturerId = getManufacturerId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/manufacturers/delete/" + manufacturerId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + manufacturerId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setManufacturers" from my end to add immediate when successfully added into the database */ }
        setManufacturers((manufacturers) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return manufacturers.filter((res) => res._id !== manufacturerId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editManufacturers = (text, manufacturerId) => {

    console.log("I am in edit Text"+text.manufacturer_fname);
    console.log("I am in edit client Id"+manufacturerId);
    console.log("I am checking ownerToken"+ownerToken);

    const newManufacturer = {
      _id: manufacturerId,
      manufacturer_company_name: text.manufacturer_company_name,
            manufacturer_industry: text.manufacturer_industry,
            manufacturer_products: text.manufacturer_products,
			manufacturer_mobile: text.manufacturer_mobile,
            manufacturer_mobile_alternate: text.manufacturer_mobile_alternate,
            manufacturer_email: text.manufacturer_email,
            manufacturer_website: text.manufacturer_website,
			manufacturer_registered_address: text.manufacturer_registered_address,
            manufacturer_zip_code: text.manufacturer_zip_code,
			manufacturer_city: text.manufacturer_city,
            manufacturer_state: text.manufacturer_state,
            manufacturer_country: text.manufacturer_country,	
			manufacturer_country_code: text.manufacturer_country_code,
			manufacturer_continent: text.manufacturer_continent,
            manufacturer_manufacturer_care: text.manufacturer_manufacturer_care,
            manufacturer_qr_code: text.manufacturer_qr_code,
			manufacturer_barcode_number: text.manufacturer_barcode_number,
			manufacturer_foundation_date: text.manufacturer_foundation_date,
            manufacturer_license_number: text.manufacturer_license_number,
            manufacturer_pan_number: text.manufacturer_pan_number,
			manufacturer_gst_number: text.manufacturer_gst_number,
			manufacturer_corporation_certificate: text.manufacturer_corporation_certificate,
            manufacturer_gumasta_certificate: text.manufacturer_gumasta_certificate,
            manufacturer_moa_certificate: text.manufacturer_moa_certificate,	
			manufacturer_msme_certificate: text.manufacturer_msme_certificate,
			manufacturer_account_details: text.manufacturer_account_details,
            manufacturer_cancelled_cheque: text.manufacturer_cancelled_cheque,
            manufacturer_number_of_employees: text.manufacturer_number_of_employees,
			manufacturer_director_fname: text.manufacturer_director_fname,
			manufacturer_director_lname: text.manufacturer_director_lname,
            manufacturer_director_email: text.manufacturer_director_email,
            manufacturer_director_mobile: text.manufacturer_director_mobile,
			manufacturer_director_linkedin: text.manufacturer_director_linkedin,
			manufacturer_manufacturer_reviews: text.manufacturer_manufacturer_reviews,
            manufacturer_manufacturer_rating: text.manufacturer_manufacturer_rating,
            manufacturer_facebook_url: text.manufacturer_facebook_url,
			manufacturer_instagram_url: text.manufacturer_instagram_url,
			manufacturer_linkedin_url: text.manufacturer_linkedin_url,
            manufacturer_youtube_url: text.manufacturer_youtube_url,
            manufacturer_made_in_countries: text.manufacturer_made_in_countries,
			manufacturer_attributes: text.manufacturer_attributes,
            manufacturer_brief_history: text.manufacturer_brief_history
    }

    alert("From State"+newManufacturer);
    console.log("From State"+newManufacturer);

    axios.put('http://localhost:5000/api/manufacturers/update/' + manufacturerId, newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateManufacturers = manufacturers.map((manufacturer, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (manufacturer._id === manufacturerId) {
            // Increment the clicked counter
            return newManufacturer;
          } else {
            // The rest haven't changed
            return manufacturer;
          }
        })
        console.log(updateManufacturers);
        setManufacturers(updateManufacturers);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleManufacturers = async (manufacturerIds) => {

    let manufacturerIdsr = { 'ids': manufacturerIds };
    let manufacturersForRemove = JSON.stringify(manufacturerIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/manufacturers/deletemultiplemanufacturers", {
          method: 'DELETE',
          body: manufacturersForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateManufacturers = manufacturers.filter((manufacturer) => !manufacturerIds.includes(manufacturer._id));
            setManufacturers(updateManufacturers);
        }).catch(error => {
          console.error('Error while deleting Multiple Manufacturers', error);
        });
    }
  }

  return (
    <ManufacturersContext.Provider value={{ setFormValues , formValues , manufacturers, setManufacturers, addManufacturers, deleteManufacturers, editManufacturers, deleteMultipleManufacturers, apiResponseMessages }}>
      {props.children}
    </ManufacturersContext.Provider>

  )
}

export default ManufacturersState;