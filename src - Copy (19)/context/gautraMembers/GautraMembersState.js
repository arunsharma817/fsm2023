import React, { useEffect, useState } from "react";
import GautraMembersContext from "./GautraMembersContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const GautraMembersState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [gautraMembers, setGautraMembers] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);
  const initialValues = { gautra_member_fname: "", gautra_member_lname: "", gautra_member_mobile: "" };
  const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchGautraMembers = async () => {
      const getGautraMembers = await axios.get(`http://localhost:5000/api/gautramembers/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getGautraMembers.data);
      return setGautraMembers(getGautraMembers.data);
    }
    fetchGautraMembers();
  }, []);

  // Add Client State 

  const addGautraMembers = (text) => {
    const newGautraMember = {
      gautra_member_fname: text.gautra_member_fname,
      gautra_member_lname: text.gautra_member_lname,
      gautra_member_mobile: text.gautra_member_mobile
    }
    axios.post('http://localhost:5000/api/gautramembers/create/', newGautraMember, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newGautraMember = {
        _id: resp.data._id,
        gautra_member_fname: text.gautra_member_fname,
        gautra_member_lname: text.gautra_member_lname,
        gautra_member_mobile: text.gautra_member_mobile       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setGautraMembers((oldGautraMembers) => {
        return [...oldGautraMembers, newGautraMember];
      })      
      ///return { message : text.gautra_member_fname+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong>Success! {text.gautra_member_fname} </strong> The New Gautra Member has been successfully Added!!
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

  const deleteGautraMembers = (getGautraMemberId) => {
    const gautraMemberId = getGautraMemberId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/gautramembers/delete/" + gautraMemberId;
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Client?')) {
      console.log("You click yes!" + gautraMemberId);
      const response = fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {

        {/* I managed "setGautraMembers" from my end to add immediate when successfully added into the database */ }
        setGautraMembers((gautramembers) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return gautramembers.filter((res) => res._id !== gautraMemberId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editGautraMembers = (text, gautraMemberId) => {

    console.log("I am in edit Text"+text.gautra_member_fname);
    console.log("I am in edit client Id"+gautraMemberId);
    console.log("I am checking ownerToken"+ownerToken);

    const newGautraMember = {
      _id: gautraMemberId,
      gautra_member_fname: text.gautra_member_fname,
      gautra_member_lname: text.gautra_member_lname,
      gautra_member_mobile: text.gautra_member_mobile
    }
    axios.put('http://localhost:5000/api/gautramembers/update/' + gautraMemberId, newGautraMember, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateGautraMembers = gautraMembers.map((gautraMember, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (gautraMember._id === gautraMemberId) {
            // Increment the clicked counter
            return newGautraMember;
          } else {
            // The rest haven't changed
            return gautraMember;
          }
        })
        console.log(updateGautraMembers);
        setGautraMembers(updateGautraMembers);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleGautraMembers = async (gautraMemberIds) => {

    let gautraMemberIdsr = { 'ids': gautraMemberIds };
    let gautraMembersForRemove = JSON.stringify(gautraMemberIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/gautramembers/deletemultiplegautramembers", {
          method: 'DELETE',
          body: gautraMembersForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateGautraMembers = gautraMembers.filter((gautraMember) => !gautraMemberIds.includes(gautraMember._id));
            setGautraMembers(updateGautraMembers);
        }).catch(error => {
          console.error('Error while deleting Multiple Gautra Members', error);
        });
    }
  }

  return (
    <GautraMembersContext.Provider value={{ setFormValues , formValues , gautraMembers, setGautraMembers, addGautraMembers, deleteGautraMembers, editGautraMembers, deleteMultipleGautraMembers, apiResponseMessages }}>
      {props.children}
    </GautraMembersContext.Provider>

  )
}

export default GautraMembersState;