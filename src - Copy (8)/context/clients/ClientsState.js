import React, { useEffect, useState } from "react";
import ClientsContext from "./clientsContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const ClientsState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [clients, setClients] = useState([])


  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchClients = async () => {
      const getClients = await axios.get(`http://localhost:5000/api/clients/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getClients.data);
      return setClients(getClients.data);
    }
    fetchClients();
  }, []);

  // Add Client State 

  const addClient = (text) => {
    const newClient = {
      client_company_name: text.client_company_name,
      client_email: text.client_email,
      client_password: text.client_password,
      client_consultant_id: '64941b2f530f65c747903b83'
    }
    axios.post('http://localhost:5000/api/clients/create/', newClient, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newClient = {
        _id: resp.data._id,
        client_company_name: text.client_company_name,
        client_email: text.client_email,
        client_password: text.client_password,
        client_consultant_id: '64941b2f530f65c747903b83'
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setClients((oldClients) => {
        return [...oldClients, newClient];
      })

    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  // Delete Client State 

  const deleteClient = (getClientId) => {
    const clientId = getClientId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/clients/delete/" + clientId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + clientId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setClients" from my end to add immediate when successfully added into the database */ }
        setClients((clients) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return clients.filter((res) => res._id !== clientId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editClient = (text, clientId) => {

    console.log("I am in edit Text"+text.client_company_name);
    console.log("I am in edit client Id"+clientId);
    console.log("I am checking ownerToken"+ownerToken);

    const newClient = {
      _id: clientId,
      client_company_name: text.client_company_name,
      client_email: text.client_email,
      client_password: text.client_password
    }
    axios.put('http://localhost:5000/api/clients/update/' + clientId, newClient, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updatedClients = clients.map((client, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (client._id === clientId) {
            // Increment the clicked counter
            return newClient;
          } else {
            // The rest haven't changed
            return client;
          }
        })
        console.log(updatedClients);
        setClients(updatedClients);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleClients = async (clientIds) => {

    let clientIdsr = { 'ids': clientIds };
    let clientsForRemove = JSON.stringify(clientIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/clients/delmultipleclients", {
          method: 'POST',
          body: clientsForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
          if (resp) {
            console.log(resp);
            let clientArray = [clientsForRemove.ids];
            alert("I am here in ClientArray"+clientArray)
            {/* I managed "setClients" from my end to add immediate when successfully added into the database */ }
              {/* setClients((clients) => {      
                   console.log("showing type of "+typeof(clientArray));
             // return clients.filter((res) => res._id !== clientId);
             return clients.filter((value, index) => !clientArray.includes(index));
        })*/ }
          }
        }).catch(error => {
          console.error('There was an error!', error);
        });
    }
  }

  return (
    <ClientsContext.Provider value={{ clients, addClient, deleteClient, editClient, deleteMultipleClients }}>
      {props.children}
    </ClientsContext.Provider>

  )
}

export default ClientsState;