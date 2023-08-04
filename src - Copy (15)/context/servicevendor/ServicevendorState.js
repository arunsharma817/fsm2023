import React, { useEffect, useState } from "react";
import serviceVendorContext from "./servicevendorContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const ServiceVendorState = (props) => {
const ownerToken = localStorage.getItem('token');
const [serviceVendors, setServiceVendors] = useState([])


  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchServiceVendor = async () => {
      
        const getServiceVendors = await axios.get(`http://localhost:5000/api/servicevendor/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getServiceVendors.data);
      return setServiceVendors(getServiceVendors.data);
    
    }
    fetchServiceVendor();
  }, []);

  // Add Client State 

  const addServiceVendor = (text) => {

    const newServiceVendor = {

      service_vendor_fname : text.service_vendor_fname,
      service_vendor_lname : text.service_vendor_lname,
      service_vendor_type : text.service_vendor_type
    
    }

    axios.post('http://localhost:5000/api/servicevendor/create/', newServiceVendor, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newServiceVendor = {
        _id: resp.data._id,
        service_vendor_fname: text.service_vendor_fname,
        service_vendor_lname: text.service_vendor_lname,
        service_vendor_type: text.service_vendor_type       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setServiceVendors((oldServiceVendor) => {
        return [...oldServiceVendor, newServiceVendor];
      })

    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  // Delete Client State 

  const deleteServiceVendor = (getServiceVendorsId) => {
    const serviceVendorId = getServiceVendorsId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/servicevendor/delete/" + serviceVendorId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + serviceVendorId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setServiceVendors" from my end to add immediate when successfully added into the database */ }
        setServiceVendors((serviceVendor) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return serviceVendors.filter((res) => res._id !== serviceVendorId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editServiceVendor = (text, serviceVendorId) => {

    console.log("I am in edit Text"+text.service_vendor_fname);
    console.log("I am in edit client Id"+serviceVendorId);
    console.log("I am checking ownerToken"+ownerToken);

    const newServiceVendor = {
      _id: serviceVendorId,
      service_vendor_fname: text.service_vendor_fname,
      service_vendor_lname: text.service_vendor_lname,
      service_vendor_type: text.service_vendor_type
    }
    axios.put('http://localhost:5000/api/servicevendor/update/' + serviceVendorId, newServiceVendor, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updatedServiceVendor = serviceVendors.map((serviceVendor, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (serviceVendor._id === serviceVendorId) {
            // Increment the clicked counter
            return newServiceVendor;
          } else {
            // The rest haven't changed
            return serviceVendor;
          }
        })
        console.log(updatedServiceVendor);
        setServiceVendors(updatedServiceVendor);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleServiceVendor = async (serviceVendorIds) => {

    let serviceVendorIdsr = { 'ids': serviceVendorIds };
    let serviceVendorsForRemove = JSON.stringify(serviceVendorIdsr);
    
    if (window.confirm("Do You Want To Delete Selected Clients")) {      
        const res = await fetch("http://localhost:5000/api/servicevendor/delmultipleservicevendors", {
          method: 'DELETE',
          body: serviceVendorsForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
                  const updatedServiceVendors= serviceVendors.filter((serviceVendor) => !serviceVendorIds.includes(serviceVendor._id));
                  setServiceVendors(updatedServiceVendors);
        }).catch(error => {
          console.error('There was an error!', error);
        });
    }
  }

  return (    

    <serviceVendorContext.Provider value={{ serviceVendors, addServiceVendor, deleteServiceVendor, editServiceVendor, deleteMultipleServiceVendor }}>
      {props.children}
    </serviceVendorContext.Provider>

  )

}

export default ServiceVendorState;