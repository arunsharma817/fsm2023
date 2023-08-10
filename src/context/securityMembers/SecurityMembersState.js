import React, { useEffect, useState } from "react";
import SecurityMembersContext from "./SecurityMembersContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const SecurityMembersState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [securityMembers, setSecurityMembers] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);
  const initialValues = { security_member_fname: "", security_member_lname: "", security_member_mobile: "" };
  const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchSecurityMembers = async () => {
      const getSecurityMembers = await axios.get(`http://localhost:5000/api/securitymembers/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getSecurityMembers.data);
      return setSecurityMembers(getSecurityMembers.data);
    }
    fetchSecurityMembers();
  }, []);

  // Add Client State 

  const addSecurityMembers = (text) => {
    const newSecurityMember = {
      security_member_fname: text.security_member_fname,
      security_member_lname: text.security_member_lname,
      security_member_mobile: text.security_member_mobile
    }
    axios.post('http://localhost:5000/api/securitymembers/create/', newSecurityMember, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newSecurityMember = {
        _id: resp.data._id,
        security_member_fname: text.security_member_fname,
        security_member_lname: text.security_member_lname,
        security_member_mobile: text.security_member_mobile       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setSecurityMembers((oldSecurityMembers) => {
        return [...oldSecurityMembers, newSecurityMember];
      })      
      ///return { message : text.security_member_fname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong>Success! {text.security_member_fname} </strong> The New Security Member has been successfully Added!!
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

  const deleteSecurityMembers = (getSecurityMemberId) => {
    const securityMemberId = getSecurityMemberId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/securitymembers/delete/" + securityMemberId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + securityMemberId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setSecurityMembers" from my end to add immediate when successfully added into the database */ }
        setSecurityMembers((securitymembers) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return securitymembers.filter((res) => res._id !== securityMemberId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editSecurityMembers = (text, securityMemberId) => {

    console.log("I am in edit Text"+text.security_member_fname);
    console.log("I am in edit client Id"+securityMemberId);
    console.log("I am checking ownerToken"+ownerToken);

    const newSecurityMember = {
      _id: securityMemberId,
      security_member_fname: text.security_member_fname,
      security_member_lname: text.security_member_lname,
      security_member_mobile: text.security_member_mobile
    }
    axios.put('http://localhost:5000/api/securitymembers/update/' + securityMemberId, newSecurityMember, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateSecurityMembers = securityMembers.map((securityMember, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (securityMember._id === securityMemberId) {
            // Increment the clicked counter
            return newSecurityMember;
          } else {
            // The rest haven't changed
            return securityMember;
          }
        })
        console.log(updateSecurityMembers);
        setSecurityMembers(updateSecurityMembers);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleSecurityMembers = async (securityMemberIds) => {

    let securityMemberIdsr = { 'ids': securityMemberIds };
    let securityMembersForRemove = JSON.stringify(securityMemberIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/securitymembers/deletemultiplesecuritymembers", {
          method: 'DELETE',
          body: securityMembersForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateSecurityMembers = securityMembers.filter((securityMember) => !securityMemberIds.includes(securityMember._id));
            setSecurityMembers(updateSecurityMembers);
        }).catch(error => {
          console.error('Error while deleting Multiple Security Members', error);
        });
    }
  }

  return (
    <SecurityMembersContext.Provider value={{ setFormValues , formValues , securityMembers, setSecurityMembers, addSecurityMembers, deleteSecurityMembers, editSecurityMembers, deleteMultipleSecurityMembers, apiResponseMessages }}>
      {props.children}
    </SecurityMembersContext.Provider>

  )
}

export default SecurityMembersState;