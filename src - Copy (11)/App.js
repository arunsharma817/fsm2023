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

import UsersfsmState from './context/users/UsersfsmState.js'
import Users from './components/Users/Users.js'
import AddUser from './components/Users/AddUser.js'

import UsertypeState from './context/usertype/UsertypeState.js'
import UserType from './components/UserType/UserType.js'
import AddUserTypeForm from './components/UserType/AddUserTypeForm.js'

import CandidatesState from './context/candidates/CandidatesState.js'
import Candidates from './components/Candidates/Candidates.js'
import AddCandidate from './components/Candidates/AddCandidate.js'


import EmployeesState from './context/employees/EmployeesState.js'
import Employees from './components/Employees/Employees.js'
import AddEmployee from './components/Employees/AddEmployee.js'


import CategoriesState from './context/categories/CategoriesState.js'
import Categories from './components/Categories/Categories.js'
import AddCategory from './components/Categories/AddCategory.js'

import HelpdesksState from './context/helpdesk/HelpdeskState.js'
import Helpdesks from './components/Helpdesk/Helpdesks.js'
import AddHelpdesk from './components/Helpdesk/AddHelpdesk.js'

import InventorysState from './context/inventory/InventoryState.js'
import Inventorys from './components/Inventory/Inventorys.js'
import AddInventory from './components/Inventory/AddInventory.js'


function App() {
  return (
    
    <ProductsState>
     <ClientsState>
      <InspectorsState>
        <InspectionsState>
        <UsersfsmState>
        <UsertypeState>
        <CandidatesState>
        <EmployeesState>
        <CategoriesState>
        <HelpdesksState>
        <InventorysState>
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

          
            <Route path="/users" element={<Users />} /> 
            <Route path="/users/adduser" element={<AddUser />} /> 
            <Route path="/users/adduser/:id" element={<AddUser />} /> 
            <Route path="/users/:id" element={<Users />} /> 


            <Route path="/usertype" element={<UserType />} />            
            <Route path="/usertype/addusertypeform" element={<AddUserTypeForm />} />  
            <Route path="/usertype/addusertypeform/:id" element={<AddUserTypeForm />} />  
            <Route path="/usertype/:id" element={<UserType />} /> 


            <Route path="/candidates" element={<Candidates />} />            
            <Route path="/candidates/addcandidate" element={<AddCandidate />} />  
            <Route path="/candidates/addcandidate/:id" element={<AddCandidate />} />  
            <Route path="/candidates/:id" element={<Candidates />} /> 


            <Route path="/employees" element={<Employees />} />            
            <Route path="/employees/addemployee" element={<AddEmployee />} />  
            <Route path="/employees/addemployee/:id" element={<AddEmployee />} />  
            <Route path="/employees/:id" element={<Employees />} /> 
  
            <Route path="/categories" element={<Categories />} />            
            <Route path="/categories/addcategory" element={<AddCategory />} />  
            <Route path="/categories/addcategory/:id" element={<AddCategory />} />  
            <Route path="/categories/:id" element={<Categories />} /> 


            <Route path="/helpdesk" element={<Helpdesks />} />            
            <Route path="/helpdesk/addHelpdesk" element={<AddHelpdesk />} />  
            <Route path="/helpdesk/addHelpdesk/:id" element={<AddHelpdesk />} />  
            <Route path="/helpdesk/:id" element={<Helpdesks />} /> 


            
            <Route path="/inventory" element={<Inventorys />} />            
            <Route path="/inventory/addinventory" element={<AddInventory />} />  
            <Route path="/inventory/addinventory/:id" element={<AddInventory />} />  
            <Route path="/inventory/:id" element={<Inventorys />} /> 

          </Routes>
        </div>
      </Router>
      </InventorysState>
      </HelpdesksState>
      </CategoriesState>
      </EmployeesState>
      </CandidatesState>
      </UsertypeState>
     </UsersfsmState>
      </InspectionsState>
      </InspectorsState>
      </ClientsState>
    </ProductsState>
  );
}

export default App;