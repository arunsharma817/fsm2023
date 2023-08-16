import React, { useEffect, useState } from "react";
import FamilyMembersContext from "./FamilyMembersContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const FamilyMembersState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [familyMembers, setFamilyMembers] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);
  const initialValues = { family_member_fname: "", family_member_lname: "", family_member_mobile: "" };
  const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchFamilyMembers = async () => {
      const getFamilyMembers = await axios.get(`http://localhost:5000/api/familymembers/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getFamilyMembers.data);
      return setFamilyMembers(getFamilyMembers.data);
    }
    fetchFamilyMembers();
  }, []);

  // Add Client State 

  const addFamilyMembers = (text) => {
    const newFamilyMember = {
      family_member_fname: text.family_member_fname,
      family_member_lname: text.family_member_lname,
      family_member_mobile: text.family_member_mobile
    }
    axios.post('http://localhost:5000/api/familymembers/create/', newFamilyMember, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newFamilyMember = {
        _id: resp.data._id,
        family_member_fname: text.family_member_fname,
        family_member_lname: text.family_member_lname,
        family_member_mobile: text.family_member_mobile       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setFamilyMembers((oldFamilyMembers) => {
        return [...oldFamilyMembers, newFamilyMember];
      })      
      ///return { message : text.family_member_fname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong>Success! {text.family_member_fname} </strong> The New Family Member has been successfully Added!!
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

  const deleteFamilyMembers = (getFamilyMemberId) => {
    const familyMemberId = getFamilyMemberId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/familymembers/delete/" + familyMemberId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + familyMemberId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setFamilyMembers" from my end to add immediate when successfully added into the database */ }
        setFamilyMembers((familymembers) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return familymembers.filter((res) => res._id !== familyMemberId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editFamilyMembers = (text, familyMemberId) => {

    console.log("I am in edit Text"+text.family_member_fname);
    console.log("I am in edit client Id"+familyMemberId);
    console.log("I am checking ownerToken"+ownerToken);

    const newFamilyMember = {
      _id: familyMemberId,
      family_member_fname: text.family_member_fname,
      family_member_lname: text.family_member_lname,
      family_member_mobile: text.family_member_mobile
    }
    axios.put('http://localhost:5000/api/familymembers/update/' + familyMemberId, newFamilyMember, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateFamilyMembers = familyMembers.map((familyMember, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (familyMember._id === familyMemberId) {
            // Increment the clicked counter
            return newFamilyMember;
          } else {
            // The rest haven't changed
            return familyMember;
          }
        })
        console.log(updateFamilyMembers);
        setFamilyMembers(updateFamilyMembers);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleFamilyMembers = async (familyMemberIds) => {

    let familyMemberIdsr = { 'ids': familyMemberIds };
    let familyMembersForRemove = JSON.stringify(familyMemberIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/familymembers/deletemultiplefamilymembers", {
          method: 'DELETE',
          body: familyMembersForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateFamilyMembers = familyMembers.filter((familyMember) => !familyMemberIds.includes(familyMember._id));
            setFamilyMembers(updateFamilyMembers);
        }).catch(error => {
          console.error('Error while deleting Multiple Family Members', error);
        });
    }
  }

  return (
    <FamilyMembersContext.Provider value={{ setFormValues , formValues , familyMembers, setFamilyMembers, addFamilyMembers, deleteFamilyMembers, editFamilyMembers, deleteMultipleFamilyMembers, apiResponseMessages }}>
      {props.children}
    </FamilyMembersContext.Provider>

  )
}

export default FamilyMembersState;