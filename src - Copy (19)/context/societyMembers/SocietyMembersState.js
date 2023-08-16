import React, { useEffect, useState } from "react";
import SocietyMembersContext from "./SocietyMembersContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const SocietyMembersState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [societyMembers, setSocietyMembers] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);
  const initialValues = { society_member_fname: "", society_member_lname: "", society_member_mobile: "" };
  const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchSocietyMembers = async () => {
      const getSocietyMembers = await axios.get(`http://localhost:5000/api/societymembers/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getSocietyMembers.data);
      return setSocietyMembers(getSocietyMembers.data);
    }
    fetchSocietyMembers();
  }, []);

  // Add Client State 

  const addSocietyMembers = (text) => {
    const newSocietyMember = {
      society_member_fname: text.society_member_fname,
      society_member_lname: text.society_member_lname,
      society_member_mobile: text.society_member_mobile
    }
    axios.post('http://localhost:5000/api/societymembers/create/', newSocietyMember, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newSocietyMember = {
        _id: resp.data._id,
        society_member_fname: text.society_member_fname,
        society_member_lname: text.society_member_lname,
        society_member_mobile: text.society_member_mobile       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setSocietyMembers((oldSocietyMembers) => {
        return [...oldSocietyMembers, newSocietyMember];
      })      
      ///return { message : text.society_member_fname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong>Success! {text.society_member_fname} </strong> The New Society Member has been successfully Added!!
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

  const deleteSocietyMembers = (getSocietyMemberId) => {
    const societyMemberId = getSocietyMemberId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/societymembers/delete/" + societyMemberId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + societyMemberId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setSocietyMembers" from my end to add immediate when successfully added into the database */ }
        setSocietyMembers((societymembers) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return societymembers.filter((res) => res._id !== societyMemberId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editSocietyMembers = (text, societyMemberId) => {

    console.log("I am in edit Text"+text.society_member_fname);
    console.log("I am in edit client Id"+societyMemberId);
    console.log("I am checking ownerToken"+ownerToken);

    const newSocietyMember = {
      _id: societyMemberId,
      society_member_fname: text.society_member_fname,
      society_member_lname: text.society_member_lname,
      society_member_mobile: text.society_member_mobile
    }
    axios.put('http://localhost:5000/api/societymembers/update/' + societyMemberId, newSocietyMember, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateSocietyMembers = societyMembers.map((societyMember, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (societyMember._id === societyMemberId) {
            // Increment the clicked counter
            return newSocietyMember;
          } else {
            // The rest haven't changed
            return societyMember;
          }
        })
        console.log(updateSocietyMembers);
        setSocietyMembers(updateSocietyMembers);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleSocietyMembers = async (societyMemberIds) => {

    let societyMemberIdsr = { 'ids': societyMemberIds };
    let societyMembersForRemove = JSON.stringify(societyMemberIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/societymembers/deleteMultipleSocietyMembers", {
          method: 'DELETE',
          body: societyMembersForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateSocietyMembers = societyMembers.filter((societyMember) => !societyMemberIds.includes(societyMember._id));
            setSocietyMembers(updateSocietyMembers);
        }).catch(error => {
          console.error('Error while deleting Multiple Society Members', error);
        });
    }
  }

  return (
    <SocietyMembersContext.Provider value={{ setFormValues , formValues , societyMembers, setSocietyMembers, addSocietyMembers, deleteSocietyMembers, editSocietyMembers, deleteMultipleSocietyMembers, apiResponseMessages }}>
      {props.children}
    </SocietyMembersContext.Provider>

  )
}

export default SocietyMembersState;