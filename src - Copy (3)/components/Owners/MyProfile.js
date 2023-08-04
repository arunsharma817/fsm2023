import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const MyProfile = () => {
  const navigate = useNavigate();

  useEffect(() =>{
    if(!localStorage.getItem('token'))
          navigate('/owners/login')

          const fetchOwner = async () => {
            const res = await axios.get('http://localhost:5000/api/owners/getowner', {
              method: 'GET',
              headers: {
                "Content-Type": "application/json",
                "owner-token": localStorage.getItem('token')
              }
            });
            console.log(res.data);
          }
          fetchOwner();
          

  } , [])



  return (
    <div>
      My Profile 
    </div>
  )
}

export default MyProfile
