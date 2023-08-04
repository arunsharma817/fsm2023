import React, { useEffect, useState } from "react";
import EnquiryContext from "./enquiryContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const EnquiryState = (props) => {
  const ownerToken = localStorage.getItem('token');
  const [enquiries, setEnquiries] = useState([])
  const [apiResponseMessages, setApiResponseMessages] = useState([]);
  const initialValues = { enquiry_name: "", enquiry_email: "", enquiry_mobile: "" };
  const [formValues, setFormValues] = useState(initialValues);

  //// Route 1 : This is useEffect , which calles everytime the page loads , it has State to display the clients List 

  useEffect(() => {

    /// Listing Clients 
    const fetchEnquiries = async () => {
      const getEnquiries = await axios.get(`http://localhost:5000/api/enquiry/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getEnquiries.data);
      return setEnquiries(getEnquiries.data);
    }
    fetchEnquiries();
  }, []);

  // Add Client State 

  const addEnquiry = (text) => {
    const newEnquiry = {
      enquiry_name: text.enquiry_name,
      enquiry_email: text.enquiry_email,
      enquiry_mobile: text.enquiry_mobile
    }
    axios.post('http://localhost:5000/api/enquiry/create/', newEnquiry, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newEnquiry = {
        _id: resp.data._id,
        enquiry_name: text.enquiry_name,
        enquiry_email: text.enquiry_email,
        enquiry_mobile: text.enquiry_mobile       
      }
      {/* I managed "setInspectors" from my end to add immediate when successfully added into the database */ }
      setEnquiries((oldEnquiries) => {
        return [...oldEnquiries, newEnquiry];
      })      
      ///return { message : text.enquiry_name+" The New User has been successfully Added!!"};
      
      setApiResponseMessages(<div className="alert alert-success">
      <strong>Success! {text.enquiry_name} </strong> The New User has been successfully Added!!
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

  const deleteEnquiry = (getUserId) => {
    const userId = getUserId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/enquiry/delete/" + userId;
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

        {/* I managed "setEnquiries" from my end to add immediate when successfully added into the database */ }
        setEnquiries((enquiries) => {
          //alert("I am here in delete Immediate Statement")
          {/*return inspectors.filter((arrElem , _id) => { alert ('index:'+ _id +',inspectorId:'+inspectorId)
                        return _id !== inspectorId; 
              })*/}
          return enquiries.filter((res) => res._id !== userId);
        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
  // Edit an Inspector 

  const editEnquiry = (text, userId) => {

    console.log("I am in edit Text"+text.enquiry_name);
    console.log("I am in edit client Id"+userId);
    console.log("I am checking ownerToken"+ownerToken);

    const newEnquiry = {
      _id: userId,
      enquiry_name: text.enquiry_name,
      enquiry_email: text.enquiry_email,
      enquiry_mobile: text.enquiry_mobile
    }
    axios.put('http://localhost:5000/api/enquiry/update/' + userId, newEnquiry, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      if (resp) {
        console.log(resp);
        {/* Managing for Edit */ }
        const updateEnquiries = enquiries.map((user, index) => {
          //alert("I am in If condition of updatedInspectors"+index);
          if (user._id === userId) {
            // Increment the clicked counter
            return newEnquiry;
          } else {
            // The rest haven't changed
            return user;
          }
        })
        console.log(updateEnquiries);
        setEnquiries(updateEnquiries);
      }
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }

  /// Delete Multiple Clients 

  //for multiple deletion
  const deleteMultipleEnquiry = async (userIds) => {

    let userIdsr = { 'ids': userIds };
    let enquiriesForRemove = JSON.stringify(userIdsr);
    //const inspectorIdsd = { ids : inspectorIds };
    //alert(typeof(inspectorIdsd));
    if (window.confirm("Do You Want To Delete Selected Clients")) {
      
        const res = await fetch("http://localhost:5000/api/enquiry/delmultipleenquiries", {
          method: 'DELETE',
          body: enquiriesForRemove,
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        }).then(resp => {
            const updateEnquiries = enquiries.filter((user) => !userIds.includes(user._id));
            setEnquiries(updateEnquiries);
        }).catch(error => {
          console.error('Error while deleting Multiple enquiries', error);
        });
    }
  }

  return (
    <EnquiryContext.Provider value={{ setFormValues , formValues , enquiries, addEnquiry, deleteEnquiry, editEnquiry, deleteMultipleEnquiry, apiResponseMessages }}>
      {props.children}
    </EnquiryContext.Provider>

  )
}

export default EnquiryState;