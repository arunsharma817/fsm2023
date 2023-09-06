import React, { useEffect, useState } from "react";
import CompanysContext from "./CompanysContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const CompanysState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [companys, setCompanys] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);

  const initialValues = {
    "company_industry": "",
    "company_name": "",
    "company_services": "",
    "company_products": "",
    "company_cmm_level": "",
    "company_website": "",
    "company_hr_mail": "",
    "company_info_mail":"",
    "company_career_mail": "",
    "company_phone_number": "",
    "company_mobile_number": "",
    "company_wtsap_number": "",
    "company_linkedin_url": "",
    "company_facebook_url": "",
    "company_instgram_url": "",
    "company_twitter_url": "",
    "company_youtube_url": "",
    "company_start_date": "",
    "company_director_name": "",
    "company_director_email": "",
    "company_director_mobile": "",
"company_director_phone": "",
    "company_director_linkedin": "",
    "company_clients": "",
    "company_numberof_employees": "",
    "company_office_address": "",
    "company_branches_countries": "",
    "company_branches_cities": "",
    "company_technologies": "",
    "company_investors": "",
    "company_share_price": "",
    "company_google_ranking": "",
    "company_google_reviews": "",
    "company_scope": "",
    "company_future_projects": "",
    "company_third_parties": "",
    "company_founder": "",
    "company_ceo": "",
    "company_ceo_linkedin": "",
    "company_ceo_mobile": "",
    "company_business_model": "",
    "company_history": ""
 };
   const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchCompanys = async () => {
      const getCompanys = await axios.get(`http://localhost:5000/api/companys/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getCompanys.data);
      return setCompanys(getCompanys.data);
    }
    fetchCompanys();
  }, []);

  // Add Client State 

  const addCompanys = (text) => {
     const newManufacturer = {     
      company_industry: text.company_industry,
            company_name: text.company_name,
            company_services: text.company_services,
			company_products: text.company_products,
            company_cmm_level: text.company_cmm_level,
            company_website: text.company_website,
            company_hr_mail: text.company_hr_mail,
			company_info_mail: text.company_info_mail,
            company_career_mail: text.company_career_mail,
			company_phone_number: text.company_phone_number,
            company_mobile_number: text.company_mobile_number,
            company_wtsap_number: text.company_wtsap_number,	
			company_linkedin_url: text.company_linkedin_url,
			company_facebook_url: text.company_facebook_url,
            company_instgram_url: text.company_instgram_url,
            company_twitter_url: text.company_twitter_url,
			company_youtube_url: text.company_youtube_url,
			company_start_date: text.company_start_date,
            company_director_name: text.company_director_name,
            company_director_email: text.company_director_email,
			company_director_mobile: text.company_director_mobile,
			company_director_phone: text.company_director_phone,
            company_director_linkedin: text.company_director_linkedin,
            company_clients: text.company_clients,	
			company_numberof_employees: text.company_numberof_employees,
			company_office_address: text.company_office_address,
            company_branches_countries: text.company_branches_countries,
            company_branches_cities: text.company_branches_cities,
			company_technologies: text.company_technologies,
			company_investors: text.company_investors,
            company_share_price: text.company_share_price,
            company_google_ranking: text.company_google_ranking,
			company_google_reviews: text.company_google_reviews,
			company_scope: text.company_scope,
            company_future_projects: text.company_future_projects,
            company_third_parties: text.company_third_parties,
			company_founder: text.company_founder,
			company_ceo: text.company_ceo,
            company_ceo_linkedin: text.company_ceo_linkedin,
            company_ceo_mobile: text.company_ceo_mobile,
			company_business_model: text.company_business_model,
            company_history: text.company_history
    }
    axios.post('http://localhost:5000/api/companys/create', newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newManufacturers = {
        _id: resp.data._id,
        company_industry: text.company_industry,
            company_name: text.company_name,
            company_services: text.company_services,
			      company_products: text.company_products,
            company_cmm_level: text.company_cmm_level,
            company_website: text.company_website,
            company_hr_mail: text.company_hr_mail,
			company_info_mail: text.company_info_mail,
            company_career_mail: text.company_career_mail,
			company_phone_number: text.company_phone_number,
            company_mobile_number: text.company_mobile_number,
            company_wtsap_number: text.company_wtsap_number,	
			company_linkedin_url: text.company_linkedin_url,
			company_facebook_url: text.company_facebook_url,
            company_instgram_url: text.company_instgram_url,
            company_twitter_url: text.company_twitter_url,
			company_youtube_url: text.company_youtube_url,
			company_start_date: text.company_start_date,
            company_director_name: text.company_director_name,
            company_director_email: text.company_director_email,
			company_director_mobile: text.company_director_mobile,
			company_director_phone: text.company_director_phone,
            company_director_linkedin: text.company_director_linkedin,
            company_clients: text.company_clients,	
			company_numberof_employees: text.company_numberof_employees,
			company_office_address: text.company_office_address,
            company_branches_countries: text.company_branches_countries,
            company_branches_cities: text.company_branches_cities,
			company_technologies: text.company_technologies,
			company_investors: text.company_investors,
            company_share_price: text.company_share_price,
            company_google_ranking: text.company_google_ranking,
			company_google_reviews: text.company_google_reviews,
			company_scope: text.company_scope,
            company_future_projects: text.company_future_projects,
            company_third_parties: text.company_third_parties,
			company_founder: text.company_founder,
			company_ceo: text.company_ceo,
            company_ceo_linkedin: text.company_ceo_linkedin,
            company_ceo_mobile: text.company_ceo_mobile,
			company_business_model: text.company_business_model,
            company_history: text.company_history       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setCompanys((oldCompanys) => {
        return [...oldCompanys, newManufacturers];
      })      
      ///return { message : text.company_fname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong> <pre>{JSON.stringify(newManufacturers, null, 2)}</pre>Success! {text.company_industry} </strong> The New Manufacturer has been successfully Added!!
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

  const deleteCompanys = (getManufacturerId) => {
    const companyId = getManufacturerId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/companys/delete/" + companyId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + companyId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setCompanys" from my end to add immediate when successfully added into the database */ }
        setCompanys((companys) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return companys.filter((res) => res._id !== companyId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editCompanys = (text, companyId) => {

    console.log("I am in edit Text"+text.company_fname);
    console.log("I am in edit client Id"+companyId);
    console.log("I am checking ownerToken"+ownerToken);

    const newManufacturer = {
      _id: companyId,
      company_industry: text.company_industry,
            company_name: text.company_name,
            company_services: text.company_services,
			company_products: text.company_products,
            company_cmm_level: text.company_cmm_level,
            company_website: text.company_website,
            company_hr_mail: text.company_hr_mail,
			company_info_mail: text.company_info_mail,
            company_career_mail: text.company_career_mail,
			company_phone_number: text.company_phone_number,
            company_mobile_number: text.company_mobile_number,
            company_wtsap_number: text.company_wtsap_number,	
			company_linkedin_url: text.company_linkedin_url,
			company_facebook_url: text.company_facebook_url,
            company_instgram_url: text.company_instgram_url,
            company_twitter_url: text.company_twitter_url,
			company_youtube_url: text.company_youtube_url,
			company_start_date: text.company_start_date,
            company_director_name: text.company_director_name,
            company_director_email: text.company_director_email,
			company_director_mobile: text.company_director_mobile,
			company_director_phone: text.company_director_phone,
            company_director_linkedin: text.company_director_linkedin,
            company_clients: text.company_clients,	
			company_numberof_employees: text.company_numberof_employees,
			company_office_address: text.company_office_address,
            company_branches_countries: text.company_branches_countries,
            company_branches_cities: text.company_branches_cities,
			company_technologies: text.company_technologies,
			company_investors: text.company_investors,
            company_share_price: text.company_share_price,
            company_google_ranking: text.company_google_ranking,
			company_google_reviews: text.company_google_reviews,
			company_scope: text.company_scope,
            company_future_projects: text.company_future_projects,
            company_third_parties: text.company_third_parties,
			company_founder: text.company_founder,
			company_ceo: text.company_ceo,
            company_ceo_linkedin: text.company_ceo_linkedin,
            company_ceo_mobile: text.company_ceo_mobile,
			company_business_model: text.company_business_model,
            company_history: text.company_history
    }

    alert("From State"+newManufacturer);
    console.log("From State"+newManufacturer);

    axios.put('http://localhost:5000/api/companys/update/' + companyId, newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateCompanys = companys.map((company, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (company._id === companyId) {
            // Increment the clicked counter
            return newManufacturer;
          } else {
            // The rest haven't changed
            return company;
          }
        })
        console.log(updateCompanys);
        setCompanys(updateCompanys);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleCompanys = async (companyIds) => {

    let companyIdsr = { 'ids': companyIds };
    let companysForRemove = JSON.stringify(companyIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/companys/deletemultiplecompanys", {
          method: 'DELETE',
          body: companysForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateCompanys = companys.filter((company) => !companyIds.includes(company._id));
            setCompanys(updateCompanys);
        }).catch(error => {
          console.error('Error while deleting Multiple Companys', error);
        });
    }
  }

  return (
    <CompanysContext.Provider value={{ setFormValues , formValues , companys, setCompanys, addCompanys, deleteCompanys, editCompanys, deleteMultipleCompanys, apiResponseMessages }}>
      {props.children}
    </CompanysContext.Provider>

  )
}

export default CompanysState;