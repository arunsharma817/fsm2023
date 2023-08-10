import React, { useEffect, useState } from "react";
import SamajMembersContext from "./SamajMembersContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const SamajMembersState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [samajMembers, setSamajMembers] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);
  const initialValues = { samaj_member_fname: "", samaj_member_lname: "", samaj_member_mobile: "" };
  const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchSamajMembers = async () => {
      const getSamajMembers = await axios.get(`http://localhost:5000/api/samajmembers/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getSamajMembers.data);
      return setSamajMembers(getSamajMembers.data);
    }
    fetchSamajMembers();
  }, []);

  // Add Client State 

  const addSamajMembers = (text) => {
    const newSamajMember = {
      samaj_member_fname: text.samaj_member_fname,
      samaj_member_lname: text.samaj_member_lname,
      samaj_member_mobile: text.samaj_member_mobile
    }
    axios.post('http://localhost:5000/api/samajmembers/create/', newSamajMember, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newSamajMember = {
        _id: resp.data._id,
        samaj_member_fname: text.samaj_member_fname,
        samaj_member_lname: text.samaj_member_lname,
        samaj_member_mobile: text.samaj_member_mobile       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setSamajMembers((oldSamajMembers) => {
        return [...oldSamajMembers, newSamajMember];
      })      
      ///return { message : text.samaj_member_fname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong>Success! {text.samaj_member_fname} </strong> The New Samaj Member has been successfully Added!!
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

  const deleteSamajMembers = (getSamajMemberId) => {
    const samajMemberId = getSamajMemberId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/samajmembers/delete/" + samajMemberId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + samajMemberId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setSamajMembers" from my end to add immediate when successfully added into the database */ }
        setSamajMembers((samajmembers) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return samajmembers.filter((res) => res._id !== samajMemberId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editSamajMembers = (text, samajMemberId) => {

    console.log("I am in edit Text"+text.samaj_member_fname);
    console.log("I am in edit client Id"+samajMemberId);
    console.log("I am checking ownerToken"+ownerToken);

    const newSamajMember = {
      _id: samajMemberId,
      samaj_member_fname: text.samaj_member_fname,
      samaj_member_lname: text.samaj_member_lname,
      samaj_member_mobile: text.samaj_member_mobile
    }
    axios.put('http://localhost:5000/api/samajmembers/update/' + samajMemberId, newSamajMember, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateSamajMembers = samajMembers.map((samajMember, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (samajMember._id === samajMemberId) {
            // Increment the clicked counter
            return newSamajMember;
          } else {
            // The rest haven't changed
            return samajMember;
          }
        })
        console.log(updateSamajMembers);
        setSamajMembers(updateSamajMembers);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleSamajMembers = async (samajMemberIds) => {

    let samajMemberIdsr = { 'ids': samajMemberIds };
    let samajMembersForRemove = JSON.stringify(samajMemberIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/samajmembers/deletemultiplesamajmembers", {
          method: 'DELETE',
          body: samajMembersForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateSamajMembers = samajMembers.filter((samajMember) => !samajMemberIds.includes(samajMember._id));
            setSamajMembers(updateSamajMembers);
        }).catch(error => {
          console.error('Error while deleting Multiple Samaj Members', error);
        });
    }
  }

  return (
    <SamajMembersContext.Provider value={{ setFormValues , formValues , samajMembers, setSamajMembers, addSamajMembers, deleteSamajMembers, editSamajMembers, deleteMultipleSamajMembers, apiResponseMessages }}>
      {props.children}
    </SamajMembersContext.Provider>

  )
}

export default SamajMembersState;