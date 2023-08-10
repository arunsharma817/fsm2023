import React, { useEffect, useState } from "react";
import CandidatesContext from "./candidatesContext";
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import { confirm } from "react-confirm-box";

const CandidatesState = (props) => {
const ownerToken = localStorage.getItem('token');
const [candidates, setCandidates] = useState([]);

  useEffect(() => {

    /// Listing Inspectors 
    const fetchCandidates = async () => {
      const getCandidates = await axios.get(`http://localhost:5000/api/candidates/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getCandidates.data);
      return setCandidates(getCandidates.data);
      //alert(listConsultants);
    }
    fetchCandidates();
  }, []);

  // Add an Inspector
  const addCandidate = (text) => {
   // alert(text.candidate_name + ownerToken);
    const newCandidate = {
      candidate_name: text.candidate_name,
      candidate_email: text.candidate_email,
      candidate_password: text.candidate_password,
      candidate_consultant_id: '64941b2f530f65c747903b83'
    }
    axios.post('http://localhost:5000/api/candidates/create/', newCandidate, {
      headers: {
        'owner-token': ownerToken,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(resp => {
      console.log(resp.data._id);
      const newCandidate = {
        _id: resp.data._id,
        candidate_name: text.candidate_name,
        candidate_email: text.candidate_email,
        candidate_password: text.candidate_password,
        candidate_consultant_id: '64941b2f530f65c747903b83'
      }
      {/* I managed "setCandidates" from my end to add immediate when successfully added into the database */}
      setCandidates((oldCandidates) =>{
            return [...oldCandidates,newCandidate];
      })
      
    }).catch(error => {
      console.error('There was an error!', error);
    });
    return 1;
  }
 
  // Delete an Inspector 

  const deleteCandidate = (getCandidateId) => {
    const candidateId = getCandidateId;
    //const result =  confirm("Are you sure?");
    const apiDelete = "http://localhost:5000/api/candidates/delete/" + candidateId;  
    //alert("resule of Confirm"+result);  
    if (window.confirm('Are you sure, want to delete the selected Inspector?')) {
      console.log("You click yes!" + candidateId);
      const response =  fetch(apiDelete, {
        method: 'DELETE',
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
       
        {/* I managed "setCandidates" from my end to add immediate when successfully added into the database */}
        setCandidates((candidates) =>{
          //alert("I am here in delete Immediate Statement")
              {/*return candidates.filter((arrElem , _id) => { alert ('index:'+ _id +',candidateId:'+candidateId)
                        return _id !== candidateId; 
              })*/}
              return candidates.filter((res) => res._id !== candidateId);

        })
      }).catch(error => {
        console.error('There was an error!', error);
      });
      const json = response.json;
      //listProducts()
    }
  }
    // Edit an Inspector 

    const editCandidate = (text, candidateId) => {
      const newCandidate = {
        _id: candidateId,
        candidate_name: text.candidate_name,
        candidate_email: text.candidate_email,
        candidate_password: text.candidate_password
      }
      axios.put('http://localhost:5000/api/candidates/update/' + candidateId, newCandidate, {
        headers: {
          'owner-token': ownerToken,
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      }).then(resp => {
        if (resp) {
          console.log(resp);
          
          {/* Managing for Edit */}
        const updateCandidates =  candidates.map((candidate , index) => {
          //alert("I am in If condition of updateCandidates"+index);
            if (candidate._id === candidateId) {             
              // Increment the clicked counter
              return newCandidate;
            } else {
              // The rest haven't changed
              return candidate;
            }
          })
          console.log(updateCandidates);
          setCandidates(updateCandidates);
        }
      }).catch(error => {
        console.error('There was an error!', error);
      });
      return 1;
    }

    /// Delete Multiple Inspectors 

    //for multiple deletion
  const deleteMultipleCandidates = async (candidateIds) => {

    let candidateIdsr = { 'ids': candidateIds };
    let candidatesForRemove = JSON.stringify(candidateIdsr);
     
    if (window.confirm("Do You Want To Delete Selected Inspectors")) {
     
        await fetch("http://localhost:5000/api/candidates/deletemultiplecandidate", {     
          method: 'DELETE',
          body:  candidatesForRemove,     
          headers: {
            'owner-token': ownerToken,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          } 
        }).then((response) => response.json()).then((data) =>{
              const updatedCandidates = candidates.filter(
                (candidate) => !candidateIds.includes(candidate._id)
                );
                setCandidates(updatedCandidates);
        }).catch((error) => console.error('Error deleting tasks:', error));
    }
  }



    return (
      <CandidatesContext.Provider value={{ candidates, addCandidate, deleteCandidate, editCandidate , deleteMultipleCandidates }}>
        {props.children}
      </CandidatesContext.Provider>

    )
  }

  export default CandidatesState;