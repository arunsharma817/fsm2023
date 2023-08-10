import logo from './logo.svg';
import './App.css';
import React from "react";
import { Link , 
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
import UsersBoard from './components/Users/UsersBoard.js'


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



import ServicevendorState from './context/servicevendor/ServicevendorState.js'
import ServiceVendor from './components/ServiceVendor/ServiceVendor.js'
import AddServiceVendorForm from './components/ServiceVendor/AddServiceVendorForm.js'

import MainProductsState from './context/MainProducts/mainProductsState.js'
import MainProducts from './components/MainProducts/MainProducts.js'
import AddMainProductsForm from './components/MainProducts/AddMainProductsForm.js'


import EnquiryState from './context/enquiry/EnquiryState.js'
import ListEnquiry from './components/Enquiry/ListEnquiry.js'
import AddEnquiry from './components/Enquiry/AddEnquiry.js'
import EnquiryBoard from './components/Enquiry/enquiryBoard.js'

import logoWhiteImage from './styles/images/logo-white.png'; // Import the logo image file


import ArticlesState from './context/articles/ArticlesState.js'
import ListArticles from './components/Articles/ListArticles.js'
import AddArticles from './components/Articles/AddArticles.js'
import BoardArticles from './components/Articles/BoardArticles.js'

import StateCourses from './context/courses/stateCourses.js'
import ListCourses from './components/Courses/listCourses.js'
import AddCourses from './components/Courses/addCourses.js'
import BoardCourses from './components/Courses/boardCourses.js'

import ReviewsState from './context/reviews/ReviewsState.js'
import ListReviews from './components/Reviews/ListReviews.js'
import AddReviews from './components/Reviews/AddReviews.js'
import BoardReviews from './components/Reviews/BoardReviews.js'


import SocietyMembersState from './context/societyMembers/SocietyMembersState.js'
import ListSocietyMembers from './components/SocietyMembers/ListSocietyMembers.js'
import AddSocietyMembers from './components/SocietyMembers/AddSocietyMembers.js'
import BoardSocietyMembers from './components/SocietyMembers/BoardSocietyMembers.js'


import GautraMembersState from './context/gautraMembers/GautraMembersState.js'
import ListGautraMembers from './components/GautraMembers/ListGautraMembers.js'
import AddGautraMembers from './components/GautraMembers/AddGautraMembers.js'
import BoardGautraMembers from './components/GautraMembers/BoardGautraMembers.js'

import SecurityMembersState from './context/securityMembers/SecurityMembersState.js'
import ListSecurityMembers from './components/SecurityMembers/ListSecurityMembers.js'
import AddSecurityMembers from './components/SecurityMembers/AddSecurityMembers.js'
import BoardSecurityMembers from './components/SecurityMembers/BoardSecurityMembers.js'

import FamilyMembersState from './context/FamilyMembers/FamilyMembersState.js'
import ListFamilyMembers from './components/FamilyMembers/ListFamilyMembers.js'
import AddFamilyMembers from './components/FamilyMembers/AddFamilyMembers.js'
import BoardFamilyMembers from './components/FamilyMembers/BoardFamilyMembers.js'

import BuildingMembersState from './context/BuildingMembers/BuildingMembersState.js'
import ListBuildingMembers from './components/BuildingMembers/ListBuildingMembers.js'
import AddBuildingMembers from './components/BuildingMembers/AddBuildingMembers.js'
import BoardBuildingMembers from './components/BuildingMembers/BoardBuildingMembers.js'

import SocialLinksState from './context/SocialLinks/SocialLinksState.js'
import ListSocialLinks from './components/SocialLinks/ListSocialLinks.js'
import AddSocialLinks from './components/SocialLinks/AddSocialLinks.js'
import BoardSocialLinks from './components/SocialLinks/BoardSocialLinks.js'

import SamajMembersState from './context/SamajMembers/SamajMembersState.js'
import ListSamajMembers from './components/SamajMembers/ListSamajMembers.js'
import AddSamajMembers from './components/SamajMembers/AddSamajMembers.js'
import BoardSamajMembers from './components/SamajMembers/BoardSamajMembers.js'

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
        <ServicevendorState> 
        <MainProductsState> 
        <EnquiryState>
        <ArticlesState>
        <StateCourses>
        <ReviewsState>
        <SocietyMembersState> 
        <GautraMembersState> 
        <SecurityMembersState>
        <FamilyMembersState>
        <BuildingMembersState> 
        <SamajMembersState>      
        <SocialLinksState>  
      <Router>
      <div className="container-fluid p-0 av-wrapper">  
      <div className="row g-0">
        <div className="sidebar-wrapper">
              <div className="logo">
                    <Link to="/owners/login" className="large-logo">
                        <img src={logoWhiteImage} alt="Logo" />                        
                    </Link>
              </div>
              <Navbar />
        </div>
        <div className="col-12 main-wrapper">
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

            <Route path="/mainproducts" element={<MainProducts />} />            
            <Route path="/mainproducts/addmainproductsform" element={<AddMainProductsForm />} />  
            <Route path="/mainproducts/addmainproductsform/:id" element={<AddMainProductsForm />} />  
            <Route path="/mainproducts/:id" element={<MainProducts />} /> 

            <Route path="/inspections" element={<Inspections />} /> 
            <Route path="/inspections/:id" element={<Inspections />} /> 
            <Route path="/inspections/addinspection" element={<AddInspection />} /> 

            <Route path="/owners/login" element={<OwnersLogin />} />
            <Route path="/owners/myprofile" element={<OwnersProfile />} />

            <Route path="/users" element={<Users />} /> 
            <Route path="/users/adduser" element={<AddUser />} /> 
            <Route path="/users/adduser/:id" element={<AddUser />} /> 
            <Route path="/users/:id" element={<Users />} /> 
            <Route path="/users/usersboard" element={<UsersBoard />} /> 

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


            <Route path="/servicevendor" element={<ServiceVendor />} />            
            <Route path="/servicevendor/addservicevendorform" element={<AddServiceVendorForm />} />  
            <Route path="/servicevendor/addservicevendorform/:id" element={<AddServiceVendorForm />} />  
            <Route path="/servicevendor/:id" element={<ServiceVendor />} /> 


            <Route path="/enquiry" element={<ListEnquiry />} /> 
            <Route path="/enquiry/addenquiry" element={<AddEnquiry />} /> 
            <Route path="/enquiry/addenquiry/:id" element={<AddEnquiry />} /> 
            <Route path="/enquiry/:id" element={<ListEnquiry />} /> 
            <Route path="/enquiry/enquiryboard" element={<EnquiryBoard />} /> 

            <Route path="/articles" element={<ListArticles />} /> 
            <Route path="/articles/addarticles" element={<AddArticles />} /> 
            <Route path="/articles/addarticles/:id" element={<AddArticles />} /> 
            <Route path="/articles/:id" element={<ListArticles />} /> 
            <Route path="/articles/boardarticles" element={<BoardArticles />} /> 

            <Route path="/courses" element={<ListCourses />} /> 
            <Route path="/courses/addcourses" element={<AddCourses />} /> 
            <Route path="/courses/addcourses/:id" element={<AddCourses />} /> 
            <Route path="/courses/:id" element={<ListCourses />} /> 
            <Route path="/courses/boardcourses" element={<BoardCourses />} /> 


            <Route path="/reviews" element={<ListReviews />} /> 
            <Route path="/reviews/addreviews" element={<AddReviews />} /> 
            <Route path="/reviews/addreviews/:id" element={<AddReviews />} /> 
            <Route path="/reviews/:id" element={<ListReviews />} /> 
            <Route path="/reviews/boardreviews" element={<BoardReviews />} /> 


            <Route path="/societymembers" element={<ListSocietyMembers />} /> 
            <Route path="/societymembers/addsocietymembers" element={<AddSocietyMembers />} /> 
            <Route path="/societymembers/addsocietymembers/:id" element={<AddSocietyMembers />} /> 
            <Route path="/societymembers/:id" element={<ListSocietyMembers />} /> 
            <Route path="/societymembers/boardsocietymembers" element={<BoardSocietyMembers />} /> 


            <Route path="/gautramembers" element={<ListGautraMembers />} /> 
            <Route path="/gautramembers/addgautramembers" element={<AddGautraMembers />} /> 
            <Route path="/gautramembers/addgautramembers/:id" element={<AddGautraMembers />} /> 
            <Route path="/gautramembers/:id" element={<ListGautraMembers />} /> 
            <Route path="/gautramembers/boardgautramembers" element={<BoardGautraMembers />} /> 

            <Route path="/securitymembers" element={<ListSecurityMembers />} /> 
            <Route path="/securitymembers/addsecuritymembers" element={<AddSecurityMembers />} /> 
            <Route path="/securitymembers/addsecuritymembers/:id" element={<AddSecurityMembers />} /> 
            <Route path="/securitymembers/:id" element={<ListSecurityMembers />} /> 
            <Route path="/securitymembers/boardsecuritymembers" element={<BoardSecurityMembers />} /> 

            <Route path="/familymembers" element={<ListFamilyMembers />} /> 
            <Route path="/familymembers/addfamilymembers" element={<AddFamilyMembers />} /> 
            <Route path="/familymembers/addfamilymembers/:id" element={<AddFamilyMembers />} /> 
            <Route path="/familymembers/:id" element={<ListFamilyMembers />} /> 
            <Route path="/familymembers/boardfamilymembers" element={<BoardFamilyMembers />} /> 

            <Route path="/samajmembers" element={<ListSamajMembers />} /> 
            <Route path="/samajmembers/addsamajmembers" element={<AddSamajMembers />} /> 
            <Route path="/samajmembers/addsamajmembers/:id" element={<AddSamajMembers />} /> 
            <Route path="/samajmembers/:id" element={<ListSamajMembers />} /> 
            <Route path="/samajmembers/boardsamajmembers" element={<BoardSamajMembers />} /> 

            <Route path="/buildingmembers" element={<ListBuildingMembers />} /> 
            <Route path="/buildingmembers/addbuildingmembers" element={<AddBuildingMembers />} /> 
            <Route path="/buildingmembers/addbuildingmembers/:id" element={<AddBuildingMembers />} /> 
            <Route path="/buildingmembers/:id" element={<ListBuildingMembers />} /> 
            <Route path="/buildingmembers/boardbuildingmembers" element={<BoardBuildingMembers />} /> 

            <Route path="/sociallinks" element={<ListSocialLinks />} /> 
            <Route path="/sociallinks/addsociallinks" element={<AddSocialLinks />} /> 
            <Route path="/sociallinks/addsociallinks/:id" element={<AddSocialLinks />} /> 
            <Route path="/sociallinks/:id" element={<ListSocialLinks />} /> 
            <Route path="/sociallinks/boardsociallinks" element={<BoardSocialLinks />} /> 

          </Routes>
        </div>
        </div>
      </div>
      </Router>       
      </SocialLinksState>  </SamajMembersState>
      </BuildingMembersState>
      </FamilyMembersState>
       </SecurityMembersState>  
      </GautraMembersState>
      </SocietyMembersState>
      </ReviewsState>  
      </StateCourses> 
      </ArticlesState>
      </EnquiryState>
      </MainProductsState>
      </ServicevendorState> 
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
