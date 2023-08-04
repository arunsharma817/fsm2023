import React from 'react'
import { confirm } from "react-confirm-box";
import { useNavigate, useParams } from "react-router-dom";



const List = (props) => {

/// Delete a Consultant 
const navigate = useNavigate();

const deleteConsultant = async (consultantid) => {
  const consultantId = consultantid;
 // const result = await confirm("Are you sure?");
  const apiDelete = "http://localhost:5000/api/consultants/delete/" + consultantId;
  const ownerToken = props.ownerToken;
  if (window.confirm('Are you sure, want to delete the selected Consultant?')) {
    console.log("You click yes!" + consultantId);
    const response = await fetch(apiDelete, {
      method: 'DELETE',
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });
    const json = response.json;
    console.log(json);
    //listProducts()
  }
  console.log("You click No!");
}





  return (
    <div>
      <p>This is Consultants List from List.js which is taking Props from Base File Consultants.js . </p>
      <p>{props.staticText}</p>
      <p>State : {props.stateExample} , This is Example of Sending State from Base file to Child File using Props . Even it's initialized with 1 but showing due to set again in useEffect Function </p>
      <p>Sending Static Data for Checking : {props.staticDataExample} , This example  how can we recieve static data from Base file using props . </p>
      <p>Function Checking : props. deleteConsultant() /// This will not work , mean we can't pass function using props.from base file to child </p>
      <p> props.listConsultants is not working even we are passing this state in List tag from base file but it's not working . </p>
      <p> //console.log(ggetConsultants-s); this code i put in useeffect but it went in infinte loop.... Only State Variables/array can be written inside useEffect.</p>
      <p>listConsultants : checking it again </p>
      <h2>Your Consultants : Here We can See How the setListConsultants in useEffect work in map function as loop to display all consultants </h2>
      <div className="container">
        {props.listConsultants.map((consultant) => {
          return (<div className="row align-items-center">
            <div className="col-sm">{consultant.consultant_name}</div>
            <div className="col-sm">{consultant.consultant_email}</div>
            <div className="col-sm">{consultant.consultant_password}</div>  
            <div className="col-sm"><input type="button" id={consultant._id} value="Del" onClick={() => deleteConsultant(consultant._id)} /></div>
            <div className="col-sm"><input type="button" id={consultant._id} value="Edit" onClick={() => navigate("/consultants/" + consultant._id)} /></div>     
          </div>)
        })}
      </div>
    </div>
  )
}

export default List
