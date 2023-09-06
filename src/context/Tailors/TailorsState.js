import React, { useEffect, useState } from "react";
import TailorsContext from "./TailorsContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const TailorsState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [tailors, setTailors] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);

  const initialValues = {
    "tailor_name": "",
    "tailor_lname": "",
    "tailor_father_name": "",
    "tailor_mother_name": "",
    "tailor_age": "",
    "tailor_grade": "",
    "tailor_section": "",
    "tailor_official_email":"",
    "tailor_official_mobile": "",
    "tailor_personal_mobile": "",
    "tailor_blood_group": "",
    "tailor_dob": "",
    "tailor_address": "",
    "tailor_city": "",
    "tailor_state": "",
    "tailor_country": "",
    "tailor_continent": "",
    "tailor_experience": "",
    "tailor_rating": "",
    "tailor_reviews": "",
    "tailor_income": "",
"tailor_investment": "",
    "tailor_shop": "",
    "tailor_services": "",
    "tailor_male_female": "",
    "tailor_gst": "",
    "tailor_course": "",
    "tailor_branches": "",
    "tailor_material": "",
    "tailor_readymade": "",
    "tailor_contract": "",
    "tailor_fee": "",
    "tailor_mentor": "",
    "tailor_delivery": "",
    "tailor_overseas": "",
    "tailor_domestic": "",
    "tailor_expenses": "",
    "tailor_vehicle": "",
    "tailor_shop_time": "",
    "tailor_shop_days": "",
    "tailor_awards": "",
    "tailor_designing_skills": ""
 };
   const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchTailors = async () => {
      const getTailors = await axios.get(`http://localhost:5000/api/tailors/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getTailors.data);
      return setTailors(getTailors.data);
    }
    fetchTailors();
  }, []);

  // Add Client State 

  const addTailors = (text) => {
     const newManufacturer = {     
      tailor_name: text.tailor_name,
            tailor_lname: text.tailor_lname,
            tailor_father_name: text.tailor_father_name,
			tailor_mother_name: text.tailor_mother_name,
            tailor_age: text.tailor_age,
            tailor_grade: text.tailor_grade,
            tailor_section: text.tailor_section,
			tailor_official_email: text.tailor_official_email,
            tailor_official_mobile: text.tailor_official_mobile,
			tailor_personal_mobile: text.tailor_personal_mobile,
            tailor_blood_group: text.tailor_blood_group,
            tailor_dob: text.tailor_dob,	
			tailor_address: text.tailor_address,
			tailor_city: text.tailor_city,
            tailor_state: text.tailor_state,
            tailor_country: text.tailor_country,
			tailor_continent: text.tailor_continent,
			tailor_experience: text.tailor_experience,
            tailor_rating: text.tailor_rating,
            tailor_reviews: text.tailor_reviews,
			tailor_income: text.tailor_income,
			tailor_investment: text.tailor_investment,
            tailor_shop: text.tailor_shop,
            tailor_services: text.tailor_services,	
			tailor_male_female: text.tailor_male_female,
			tailor_gst: text.tailor_gst,
            tailor_course: text.tailor_course,
            tailor_branches: text.tailor_branches,
			tailor_material: text.tailor_material,
			tailor_readymade: text.tailor_readymade,
            tailor_contract: text.tailor_contract,
            tailor_fee: text.tailor_fee,
			tailor_mentor: text.tailor_mentor,
			tailor_delivery: text.tailor_delivery,
            tailor_overseas: text.tailor_overseas,
            tailor_domestic: text.tailor_domestic,
			tailor_expenses: text.tailor_expenses,
			tailor_vehicle: text.tailor_vehicle,
            tailor_shop_time: text.tailor_shop_time,
            tailor_shop_days: text.tailor_shop_days,
			tailor_awards: text.tailor_awards,
            tailor_designing_skills: text.tailor_designing_skills
    }
    axios.post('http://localhost:5000/api/tailors/create', newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newManufacturers = {
        _id: resp.data._id,
        tailor_name: text.tailor_name,
            tailor_lname: text.tailor_lname,
            tailor_father_name: text.tailor_father_name,
			      tailor_mother_name: text.tailor_mother_name,
            tailor_age: text.tailor_age,
            tailor_grade: text.tailor_grade,
            tailor_section: text.tailor_section,
			tailor_official_email: text.tailor_official_email,
            tailor_official_mobile: text.tailor_official_mobile,
			tailor_personal_mobile: text.tailor_personal_mobile,
            tailor_blood_group: text.tailor_blood_group,
            tailor_dob: text.tailor_dob,	
			tailor_address: text.tailor_address,
			tailor_city: text.tailor_city,
            tailor_state: text.tailor_state,
            tailor_country: text.tailor_country,
			tailor_continent: text.tailor_continent,
			tailor_experience: text.tailor_experience,
            tailor_rating: text.tailor_rating,
            tailor_reviews: text.tailor_reviews,
			tailor_income: text.tailor_income,
			tailor_investment: text.tailor_investment,
            tailor_shop: text.tailor_shop,
            tailor_services: text.tailor_services,	
			tailor_male_female: text.tailor_male_female,
			tailor_gst: text.tailor_gst,
            tailor_course: text.tailor_course,
            tailor_branches: text.tailor_branches,
			tailor_material: text.tailor_material,
			tailor_readymade: text.tailor_readymade,
            tailor_contract: text.tailor_contract,
            tailor_fee: text.tailor_fee,
			tailor_mentor: text.tailor_mentor,
			tailor_delivery: text.tailor_delivery,
            tailor_overseas: text.tailor_overseas,
            tailor_domestic: text.tailor_domestic,
			tailor_expenses: text.tailor_expenses,
			tailor_vehicle: text.tailor_vehicle,
            tailor_shop_time: text.tailor_shop_time,
            tailor_shop_days: text.tailor_shop_days,
			tailor_awards: text.tailor_awards,
            tailor_designing_skills: text.tailor_designing_skills       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setTailors((oldTailors) => {
        return [...oldTailors, newManufacturers];
      })      
      ///return { message : text.tailor_lname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong> <pre>{JSON.stringify(newManufacturers, null, 2)}</pre>Success! {text.tailor_name} </strong> The New Manufacturer has been successfully Added!!
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

  const deleteTailors = (getManufacturerId) => {
    const tailorId = getManufacturerId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/tailors/delete/" + tailorId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + tailorId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setTailors" from my end to add immediate when successfully added into the database */ }
        setTailors((tailors) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return tailors.filter((res) => res._id !== tailorId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editTailors = (text, tailorId) => {

    console.log("I am in edit Text"+text.tailor_lname);
    console.log("I am in edit client Id"+tailorId);
    console.log("I am checking ownerToken"+ownerToken);

    const newManufacturer = {
      _id: tailorId,
      tailor_name: text.tailor_name,
            tailor_lname: text.tailor_lname,
            tailor_father_name: text.tailor_father_name,
			tailor_mother_name: text.tailor_mother_name,
            tailor_age: text.tailor_age,
            tailor_grade: text.tailor_grade,
            tailor_section: text.tailor_section,
			tailor_official_email: text.tailor_official_email,
            tailor_official_mobile: text.tailor_official_mobile,
			tailor_personal_mobile: text.tailor_personal_mobile,
            tailor_blood_group: text.tailor_blood_group,
            tailor_dob: text.tailor_dob,	
			tailor_address: text.tailor_address,
			tailor_city: text.tailor_city,
            tailor_state: text.tailor_state,
            tailor_country: text.tailor_country,
			tailor_continent: text.tailor_continent,
			tailor_experience: text.tailor_experience,
            tailor_rating: text.tailor_rating,
            tailor_reviews: text.tailor_reviews,
			tailor_income: text.tailor_income,
			tailor_investment: text.tailor_investment,
            tailor_shop: text.tailor_shop,
            tailor_services: text.tailor_services,	
			tailor_male_female: text.tailor_male_female,
			tailor_gst: text.tailor_gst,
            tailor_course: text.tailor_course,
            tailor_branches: text.tailor_branches,
			tailor_material: text.tailor_material,
			tailor_readymade: text.tailor_readymade,
            tailor_contract: text.tailor_contract,
            tailor_fee: text.tailor_fee,
			tailor_mentor: text.tailor_mentor,
			tailor_delivery: text.tailor_delivery,
            tailor_overseas: text.tailor_overseas,
            tailor_domestic: text.tailor_domestic,
			tailor_expenses: text.tailor_expenses,
			tailor_vehicle: text.tailor_vehicle,
            tailor_shop_time: text.tailor_shop_time,
            tailor_shop_days: text.tailor_shop_days,
			tailor_awards: text.tailor_awards,
            tailor_designing_skills: text.tailor_designing_skills
    }

    alert("From State"+newManufacturer);
    console.log("From State"+newManufacturer);

    axios.put('http://localhost:5000/api/tailors/update/' + tailorId, newManufacturer, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateTailors = tailors.map((tailor, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (tailor._id === tailorId) {
            // Increment the clicked counter
            return newManufacturer;
          } else {
            // The rest haven't changed
            return tailor;
          }
        })
        console.log(updateTailors);
        setTailors(updateTailors);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleTailors = async (tailorIds) => {

    let tailorIdsr = { 'ids': tailorIds };
    let tailorsForRemove = JSON.stringify(tailorIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/tailors/deletemultipletailors", {
          method: 'DELETE',
          body: tailorsForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateTailors = tailors.filter((tailor) => !tailorIds.includes(tailor._id));
            setTailors(updateTailors);
        }).catch(error => {
          console.error('Error while deleting Multiple Tailors', error);
        });
    }
  }

  return (
    <TailorsContext.Provider value={{ setFormValues , formValues , tailors, setTailors, addTailors, deleteTailors, editTailors, deleteMultipleTailors, apiResponseMessages }}>
      {props.children}
    </TailorsContext.Provider>

  )
}

export default TailorsState;