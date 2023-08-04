import React, { useEffect, useState } from "react";
import userTypeContext from "./usertypeContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const UserTypeState = (props) => {
const ownerToken = localStorage.getItem('token');
const [userTypes, setUserTypes] = useState([])


  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchUserType = async () => {
      const getUserTypes = await axios.get(`http://localhost:5000/api/usertype/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getUserTypes.data);
      return setUserTypes(getUserTypes.data);
    }
    fetchUserType();
  }, []);

  // Add Client State 

  const addUserType = (text) => {
    const newUserType = {
      user_type_title: text.user_type_title,
      user_type_description: text.user_type_description,
      user_type_module_permission: text.user_type_module_permission
    }
    axios.post('http://localhost:5000/api/usertype/create/', newUserType, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newUserType = {
        _id: resp.data._id,
        user_type_title: text.user_type_title,
        user_type_description: text.user_type_description,
        user_type_module_permission: text.user_type_module_permission       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setUserTypes((oldUserType) => {
        return [...oldUserType, newUserType];
      })

    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  // Delete Client State 

  const deleteUserType = (getUserTypesId) => {
    const userTypeId = getUserTypesId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/usertype/delete/" + userTypeId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + userTypeId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setUserTypes" from my end to add immediate when successfully added into the database */ }
        setUserTypes((userType) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return userTypes.filter((res) => res._id !== userTypeId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editUserType = (text, userTypeId) => {

    console.log("I am in edit Text"+text.user_type_title);
    console.log("I am in edit client Id"+userTypeId);
    console.log("I am checking ownerToken"+ownerToken);

    const newUserType = {
      _id: userTypeId,
      user_type_title: text.user_type_title,
      user_type_description: text.user_type_description,
      user_type_module_permission: text.user_type_module_permission
    }
    axios.put('http://localhost:5000/api/usertype/update/' + userTypeId, newUserType, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updatedUserType = userTypes.map((userType, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (userType._id === userTypeId) {
            // Increment the clicked counter
            return newUserType;
          } else {
            // The rest haven't changed
            return userType;
          }
        })
        console.log(updatedUserType);
        setUserTypes(updatedUserType);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleUserType = async (userTypeIds) => {

    let userTypeIdsr = { 'ids': userTypeIds };
    let userTypesForRemove = JSON.stringify(userTypeIdsr);
    
    if (window.confirm("Do You Want To Delete Selected Clients")) {      
        const res = await fetch("http://localhost:5000/api/usertype/delmultipleusertypes", {
          method: 'DELETE',
          body: userTypesForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
                  const updateduserTypes= userTypes.filter((userType) => !userTypeIds.includes(userType._id));
                  setUserTypes(updateduserTypes);
        }).catch(error => {
          console.error('There was an error!', error);
        });
    }
  }

  return (
    <userTypeContext.Provider value={{ userTypes, addUserType, deleteUserType, editUserType, deleteMultipleUserType }}>
      {props.children}
    </userTypeContext.Provider>

  )
}

export default UserTypeState;