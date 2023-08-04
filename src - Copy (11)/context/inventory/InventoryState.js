import React, { useEffect, useState } from "react";
import InventoryContext from "./inventoryContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const InventoryState = (props) => {
const ownerToken = localStorage.getItem('token');
const [inventorys, setInventorys] = useState([]);

  useEffect(() => {

    /// Listing Employees 
    const fetchInventory = async () => {
      const getInventory = await axios.get(`http://localhost:5000/api/inventory/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getInventory.data);
      return setInventorys(getInventory.data);
      //alert(listConsultants);
    }
    fetchInventory();
  }, []);

  // Add an Inspector
  const addInventory = (text) => {
   // alert(text.inventory_type + ownerToken);
    const newInventory = {
      inventory_type: text.inventory_type,
      inventory_details: text.inventory_details,
      inventory_quantity: text.inventory_quantity,
      inventory_consultant_id: '64941b2f530f65c747903b83'
    }
    axios.post('http://localhost:5000/api/inventory/create/', newInventory, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newInventory = {
        _id: resp.data._id,
        inventory_type: text.inventory_type,
        inventory_details: text.inventory_details,
        inventory_quantity: text.inventory_quantity,
        inventory_consultant_id: '64941b2f530f65c747903b83'
      }
      {/* I managed "setInventorys" from my end to add immediate when successfully added into the database */}
      setInventorys((oldInventory) =>{
            return [...oldInventory,newInventory];
      })
      
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }
 
  // Delete an Inspector 

  const deleteInventory = (getinventoryId) => {
    const inventoryId = getinventoryId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/inventory/delete/" + inventoryId;  
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Inspector?')) {
      console.log("You click yes!" + inventoryId);
      const response =  fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
       
        {/* I managed "setInventorys" from my end to add immediate when successfully added into the database */}
        setInventorys((inventorys) =>{
          //alert("I am here in delete Immediate Statement")
              {/*return employees.filter((arrElem , _id) => { alert ('index:'+ _id +',employeeId:'+employeeId)
                        return _id !== employeeId; 
              })*/}
              return inventorys.filter((res) => res._id !== inventoryId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
    // Edit an Inspector 

    const editInventory = (text, inventoryId) => {
      const newInventory = {
        _id: inventoryId,
        inventory_type: text.inventory_type,
        inventory_details: text.inventory_details,
        inventory_quantity: text.inventory_quantity
      }
      axios.put('http://localhost:5000/api/inventory/update/' + inventoryId, newInventory, {
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
        if (resp) {
          console.log(resp);
          
          {/* Managing for Edit */}
        const updateInventory =  inventorys.map((inventory , index) => {
          //alert("I am in If condition of updateInventory"+index);
            if (inventory._id === inventoryId) {             
              // Increment the clicked counter
              return newInventory;
            } else {
              // The rest haven't changed
              return inventory;
            }
          })
          console.log(updateInventory);
          setInventorys(updateInventory);
        }
      }).catch(error => {
        console.error('There was an error!', error);
      });
      return 1;
    }

    /// Delete Multiple Inspectors 

    //for multiple deletion
  const deleteMultipleInventory = async (inventoryIds) => {
    //alert(typeof(employeeIds));
    //alert(employeeIds);
    let inventoryIdsr = { 'ids': inventoryIds };
      let inventoryForRemove = JSON.stringify(inventoryIdsr);
        //const employeeIdsd = { ids : employeeIds };
    //alert(typeof(employeeIdsd));
    if (window.confirm("Do You Want To Delete Selected Inspectors")) {
      try {
        const res = await fetch("http://localhost:5000/api/inventory/deleteMultipleInventory", {     
          method: 'POST',
          body:  inventoryForRemove,     
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
      <InventoryContext.Provider value={{ inventorys, addInventory, deleteInventory, editInventory , deleteMultipleInventory }}>
        {props.children}
      </InventoryContext.Provider>

    )
  }

  export default InventoryState;