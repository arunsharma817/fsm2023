import React, { useState } from 'react'
import List from './List'
import { useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import Pagination from '../Products/Pagination';
import AddConsultant from '../Consultants/AddConsultant'

const Consultants = () => {
  const navigate = useNavigate();
  const params = useParams();
  const consultantId = params.id;

  const staticText = "This Variable will contain the json array with consultans details";
  const [stateExample, setStateExample] = useState([1]);
  const [listConsultants, setListConsultants] = useState([]);
  const ownerToken = localStorage.getItem('token');

  // setStateExample(2); It will not work and will go in infinite loop error ;

  useEffect(() => {
    if (!localStorage.getItem('token'))
      navigate('/owners/login')
    setStateExample(2);  // Now it will work because useEffect run once only instead of infinite loop

    /// Listing Consultants 

    ///pagination by products
    const fetchConsultants = async () => {
      const getConsultants = await axios.get(`http://localhost:5000/api/consultants/list`, {
        method: 'GET',
        headers: {
          "Content-Type": "application/json",
          "owner-token": ownerToken
        }
      });
      console.log(getConsultants.data);
      setListConsultants(getConsultants.data);
      //alert(listConsultants);
    }
    fetchConsultants();
  }, []);

  //setStateExample(3); // Can't declare out side of useEffect

  const deleteConsultant = async () => {
    return "This is Delete Function";
  }

  ///// Paginationn by Products 

  const [searchApiData, setSearchApiData] = useState([]);
  const [consultantsCurrentPage, setConsultantsCurrentPage] = useState(1);
  const [consultantsPerPage, setConsultantsPerPage] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const consultantPaginate = pageNumber => setConsultantsCurrentPage(pageNumber);

  // Get Current Products
  const indexOfLastConsultant = consultantsCurrentPage * consultantsPerPage;
  const indexOfFirstConsultant = indexOfLastConsultant - consultantsPerPage;
  const currentConsultants = listConsultants.slice(indexOfFirstConsultant, indexOfLastConsultant);

  if (consultantId) {
    return (
      <div>
        <AddConsultant consultantId = { consultantId } listConsultants = { listConsultants } />
      </div>)
  } else {
    return (
      <div>
        {/*
      <h2>Your Consultants : Here We can See How the setListConsultants in useEffect work in map function as loop to display all consultants </h2>
    <div className="container">
      {listConsultants.map((consultant) => {
        return (<div className="row align-items-center">
          <div className="col-sm">{consultant.consultant_name} </div>
          <div className="col-sm">   {consultant.consultant_email} </div>
          <div className="col-sm">  {consultant.consultant_password} </div>
          <div className="col-sm"><input type="button" id={consultant._id} value="Del" onClick={() => deleteConsultant(consultant._id)} /></div>
          <div className="col-sm"><input type="button" id={consultant._id} value="Edit" onClick={() => navigate("/consultants/" + consultant._id)} /></div>
          
        </div>)
      })}
    </div>*/}
        <p>This is Consultants Dashboard Page From Consultants.JS Base File.</p>
        <List ownerToken={ownerToken} listConsultants={currentConsultants} deleteConsultant={deleteConsultant()} staticText={staticText} stateExample={stateExample} staticDataExample="Sending Static Data for Checking" />
        <Pagination setCurrentPage={setCurrentPage} currentPage={consultantsCurrentPage} postsPerPage={consultantsPerPage} totalPosts={listConsultants.length} paginate={consultantPaginate} />
      </div>
    )
  }
}

export default Consultants
