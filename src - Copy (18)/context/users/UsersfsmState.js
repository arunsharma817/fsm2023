import React, { useEffect, useState } from "react";
import UsersContext from "./usersfsmContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const UsersfsmState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [users, setUsers] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);
  const initialValues = { user_first_name: "", user_email: "", user_password: "" };
  const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchUsers = async () => {
      const getUsers = await axios.get(`http://localhost:5000/api/users/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getUsers.data);
      return setUsers(getUsers.data);
    }
    fetchUsers();
  }, []);

  // Add Client State 

  const addUser = (text) => {
    const newUser = {
      user_first_name: text.user_first_name,
      user_email: text.user_email,
      user_password: text.user_password
    }
    axios.post('http://localhost:5000/api/users/create/', newUser, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newUser = {
        _id: resp.data._id,
        user_first_name: text.user_first_name,
        user_email: text.user_email,
        user_password: text.user_password       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setUsers((oldUsers) => {
        return [...oldUsers, newUser];
      })      
      ///return { message : text.user_first_name+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong>Success! {text.user_first_name} </strong> The New User has been successfully Added!!
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

  const deleteUser = (getUserId) => {
    const userId = getUserId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/users/delete/" + userId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + userId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setUsers" from my end to add immediate when successfully added into the database */ }
        setUsers((users) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return users.filter((res) => res._id !== userId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editUser = (text, userId) => {

    console.log("I am in edit Text"+text.user_first_name);
    console.log("I am in edit client Id"+userId);
    console.log("I am checking ownerToken"+ownerToken);

    const newUser = {
      _id: userId,
      user_first_name: text.user_first_name,
      user_email: text.user_email,
      user_password: text.user_password
    }
    axios.put('http://localhost:5000/api/users/update/' + userId, newUser, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updatedUsers = users.map((user, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (user._id === userId) {
            // Increment the clicked counter
            return newUser;
          } else {
            // The rest haven't changed
            return user;
          }
        })
        console.log(updatedUsers);
        setUsers(updatedUsers);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleUsers = async (userIds) => {

    let userIdsr = { 'ids': userIds };
    let usersForRemove = JSON.stringify(userIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/users/delmultipleusers", {
          method: 'DELETE',
          body: usersForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updatedUsersfsm = users.filter((user) => !userIds.includes(user._id));
            setUsers(updatedUsersfsm);
        }).catch(error => {
          console.error('Error while deleting Multiple Users', error);
        });
    }
  }

  return (
    <UsersContext.Provider value={{ setFormValues , formValues , users, addUser, deleteUser, editUser, deleteMultipleUsers, apiResponseMessages }}>
      {props.children}
    </UsersContext.Provider>

  )
}

export default UsersfsmState;