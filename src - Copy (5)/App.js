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
import Clients from './components/Clients/Clients.js'
import Products from './components/Products/Products.js'
import AddProduct from './components/Products/AddProduct.js'
import Inspectors from './components/Inspectors.js'
import Inspections from './components/Inspections.js'
import ProductsState from './context/products/ProductsState.js'
import OwnersLogin from './components/Owners/Login.js'
import OwnersProfile from './components/Owners/MyProfile.js'



function App() {
  return (
    <ProductsState>
      <Router>
        <Navbar />
        <div className="containter">
          <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/about" element={<About />} /> 
            <Route path="/consultants" element={<Consultants />} /> 
            <Route path="/consultants/addconsultant" element={<AddConsultant />} />
            <Route path="/consultants/addconsultant/:id" element={<AddConsultant />} />
            <Route path="/consultants/:id" element={<Consultants />} />
            <Route path="/clients/clients" element={<Clients />} /> 
            <Route path="/products/products/" element={<Products />} /> 
            <Route path="/products/:id" element={<Products />} /> 
            <Route path="/products/addproduct" element={<AddProduct />} />
            <Route path="/inspectors" element={<Inspectors />} /> 
            <Route path="/inspections" element={<Inspections />} /> 
            <Route path="/owners/login" element={<OwnersLogin />} />
            <Route path="/owners/myprofile" element={<OwnersProfile />} />
          </Routes>
        </div>
      </Router>
    </ProductsState>
  );
}

export default App;
