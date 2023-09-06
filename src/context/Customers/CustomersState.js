import React, { useEffect, useState } from "react";
import CustomersContext from "./CustomersContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const CustomersState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [customers, setCustomers] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);

  const initialValues = {
    "customer_company_name": "",
    "customer_industry": "",
    "customer_products": "",
    "customer_mobile": "",
    "customer_mobile_alternate": "",
    "customer_email": "",
    "customer_website": "",
    "customer_registered_address":"",
    "customer_zip_code": "",
    "customer_city": "",
    "customer_state": "",
    "customer_country": "",
    "customer_country_code": "",
    "customer_continent": "",
    "customer_customer_care": "",
    "customer_qr_code": "",
    "customer_barcode_number": "",
    "customer_foundation_date": "",
    "customer_license_number": "",
    "customer_pan_number": "",
    "customer_gst_number": "",
"customer_corporation_certificate": "",
    "customer_gumasta_certificate": "",
    "customer_moa_certificate": "",
    "customer_msme_certificate": "",
    "customer_account_details": "",
    "customer_cancelled_cheque": "",
    "customer_number_of_employees": "",
    "customer_director_fname": "",
    "customer_director_lname": "",
    "customer_director_email": "",
    "customer_director_mobile": "",
    "customer_director_linkedin": "",
    "customer_customer_reviews": "",
    "customer_customer_rating": "",
    "customer_facebook_url": "",
    "customer_instagram_url": "",
    "customer_linkedin_url": "",
    "customer_youtube_url": "",
    "customer_made_in_countries": "",
    "customer_attributes": "",
    "customer_brief_history": ""
 };
   const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchCustomers = async () => {
      const getCustomers = await axios.get(`http://localhost:5000/api/customers/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getCustomers.data);
      return setCustomers(getCustomers.data);
    }
    fetchCustomers();
  }, []);

  // Add Client State 

  const addCustomers = (text) => {
     const newManufacturer = {     
      customer_company_name: text.customer_company_name,
            customer_industry: text.customer_industry,
            customer_products: text.customer_products,
			customer_mobile: text.customer_mobile,
            customer_mobile_alternate: text.customer_mobile_alternate,
            customer_email: text.customer_email,
            customer_website: text.customer_website,
			customer_registered_address: text.customer_registered_address,
            customer_zip_code: text.customer_zip_code,
			customer_city: text.customer_city,
            customer_state: text.customer_state,
            customer_country: text.customer_country,	
			customer_country_code: text.customer_country_code,
			customer_continent: text.customer_continent,
            customer_customer_care: text.customer_customer_care,
            customer_qr_code: text.customer_qr_code,
			customer_barcode_number: text.customer_barcode_number,
			customer_foundation_date: text.customer_foundation_date,
            customer_license_number: text.customer_license_number,
            customer_pan_number: text.customer_pan_number,
			customer_gst_number: text.customer_gst_number,
			customer_corporation_certificate: text.customer_corporation_certificate,
            customer_gumasta_certificate: text.customer_gumasta_certificate,
            customer_moa_certificate: text.customer_moa_certificate,	
			customer_msme_certificate: text.customer_msme_certificate,
			customer_account_details: text.customer_account_details,
            customer_cancelled_cheque: text.customer_cancelled_cheque,
            customer_number_of_employees: text.customer_number_of_employees,
			customer_director_fname: text.customer_director_fname,
			customer_director_lname: text.customer_director_lname,
            customer_director_email: text.customer_director_email,
            customer_director_mobile: text.customer_director_mobile,
			customer_director_linkedin: text.customer_director_linkedin,
			customer_customer_reviews: text.customer_customer_reviews,
            customer_customer_rating: text.customer_customer_rating,
            customer_facebook_url: text.customer_facebook_url,
			customer_instagram_url: text.customer_instagram_url,
			customer_linkedin_url: text.customer_linkedin_url,
            customer_youtube_url: text.customer_youtube_url,
            customer_made_in_countries: text.customer_made_in_countries,
			customer_attributes: text.customer_attributes,
            customer_brief_history: text.customer_brief_history
    }
    axios.post('http://localhost:5000/api/customers/create', newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newManufacturers = {
        _id: resp.data._id,
        customer_company_name: text.customer_company_name,
            customer_industry: text.customer_industry,
            customer_products: text.customer_products,
			      customer_mobile: text.customer_mobile,
            customer_mobile_alternate: text.customer_mobile_alternate,
            customer_email: text.customer_email,
            customer_website: text.customer_website,
			customer_registered_address: text.customer_registered_address,
            customer_zip_code: text.customer_zip_code,
			customer_city: text.customer_city,
            customer_state: text.customer_state,
            customer_country: text.customer_country,	
			customer_country_code: text.customer_country_code,
			customer_continent: text.customer_continent,
            customer_customer_care: text.customer_customer_care,
            customer_qr_code: text.customer_qr_code,
			customer_barcode_number: text.customer_barcode_number,
			customer_foundation_date: text.customer_foundation_date,
            customer_license_number: text.customer_license_number,
            customer_pan_number: text.customer_pan_number,
			customer_gst_number: text.customer_gst_number,
			customer_corporation_certificate: text.customer_corporation_certificate,
            customer_gumasta_certificate: text.customer_gumasta_certificate,
            customer_moa_certificate: text.customer_moa_certificate,	
			customer_msme_certificate: text.customer_msme_certificate,
			customer_account_details: text.customer_account_details,
            customer_cancelled_cheque: text.customer_cancelled_cheque,
            customer_number_of_employees: text.customer_number_of_employees,
			customer_director_fname: text.customer_director_fname,
			customer_director_lname: text.customer_director_lname,
            customer_director_email: text.customer_director_email,
            customer_director_mobile: text.customer_director_mobile,
			customer_director_linkedin: text.customer_director_linkedin,
			customer_customer_reviews: text.customer_customer_reviews,
            customer_customer_rating: text.customer_customer_rating,
            customer_facebook_url: text.customer_facebook_url,
			customer_instagram_url: text.customer_instagram_url,
			customer_linkedin_url: text.customer_linkedin_url,
            customer_youtube_url: text.customer_youtube_url,
            customer_made_in_countries: text.customer_made_in_countries,
			customer_attributes: text.customer_attributes,
            customer_brief_history: text.customer_brief_history       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setCustomers((oldCustomers) => {
        return [...oldCustomers, newManufacturers];
      })      
      ///return { message : text.customer_fname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong> <pre>{JSON.stringify(newManufacturers, null, 2)}</pre>Success! {text.customer_company_name} </strong> The New Manufacturer has been successfully Added!!
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

  const deleteCustomers = (getManufacturerId) => {
    const customerId = getManufacturerId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/customers/delete/" + customerId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + customerId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setCustomers" from my end to add immediate when successfully added into the database */ }
        setCustomers((customers) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return customers.filter((res) => res._id !== customerId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editCustomers = (text, customerId) => {

    console.log("I am in edit Text"+text.customer_fname);
    console.log("I am in edit client Id"+customerId);
    console.log("I am checking ownerToken"+ownerToken);

    const newManufacturer = {
      _id: customerId,
      customer_company_name: text.customer_company_name,
            customer_industry: text.customer_industry,
            customer_products: text.customer_products,
			customer_mobile: text.customer_mobile,
            customer_mobile_alternate: text.customer_mobile_alternate,
            customer_email: text.customer_email,
            customer_website: text.customer_website,
			customer_registered_address: text.customer_registered_address,
            customer_zip_code: text.customer_zip_code,
			customer_city: text.customer_city,
            customer_state: text.customer_state,
            customer_country: text.customer_country,	
			customer_country_code: text.customer_country_code,
			customer_continent: text.customer_continent,
            customer_customer_care: text.customer_customer_care,
            customer_qr_code: text.customer_qr_code,
			customer_barcode_number: text.customer_barcode_number,
			customer_foundation_date: text.customer_foundation_date,
            customer_license_number: text.customer_license_number,
            customer_pan_number: text.customer_pan_number,
			customer_gst_number: text.customer_gst_number,
			customer_corporation_certificate: text.customer_corporation_certificate,
            customer_gumasta_certificate: text.customer_gumasta_certificate,
            customer_moa_certificate: text.customer_moa_certificate,	
			customer_msme_certificate: text.customer_msme_certificate,
			customer_account_details: text.customer_account_details,
            customer_cancelled_cheque: text.customer_cancelled_cheque,
            customer_number_of_employees: text.customer_number_of_employees,
			customer_director_fname: text.customer_director_fname,
			customer_director_lname: text.customer_director_lname,
            customer_director_email: text.customer_director_email,
            customer_director_mobile: text.customer_director_mobile,
			customer_director_linkedin: text.customer_director_linkedin,
			customer_customer_reviews: text.customer_customer_reviews,
            customer_customer_rating: text.customer_customer_rating,
            customer_facebook_url: text.customer_facebook_url,
			customer_instagram_url: text.customer_instagram_url,
			customer_linkedin_url: text.customer_linkedin_url,
            customer_youtube_url: text.customer_youtube_url,
            customer_made_in_countries: text.customer_made_in_countries,
			customer_attributes: text.customer_attributes,
            customer_brief_history: text.customer_brief_history
    }

    alert("From State"+newManufacturer);
    console.log("From State"+newManufacturer);

    axios.put('http://localhost:5000/api/customers/update/' + customerId, newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateCustomers = customers.map((customer, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (customer._id === customerId) {
            // Increment the clicked counter
            return newManufacturer;
          } else {
            // The rest haven't changed
            return customer;
          }
        })
        console.log(updateCustomers);
        setCustomers(updateCustomers);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleCustomers = async (customerIds) => {

    let customerIdsr = { 'ids': customerIds };
    let customersForRemove = JSON.stringify(customerIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/customers/deletemultiplecustomers", {
          method: 'DELETE',
          body: customersForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateCustomers = customers.filter((customer) => !customerIds.includes(customer._id));
            setCustomers(updateCustomers);
        }).catch(error => {
          console.error('Error while deleting Multiple Customers', error);
        });
    }
  }

  return (
    <CustomersContext.Provider value={{ setFormValues , formValues , customers, setCustomers, addCustomers, deleteCustomers, editCustomers, deleteMultipleCustomers, apiResponseMessages }}>
      {props.children}
    </CustomersContext.Provider>

  )
}

export default CustomersState;