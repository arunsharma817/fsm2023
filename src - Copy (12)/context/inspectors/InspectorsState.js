import React, { useEffect, useState } from "react";
import InspectorsContext from "./inspectorsContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const InspectorsState = (props) => {
const ownerToken = localStorage.getItem('token');
const [inspectors, setInspectors] = useState([])

  useEffect(() => {

    /// Listing Inspectors 
    const fetchInspectors = async () => {
      const getInspectors = await axios.get(`http://localhost:5000/api/inspectors/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getInspectors.data);
      return setInspectors(getInspectors.data);
      //alert(listConsultants);
    }
    fetchInspectors();
  }, []);

  // Add an Inspector
  const addInspector = (text) => {
   // alert(text.inspector_name + ownerToken);
    const newInspector = {
      inspector_name: text.inspector_name,
      inspector_email: text.inspector_email,
      inspector_password: text.inspector_password,
      inspector_consultant_id: '64941b2f530f65c747903b83'
    }
    axios.post('http://localhost:5000/api/inspectors/create/', newInspector, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newInspector = {
        _id: resp.data._id,
        inspector_name: text.inspector_name,
        inspector_email: text.inspector_email,
        inspector_password: text.inspector_password,
        inspector_consultant_id: '64941b2f530f65c747903b83'
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */}
      setInspectors((oldInspectors) =>{
            return [...oldInspectors,newInspector];
      })
      
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }
 
  // Delete an Inspector 

  const deleteInspector = (getInspectorId) => {
    const inspectorId = getInspectorId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/inspectors/delete/" + inspectorId;  
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Inspector?')) {
      console.log("You click yes!" + inspectorId);
      const response =  fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
       
        {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */}
        setInspectors((inspectors) =>{
          //alert("I am here in delete Immediate Statement")
              {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
              return inspectors.filter((res) => res._id !== inspectorId);

        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
    // Edit an Inspector 

    const editInspector = (text, inspectorId) => {
      const newInspector = {
        _id: inspectorId,
        inspector_name: text.inspector_name,
        inspector_email: text.inspector_email,
        inspector_password: text.inspector_password
      }
      axios.put('http://localhost:5000/api/inspectors/update/' + inspectorId, newInspector, {
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
        if (resp) {
          console.log(resp);
          
          {/* Managing for Edit */}
        const updatedInspectors =  inspectors.map((inspector , index) => {
          //alert("I am in If condition of updatedInspectors"+index);
            if (inspector._id === inspectorId) {             
              // Increment the clicked counter
              return newInspector;
            } else {
              // The rest haven't changed
              return inspector;
            }
          })
          console.log(updatedInspectors);
          setInspectors(updatedInspectors);
        }
      }).catch(error => {
        console.error('There was an error!', error);
      });
      return 1;
    }

    /// Delete Multiple Inspectors 

    //for multiple deletion
  const deleteMultipleInspectors = async (inspectorIds) => {
    
    let inspectorIdsr = { 'ids': inspectorIds };
    let inspectorsForRemove = JSON.stringify(inspectorIdsr);
    
    if(window.confirm("Do You Want To Delete Selected Inspectors")) {      
        const res = await fetch("http://localhost:5000/api/inspectors/delmultipleins", {     
          method: 'DELETE',
          body:  inspectorsForRemove,     
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          } 
        }).then((response) => {
          const updatedInspectors = inspectors.filter((inspector) => !inspectorIds.includes(inspector._id));
          setInspectors(updatedInspectors);
        }).catch((error) => console.log("Error while deleting multiple inspectors"+error));
    }
  }



    return (
      <InspectorsContext.Provider value={{ inspectors, addInspector, deleteInspector, editInspector , deleteMultipleInspectors }}>
        {props.children}
      </InspectorsContext.Provider>

    )
  }

  export default InspectorsState;