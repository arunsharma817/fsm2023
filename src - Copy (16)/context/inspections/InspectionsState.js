import React, { useEffect, useState } from "react";
import InspectionsContext from "./inspectionsContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const InspectionsState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [inspections, setInspections] = useState([])


  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Inspections 
    const fetchInspections = async () => {
      const getInspections = await axios.get(`http://localhost:5000/api/inspections/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getInspections.data);
      return setInspections(getInspections.data);
    }
    fetchInspections();
  }, []);

  // Add Inspection State 

  const addInspection = (text) => {
    const newInspection = {
      client_id: text.client_id,
      product_id: text.product_id,
      inspector_id: text.inspector_id
    }
    axios.post('http://localhost:5000/api/inspections/create/', newInspection, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newInspection = {
        _id: resp.data._id,
        client_id: text.client_id,
        product_id: text.product_id,
        inspector_id: text.inspector_id
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setInspections((oldInspections) => {
        return [...oldInspections, newInspection];
      })

    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  // Delete Inspection State 

  const deleteInspection = (getInspectionId) => {
    const inspectionId = getInspectionId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/inspections/delete/" + inspectionId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + inspectionId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setClients" from my end to add immediate when successfully added into the database */ }
        setInspections((inspections) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return inspections.filter((res) => res._id !== inspectionId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspection Report 

  const editInspection = (text, inspectionId) => {

    //console.log("I am in edit Text"+text.client_id);
    //console.log("I am in edit client Id"+clientId);
    //console.log("I am checking ownerToken"+ownerToken);

    const newInspection = {
      _id: inspectionId,
      client_id: text.client_id,
      product_id: text.product_id,
      inspector_id: text.inspector_id
    }
    axios.put('http://localhost:5000/api/inspections/update/' + inspectionId, newInspection, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updatedInspections = inspections.map((inspection, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (inspection._id === inspectionId) {
            // Increment the clicked counter
            return newInspection;
          } else {
            // The rest haven't changed
            return inspection;
          }
        })
        console.log(updatedInspections);
        setInspections(updatedInspections);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Inspections 

  //for multiple deletion
  const deleteMultipleInspections = async (inspectionIds) => {

    let inspectionIdsr = { 'ids': inspectionIds };
    let inspectionsForRemove = JSON.stringify(inspectionIdsr);
   
    if (window.confirm("Do You Want To Delete Selected Clients")) {      
        await fetch("http://localhost:5000/api/inspections/delmultipleinspections", {
          method: 'DELETE',
          body: inspectionsForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updatedInspections = inspections.filter((inspection) => !inspectionIds.includes(inspection._id));
            setInspections(updatedInspections);
        }).catch(error => {
          console.error('Error while deleting inspections', error);
        });
    }
  }

  return (
    <InspectionsContext.Provider value={{ inspections, addInspection, deleteInspection, editInspection, deleteMultipleInspections }}>
      {props.children}
    </InspectionsContext.Provider>

  )
}

export default InspectionsState;