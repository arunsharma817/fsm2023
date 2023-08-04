import React , { useState } from "react";
import InspectorsContext from "./inspectorsContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";

const InspectorsState = (props) => {
  const ownerToken = localStorage.getItem('token');

    const inspectorsInitial = [
      {
        "_id": "64942c26faf5cc42896dadc7",
        "inspector_name": "Reena Rajput Updated",
        "inspector_email": "reenarajputupdated@gmail.com",
        "inspector_password": "Admin123!",
        "inspector_consultant_id": "64941b2f530f65c747903b83",
        "inspector_date": "2023-06-22T11:10:30.862Z",
        "__v": 0
      },
      {
        "_id": "64943998faf5cc42896dadd6",
        "inspector_name": "Reena Rajput Updated",
        "inspector_email": "reenaarajputupdated@gmail.com",
        "inspector_password": "Admin123!",
        "inspector_consultant_id": "64941b2f530f65c747903b83",
        "inspector_date": "2023-06-22T12:07:52.779Z",
        "__v": 0
      },
      {
        "_id": "649aff28be45db0184dbafe8",
        "inspector_name": "Rahul TiwariS",
        "inspector_email": "rahultiwaSSri@gmail.com",
        "inspector_password": "AdminSS123!",
        "inspector_consultant_id": "64941b2f530f65c747903b83",
        "inspector_date": "2023-06-27T15:24:24.378Z",
        "__v": 0
      }
    ]
    const [inspectors, setInspectors] = useState(inspectorsInitial)    
 {/*
    // List Inspectors 

    const listInspectors = async () =>{
      const response = await fetch('http://localhost:5000/api/inspectors/list',{
              method: 'GET',
              headers:{
                "Content-Type" : "application/json",
                "consultant-token": ownerToken 
              } 
      });
      const json = await response.json();
      console.log("I am in List"+json);
      setInspectors(json)
    }

  listInspectors(); */}

    // Add an Inspector
      const addInspector = (text) =>{
        alert(text.inspector_name + ownerToken);
                    const newInspector = {
                        inspector_name: text.inspector_name,
                        inspector_email: text.inspector_email,
                        inspector_password: text.inspector_password,
                        inspector_consultant_id:'64941b2f530f65c747903b83'
                    }
                    axios.post('http://localhost:5000/api/inspectors/create/', newInspector, {
                      headers: {
                          'owner-token': ownerToken,
                          'Accept': 'application/json',
                          'Content-Type': 'application/json'
                      }
                  }).then(resp => {
                      console.log(resp);
                  }).catch(error => {
                      console.error('There was an error!', error);
                  });
      }

      // Delete an Inspector 

      const deleteInspector = () =>{

      }

      // Edit an Inspector 

      const editInspector = () =>{

      }




    return(
        <InspectorsContext.Provider value={{ inspectors ,   addInspector , deleteInspector , editInspector }}>
            {props.children}
        </InspectorsContext.Provider>

    )
}

export default InspectorsState;