import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import productsContext from '../context/products/productsContext';

const Home = () => {
  const context = useContext(productsContext)
  const {products , setProducts} = context;
  const navigate = useNavigate();
  useEffect(() =>{
    if(!localStorage.getItem('token'))
          navigate('/owners/login')
  } , []);

  return (
    <div>
      <h1>Welcome to FSM World</h1>        
    </div>
  )
}

export default Home
