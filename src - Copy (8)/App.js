import logo from './logo.svg';
import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

import Navbar from './components/Navbar.js'
import Home from './components/Home.js'
import About from './components/About.js'

import Consultants from './components/Consultants/Consultants.js'
import AddConsultant from './components/Consultants/AddConsultant.js'

import ClientsState from './context/clients/ClientsState'
import Clients from './components/Clients/Clients.js'
import AddClient from './components/Clients/AddClient.js'

import ProductsState from './context/products/ProductsState.js'
import Products from './components/Products/Products.js'
import AddProduct from './components/Products/AddProduct.js'

import InspectionsState from './context/inspections/InspectionsState.js'
import Inspections from './components//Inspections/Inspections.js'
import AddInspection from './components/Inspections/AddInspection.js'


import OwnersLogin from './components/Owners/Login.js'
import OwnersProfile from './components/Owners/MyProfile.js'

import InspectorsState from './context/inspectors/InspectorsState.js'
import Inspectors from './components/Inspectors/Inspectors.js'
import AddInspector from './components/Inspectors/AddInspector.js'




function App() {
  return (
    
    <ProductsState>
     <ClientsState>
      <InspectorsState>
        <InspectionsState>
      <Router>
        <Navbar />
        <div className="containter">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<About />} /> 
            <Route path="/consultants/" element={<Consultants />} /> 
            <Route path="/consultants/addconsultant" element={<AddConsultant />} />
            <Route path="/consultants/addconsultant/:id" element={<AddConsultant />} />
            <Route path="/consultants/:id" element={<Consultants />} />

            <Route path="/inspectors/" element={<Inspectors />} /> 
            <Route path="/inspectors/addinspector" element={<AddInspector />} />
            <Route path="/inspectors/addinspector/:id" element={<AddInspector />} />
            <Route path="/inspectors/:id" element={<Inspectors />} /> 


            <Route path="/clients" element={<Clients />} /> 
            <Route path="/clients/addclient" element={<AddClient />} /> 
            <Route path="/clients/addclient/:id" element={<AddClient />} /> 
            <Route path="/clients/:id" element={<Clients />} /> 

            <Route path="/products/products/" element={<Products />} /> 
            <Route path="/products/:id" element={<Products />} /> 
            <Route path="/products/addproduct" element={<AddProduct />} />  

            <Route path="/inspections" element={<Inspections />} /> 
            <Route path="/inspections/:id" element={<Inspections />} /> 
            <Route path="/inspections/addinspection" element={<AddInspection />} /> 

            <Route path="/owners/login" element={<OwnersLogin />} />
            <Route path="/owners/myprofile" element={<OwnersProfile />} />
          </Routes>
        </div>
      </Router>
      </InspectionsState>
      </InspectorsState>
      </ClientsState>
    </ProductsState>
  );
}

export default App;
