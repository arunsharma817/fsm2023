import React, { useEffect, useState } from "react";
import ContractorsContext from "./ContractorsContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const ContractorsState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [contractors, setContractors] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);

  const initialValues = {
    "contractor_industry": "",
    "contractor_fname": "",
    "contractor_lname": "",
    "contractor_products": "",
    "contractor_experience": "",
    "contractor_website": "",
    "contractor_hr_mail": "",
    "contractor_info_mail":"",
    "contractor_career_mail": "",
    "contractor_phone_number": "",
    "contractor_mobile_number": "",
    "contractor_wtsap_number": "",
    "contractor_linkedin_url": "",
    "contractor_facebook_url": "",
    "contractor_instgram_url": "",
    "contractor_twitter_url": "",
    "contractor_youtube_url": "",
    "contractor_start_date": "",
    "contractor_mentor_name": "",
    "contractor_mentor_email": "",
    "contractor_mentor_mobile": "",
"contractor_mentor_phone": "",
    "contractor_mentor_linkedin": "",
    "contractor_clients": "",
    "contractor_team_size": "",
    "contractor_office_address": "",
    "contractor_branches_countries": "",
    "contractor_branches_cities": "",
    "contractor_technologies": "",
    "contractor_investors": "",
    "contractor_share_price": "",
    "contractor_google_ranking": "",
    "contractor_google_reviews": "",
    "contractor_scope": "",
    "contractor_future_projects": "",
    "contractor_third_parties": "",
    "contractor_founder": "",
    "contractor_ceo": "",
    "contractor_ceo_linkedin": "",
    "contractor_ceo_mobile": "",
    "contractor_business_model": "",
    "contractor_history": ""
 };
   const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchContractors = async () => {
      const getContractors = await axios.get(`http://localhost:5000/api/contractors/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getContractors.data);
      return setContractors(getContractors.data);
    }
    fetchContractors();
  }, []);

  // Add Client State 

  const addContractors = (text) => {
     const newManufacturer = {     
      contractor_industry: text.contractor_industry,
            contractor_fname: text.contractor_fname,
            contractor_lname: text.contractor_lname,
			contractor_products: text.contractor_products,
            contractor_experience: text.contractor_experience,
            contractor_website: text.contractor_website,
            contractor_hr_mail: text.contractor_hr_mail,
			contractor_info_mail: text.contractor_info_mail,
            contractor_career_mail: text.contractor_career_mail,
			contractor_phone_number: text.contractor_phone_number,
            contractor_mobile_number: text.contractor_mobile_number,
            contractor_wtsap_number: text.contractor_wtsap_number,	
			contractor_linkedin_url: text.contractor_linkedin_url,
			contractor_facebook_url: text.contractor_facebook_url,
            contractor_instgram_url: text.contractor_instgram_url,
            contractor_twitter_url: text.contractor_twitter_url,
			contractor_youtube_url: text.contractor_youtube_url,
			contractor_start_date: text.contractor_start_date,
            contractor_mentor_name: text.contractor_mentor_name,
            contractor_mentor_email: text.contractor_mentor_email,
			contractor_mentor_mobile: text.contractor_mentor_mobile,
			contractor_mentor_phone: text.contractor_mentor_phone,
            contractor_mentor_linkedin: text.contractor_mentor_linkedin,
            contractor_clients: text.contractor_clients,	
			contractor_team_size: text.contractor_team_size,
			contractor_office_address: text.contractor_office_address,
            contractor_branches_countries: text.contractor_branches_countries,
            contractor_branches_cities: text.contractor_branches_cities,
			contractor_technologies: text.contractor_technologies,
			contractor_investors: text.contractor_investors,
            contractor_share_price: text.contractor_share_price,
            contractor_google_ranking: text.contractor_google_ranking,
			contractor_google_reviews: text.contractor_google_reviews,
			contractor_scope: text.contractor_scope,
            contractor_future_projects: text.contractor_future_projects,
            contractor_third_parties: text.contractor_third_parties,
			contractor_founder: text.contractor_founder,
			contractor_ceo: text.contractor_ceo,
            contractor_ceo_linkedin: text.contractor_ceo_linkedin,
            contractor_ceo_mobile: text.contractor_ceo_mobile,
			contractor_business_model: text.contractor_business_model,
            contractor_history: text.contractor_history
    }
    axios.post('http://localhost:5000/api/contractors/create', newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newManufacturers = {
        _id: resp.data._id,
        contractor_industry: text.contractor_industry,
            contractor_fname: text.contractor_fname,
            contractor_lname: text.contractor_lname,
			      contractor_products: text.contractor_products,
            contractor_experience: text.contractor_experience,
            contractor_website: text.contractor_website,
            contractor_hr_mail: text.contractor_hr_mail,
			contractor_info_mail: text.contractor_info_mail,
            contractor_career_mail: text.contractor_career_mail,
			contractor_phone_number: text.contractor_phone_number,
            contractor_mobile_number: text.contractor_mobile_number,
            contractor_wtsap_number: text.contractor_wtsap_number,	
			contractor_linkedin_url: text.contractor_linkedin_url,
			contractor_facebook_url: text.contractor_facebook_url,
            contractor_instgram_url: text.contractor_instgram_url,
            contractor_twitter_url: text.contractor_twitter_url,
			contractor_youtube_url: text.contractor_youtube_url,
			contractor_start_date: text.contractor_start_date,
            contractor_mentor_name: text.contractor_mentor_name,
            contractor_mentor_email: text.contractor_mentor_email,
			contractor_mentor_mobile: text.contractor_mentor_mobile,
			contractor_mentor_phone: text.contractor_mentor_phone,
            contractor_mentor_linkedin: text.contractor_mentor_linkedin,
            contractor_clients: text.contractor_clients,	
			contractor_team_size: text.contractor_team_size,
			contractor_office_address: text.contractor_office_address,
            contractor_branches_countries: text.contractor_branches_countries,
            contractor_branches_cities: text.contractor_branches_cities,
			contractor_technologies: text.contractor_technologies,
			contractor_investors: text.contractor_investors,
            contractor_share_price: text.contractor_share_price,
            contractor_google_ranking: text.contractor_google_ranking,
			contractor_google_reviews: text.contractor_google_reviews,
			contractor_scope: text.contractor_scope,
            contractor_future_projects: text.contractor_future_projects,
            contractor_third_parties: text.contractor_third_parties,
			contractor_founder: text.contractor_founder,
			contractor_ceo: text.contractor_ceo,
            contractor_ceo_linkedin: text.contractor_ceo_linkedin,
            contractor_ceo_mobile: text.contractor_ceo_mobile,
			contractor_business_model: text.contractor_business_model,
            contractor_history: text.contractor_history       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setContractors((oldContractors) => {
        return [...oldContractors, newManufacturers];
      })      
      ///return { message : text.contractor_fname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong> <pre>{JSON.stringify(newManufacturers, null, 2)}</pre>Success! {text.contractor_industry} </strong> The New Manufacturer has been successfully Added!!
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

  const deleteContractors = (getManufacturerId) => {
    const contractorId = getManufacturerId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/contractors/delete/" + contractorId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + contractorId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setContractors" from my end to add immediate when successfully added into the database */ }
        setContractors((contractors) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return contractors.filter((res) => res._id !== contractorId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editContractors = (text, contractorId) => {

    console.log("I am in edit Text"+text.contractor_fname);
    console.log("I am in edit client Id"+contractorId);
    console.log("I am checking ownerToken"+ownerToken);

    const newManufacturer = {
      _id: contractorId,
      contractor_industry: text.contractor_industry,
            contractor_fname: text.contractor_fname,
            contractor_lname: text.contractor_lname,
			contractor_products: text.contractor_products,
            contractor_experience: text.contractor_experience,
            contractor_website: text.contractor_website,
            contractor_hr_mail: text.contractor_hr_mail,
			contractor_info_mail: text.contractor_info_mail,
            contractor_career_mail: text.contractor_career_mail,
			contractor_phone_number: text.contractor_phone_number,
            contractor_mobile_number: text.contractor_mobile_number,
            contractor_wtsap_number: text.contractor_wtsap_number,	
			contractor_linkedin_url: text.contractor_linkedin_url,
			contractor_facebook_url: text.contractor_facebook_url,
            contractor_instgram_url: text.contractor_instgram_url,
            contractor_twitter_url: text.contractor_twitter_url,
			contractor_youtube_url: text.contractor_youtube_url,
			contractor_start_date: text.contractor_start_date,
            contractor_mentor_name: text.contractor_mentor_name,
            contractor_mentor_email: text.contractor_mentor_email,
			contractor_mentor_mobile: text.contractor_mentor_mobile,
			contractor_mentor_phone: text.contractor_mentor_phone,
            contractor_mentor_linkedin: text.contractor_mentor_linkedin,
            contractor_clients: text.contractor_clients,	
			contractor_team_size: text.contractor_team_size,
			contractor_office_address: text.contractor_office_address,
            contractor_branches_countries: text.contractor_branches_countries,
            contractor_branches_cities: text.contractor_branches_cities,
			contractor_technologies: text.contractor_technologies,
			contractor_investors: text.contractor_investors,
            contractor_share_price: text.contractor_share_price,
            contractor_google_ranking: text.contractor_google_ranking,
			contractor_google_reviews: text.contractor_google_reviews,
			contractor_scope: text.contractor_scope,
            contractor_future_projects: text.contractor_future_projects,
            contractor_third_parties: text.contractor_third_parties,
			contractor_founder: text.contractor_founder,
			contractor_ceo: text.contractor_ceo,
            contractor_ceo_linkedin: text.contractor_ceo_linkedin,
            contractor_ceo_mobile: text.contractor_ceo_mobile,
			contractor_business_model: text.contractor_business_model,
            contractor_history: text.contractor_history
    }

    alert("From State"+newManufacturer);
    console.log("From State"+newManufacturer);

    axios.put('http://localhost:5000/api/contractors/update/' + contractorId, newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateContractors = contractors.map((contractor, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (contractor._id === contractorId) {
            // Increment the clicked counter
            return newManufacturer;
          } else {
            // The rest haven't changed
            return contractor;
          }
        })
        console.log(updateContractors);
        setContractors(updateContractors);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleContractors = async (contractorIds) => {

    let contractorIdsr = { 'ids': contractorIds };
    let contractorsForRemove = JSON.stringify(contractorIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/contractors/deletemultiplecontractors", {
          method: 'DELETE',
          body: contractorsForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateContractors = contractors.filter((contractor) => !contractorIds.includes(contractor._id));
            setContractors(updateContractors);
        }).catch(error => {
          console.error('Error while deleting Multiple Contractors', error);
        });
    }
  }

  return (
    <ContractorsContext.Provider value={{ setFormValues , formValues , contractors, setContractors, addContractors, deleteContractors, editContractors, deleteMultipleContractors, apiResponseMessages }}>
      {props.children}
    </ContractorsContext.Provider>

  )
}

export default ContractorsState;