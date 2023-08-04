import React, { useEffect, useState } from "react";
import HelpdeskContext from "./helpdeskContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const HelpdeskState = (props) => {
const ownerToken = localStorage.getItem('token');
const [helpdesks, setHelpdesks] = useState([]);

  useEffect(() => {

    /// Listing Employees 
    const fetchHelpdesk = async () => {
      const getHelpdesk = await axios.get(`http://localhost:5000/api/helpdesk/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getHelpdesk.data);
      return setHelpdesks(getHelpdesk.data);
      //alert(listConsultants);
    }
    fetchHelpdesk();
  }, []);

  // Add an Inspector
  const addHelpdesk = (text) => {
   // alert(text.request_subject + ownerToken);
    const newHelpdesk = {
      request_subject: text.request_subject,
      request_description: text.request_description,
      request_priority: text.request_priority,
      request_consultant_id: '64941b2f530f65c747903b83'
    }
    axios.post('http://localhost:5000/api/helpdesk/create/', newHelpdesk, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newHelpdesk = {
        _id: resp.data._id,
        request_subject: text.request_subject,
        request_description: text.request_description,
        request_priority: text.request_priority,
        request_consultant_id: '64941b2f530f65c747903b83'
      }
      {/* I managed "setHelpdesks" from my end to add immediate when successfully added into the database */}
      setHelpdesks((oldHelpdesk) =>{
            return [...oldHelpdesk,newHelpdesk];
      })
      
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }
 
  // Delete an Inspector 

  const deleteHelpdesk = (getHelpdeskId) => {
    const helpdeskId = getHelpdeskId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/helpdesk/delete/" + helpdeskId;  
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Inspector?')) {
      console.log("You click yes!" + helpdeskId);
      const response =  fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
       
        {/* I managed "setHelpdesks" from my end to add immediate when successfully added into the database */}
        setHelpdesks((helpdesks) =>{
          //alert("I am here in delete Immediate Statement")
              {/*return employees.filter((arrElem , _id) => { alert ('index:'+ _id +',employeeId:'+employeeId)
                        return _id !== employeeId; 
              })*/}
              return helpdesks.filter((res) => res._id !== helpdeskId);

        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
    // Edit an Inspector 

    const editHelpdesk = (text, helpdeskId) => {
      const newHelpdesk = {
        _id: helpdeskId,
        request_subject: text.request_subject,
        request_description: text.request_description,
        request_priority: text.request_priority
      }
      axios.put('http://localhost:5000/api/helpdesk/update/' + helpdeskId, newHelpdesk, {
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
        if (resp) {
          console.log(resp);
          
          {/* Managing for Edit */}
        const updateHelpdesk =  helpdesks.map((helpdesk , index) => {
          //alert("I am in If condition of updateHelpdesk"+index);
            if (helpdesk._id === helpdeskId) {             
              // Increment the clicked counter
              return newHelpdesk;
            } else {
              // The rest haven't changed
              return helpdesk;
            }
          })
          console.log(updateHelpdesk);
          setHelpdesks(updateHelpdesk);
        }
      }).catch(error => {
        console.error('There was an error!', error);
      });
      return 1;
    }

    /// Delete Multiple Inspectors 

    //for multiple deletion
  const deleteMultipleHelpdesk = async (helpdeskIds) => {
    //alert(typeof(employeeIds));
    //alert(employeeIds);
    let helpdeskIdsr = { 'ids': helpdeskIds };
      let helpdesksForRemove = JSON.stringify(helpdeskIdsr);
        //const employeeIdsd = { ids : employeeIds };
    //alert(typeof(employeeIdsd));
    if (window.confirm("Do You Want To Delete Selected Inspectors")) {
      try {
        const res = await fetch("http://localhost:5000/api/helpdesk/deletemultiplehelpdesk", {     
          method: 'POST',
          body:  helpdesksForRemove,     
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          } 
        })       
      } catch (error) {
        console.log(error)
      }
    }
  }

    return (
      <HelpdeskContext.Provider value={{ helpdesks, addHelpdesk, deleteHelpdesk, editHelpdesk , deleteMultipleHelpdesk }}>
        {props.children}
      </HelpdeskContext.Provider>

    )
  }

  export default HelpdeskState;